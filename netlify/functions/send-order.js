/* Netlify Function: Verify Cloudflare Turnstile + Honeypot, then send order & customer confirmation via Resend */

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function sendResendEmail(apiKey, payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Resend error " + res.status + ": " + errText);
  }
  return res.json();
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (_) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  // 1. Honeypot check
  if (data.botField) {
    return { statusCode: 400, body: JSON.stringify({ error: "Rejected" }) };
  }

  // 2. Basic field validation
  const name = String(data.name || "").trim().slice(0, 120);
  const phone = String(data.phone || "").trim().slice(0, 40);
  const email = String(data.email || "").trim().slice(0, 160);
  const city = String(data.city || "").trim().slice(0, 100);
  const date = String(data.delivery_date || "").trim().slice(0, 120);
  const mensaje = String(data.mensaje || "").trim().slice(0, 2000);
  const lang = data.lang === "es" ? "es" : "en";
  const token = String(data.turnstileToken || "").trim();

  if (!name || !email || !mensaje || !isValidEmail(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing or invalid fields" }) };
  }

  // 3. Server-side Cloudflare Turnstile verification (blocks bots before Resend)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing TURNSTILE_SECRET_KEY" }) };
  }
  if (!token) {
    return { statusCode: 403, body: JSON.stringify({ error: "Verification required" }) };
  }

  const clientIp =
    (event.headers && (event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"])) || "";

  const verifyBody = new URLSearchParams({
    secret: turnstileSecret,
    response: token
  });
  if (clientIp) verifyBody.append("remoteip", clientIp.split(",")[0].trim());

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: verifyBody.toString()
  });
  const verifyJson = await verifyRes.json();
  if (!verifyJson.success) {
    return { statusCode: 403, body: JSON.stringify({ error: "Bot verification failed" }) };
  }

  // 4. Send emails via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing RESEND_API_KEY" }) };
  }

  const fromEmail = process.env.RESEND_FROM || "Leo's Tamales <pedidos@leostamales.com>";
  const ownerEmail = process.env.OWNER_EMAIL || "leostamales@gmail.com";

  const detailsHtml = `
    <p><strong>${lang === "es" ? "Nombre" : "Name"}:</strong> ${escapeHtml(name)}</p>
    ${phone ? `<p><strong>${lang === "es" ? "Teléfono" : "Phone"}:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p><strong>${lang === "es" ? "Correo" : "Email"}:</strong> ${escapeHtml(email)}</p>
    ${city ? `<p><strong>${lang === "es" ? "Ciudad" : "City"}:</strong> ${escapeHtml(city)}</p>` : ""}
    ${date ? `<p><strong>${lang === "es" ? "Fecha" : "Date needed"}:</strong> ${escapeHtml(date)}</p>` : ""}
    <p><strong>${lang === "es" ? "Pedido / Mensaje" : "Order / Message"}:</strong></p>
    <pre style="font-family:sans-serif;white-space:pre-wrap;background:#FFF4DC;padding:12px;border-radius:8px;border:1px solid #663333">${escapeHtml(mensaje)}</pre>
  `;

  try {
    // Email 1: To Leo's Tamales
    await sendResendEmail(resendKey, {
      from: fromEmail,
      to: [ownerEmail],
      reply_to: email,
      subject: lang === "es"
        ? `Nuevo pedido de ${name}${city ? " (" + city + ")" : ""}`
        : `New order from ${name}${city ? " (" + city + ")" : ""}`,
      html: `<div style="font-family:sans-serif;color:#3A1F18"><h2>Nuevo pedido web — Leo's Tamales</h2>${detailsHtml}</div>`
    });

    // Email 2: Confirmation to customer
    const custSubject = lang === "es"
      ? "Recibimos tu pedido — Leo's Tamales"
      : "We received your order — Leo's Tamales";
    const custIntro = lang === "es"
      ? `¡Hola ${escapeHtml(name)}! Recibimos tu pedido y te responderemos muy pronto para confirmar la entrega.`
      : `Hi ${escapeHtml(name)}! We received your order and will reply shortly to confirm delivery.`;
    const custFooter = lang === "es"
      ? "¿Dudas? Escríbenos por WhatsApp o llámanos al +1 323 787 7575."
      : "Questions? Message us on WhatsApp or call +1 323 787 7575.";

    await sendResendEmail(resendKey, {
      from: fromEmail,
      to: [email],
      reply_to: ownerEmail,
      subject: custSubject,
      html: `
        <div style="font-family:sans-serif;color:#3A1F18;max-width:560px">
          <h2 style="color:#B3202A">${lang === "es" ? "¡Gracias por tu pedido!" : "Thank you for your order!"}</h2>
          <p>${custIntro}</p>
          ${detailsHtml}
          <p style="color:#5A3A31;font-size:14px">${custFooter}</p>
        </div>
      `
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};

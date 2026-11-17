/* Netlify Function: Verify Cloudflare Turnstile + Honeypot, then send styled HTML order & confirmation emails via Resend */

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

function buildEmailHtml(opts) {
  const isEs = opts.lang === "es";
  const year = new Date().getFullYear();
  const waHref = "https://wa.me/13237877575";

  const rows = [
    [isEs ? "Nombre" : "Name", opts.name],
    opts.phone ? [isEs ? "Teléfono" : "Phone", opts.phone] : null,
    [isEs ? "Correo" : "Email", opts.email],
    opts.city ? [isEs ? "Ciudad" : "City", opts.city] : null,
    opts.date ? [isEs ? "Fecha" : "Date needed", opts.date] : null
  ].filter(Boolean);

  const infoRowsHtml = rows.map(function (r) {
    return `
      <tr>
        <td style="padding:6px 0;font-size:14px;font-weight:700;color:#5A3A31;width:120px;vertical-align:top">${escapeHtml(r[0])}:</td>
        <td style="padding:6px 0;font-size:15px;font-weight:700;color:#3A1F18;vertical-align:top">${escapeHtml(r[1])}</td>
      </tr>`;
  }).join("");

  const orderLinesHtml = escapeHtml(opts.mensaje).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="${opts.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:#FFF4DC;font-family:'Nunito',Arial,Helvetica,sans-serif;color:#3A1F18">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFF4DC" style="background-color:#FFF4DC;padding:24px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;background-color:#FFFDF6;border:2px solid #663333;border-radius:14px;overflow:hidden">
          <!-- Hero Green Header -->
          <tr>
            <td align="center" bgcolor="#0E7A38" style="background-color:#0E7A38;padding:22px 20px;border-bottom:4px solid #F29B1D">
              <div style="font-family:Georgia,serif;font-size:26px;font-weight:700;color:#FFFFFF;letter-spacing:0.3px">Leo's Tamales</div>
              <div style="margin-top:4px;font-size:13px;font-weight:700;color:#FFF4DC">${isEs ? "Tamales Mexicanos y Champurrado · Condado de Los Ángeles" : "Mexican Tamales &amp; Champurrado · Los Angeles County"}</div>
            </td>
          </tr>

          <!-- Ribbon Title & Intro -->
          <tr>
            <td style="padding:24px 22px 12px">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px">
                <tr>
                  <td bgcolor="#B3202A" style="background-color:#B3202A;color:#FFF4DC;padding:8px 18px;border-radius:8px;border:2px solid #663333;font-family:Georgia,serif;font-size:20px;font-weight:700">
                    ${escapeHtml(opts.heading)}
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:16px;line-height:1.5;color:#3A1F18">${opts.introHtml}</p>
            </td>
          </tr>

          <!-- Customer Details Card -->
          <tr>
            <td style="padding:8px 22px 14px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFF4DC" style="background-color:#FFF4DC;border:2px solid #663333;border-radius:10px;padding:12px 16px">
                ${infoRowsHtml}
              </table>
            </td>
          </tr>

          <!-- Order / Message Box -->
          <tr>
            <td style="padding:0 22px 20px">
              <div style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#B3202A;margin-bottom:6px">
                ${isEs ? "Detalle del pedido" : "Order details"}
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFF4DC" style="background-color:#FFF4DC;border:2px solid #F29B1D;border-radius:10px">
                <tr>
                  <td style="padding:14px 16px;font-size:15px;line-height:1.6;color:#3A1F18;font-weight:600">
                    ${orderLinesHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Talavera Info Band -->
          <tr>
            <td bgcolor="#0B5D52" style="background-color:#0B5D52;padding:18px 22px;color:#FFF4DC;border-top:2px solid #663333">
              <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#FFD27A">${isEs ? "Métodos de pago" : "Payment methods"}</div>
              <div style="font-size:15px;font-weight:700;margin:2px 0 12px">${isEs ? "Efectivo, Zelle o Venmo" : "Cash, Zelle or Venmo"}</div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#15803D" style="background-color:#15803D;border-radius:10px;border:2px solid #FFFFFF">
                    <a href="${waHref}" target="_blank" rel="noopener" style="display:inline-block;padding:10px 18px;font-size:14px;font-weight:800;color:#FFFFFF;text-decoration:none">
                      ${isEs ? "WhatsApp: +1 323 787 7575" : "WhatsApp: +1 323 787 7575"}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:14px 20px;font-size:12px;color:#5A3A31">
              © ${year} Leo's Tamales · Los Angeles County · <a href="https://leostamales.com" style="color:#B3202A;text-decoration:none;font-weight:700">leostamales.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_API_KEY;
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

  // 4. Send styled emails via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing RESEND_API_KEY" }) };
  }

  const fromEmail = process.env.RESEND_FROM || "Leo's Tamales <orders@mail.leostamales.com>";
  const ownerEmail = process.env.OWNER_EMAIL || "leostamales@gmail.com";

  const plainText = [
    `${lang === "es" ? "Nombre" : "Name"}: ${name}`,
    phone ? `${lang === "es" ? "Teléfono" : "Phone"}: ${phone}` : "",
    `${lang === "es" ? "Correo" : "Email"}: ${email}`,
    city ? `${lang === "es" ? "Ciudad" : "City"}: ${city}` : "",
    date ? `${lang === "es" ? "Fecha" : "Date needed"}: ${date}` : "",
    "",
    mensaje
  ].filter(Boolean).join("\n");

  try {
    // Email 1: To Leo's Tamales
    await sendResendEmail(resendKey, {
      from: fromEmail,
      to: [ownerEmail],
      reply_to: email,
      subject: lang === "es"
        ? `Nuevo pedido de ${name}${city ? " (" + city + ")" : ""}`
        : `New order from ${name}${city ? " (" + city + ")" : ""}`,
      text: plainText,
      html: buildEmailHtml({
        lang: lang,
        name: name,
        phone: phone,
        email: email,
        city: city,
        date: date,
        mensaje: mensaje,
        heading: lang === "es" ? "Nuevo pedido web" : "New web order",
        introHtml: lang === "es"
          ? `Recibiste un nuevo pedido desde el sitio web. Puedes responder directo a este correo para contactar a <strong>${escapeHtml(name)}</strong>.`
          : `You received a new order from the website. Reply directly to this email to reach <strong>${escapeHtml(name)}</strong>.`
      })
    });

    // Email 2: Confirmation to customer
    const custSubject = lang === "es"
      ? "Recibimos tu pedido — Leo's Tamales"
      : "We received your order — Leo's Tamales";

    await sendResendEmail(resendKey, {
      from: fromEmail,
      to: [email],
      reply_to: ownerEmail,
      subject: custSubject,
      text: (lang === "es"
        ? `¡Hola ${name}! Recibimos tu pedido y te responderemos muy pronto para confirmar la entrega.\n\n`
        : `Hi ${name}! We received your order and will reply shortly to confirm delivery.\n\n`) + plainText,
      html: buildEmailHtml({
        lang: lang,
        name: name,
        phone: phone,
        email: email,
        city: city,
        date: date,
        mensaje: mensaje,
        heading: lang === "es" ? "¡Gracias por tu pedido!" : "Thank you for your order!",
        introHtml: lang === "es"
          ? `¡Hola <strong>${escapeHtml(name)}</strong>! Recibimos tu pedido y te responderemos muy pronto para confirmar la entrega.`
          : `Hi <strong>${escapeHtml(name)}</strong>! We received your order and will reply shortly to confirm delivery.`
      })
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};

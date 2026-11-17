/* Leo's Tamales — Order Cart (Dozen / Unit / Champurrado) */
(function () {
  const STORAGE_KEY = "leo_cart_v1";

  const CATALOG = {
    "cheese-dozen": { price: 30.0, en: "Cheese Tamales", es: "Tamales de Queso", unitEn: "dozen", unitEs: "docena" },
    "cheese-each": { price: 2.75, en: "Cheese Tamales", es: "Tamales de Queso", unitEn: "each", unitEs: "pieza" },
    "pork-dozen": { price: 30.0, en: "Pork Tamales", es: "Tamales de Puerco", unitEn: "dozen", unitEs: "docena" },
    "pork-each": { price: 2.75, en: "Pork Tamales", es: "Tamales de Puerco", unitEn: "each", unitEs: "pieza" },
    "chicken-dozen": { price: 30.0, en: "Chicken Tamales", es: "Tamales de Pollo", unitEn: "dozen", unitEs: "docena" },
    "chicken-each": { price: 2.75, en: "Chicken Tamales", es: "Tamales de Pollo", unitEn: "each", unitEs: "pieza" },
    "strawberry-dozen": { price: 30.0, en: "Strawberry Tamales", es: "Tamales de Fresa", unitEn: "dozen", unitEs: "docena" },
    "strawberry-each": { price: 2.75, en: "Strawberry Tamales", es: "Tamales de Fresa", unitEn: "each", unitEs: "pieza" },
    "pineapple-dozen": { price: 30.0, en: "Pineapple Tamales", es: "Tamales de Piña", unitEn: "dozen", unitEs: "docena" },
    "pineapple-each": { price: 2.75, en: "Pineapple Tamales", es: "Tamales de Piña", unitEn: "each", unitEs: "pieza" },
    "sweet-corn-dozen": { price: 30.0, en: "Sweet Corn Tamales", es: "Tamales de Elote", unitEn: "dozen", unitEs: "docena" },
    "sweet-corn-each": { price: 2.75, en: "Sweet Corn Tamales", es: "Tamales de Elote", unitEn: "each", unitEs: "pieza" },
    "champurrado-12oz": { price: 2.5, en: "Champurrado 12 oz", es: "Champurrado 12 oz", unitEn: "cup", unitEs: "vaso" },
    "champurrado-16oz": { price: 2.75, en: "Champurrado 16 oz", es: "Champurrado 16 oz", unitEn: "cup", unitEs: "vaso" },
    "champurrado-gallon": { price: 20.0, en: "Champurrado 1 Gallon", es: "Champurrado 1 Galón", unitEn: "gallon", unitEs: "galón" }
  };

  function isEs() {
    return (document.documentElement.lang || "en").slice(0, 2).toLowerCase() === "es";
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (_) {}
  }

  function money(n) {
    return "$" + n.toFixed(2).replace(/\.00$/, "");
  }

  function unitLabel(item, qty, es) {
    if (es) {
      if (qty === 1) return item.unitEs;
      if (item.unitEs === "galón") return "galones";
      return item.unitEs + "s";
    }
    if (qty === 1 || item.unitEn === "each" || item.unitEn === "dozen") return item.unitEn;
    return item.unitEn + "s";
  }

  let cart = loadCart();

  function getEntries() {
    return Object.keys(CATALOG)
      .filter(function (id) { return (cart[id] || 0) > 0; })
      .map(function (id) {
        const item = CATALOG[id];
        const qty = cart[id];
        return { id: id, item: item, qty: qty, subtotal: qty * item.price };
      });
  }

  function buildOrderText(entries, es) {
    const total = entries.reduce(function (s, e) { return s + e.subtotal; }, 0);
    const lines = entries.map(function (e) {
      const name = es ? e.item.es : e.item.en;
      const u = unitLabel(e.item, e.qty, es);
      return `- ${name}: ${e.qty} ${u} (${money(e.subtotal)})`;
    });
    const totalLine = es
      ? `Subtotal estimado: ${money(total)} (+ envío según ciudad)`
      : `Estimated subtotal: ${money(total)} (+ delivery by city)`;
    return lines.join("\n") + "\n" + totalLine;
  }

  function ensureDrawer() {
    let drawer = document.getElementById("cart-drawer");
    if (drawer) return drawer;
    drawer = document.createElement("div");
    drawer.id = "cart-drawer";
    drawer.className = "cart-drawer";
    drawer.hidden = true;
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-labelledby", "cart-drawer-title");
    document.body.appendChild(drawer);
    return drawer;
  }

  function render() {
    const es = isEs();
    const entries = getEntries();
    const totalCount = entries.reduce(function (s, e) { return s + e.qty; }, 0);
    const totalPrice = entries.reduce(function (s, e) { return s + e.subtotal; }, 0);

    document.querySelectorAll("[data-qty]").forEach(function (el) {
      const id = el.getAttribute("data-qty");
      el.textContent = String(cart[id] || 0);
    });

    const pill = document.querySelector(".float-pill--order");
    if (pill) {
      const textEl = pill.querySelector("[data-pill-label]");
      const label = totalCount > 0
        ? (es ? `Pedido (${totalCount}) · ${money(totalPrice)}` : `Order (${totalCount}) · ${money(totalPrice)}`)
        : (es ? "Ordena ahora" : "Order now");
      if (textEl) {
        textEl.textContent = label;
      } else {
        pill.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span data-pill-label>${label}</span>`;
      }
    }

    const drawer = document.getElementById("cart-drawer");
    if (!drawer) return;

    const title = es ? "Tu pedido" : "Your order";
    const closeLabel = es ? "Cerrar" : "Close";

    if (entries.length === 0) {
      drawer.innerHTML = `
        <div class="cart-drawer__backdrop" data-cart-close></div>
        <div class="cart-drawer__panel">
          <div class="cart-drawer__head">
            <h2 id="cart-drawer-title" class="cart-drawer__title">${title}</h2>
            <button type="button" class="nav-close" aria-label="${closeLabel}" data-cart-close>×</button>
          </div>
          <p class="cart-empty">${es ? "Aún no agregas tamales o champurrado. Elige docenas o piezas en el menú." : "No items added yet. Pick dozens or single tamales from the menu."}</p>
          <a class="btn btn--call" href="#menu" data-cart-close>${es ? "Ver menú" : "Browse menu"}</a>
        </div>`;
      return;
    }

    const itemsHtml = entries.map(function (e) {
      const name = es ? e.item.es : e.item.en;
      const u = unitLabel(e.item, e.qty, es);
      return `
        <li class="cart-item">
          <div>
            <span class="cart-item__name">${name}</span>
            <span class="cart-item__meta">${e.qty} ${u} · ${money(e.subtotal)}</span>
          </div>
          <div class="qty-stepper">
            <button type="button" class="qty-btn" data-cart-dec="${e.id}" aria-label="${es ? "Quitar" : "Remove"} ${name}">−</button>
            <span class="qty-val">${e.qty}</span>
            <button type="button" class="qty-btn qty-btn--plus" data-cart-inc="${e.id}" aria-label="${es ? "Agregar" : "Add"} ${name}">+</button>
          </div>
        </li>`;
    }).join("");

    const summaryText = buildOrderText(entries, es);
    const waIntro = es
      ? "¡Hola Leo's Tamales! Me gustaría hacer este pedido:\n"
      : "Hi Leo's Tamales! I'd like to place this order:\n";
    const waHref = "https://wa.me/13237877575?text=" + encodeURIComponent(waIntro + summaryText);

    drawer.innerHTML = `
      <div class="cart-drawer__backdrop" data-cart-close></div>
      <div class="cart-drawer__panel">
        <div class="cart-drawer__head">
          <h2 id="cart-drawer-title" class="cart-drawer__title">${title}</h2>
          <button type="button" class="nav-close" aria-label="${closeLabel}" data-cart-close>×</button>
        </div>
        <button type="button" class="cart-clear" data-cart-clear>${es ? "Vaciar pedido" : "Clear order"}</button>
        <ul class="cart-items">${itemsHtml}</ul>
        <div class="cart-summary">
          <div class="cart-total">
            <span>${es ? "Subtotal estimado" : "Estimated subtotal"}</span>
            <strong>${money(totalPrice)}</strong>
          </div>
          <p class="form-note">${es ? "El costo de envío puede variar según tu ciudad." : "Delivery fee may vary by city."}</p>
          <a class="btn btn--call" href="${waHref}" target="_blank" rel="noopener" data-track="click_whatsapp">
            ${es ? "Enviar pedido por WhatsApp" : "Send order on WhatsApp"}
          </a>
          <button type="button" class="btn btn--wa-outline" data-cart-to-form>
            ${es ? "Pasar al formulario de encargo" : "Fill order form below"}
          </button>
        </div>
      </div>`;
  }

  function updateQty(id, delta) {
    if (!CATALOG[id]) return;
    const next = Math.max(0, (cart[id] || 0) + delta);
    if (id.endsWith("-each") && next >= 12) {
      const dozenId = id.replace(/-each$/, "-dozen");
      const extraDozens = Math.floor(next / 12);
      const rem = next % 12;
      cart[dozenId] = (cart[dozenId] || 0) + extraDozens;
      if (rem === 0) {
        delete cart[id];
      } else {
        cart[id] = rem;
      }
    } else if (next === 0) {
      delete cart[id];
    } else {
      cart[id] = next;
    }
    saveCart(cart);
    render();
  }

  document.addEventListener("click", function (e) {
    const inc = e.target.closest("[data-cart-inc]");
    if (inc) {
      updateQty(inc.getAttribute("data-cart-inc"), 1);
      return;
    }

    const dec = e.target.closest("[data-cart-dec]");
    if (dec) {
      updateQty(dec.getAttribute("data-cart-dec"), -1);
      return;
    }

    if (e.target.closest("[data-cart-clear]")) {
      cart = {};
      saveCart(cart);
      render();
      return;
    }

    if (e.target.closest(".float-pill--order")) {
      e.preventDefault();
      const drawer = ensureDrawer();
      render();
      drawer.hidden = false;
      return;
    }

    if (e.target.closest("[data-cart-close]")) {
      const drawer = document.getElementById("cart-drawer");
      if (drawer) drawer.hidden = true;
      return;
    }

    if (e.target.closest("[data-cart-to-form]")) {
      const es = isEs();
      const entries = getEntries();
      const textarea = document.getElementById("order-items");
      if (textarea && entries.length > 0) {
        textarea.value = buildOrderText(entries, es);
      }
      const drawer = document.getElementById("cart-drawer");
      if (drawer) drawer.hidden = true;
      const contact = document.getElementById("contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementById("order-name");
      if (nameInput) setTimeout(function () { nameInput.focus(); }, 350);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    ensureDrawer();
    render();
  });
})();

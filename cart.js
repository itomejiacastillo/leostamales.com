/* Leo's Tamales — Order Cart & 2-Step Checkout (WhatsApp / Email) */
(function () {
  const STORAGE_KEY = "leo_cart_v1";

  const CITIES = [
    "Los Angeles", "Carson", "Compton", "San Pedro", "Palos Verdes",
    "Bellflower", "Lomita", "Torrance", "Long Beach", "Inglewood",
    "Lawndale", "Paramount", "Harbor City", "Lynwood", "Wilmington"
  ];

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

  function saveCart(nextCart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));
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
  let step = "cart"; // "cart" | "checkout"

  function getEntries() {
    return Object.keys(CATALOG)
      .filter(function (id) { return (cart[id] || 0) > 0; })
      .map(function (id) {
        const item = CATALOG[id];
        const qty = cart[id];
        return { id: id, item: item, qty: qty, subtotal: qty * item.price };
      });
  }

  function buildItemsText(entries, es) {
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

  function buildFullOrderMessage(entries, info, es) {
    const header = es
      ? "¡Hola Leo's Tamales! Quiero realizar este pedido:"
      : "Hi Leo's Tamales! I'd like to place this order:";
    const details = es
      ? `Nombre: ${info.name}\nCiudad: ${info.city}\nFecha: ${info.date}`
      : `Name: ${info.name}\nCity: ${info.city}\nDate needed: ${info.date}`;
    return `${header}\n\n${details}\n\n${es ? "Productos:" : "Items:"}\n${buildItemsText(entries, es)}`;
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

    if (entries.length === 0) step = "cart";

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

    const closeLabel = es ? "Cerrar" : "Close";

    if (entries.length === 0) {
      drawer.innerHTML = `
        <div class="cart-drawer__backdrop" data-cart-close></div>
        <div class="cart-drawer__panel">
          <div class="cart-drawer__head">
            <h2 id="cart-drawer-title" class="cart-drawer__title">${es ? "Tu pedido" : "Your order"}</h2>
            <button type="button" class="nav-close" aria-label="${closeLabel}" data-cart-close>×</button>
          </div>
          <p class="cart-empty">${es ? "Aún no agregas tamales o champurrado. Elige docenas o piezas en el menú." : "No items added yet. Pick dozens or single tamales from the menu."}</p>
          <a class="btn btn--call" href="#menu" data-cart-close>${es ? "Ver menú" : "Browse menu"}</a>
        </div>`;
      return;
    }

    if (step === "checkout") {
      const cityOptions = CITIES.map(function (c) {
        return `<option value="${c}"></option>`;
      }).join("");
      const today = new Date().toISOString().split("T")[0];

      drawer.innerHTML = `
        <div class="cart-drawer__backdrop" data-cart-close></div>
        <div class="cart-drawer__panel">
          <div class="cart-drawer__head">
            <h2 id="cart-drawer-title" class="cart-drawer__title">${es ? "Datos de entrega" : "Delivery details"}</h2>
            <button type="button" class="nav-close" aria-label="${closeLabel}" data-cart-close>×</button>
          </div>
          <button type="button" class="cart-clear" style="align-self:flex-start" data-cart-back>← ${es ? "Volver al pedido" : "Back to order"} (${totalCount} · ${money(totalPrice)})</button>
          <form id="checkout-form" class="order-form" novalidate>
            <div>
              <label class="field-label" for="checkout-name">${es ? "Tu nombre" : "Your name"}</label>
              <input class="field" id="checkout-name" type="text" required autocomplete="name" placeholder="${es ? "Nombre completo" : "Full name"}">
            </div>
            <div>
              <label class="field-label" for="checkout-city">${es ? "Ciudad donde vives" : "City where you live"}</label>
              <input class="field" id="checkout-city" type="text" list="checkout-cities" required placeholder="${es ? "Ej. Los Angeles, Carson, Torrance..." : "e.g. Los Angeles, Carson, Torrance..."}">
              <datalist id="checkout-cities">${cityOptions}</datalist>
            </div>
            <div>
              <label class="field-label" for="checkout-date">${es ? "Fecha que necesitas el pedido" : "Date you need the order"}</label>
              <input class="field" id="checkout-date" type="date" min="${today}" required>
            </div>
            <p id="checkout-error" class="form-note" style="color:var(--red);font-weight:800" hidden></p>
            <button type="button" class="btn btn--call" data-checkout-wa>
              ${es ? "Enviar por WhatsApp" : "Send via WhatsApp"}
            </button>
            <button type="button" class="btn btn--wa-outline" data-checkout-email>
              ${es ? "Enviar por correo" : "Send via email"}
            </button>
          </form>
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

    drawer.innerHTML = `
      <div class="cart-drawer__backdrop" data-cart-close></div>
      <div class="cart-drawer__panel">
        <div class="cart-drawer__head">
          <h2 id="cart-drawer-title" class="cart-drawer__title">${es ? "Tu pedido" : "Your order"}</h2>
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
          <button type="button" class="btn btn--call" data-cart-checkout>
            ${es ? "Realizar pedido" : "Place order"}
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

  function readCheckoutInfo(es) {
    const name = ((document.getElementById("checkout-name") || {}).value || "").trim();
    const city = ((document.getElementById("checkout-city") || {}).value || "").trim();
    const date = ((document.getElementById("checkout-date") || {}).value || "").trim();
    const err = document.getElementById("checkout-error");

    if (!name || !city || !date) {
      if (err) {
        err.textContent = es
          ? "Por favor completa tu nombre, ciudad y fecha."
          : "Please enter your name, city, and date needed.";
        err.hidden = false;
      }
      return null;
    }
    if (err) err.hidden = true;
    return { name: name, city: city, date: date };
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
      step = "cart";
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

    if (e.target.closest("[data-cart-checkout]")) {
      step = "checkout";
      render();
      const nameInput = document.getElementById("checkout-name");
      if (nameInput) nameInput.focus();
      return;
    }

    if (e.target.closest("[data-cart-back]")) {
      step = "cart";
      render();
      return;
    }

    if (e.target.closest("[data-checkout-wa]")) {
      const es = isEs();
      const info = readCheckoutInfo(es);
      if (!info) return;
      const msg = buildFullOrderMessage(getEntries(), info, es);
      window.open("https://wa.me/13237877575?text=" + encodeURIComponent(msg), "_blank", "noopener");
      return;
    }

    if (e.target.closest("[data-checkout-email]")) {
      const es = isEs();
      const info = readCheckoutInfo(es);
      if (!info) return;
      const msg = buildFullOrderMessage(getEntries(), info, es);
      const subject = es
        ? `Nuevo pedido de ${info.name} (${info.city})`
        : `New order from ${info.name} (${info.city})`;
      window.location.href = `mailto:leostamales@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    ensureDrawer();
    render();
  });
})();

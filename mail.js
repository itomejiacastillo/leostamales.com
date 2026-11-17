/* Leo's Tamales — Shared Navigation, Footer & Language Helpers */

(function () {
  const YEAR = new Date().getFullYear();

  const PAPEL_PICADO_SVG = `
    <svg class="papel-picado" width="100%" height="52" aria-hidden="true" focusable="false">
      <defs>
        <symbol id="pp-flag" viewBox="0 0 61 52">
          <polygon points="0,6 61,6 61,42 51,50 41,42 31,50 20,42 10,50 0,42" fill="currentColor"/>
          <g style="fill:var(--cream)">
            <circle cx="30" cy="22" r="5"/>
            <circle cx="14" cy="32" r="2.5"/>
            <circle cx="47" cy="32" r="2.5"/>
          </g>
        </symbol>
        <pattern id="pp-pattern" width="390" height="52" patternUnits="userSpaceOnUse">
          <line x1="0" y1="6" x2="390" y2="6" style="stroke:var(--brown)" stroke-width="2"/>
          <use href="#pp-flag" x="2" width="61" height="52" style="color:var(--pp-red)"/>
          <use href="#pp-flag" x="67" width="61" height="52" style="color:var(--pp-orange)"/>
          <use href="#pp-flag" x="132" width="61" height="52" style="color:var(--pp-teal)"/>
          <use href="#pp-flag" x="197" width="61" height="52" style="color:var(--pp-magenta)"/>
          <use href="#pp-flag" x="262" width="61" height="52" style="color:var(--pp-yellow)"/>
          <use href="#pp-flag" x="327" width="61" height="52" style="color:var(--pp-blue)"/>
        </pattern>
      </defs>
      <rect width="100%" height="52" fill="url(#pp-pattern)"/>
    </svg>`;

  function trackEvent(name, detail) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, detail || {});
    }
  }

  function renderHeader(cfg) {
    const altHref = cfg.altHref || cfg.defaultAltHref;
    return `
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="site-header__logo" href="${cfg.homeHref}" aria-label="${cfg.logoLabel}">
            <img src="/multimedia/vectores/LOGO%20HORIZONTAL.svg" alt="Leo's Tamales" width="160" height="40">
          </a>

          <nav class="site-nav" aria-label="${cfg.navLabel}">
            <a href="${cfg.homeHref}#top">${cfg.links.home}</a>
            <a href="${cfg.homeHref}#menu">${cfg.links.menu}</a>
            <a href="${cfg.homeHref}#prices">${cfg.links.prices}</a>
            <a href="${cfg.homeHref}#delivery">${cfg.links.delivery}</a>
            <a href="${cfg.homeHref}#contact">${cfg.links.contact}</a>
          </nav>

          <div class="site-header__actions">
            <div class="lang-switch" aria-label="${cfg.langLabel}">
              ${cfg.isEs
                ? `<a href="${altHref}" hreflang="en" lang="en" data-lang-switch="en">EN</a><span class="lang-switch__active" aria-current="page">ES</span>`
                : `<span class="lang-switch__active" aria-current="page">EN</span><a href="${altHref}" hreflang="es" lang="es" data-lang-switch="es">ES</a>`
              }
            </div>
            <a class="btn btn--call site-header__cta" href="${cfg.homeHref}#contact" data-track="click_order_header">
              ${cfg.ctaText}
            </a>
            <button type="button" class="nav-burger" aria-label="${cfg.openMenuLabel}" aria-expanded="false" aria-controls="mobile-drawer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-drawer" class="mobile-drawer" hidden>
        <div class="mobile-drawer__backdrop" data-drawer-close></div>
        <nav class="mobile-drawer__panel" aria-label="${cfg.mobileNavLabel}">
          <div class="mobile-drawer__top">
            <img src="/multimedia/vectores/LOGO%20HORIZONTAL.svg" alt="Leo's Tamales" width="144" height="36">
            <button type="button" class="nav-close" aria-label="${cfg.closeMenuLabel}" data-drawer-close>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <ul class="mobile-drawer__list">
            <li><a href="${cfg.homeHref}#top" data-drawer-close>${cfg.links.home}</a></li>
            <li><a href="${cfg.homeHref}#menu" data-drawer-close>${cfg.links.menu}</a></li>
            <li><a href="${cfg.homeHref}#prices" data-drawer-close>${cfg.links.prices}</a></li>
            <li><a href="${cfg.homeHref}#delivery" data-drawer-close>${cfg.links.delivery}</a></li>
            <li><a href="${cfg.homeHref}#contact" data-drawer-close>${cfg.links.contact}</a></li>
          </ul>
          <div class="mobile-drawer__bottom">
            <a class="btn btn--call" style="width:100%" href="tel:+13237877575" data-track="click_call">${cfg.callNowText}</a>
          </div>
        </nav>
      </div>`;
  }

  function renderFooter(cfg) {
    return `
      <footer class="site-footer">
        ${PAPEL_PICADO_SVG}
        <div class="container site-footer__inner">
          <div class="site-footer__brand">
            <img src="/multimedia/vectores/LOGO%20HORIZONTAL.svg" alt="Leo's Tamales" width="220" height="55" loading="lazy">
            <p class="site-footer__tagline">${cfg.tagline}</p>
          </div>

          <div class="site-footer__cols">
            <div>
              <h3>${cfg.contactHeading}</h3>
              <ul>
                <li><a href="https://wa.me/13237877575?text=${encodeURIComponent(cfg.waText)}" target="_blank" rel="noopener" data-track="click_whatsapp">
                  <img src="/multimedia/vectores/whatsapp.svg" alt="" width="20" height="20" aria-hidden="true">WhatsApp
                </a></li>
                <li><a href="tel:+13237877575" data-track="click_call">
                  <img src="/multimedia/vectores/telefono.svg" alt="" width="20" height="20" aria-hidden="true">${cfg.phoneLabel}
                </a></li>
                <li><a href="https://www.instagram.com/leostamales22" target="_blank" rel="noopener">
                  <img src="/multimedia/vectores/instagram.svg" alt="" width="20" height="20" aria-hidden="true">Instagram
                </a></li>
                <li><a href="https://www.facebook.com/leostamales" target="_blank" rel="noopener">
                  <img src="/multimedia/vectores/facebook.svg" alt="" width="20" height="20" aria-hidden="true">Facebook
                </a></li>
              </ul>
            </div>

            <div>
              <h3>${cfg.paymentsHeading}</h3>
              <ul>
                <li><span class="site-footer__pay"><img src="/multimedia/vectores/efectivo.svg" alt="" width="20" height="20" aria-hidden="true">${cfg.cashLabel}</span></li>
                <li><span class="site-footer__pay"><img src="/multimedia/vectores/zelle.svg" alt="" width="20" height="20" aria-hidden="true">Zelle</span></li>
                <li><a href="https://venmo.com/code?user_id=2775643343290368689&created=1624065168" target="_blank" rel="noopener">
                  <img src="/multimedia/vectores/venmo.svg" alt="" width="20" height="20" aria-hidden="true">Venmo
                </a></li>
              </ul>
            </div>

            <div>
              <h3>${cfg.infoHeading}</h3>
              <ul>
                <li><a href="${cfg.homeHref}#menu">${cfg.links.menu}</a></li>
                <li><a href="${cfg.homeHref}#prices">${cfg.links.prices}</a></li>
                <li><a href="${cfg.homeHref}#delivery">${cfg.links.delivery}</a></li>
                <li><a href="${cfg.privacyHref}">${cfg.privacyLabel}</a></li>
              </ul>
            </div>
          </div>

          <p class="site-footer__copy">© ${YEAR} Leo's Tamales. ${cfg.rights}</p>
        </div>
      </footer>`;
  }

  class NavEnglish extends HTMLElement {
    connectedCallback() {
      const altHref = this.getAttribute("alt-href");
      this.innerHTML = renderHeader({
        isEs: false,
        homeHref: "/",
        defaultAltHref: "/es/",
        altHref,
        logoLabel: "Leo's Tamales Home",
        navLabel: "Main navigation",
        mobileNavLabel: "Mobile navigation",
        langLabel: "Language selector",
        openMenuLabel: "Open menu",
        closeMenuLabel: "Close menu",
        ctaText: "Order now",
        callNowText: "Call now",
        links: { home: "Home", menu: "Menu", prices: "Prices", delivery: "Delivery", contact: "Contact" }
      });
    }
  }

  class NavSpanish extends HTMLElement {
    connectedCallback() {
      const altHref = this.getAttribute("alt-href");
      this.innerHTML = renderHeader({
        isEs: true,
        homeHref: "/es/",
        defaultAltHref: "/",
        altHref,
        logoLabel: "Inicio de Leo's Tamales",
        navLabel: "Navegación principal",
        mobileNavLabel: "Navegación móvil",
        langLabel: "Selector de idioma",
        openMenuLabel: "Abrir menú",
        closeMenuLabel: "Cerrar menú",
        ctaText: "Ordena ahora",
        callNowText: "Llama ahora",
        links: { home: "Inicio", menu: "Menú", prices: "Precios", delivery: "Entrega", contact: "Contacto" }
      });
    }
  }

  class FooterEnglish extends HTMLElement {
    connectedCallback() {
      this.innerHTML = renderFooter({
        homeHref: "/",
        tagline: "Delivery-only Mexican tamales & champurrado across Los Angeles County. Pre-orders welcome.",
        contactHeading: "Contact",
        paymentsHeading: "Payments",
        infoHeading: "Explore",
        phoneLabel: "+1 323 787 7575",
        cashLabel: "Cash",
        privacyHref: "/es/politica-de-privacidad.html",
        privacyLabel: "Privacy Policy",
        rights: "All Rights Reserved.",
        waText: "Hi Leo's Tamales! I would like to place an order.",
        links: { menu: "Menu", prices: "Prices", delivery: "Delivery" }
      });
    }
  }

  class FooterSpanish extends HTMLElement {
    connectedCallback() {
      this.innerHTML = renderFooter({
        homeHref: "/es/",
        tagline: "Tamales mexicanos y champurrado solo a domicilio en el condado de Los Ángeles. Aceptamos encargos.",
        contactHeading: "Contacto",
        paymentsHeading: "Medios de pago",
        infoHeading: "Explora",
        phoneLabel: "+1 323 787 7575",
        cashLabel: "Efectivo",
        privacyHref: "/es/politica-de-privacidad.html",
        privacyLabel: "Política de Privacidad",
        rights: "Todos los derechos reservados.",
        waText: "¡Hola Leo's Tamales! Me gustaría hacer un pedido.",
        links: { menu: "Menú", prices: "Precios", delivery: "Entrega a domicilio" }
      });
    }
  }

  if (!customElements.get("nav-english")) customElements.define("nav-english", NavEnglish);
  if (!customElements.get("nav-spanish")) customElements.define("nav-spanish", NavSpanish);
  if (!customElements.get("footer-english")) customElements.define("footer-english", FooterEnglish);
  if (!customElements.get("footer-spanish")) customElements.define("footer-spanish", FooterSpanish);

  document.addEventListener("click", function (e) {
    const burger = e.target.closest(".nav-burger");
    if (burger) {
      const drawer = document.getElementById("mobile-drawer");
      if (drawer) {
        drawer.hidden = false;
        burger.setAttribute("aria-expanded", "true");
      }
      return;
    }

    if (e.target.closest("[data-drawer-close]")) {
      const drawer = document.getElementById("mobile-drawer");
      const openBtn = document.querySelector(".nav-burger");
      if (drawer) drawer.hidden = true;
      if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      return;
    }

    const langLink = e.target.closest("[data-lang-switch]");
    if (langLink) {
      try {
        localStorage.setItem("leo_lang", langLink.getAttribute("data-lang-switch"));
      } catch (_) {}
      trackEvent("language_switch", { target_lang: langLink.getAttribute("data-lang-switch") });
      return;
    }

    const dismissSuggest = e.target.closest("[data-lang-dismiss]");
    if (dismissSuggest) {
      try {
        localStorage.setItem("leo_lang_dismissed", "1");
      } catch (_) {}
      const box = dismissSuggest.closest(".lang-suggest");
      if (box) box.remove();
      return;
    }

    const tracked = e.target.closest("[data-track]");
    if (tracked) {
      trackEvent(tracked.getAttribute("data-track"));
    }

    const waBtn = e.target.closest("#wa-order-link");
    if (waBtn) {
      const isEs = document.documentElement.lang === "es";
      const name = (document.getElementById("order-name") || {}).value || "";
      const phone = (document.getElementById("order-phone") || {}).value || "";
      const items = (document.getElementById("order-items") || {}).value || "";
      const when = (document.getElementById("order-date") || {}).value || "";
      if (name || items || when) {
        const lines = isEs
          ? [
              "¡Hola Leo's Tamales! Quiero hacer un pedido:",
              name ? `Nombre: ${name}` : "",
              phone ? `Teléfono: ${phone}` : "",
              items ? `Pedido: ${items}` : "",
              when ? `Para cuándo: ${when}` : ""
            ]
          : [
              "Hi Leo's Tamales! I'd like to place an order:",
              name ? `Name: ${name}` : "",
              phone ? `Phone: ${phone}` : "",
              items ? `Order: ${items}` : "",
              when ? `For when: ${when}` : ""
            ];
        waBtn.href = `https://wa.me/13237877575?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
      }
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const pageLang = (document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    const rawLang = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    const deviceLang = rawLang.slice(0, 2).toLowerCase();

    let savedLang = null;
    let dismissed = false;
    try {
      savedLang = localStorage.getItem("leo_lang");
      dismissed = localStorage.getItem("leo_lang_dismissed") === "1";
    } catch (_) {}

    if (dismissed || savedLang === pageLang) return;

    const shouldSuggestEs = pageLang === "en" && deviceLang === "es";
    const shouldSuggestEn = pageLang === "es" && deviceLang === "en";
    if (!shouldSuggestEs && !shouldSuggestEn) return;

    const targetLang = shouldSuggestEs ? "es" : "en";
    const navEl = document.querySelector("nav-english, nav-spanish");
    const altFromNav = navEl && navEl.getAttribute("alt-href");
    const altLink = document.querySelector(`link[rel="alternate"][hreflang="${targetLang}"]`);
    const targetHref = altFromNav || (altLink && new URL(altLink.href).pathname) || (targetLang === "es" ? "/es/" : "/");

    const banner = document.createElement("div");
    banner.className = "lang-suggest";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", shouldSuggestEs ? "Sugerencia de idioma" : "Language suggestion");
    banner.innerHTML = shouldSuggestEs
      ? `<span>¿Ver en español?</span> <a class="lang-suggest__link" href="${targetHref}" hreflang="es" lang="es" data-lang-switch="es">Cambiar</a> <button type="button" class="lang-suggest__close" aria-label="Cerrar" data-lang-dismiss>×</button>`
      : `<span>Prefer English?</span> <a class="lang-suggest__link" href="${targetHref}" hreflang="en" lang="en" data-lang-switch="en">Switch</a> <button type="button" class="lang-suggest__close" aria-label="Dismiss" data-lang-dismiss>×</button>`;

    document.body.appendChild(banner);
  });
})();

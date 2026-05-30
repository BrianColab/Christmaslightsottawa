const icons = {
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-5"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1L12 2z"/></svg>',
  award: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.2 7 22l5-3 5 3-1.2-8.8"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 11 12 3l9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-7h6v7"/></svg>',
  bulb: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 22h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.9.7-1.5 1.8-1.5 3.5h-4c0-1.7-.6-2.8-1.5-3.5z"/></svg>',
  ladder: '<svg viewBox="0 0 24 24"><path d="M8 22 15 2M16 22 9 2M10 8h6M8.7 12h6M7.3 16h6"/></svg>',
  wreath: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><path d="M12 5V2M12 22v-3M5 12H2M22 12h-3M7.1 7.1 5 5M19 19l-2.1-2.1M16.9 7.1 19 5M5 19l2.1-2.1"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path d="m3 7 9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>',
  tree: '<svg viewBox="0 0 24 24"><path d="m12 3-5 6h3l-4 5h4l-5 6h14l-5-6h4l-4-5h3l-5-6z"/><path d="M12 20v2"/></svg>',
  store: '<svg viewBox="0 0 24 24"><path d="M4 10h16l-1-6H5l-1 6z"/><path d="M5 10v10h14V10"/><path d="M8 20v-6h8v6"/></svg>',
  "chevron-left": '<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>',
  "chevron-right": '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>'
};

const icon = (name) => `<span class="icon" aria-hidden="true">${icons[name] || icons.sparkle}</span>`;
const smallImage = (src) => src.replace("-1200.jpg", "-640.jpg");
const imageSrcset = (src) => `${smallImage(src)} 640w, ${src} 1200w`;

document.querySelectorAll("[data-icon]").forEach((el) => {
  el.innerHTML = icons[el.dataset.icon] || icons.sparkle;
});

const data = window.siteData;

const setHTML = (id, html) => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
};

setHTML("trust-strip", data.trustItems.map((item) => `
  <div class="trust-item">
    ${icon(item.icon)}
    <p><strong>${item.title}</strong><span>${item.text}</span></p>
  </div>
`).join(""));

setHTML("positioning-points", data.positioningPoints.map((item) => `
  <p>${icon("shield")}<span>${item}</span></p>
`).join(""));

setHTML("process-grid", data.process.map((step, index) => `
  <article class="process-step">
    <span class="step-number">${index + 1}</span>
    ${icon(step.icon)}
    <h3>${step.title}</h3>
    <p>${step.text}</p>
  </article>
`).join(""));

setHTML("services-grid", data.services.map((service) => `
  <article class="service-card">
    <div class="service-icon">${icon(service.icon)}</div>
    <h3>${service.title}</h3>
    <p>${service.text}</p>
    <img src="${smallImage(service.image)}" srcset="${imageSrcset(service.image)}" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1180px) 33vw, 280px" width="640" height="427" alt="${service.alt}" loading="lazy" decoding="async">
  </article>
`).join(""));

setHTML("decorate-grid", data.decorateItems.map((item) => `
  <p>${icon("sparkle")}<span>${item}</span></p>
`).join(""));

setHTML("packages-grid", data.packages.map((item, index) => `
  <article class="package-card">
    <p class="package-kicker">Package ${index + 1}</p>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  </article>
`).join(""));

setHTML("form-services", data.formServices.map((item) => `
  <label class="check-option">
    <input type="checkbox" name="services" value="${item}">
    <span>${item}</span>
  </label>
`).join(""));

setHTML("referral-source", `
  <option value="">Select one</option>
  ${data.referralSources.map((item) => `<option value="${item}">${item}</option>`).join("")}
`);

setHTML("proof-list", data.proof.map((item) => `
  <p>${icon("shield")}<span>${item}</span></p>
`).join(""));

setHTML("area-list", data.areas.map((area) => `<span>${area}</span>`).join(""));

setHTML("gallery-grid", data.gallery.map((item) => `
  <figure>
    <img src="${smallImage(item.image)}" srcset="${imageSrcset(item.image)}" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1180px) 33vw, 280px" width="640" height="427" alt="${item.alt}" loading="lazy" decoding="async">
    <figcaption><span>${item.category}</span>${item.title}</figcaption>
  </figure>
`).join(""));

setHTML("faq-grid", data.faqs.map((item) => `
  <details>
    <summary>${item.question}</summary>
    <p>${item.answer}</p>
  </details>
`).join(""));

let testimonialIndex = 0;
const testimonialCard = document.getElementById("testimonial-card");

function renderTestimonial() {
  if (!testimonialCard) return;
  const item = data.testimonials[testimonialIndex];
  testimonialCard.innerHTML = `
    <div class="stars">Client note</div>
    <blockquote>${item.quote}</blockquote>
    <p class="testimonial-name">- ${item.name}</p>
    <p class="testimonial-location">${item.location}</p>
  `;
}

document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + data.testimonials.length) % data.testimonials.length;
  renderTestimonial();
});

document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % data.testimonials.length;
  renderTestimonial();
});

renderTestimonial();

const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

toggle?.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

function updateChristmasCountdown() {
  const countdown = document.querySelector("[data-christmas-countdown]");
  if (!countdown) return;

  const now = new Date();
  let christmas = new Date(now.getFullYear(), 11, 25);

  if (now > christmas) {
    christmas = new Date(now.getFullYear() + 1, 11, 25);
  }

  const dayMs = 1000 * 60 * 60 * 24;
  const days = Math.ceil((christmas - now) / dayMs);
  const label = days === 1 ? "day" : "days";

  if (days === 0) {
    countdown.textContent = "Merry Christmas from Christmas Lights Ottawa.";
    return;
  }

  countdown.innerHTML = `
    <span class="countdown-number">${days}</span>
    <span class="countdown-copy">
      <span class="countdown-label">${label} until Christmas</span>
      <span class="countdown-subline">Book early for the best holiday decorating plan.</span>
    </span>
  `;
}

updateChristmasCountdown();

function createQuoteDrawer() {
  if (document.querySelector("[data-quote-drawer]")) return;

  const drawer = document.createElement("aside");
  drawer.className = "quote-drawer";
  drawer.setAttribute("data-quote-drawer", "");
  drawer.setAttribute("aria-hidden", "true");
  drawer.innerHTML = `
    <div class="quote-drawer-backdrop" data-quote-close></div>
    <div class="quote-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="quote-drawer-title">
      <button class="quote-drawer-close" type="button" aria-label="Close quote form" data-quote-close>&times;</button>
      <p class="eyebrow">Request a free quote</p>
      <h2 id="quote-drawer-title">Tell us what you want decorated.</h2>
      <p>Tell us a little about your property and the holiday look you want. Photos are helpful, but not required to get started.</p>
      <form class="drawer-form" data-drawer-form novalidate>
        <label class="form-honeypot" aria-hidden="true">
          Leave this field blank
          <input type="text" name="website" tabindex="-1" autocomplete="off">
        </label>
        <div class="form-row">
          <label>
            Full Name*
            <input type="text" name="name" autocomplete="name" required>
          </label>
          <label>
            Email*
            <input type="email" name="email" autocomplete="email" required>
          </label>
        </div>
        <div class="form-row">
          <label>
            Phone*
            <input type="tel" name="phone" autocomplete="tel" required>
          </label>
          <label>
            Preferred Contact Method
            <select name="preferred-contact">
              <option value="">Select one</option>
              <option>Phone</option>
              <option>Text</option>
              <option>Email</option>
            </select>
          </label>
        </div>
        <label>
          Property Address*
          <input type="text" name="address" autocomplete="street-address" required>
        </label>
        <label>
          Property Type
          <select name="property-type">
            <option value="">Select one</option>
            <option>Home</option>
            <option>Business</option>
            <option>Condo/Townhome</option>
            <option>Other</option>
          </select>
        </label>
        <fieldset>
          <legend>Services interested in</legend>
          <div class="checkbox-grid drawer-checkboxes">
            ${data.formServices.map((item) => `
              <label class="check-option">
                <input type="checkbox" name="services" value="${item}">
                <span>${item}</span>
              </label>
            `).join("")}
          </div>
        </fieldset>
        <label>
          Upload Photos
          <input type="file" name="photos" accept="image/*" multiple>
          <span class="form-help">Photos of your front entrance, porch, garage, shrubs, walkway, trees, or storefront help us prepare a more accurate quote.</span>
        </label>
        <label>
          Project Details
          <textarea name="details" rows="4" placeholder="Entryway, porch, railings, shrubs, walkways, storefront..."></textarea>
          <span class="form-help">Tell us what areas you want decorated and the style you like.</span>
        </label>
        <label class="agreement">
          <input type="checkbox" name="consent" required>
          <span>I agree to be contacted by Christmas Lights Ottawa about my quote request.</span>
        </label>
        <button class="button button-primary" type="submit" data-cta="drawer-form-submit">Request My Free Quote</button>
        <a class="text-link" href="/request-a-quote" data-cta="drawer-full-form">Open the full quote form</a>
        <p class="form-status" data-drawer-status tabindex="-1" role="status" hidden>This form is ready, but online submission still needs to be connected to email delivery, CRM, or a form backend.</p>
      </form>
    </div>
  `;

  document.body.appendChild(drawer);
}

function setDrawerOpen(isOpen) {
  const drawer = document.querySelector("[data-quote-drawer]");
  if (!drawer) return;

  drawer.classList.toggle("is-open", isOpen);
  drawer.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("drawer-open", isOpen);

  if (isOpen) {
    drawer.querySelector("input")?.focus();
  }
}

createQuoteDrawer();

if (!window.location.pathname.startsWith("/request-a-quote")) {
  document.querySelectorAll('a[href="/request-a-quote"], a[href="/request-a-quote/"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setDrawerOpen(true);
    });
  });
}

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-quote-close]")) {
    setDrawerOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawerOpen(false);
  }
});

function clearFormErrors(form) {
  form.querySelectorAll(".field-error").forEach((error) => error.remove());
  form.querySelectorAll(".has-error").forEach((field) => field.classList.remove("has-error"));
}

function showFieldError(field, message) {
  const container = field.closest("label, fieldset") || field.parentElement;
  if (!container) return;
  container.classList.add("has-error");
  const error = document.createElement("span");
  error.className = "field-error";
  error.textContent = message;
  container.appendChild(error);
}

function validateQuoteForm(form) {
  clearFormErrors(form);
  const honeypot = form.elements.website;
  if (honeypot?.value.trim()) return false;

  const requiredFields = [
    ["name", "Please enter your full name."],
    ["email", "Please enter a valid email address."],
    ["phone", "Please enter your phone number."],
    ["address", "Please enter the property address."]
  ];
  let isValid = true;

  requiredFields.forEach(([name, message]) => {
    const field = form.elements[name];
    if (!field || !field.value.trim() || (name === "email" && !field.checkValidity())) {
      showFieldError(field, message);
      isValid = false;
    }
  });

  if (!form.querySelector('input[name="services"]:checked')) {
    const services = form.querySelector("fieldset");
    if (services) showFieldError(services, "Please select at least one service.");
    isValid = false;
  }

  const consent = form.elements.consent;
  if (consent && !consent.checked) {
    showFieldError(consent, "Please confirm we can contact you about this quote request.");
    isValid = false;
  }

  return isValid;
}

document.querySelector("[data-drawer-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("[data-drawer-status]");
  if (!validateQuoteForm(form)) {
    form.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (status) {
    status.hidden = false;
    status.textContent = "This form is ready, but online submission still needs to be connected to email delivery, CRM, or a form backend.";
    status.focus?.();
  }
});

const header = document.querySelector("[data-header]");
const updateHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const revealTargets = document.querySelectorAll(".section, .positioning-strip, .trust-strip, .service-areas, .final-cta, .article-hero");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach((target) => target.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

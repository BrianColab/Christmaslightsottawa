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

document.querySelectorAll("[data-icon]").forEach((el) => {
  el.innerHTML = icons[el.dataset.icon] || icons.sparkle;
});

const data = window.siteData;

document.getElementById("trust-strip").innerHTML = data.trustItems.map((item) => `
  <div class="trust-item">
    ${icon(item.icon)}
    <p><strong>${item.title}</strong><span>${item.text}</span></p>
  </div>
`).join("");

document.getElementById("positioning-points").innerHTML = data.positioningPoints.map((item) => `
  <p>${icon("shield")}<span>${item}</span></p>
`).join("");

document.getElementById("process-grid").innerHTML = data.process.map((step, index) => `
  <article class="process-step">
    <span class="step-number">${index + 1}</span>
    ${icon(step.icon)}
    <h3>${step.title}</h3>
    <p>${step.text}</p>
  </article>
`).join("");

document.getElementById("services-grid").innerHTML = data.services.map((service) => `
  <article class="service-card">
    <div class="service-icon">${icon(service.icon)}</div>
    <h3>${service.title}</h3>
    <p>${service.text}</p>
    <img src="${service.image}" alt="${service.alt}" loading="lazy">
  </article>
`).join("");

document.getElementById("decorate-grid").innerHTML = data.decorateItems.map((item) => `
  <p>${icon("sparkle")}<span>${item}</span></p>
`).join("");

document.getElementById("packages-grid").innerHTML = data.packages.map((item, index) => `
  <article class="package-card">
    <p class="package-kicker">Package ${index + 1}</p>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  </article>
`).join("");

document.getElementById("form-services").innerHTML = data.formServices.map((item, index) => `
  <label class="check-option">
    <input type="checkbox" name="services" value="${item}">
    <span>${item}</span>
  </label>
`).join("");

document.getElementById("referral-source").innerHTML = `
  <option value="">Select one</option>
  ${data.referralSources.map((item) => `<option value="${item}">${item}</option>`).join("")}
`;

document.getElementById("proof-list").innerHTML = data.proof.map((item) => `
  <p>${icon("shield")}<span>${item}</span></p>
`).join("");

document.getElementById("area-list").innerHTML = data.areas.map((area) => `<span>${area}</span>`).join("");

document.getElementById("gallery-grid").innerHTML = data.gallery.map((item) => `
  <figure>
    <img src="${item.image}" alt="${item.alt}" loading="lazy">
    <figcaption>${item.title}</figcaption>
  </figure>
`).join("");

let testimonialIndex = 0;
const testimonialCard = document.getElementById("testimonial-card");

function renderTestimonial() {
  const item = data.testimonials[testimonialIndex];
  testimonialCard.innerHTML = `
    <div class="stars" aria-label="Five star rating">★★★★★</div>
    <blockquote>${item.quote}</blockquote>
    <p class="testimonial-name">- ${item.name}</p>
    <p class="testimonial-location">${item.location}</p>
  `;
}

document.querySelector("[data-testimonial-prev]").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + data.testimonials.length) % data.testimonials.length;
  renderTestimonial();
});

document.querySelector("[data-testimonial-next]").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % data.testimonials.length;
  renderTestimonial();
});

renderTestimonial();

const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

toggle.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

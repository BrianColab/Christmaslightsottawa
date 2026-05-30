const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");

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

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validateQuoteForm(form)) {
    form.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (formStatus) {
    formStatus.hidden = false;
    formStatus.textContent = "This form is ready, but online submission still needs to be connected to email delivery, CRM, or a form backend.";
    formStatus.focus?.();
  }
});

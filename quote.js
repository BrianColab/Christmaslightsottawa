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

function quotePayload(form) {
  const formData = new FormData(form);
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    propertyType: formData.get("property-type"),
    preferredContact: formData.get("preferred-contact"),
    services: formData.getAll("services"),
    message: formData.get("message"),
    photos: formData.getAll("photos").filter((file) => file?.name).map((file) => file.name),
    consent: formData.get("consent") === "on",
    website: formData.get("website")
  };
}

function setSubmitState(form, isSubmitting) {
  const button = form.querySelector('[type="submit"]');
  if (!button) return;
  button.disabled = isSubmitting;
  button.dataset.originalHtml ||= button.innerHTML;
  button.innerHTML = isSubmitting ? "Submitting..." : button.dataset.originalHtml;
}

function showStatus(status, message, isError = false) {
  if (!status) return;
  status.hidden = false;
  status.textContent = message;
  status.classList.toggle("is-error", isError);
  status.focus?.();
}

quoteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validateQuoteForm(form)) {
    form.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  setSubmitState(form, true);
  showStatus(formStatus, "Submitting your quote request...");

  try {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quotePayload(form))
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      showStatus(formStatus, result.message || "The quote request could not be sent. Please call or text 613-744-7336.", true);
      return;
    }

    form.reset();
    showStatus(formStatus, result.message || "Thanks. Your quote request has been received. Christmas Lights Ottawa will contact you shortly.");
  } catch {
    showStatus(formStatus, "The quote request could not be sent. Please call or text 613-744-7336.", true);
  } finally {
    setSubmitState(form, false);
  }
});

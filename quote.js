const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (formStatus) {
    formStatus.hidden = false;
    formStatus.focus?.();
  }
});

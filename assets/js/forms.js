(function () {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form[data-static-submit]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const out = form.querySelector("[data-form-output]");
        if (out) {
          out.textContent = "Static demo capture complete. In production, connect this form endpoint to your preferred no-code tool.";
        }
      });
    });
  });
})();

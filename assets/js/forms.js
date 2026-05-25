(function () {
  function bindFaqAccordions() {
    document.querySelectorAll(".faq-trigger").forEach((button) => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : button.nextElementSibling;
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (panel) {
          panel.style.maxHeight = expanded ? null : `${panel.scrollHeight}px`;
        }
      });
    });
  }

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
    bindFaqAccordions();
  });
})();

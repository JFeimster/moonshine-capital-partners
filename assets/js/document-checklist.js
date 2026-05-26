(function () {
  const FALLBACK_TYPES = [
    {
      slug: "working-capital",
      publicName: "Moonshine Capital Revenue Advance Program",
      readinessMarkers: ["Consistent deposits", "Operating history"],
      typicalDocuments: ["Recent statements", "Entity docs"],
      cautionFlags: ["Frequent overdrafts", "Current stacked advances"]
    }
  ];

  function getFundingTypes() {
    return Array.isArray(window.fundingTypes) && window.fundingTypes.length ? window.fundingTypes : FALLBACK_TYPES;
  }

  function getTrackedGetFundedUrl(slug) {
    if (window.buildTrackedUrl) {
      return window.buildTrackedUrl("/tools/embeds/get-funded-form.html", { utm_content: `checklist-${slug || "general"}` });
    }
    return "/tools/embeds/get-funded-form.html";
  }

  function renderChecklist(types, slug) {
    const selected = types.find((item) => item.slug === slug) || types[0];
    const summary = document.getElementById("document-checklist-summary");
    const docs = document.getElementById("document-checklist-documents");
    const readiness = document.getElementById("document-checklist-readiness");
    const cautions = document.getElementById("document-checklist-cautions");
    const prep = document.getElementById("document-checklist-prep");
    const cta = document.getElementById("document-checklist-get-funded");
    if (!selected || !summary || !docs || !readiness || !cautions || !prep || !cta) return;

    summary.textContent = `${selected.publicName}: prep guidance only. Final requirements depend on eligibility, underwriting, documentation, and provider requirements.`;

    docs.innerHTML = (selected.typicalDocuments || [])
      .map((item) => `<li><label><input type="checkbox"> <span>${item}</span></label></li>`)
      .join("");

    readiness.innerHTML = (selected.readinessMarkers || []).map((item) => `<li>${item}</li>`).join("");
    cautions.innerHTML = (selected.cautionFlags || []).map((item) => `<li>${item}</li>`).join("");

    prep.innerHTML = [
      "Confirm business identity and entity documents are current.",
      "Gather recent statements and notes tied to this funding path.",
      "Write a short use-of-funds summary with practical detail.",
      "Flag caution items before routing the file for review."
    ]
      .map((item) => `<li>${item}</li>`)
      .join("");

    cta.setAttribute("href", getTrackedGetFundedUrl(selected.slug));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("fundingType");
    if (!select) return;
    const types = getFundingTypes();

    select.innerHTML = types.map((item) => `<option value="${item.slug}">${item.publicName}</option>`).join("");
    renderChecklist(types, select.value);
    select.addEventListener("change", () => renderChecklist(types, select.value));
  });
})();

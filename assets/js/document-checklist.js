(function () {
  const fundingChecklists = {
    workingCapital: {
      label: "Working capital / revenue-based funding",
      documents: [
        "Last 3-6 months of business bank statements",
        "Business legal name, DBA, EIN, entity type, and start date",
        "Owner name, ownership percentage, phone, email, and state",
        "Monthly gross revenue estimate and average deposit volume",
        "Current advances or loan balances, if any",
        "Use-of-funds summary in plain English"
      ]
    },
    lineOfCredit: {
      label: "Business line of credit",
      documents: [
        "Last 6 months of business bank statements",
        "Year-to-date profit and loss statement, if available",
        "Most recent business tax return, if available",
        "Business debt schedule or current obligations summary",
        "Owner credit tier estimate without promising eligibility",
        "Use-of-funds and repayment capacity notes"
      ]
    },
    equipment: {
      label: "Equipment financing",
      documents: [
        "Equipment invoice, quote, or purchase order",
        "Vendor contact information",
        "Last 3-6 months of business bank statements",
        "Business entity and owner identification details",
        "Equipment use case and revenue impact summary",
        "Insurance or title information if requested during review"
      ]
    },
    invoiceFactoring: {
      label: "Invoice factoring / receivables",
      documents: [
        "Current accounts receivable aging report",
        "Sample customer invoices",
        "Customer concentration notes",
        "Last 3 months of business bank statements",
        "Entity documents and ownership details",
        "Any existing liens, UCCs, or factoring agreements"
      ]
    },
    realEstate: {
      label: "Real estate investor funding",
      documents: [
        "Property address and purchase or refinance scenario",
        "Purchase contract, payoff, or settlement statement if available",
        "Scope of work or rehab budget for fix-and-flip deals",
        "Entity and guarantor information",
        "Experience summary and exit strategy",
        "Photos, valuation notes, rent roll, or lease details if relevant"
      ]
    }
  };

  function renderChecklist(key) {
    const selected = fundingChecklists[key] || fundingChecklists.workingCapital;
    const list = document.getElementById("document-checklist-output");
    const summary = document.getElementById("document-checklist-summary");
    if (!list || !summary) return;

    summary.textContent = `${selected.label}: use this as a prep list only. Final requirements vary by funder, product, business profile, and review path.`;
    list.innerHTML = selected.documents
      .map((item) => `<li><label><input type="checkbox"> <span>${item}</span></label></li>`)
      .join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("fundingType");
    if (!select) return;
    select.addEventListener("change", () => renderChecklist(select.value));
    renderChecklist(select.value);
  });
})();

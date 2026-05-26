(function () {
  const swipeCopy = {
    sms: "Quick heads-up: Moonshine Capital has a funding-readiness flow for business owners who want to see what documents and next steps may be needed. No guarantees or approval claims — just a cleaner way to route the conversation. Start here: {{TRACKED_GET_FUNDED_URL}}",
    email: "Subject: A cleaner way to prep your business funding file\n\nHey {{FIRST_NAME}},\n\nI wanted to send over a simple Moonshine Capital resource that helps business owners organize funding-readiness details before a review. It can help identify documents, use-of-funds notes, and the next best routing step.\n\nImportant: this is not a funding approval, guarantee, or credit outcome promise. Options depend on eligibility, underwriting, documentation, lender requirements, and business profile.\n\nStart here: {{TRACKED_GET_FUNDED_URL}}\n\nDisclosure: I may receive referral compensation, credit, or recognition for qualified referrals.",
    social: "Business owners: before you chase funding like a raccoon in a dumpster behind a bank, get your file organized. Moonshine Capital has a funding-readiness flow to help prep docs and route the conversation. No guarantees. No approval promises. Just cleaner next steps. {{TRACKED_SCORECARD_URL}}",
    partnerIntro: "I’m a Moonshine Capital referral partner. My role is to help point business owners toward funding-readiness tools, document prep, and review pathways. Funding options are subject to eligibility, underwriting, documentation, lender requirements, and business profile. {{TRACKED_PARTNER_PAGE_URL}}"
  };

  function renderCopy(type) {
    const output = document.getElementById("swipe-copy-output");
    if (!output) return;
    output.textContent = swipeCopy[type] || swipeCopy.sms;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("swipeType");
    const copyButton = document.getElementById("copy-swipe-copy");
    if (!select) return;
    select.addEventListener("change", () => renderCopy(select.value));
    copyButton?.addEventListener("click", () => navigator.clipboard.writeText(document.getElementById("swipe-copy-output")?.textContent || ""));
    renderCopy(select.value);
  });
})();

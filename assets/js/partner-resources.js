(function () {
  const TEMPLATES = {
    email: `Subject: Funding readiness next step\n\nHi {{FIRST_NAME}},\n\nI wanted to share a Moonshine Capital prep route that may help organize a funding file before review.\n\nStart here: {{TRACKED_GET_FUNDED_URL}}\n\nYou can also review readiness guidance here: {{TRACKED_SCORECARD_URL}}\n\nReferral disclosure: I may receive referral compensation, credit, or recognition for qualified referrals.`,
    linkedInDm: `Quick share: this route may help business owners organize documents before review.\n\nGet started: {{TRACKED_GET_FUNDED_URL}}\n\nDisclosure reminder: referral attribution does not affect review outcomes.`,
    shortSocial: `Business owners: organize your funding-readiness file before requesting review. Use this path for prep guidance and next steps: {{TRACKED_SCORECARD_URL}}`,
    referralScript: `Before we discuss routes for review, use this checklist to prep documents and context: {{TRACKED_DOCUMENT_CHECKLIST_URL}}\n\nThen book a review conversation here: {{TRACKED_BOOK_CALL_URL}}`,
    embedCode: `<iframe src="{{TRACKED_PARTNER_PAGE_URL}}" width="100%" height="700" loading="lazy" title="Moonshine Capital Partner Referral"></iframe>`
  };

  function getBaseParams(fd) {
    const partnerSlug = (fd.get("partnerSlug") || "direct").trim();
    const partnerName = (fd.get("partnerName") || "Direct Channel").trim();
    const referralCode = (fd.get("referralCode") || "DIRECT").trim();
    return {
      ref: referralCode,
      partner: partnerSlug,
      partner_name: partnerName,
      partner_type: "Referral Partner",
      utm_source: "partner",
      utm_medium: "referral",
      utm_campaign: partnerSlug
    };
  }

  function buildTracked(path, params) {
    if (window.mergeTrackingParams) return window.mergeTrackingParams(path, params);
    return path;
  }

  function buildLinks(fd) {
    const params = getBaseParams(fd);
    const partnerSlug = params.partner;
    return {
      TRACKED_GET_FUNDED_URL: buildTracked("/tools/embeds/get-funded-form.html", { ...params, utm_content: "resources-get-funded" }),
      TRACKED_SCORECARD_URL: buildTracked("/tools/funding-readiness-scorecard/", { ...params, utm_content: "resources-scorecard" }),
      TRACKED_BOOK_CALL_URL: buildTracked("/tools/book-call/", { ...params, utm_content: "resources-book-call" }),
      TRACKED_DOCUMENT_CHECKLIST_URL: buildTracked("/tools/document-checklist/", { ...params, utm_content: "resources-document-checklist" }),
      TRACKED_PARTNER_PAGE_URL: buildTracked(`/partners/${partnerSlug}/`, { ...params, utm_content: "resources-partner-page" })
    };
  }

  function replaceTokens(text, tokens) {
    return Object.entries(tokens).reduce((out, [key, value]) => out.replaceAll(`{{${key}}}`, value), text);
  }

  function render(form) {
    const fd = new FormData(form);
    const swipeType = fd.get("swipeType") || "email";
    const output = document.getElementById("swipe-copy-output");
    const tokenOutput = document.getElementById("tracked-placeholder-output");
    const disclosure = document.getElementById("resource-disclosure");
    if (!output || !tokenOutput || !disclosure) return;

    const links = buildLinks(fd);
    const firstName = (fd.get("partnerName") || "Partner").toString().trim().split(" ")[0];
    const body = replaceTokens(TEMPLATES[swipeType] || TEMPLATES.email, { ...links, FIRST_NAME: firstName });
    output.textContent = body;

    tokenOutput.textContent =
`{{TRACKED_GET_FUNDED_URL}}: ${links.TRACKED_GET_FUNDED_URL}
{{TRACKED_SCORECARD_URL}}: ${links.TRACKED_SCORECARD_URL}
{{TRACKED_BOOK_CALL_URL}}: ${links.TRACKED_BOOK_CALL_URL}
{{TRACKED_DOCUMENT_CHECKLIST_URL}}: ${links.TRACKED_DOCUMENT_CHECKLIST_URL}
{{TRACKED_PARTNER_PAGE_URL}}: ${links.TRACKED_PARTNER_PAGE_URL}`;

    disclosure.textContent = (window.moonshineConfig || {}).requiredReferralDisclosure || "Referral Disclosure is required when sharing partner links.";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("partner-resources-form");
    const copyButton = document.getElementById("copy-swipe-copy");
    if (!form) return;

    form.addEventListener("input", () => render(form));
    form.addEventListener("change", () => render(form));
    copyButton?.addEventListener("click", () => navigator.clipboard.writeText(document.getElementById("swipe-copy-output")?.textContent || ""));
    render(form);
  });
})();

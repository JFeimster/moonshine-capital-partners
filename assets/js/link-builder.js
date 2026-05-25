(function () {
  function buildUrlSet(input) {
    const slug = (input.partnerSlug || "direct").trim();
    const name = (input.partnerName || "Direct").trim();
    const ref = (input.referralCode || "DIRECT").trim();
    const source = (input.campaignSource || "partner").trim();
    const content = (input.campaignContent || "link-builder").trim();
    const target = input.targetPage || "/";

    const params = {
      ref,
      partner: slug,
      partner_name: name,
      partner_type: "Partner",
      utm_source: source,
      utm_medium: "referral",
      utm_campaign: slug,
      utm_content: content
    };

    const pages = [
      ["Partner page", `/partners/${slug}/`],
      ["Get Funded", "/tools/book-call/"],
      ["Funding Readiness Scorecard", "/tools/funding-readiness-scorecard/"],
      ["Funding directory", "/funding/"],
      ["Funding type page", target],
      ["Vertical page", "/verticals/"],
      ["Document checklist", "/tools/document-checklist/"],
      ["Book call", "/tools/book-call/"]
    ];

    return pages.map(([label, url]) => `${label}: ${window.mergeTrackingParams ? window.mergeTrackingParams(url, params) : url}`).join("\n");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("link-builder-form");
    if (!form) return;
    const output = document.getElementById("link-builder-output");
    const copy = document.getElementById("copy-link-builder-output");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fd = new FormData(form);
      output.textContent = buildUrlSet({
        partnerName: fd.get("partnerName"),
        partnerSlug: fd.get("partnerSlug"),
        referralCode: fd.get("referralCode"),
        campaignSource: fd.get("campaignSource"),
        campaignContent: fd.get("campaignContent"),
        targetPage: fd.get("targetPage")
      });
    });

    copy?.addEventListener("click", () => navigator.clipboard.writeText(output.textContent || ""));
  });
})();

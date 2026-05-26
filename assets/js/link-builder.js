(function () {
  const DEFAULT_BASE_URL = "https://moonshine-capital-partners.vercel.app";

  function cleanPath(value, fallback) {
    const raw = `${value || ""}`.trim() || fallback;
    if (/^https?:\/\//i.test(raw)) return raw;
    const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
    return withSlash.endsWith("/") || withSlash.includes(".") ? withSlash : `${withSlash}/`;
  }

  function buildParams(input, contentOverride) {
    const slug = (input.partnerSlug || "direct").trim();
    const name = (input.partnerName || "Direct Channel").trim();
    const ref = (input.referralCode || "DIRECT").trim();
    const source = (input.campaignSource || "partner").trim();
    const content = (contentOverride || input.campaignContent || "link-builder").trim();

    return {
      ref,
      partner: slug,
      partner_name: name,
      partner_type: (input.partnerType || "Partner").trim(),
      utm_source: source,
      utm_medium: "referral",
      utm_campaign: slug,
      utm_content: content
    };
  }

  function trackedUrl(url, params) {
    if (window.mergeTrackingParams) return window.mergeTrackingParams(url, params);
    const parsed = new URL(url, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (`${value || ""}`.trim()) parsed.searchParams.set(key, value);
    });
    return url.startsWith("http") ? parsed.toString() : `${parsed.pathname}${parsed.search}${parsed.hash}`;
  }

  function buildUrlSet(input) {
    const slug = (input.partnerSlug || "direct").trim();
    const fundingType = cleanPath(input.fundingTypePage, "/funding/working-capital/");
    const vertical = cleanPath(input.verticalPage, "/verticals/trades-contractors/");
    const customTarget = cleanPath(input.targetPage, fundingType);
    const baseUrl = (window.moonshineConfig || {}).baseUrl || DEFAULT_BASE_URL;

    const pages = [
      ["Partner page", `/partners/${slug}/`, "partner-page"],
      ["Get Funded", "/tools/embeds/get-funded-form.html", "get-funded"],
      ["Funding Readiness Scorecard", "/tools/funding-readiness-scorecard/", "scorecard"],
      ["Funding directory", "/funding/", "funding-directory"],
      ["Funding type page", fundingType, "funding-type"],
      ["Vertical page", vertical, "vertical-page"],
      ["Document checklist", "/tools/document-checklist/", "document-checklist"],
      ["Book call", "/tools/book-call/", "book-call"],
      ["Custom target", customTarget, "custom-target"]
    ];

    return pages
      .map(([label, url, content]) => {
        const tracked = trackedUrl(url, buildParams(input, content));
        const absolute = tracked.startsWith("http") ? tracked : `${baseUrl}${tracked}`;
        return `${label}:\n${absolute}`;
      })
      .join("\n\n");
  }

  function hydrateSelectOptions() {
    const fundingTypePage = document.getElementById("fundingTypePage");
    const verticalPage = document.getElementById("verticalPage");

    if (fundingTypePage?.tagName === "SELECT" && Array.isArray(window.fundingTypes)) {
      fundingTypePage.innerHTML = window.fundingTypes
        .map((item) => `<option value="/funding/${item.slug}/">${item.publicName}</option>`)
        .join("");
    }

    if (verticalPage?.tagName === "SELECT" && Array.isArray(window.verticalsData)) {
      verticalPage.innerHTML = window.verticalsData
        .map((item) => `<option value="/verticals/${item.slug}/">${item.name}</option>`)
        .join("");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("link-builder-form");
    if (!form) return;
    hydrateSelectOptions();
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
        partnerType: fd.get("partnerType"),
        targetPage: fd.get("targetPage"),
        fundingTypePage: fd.get("fundingTypePage"),
        verticalPage: fd.get("verticalPage")
      });
    });

    copy?.addEventListener("click", () => navigator.clipboard.writeText(output.textContent || ""));
  });
})();

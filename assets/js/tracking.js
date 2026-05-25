(function () {
  const KEY = "moonshine_attribution";
  const REQUIRED = [
    "ref",
    "partner",
    "partner_name",
    "partner_type",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content"
  ];

  function readQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const out = {};
    REQUIRED.forEach((key) => {
      if (params.has(key) && params.get(key)) out[key] = params.get(key);
    });
    return out;
  }

  function storeAttribution(input) {
    if (!input || typeof input !== "object") return null;
    const merged = { ...getStoredAttribution(), ...input };
    if (!Object.keys(merged).length) return null;
    localStorage.setItem(KEY, JSON.stringify(merged));
    return merged;
  }

  function getStoredAttribution() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }

  function mergeTrackingParams(url, params) {
    const parsed = new URL(url, window.location.origin);
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && `${value}`.trim()) parsed.searchParams.set(key, value);
    });
    if (url.startsWith("http")) return parsed.toString();
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  }

  function buildTrackedUrl(baseUrl, options = {}) {
    return mergeTrackingParams(baseUrl, { ...getStoredAttribution(), ...options });
  }

  function buildTallyUrl(partner, utmContent) {
    const config = window.moonshineConfig || {};
    const tallyBase = partner?.partnerTallyFormUrl || `https://tally.so/r/${config.tallyFormId || "YOUR_TALLY_FORM_ID"}`;
    return buildTrackedUrl(tallyBase, {
      ref: partner?.partnerReferralCode || "DIRECT",
      partner: partner?.partnerSlug || "direct",
      partner_name: partner?.partnerName || "Moonshine Capital",
      partner_type: partner?.partnerType || "Direct",
      utm_source: "partner",
      utm_medium: "referral",
      utm_campaign: partner?.partnerSlug || "direct",
      utm_content: utmContent || "get-funded"
    });
  }

  function buildToolEmbedUrl(toolUrl, partner, utmContent) {
    return buildTrackedUrl(toolUrl, {
      ref: partner?.partnerReferralCode || "DIRECT",
      partner: partner?.partnerSlug || "direct",
      partner_name: partner?.partnerName || "Moonshine Capital",
      partner_type: partner?.partnerType || "Direct",
      utm_source: "partner",
      utm_medium: "tool",
      utm_campaign: partner?.partnerSlug || "direct",
      utm_content: utmContent || "embed"
    });
  }

  function appendTrackingToLinks() {
    const stored = getStoredAttribution();
    document.querySelectorAll("a[data-track-url]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      link.href = buildTrackedUrl(href, { utm_content: link.dataset.utmContent || stored.utm_content || "site-link" });
    });
  }

  function copyReferralLink() {
    const target = document.querySelector("[data-copy-target]");
    return navigator.clipboard.writeText(target ? target.textContent.trim() : window.location.href);
  }

  window.readQueryParams = readQueryParams;
  window.storeAttribution = storeAttribution;
  window.getStoredAttribution = getStoredAttribution;
  window.mergeTrackingParams = mergeTrackingParams;
  window.buildTrackedUrl = buildTrackedUrl;
  window.appendTrackingToLinks = appendTrackingToLinks;
  window.copyReferralLink = copyReferralLink;
  window.buildTallyUrl = buildTallyUrl;
  window.buildToolEmbedUrl = buildToolEmbedUrl;

  document.addEventListener("DOMContentLoaded", () => {
    const incoming = readQueryParams();
    if (Object.keys(incoming).length) storeAttribution(incoming);
    appendTrackingToLinks();
  });
})();

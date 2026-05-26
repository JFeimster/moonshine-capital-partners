(function () {
  const DEFAULT_BASE_URL = "https://moonshine-capital-partners.vercel.app";

  function escapeAttribute(value) {
    return `${value || ""}`
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildWidgetCode(data) {
    const config = window.moonshineConfig || {};
    const getFundedTarget = `https://tally.so/r/${config.tallyFormId || "YOUR_TALLY_FORM_ID"}`;
    const targetMap = {
      scorecard: {
        path: "/tools/funding-readiness-scorecard/",
        title: "Moonshine Capital Funding Readiness Scorecard",
        defaultHeight: "760"
      },
      fieEngine: {
        path: "/tools/funding-intelligence-engine/",
        title: "Moonshine Capital Funding Intelligence Engine",
        defaultHeight: "980"
      },
      getFunded: {
        path: getFundedTarget,
        title: "Moonshine Capital Get Funded Form",
        defaultHeight: "820"
      },
      bookCall: {
        path: "/tools/book-call/",
        title: "Moonshine Capital Book a Call",
        defaultHeight: "720"
      },
      checklist: {
        path: "/tools/document-checklist/",
        title: "Moonshine Capital Document Checklist",
        defaultHeight: "780"
      }
    };

    const selected = targetMap[data.targetTool] || targetMap.scorecard;
    const width = data.width || "100%";
    const height = data.height || selected.defaultHeight;
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const relativeSrc = window.mergeTrackingParams
      ? window.mergeTrackingParams(selected.path, {
          ref: data.referralCode || "DIRECT",
          partner: data.partnerSlug || "direct",
          partner_name: data.partnerName || data.partnerSlug || "Direct Channel",
          partner_type: data.partnerType || "Partner",
          utm_source: "embed",
          utm_medium: "widget",
          utm_campaign: data.partnerSlug || "direct",
          utm_content: data.targetTool || "widget"
        })
      : selected.path;
    const src = relativeSrc.startsWith("http") ? relativeSrc : `${baseUrl}${relativeSrc}`;

    return `<iframe src="${escapeAttribute(src)}" width="${escapeAttribute(width)}" height="${escapeAttribute(height)}" loading="lazy" title="${escapeAttribute(selected.title)}" data-theme="${escapeAttribute(data.theme || "moonshine-dark")}" style="width:${escapeAttribute(width)};max-width:100%;border:3px solid #f5c542;background:#050505;border-radius:18px;"></iframe>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("widget-builder-form");
    if (!form) return;
    const output = document.getElementById("widget-builder-output");
    const copy = document.getElementById("copy-widget-output");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fd = new FormData(form);
      output.textContent = buildWidgetCode({
        partnerName: fd.get("partnerName"),
        partnerSlug: fd.get("partnerSlug"),
        referralCode: fd.get("referralCode"),
        partnerType: fd.get("partnerType"),
        width: fd.get("width") || "100%",
        height: fd.get("height") || "",
        theme: fd.get("theme") || "moonshine-dark",
        targetTool: fd.get("targetTool")
      });
    });

    copy?.addEventListener("click", () => navigator.clipboard.writeText(output.textContent || ""));
  });
})();
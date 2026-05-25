(function () {
  function buildWidgetCode(data) {
    const targetMap = {
      scorecard: "/tools/funding-readiness-scorecard/",
      getFunded: "/tools/embeds/get-funded-form.html",
      bookCall: "/tools/book-call/",
      checklist: "/tools/document-checklist/"
    };

    const target = targetMap[data.targetTool] || "/tools/";
    const src = window.mergeTrackingParams
      ? window.mergeTrackingParams(target, {
          ref: data.referralCode || "DIRECT",
          partner: data.partnerSlug || "direct",
          partner_name: data.partnerSlug || "direct",
          partner_type: "Partner",
          utm_source: "embed",
          utm_medium: "widget",
          utm_campaign: data.partnerSlug || "direct",
          utm_content: data.targetTool || "widget"
        })
      : target;

    return `<iframe src="${src}" width="${data.width}" height="${data.height}" loading="lazy" title="Moonshine Widget" data-theme="${data.theme}" style="border:3px solid #fff;background:#000;"></iframe>`;
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
        partnerSlug: fd.get("partnerSlug"),
        referralCode: fd.get("referralCode"),
        width: fd.get("width") || "100%",
        height: fd.get("height") || "680",
        theme: fd.get("theme") || "neo-brutalist",
        targetTool: fd.get("targetTool")
      });
    });

    copy?.addEventListener("click", () => navigator.clipboard.writeText(output.textContent || ""));
  });
})();

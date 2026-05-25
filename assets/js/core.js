(function () {
  const allPartners = window.partners || [];
  let currentPartner = allPartners[0] || {
    partnerName: "Direct",
    partnerCompany: "Moonshine Capital",
    partnerSlug: "direct",
    partnerType: "Direct",
    partnerReferralCode: "DIRECT",
    partnerIntro: "Explore readiness with a direct Moonshine routing flow.",
    partnerScorecardMode: "native",
    partnerTallyFormUrl: "https://tally.so/r/YOUR_TALLY_FORM_ID"
  };

  function applyText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null) el.textContent = value;
  }

  function updateLiveSimulator() {
    const ref = document.getElementById("sim-ref")?.value || currentPartner.partnerReferralCode;
    const name = document.getElementById("sim-name")?.value || currentPartner.partnerName;
    const slug = document.getElementById("sim-slug")?.value || currentPartner.partnerSlug;
    const medium = document.getElementById("sim-medium")?.value || "referral";

    const url = window.mergeTrackingParams
      ? window.mergeTrackingParams(`https://tally.so/r/${(window.moonshineConfig || {}).tallyFormId || "YOUR_TALLY_FORM_ID"}`, {
          ref,
          partner: slug,
          partner_name: name,
          partner_type: currentPartner.partnerType || "Partner",
          utm_source: "partner",
          utm_medium: medium,
          utm_campaign: slug,
          utm_content: "simulator"
        })
      : "#";

    const output = document.getElementById("sim-url-output");
    if (output) output.textContent = url;

    const tallyDisplay = document.getElementById("tally-query-display");
    if (tallyDisplay) tallyDisplay.innerHTML = `ref: ${ref}<br>partner: ${slug}<br>partner_name: ${name}<br>utm_medium: ${medium}`;

    const json = document.getElementById("json-viewer");
    if (json) json.textContent = JSON.stringify({ ref, name, slug, medium, url }, null, 2);
  }

  function updatePartnerFields() {
    const p = currentPartner;
    applyText("hero-preview-badge", `Active Session: ${p.partnerName}`);
    applyText("preview-val-name", p.partnerName);
    applyText("preview-val-code", p.partnerReferralCode);
    applyText("hero-preview-url", `${window.location.origin}/partners/${p.partnerSlug}/`);
    applyText("mini-avatar", p.partnerName.split(" ").map((s) => s[0]).join(""));
    applyText("mini-co-name", p.partnerCompany);
    applyText("partner-badge-label", p.partnerType);
    applyText("partner-code-label", `Code: ${p.partnerReferralCode}`);
    applyText("partner-hero-sub", `${p.partnerName} partnered with Moonshine Capital to help business owners take a clearer, more organized next step toward funding readiness.`);
    applyText("partner-note-sig", p.partnerName);
    applyText("partner-note-comp", p.partnerCompany);
    applyText("partner-note-body", `"${p.partnerIntro || "Explore readiness first."}"`);

    const iframe = document.getElementById("iframe-src-mock");
    if (iframe && window.buildToolEmbedUrl) {
      iframe.textContent = window.buildToolEmbedUrl((window.moonshineConfig || {}).scorecardEmbedUrl || "https://funding-quiz.vercel.app/", p, "scorecard-embed");
    }

    const nav = document.getElementById("partner-nav-link");
    if (nav) nav.textContent = `${p.partnerName.split(" ")[0]}'s Lead Hub`;

    const simRef = document.getElementById("sim-ref");
    const simName = document.getElementById("sim-name");
    const simSlug = document.getElementById("sim-slug");
    if (simRef) simRef.value = p.partnerReferralCode;
    if (simName) simName.value = p.partnerName;
    if (simSlug) simSlug.value = p.partnerSlug;

    window.toggleScorecardMode && window.toggleScorecardMode(p.partnerScorecardMode || "native");

    window.storeAttribution && window.storeAttribution({
      ref: p.partnerReferralCode,
      partner: p.partnerSlug,
      partner_name: p.partnerName,
      partner_type: p.partnerType,
      utm_source: "partner",
      utm_medium: "referral",
      utm_campaign: p.partnerSlug,
      utm_content: "partner-page"
    });
    window.appendTrackingToLinks && window.appendTrackingToLinks();

    updateLiveSimulator();
  }

  function switchSessionPartner(slug) {
    if (slug === "direct") {
      currentPartner = {
        partnerName: "Direct",
        partnerCompany: "Moonshine Capital",
        partnerSlug: "direct",
        partnerType: "General Channel",
        partnerReferralCode: "DIRECT",
        partnerIntro: "Explore readiness with a direct Moonshine routing flow.",
        partnerScorecardMode: "native",
        partnerTallyFormUrl: `https://tally.so/r/${(window.moonshineConfig || {}).tallyFormId || "YOUR_TALLY_FORM_ID"}`
      };
    } else {
      currentPartner = allPartners.find((p) => p.partnerSlug === slug) || currentPartner;
    }
    updatePartnerFields();
    window.resetNativeScorecard && window.resetNativeScorecard();
  }

  function getActiveTallyUrl() {
    return window.buildTallyUrl ? window.buildTallyUrl(currentPartner, "get-funded") : "#";
  }

  function copyAttributedURL() {
    const target = getActiveTallyUrl();
    navigator.clipboard.writeText(target).then(() => alert(`Referral URL copied:\n${target}`));
  }

  function switchView(viewId, event) {
    if (event) event.preventDefault();
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${viewId}`);
    });
    document.querySelectorAll(".system-view").forEach((view) => view.classList.remove("active-view"));
    const active = document.getElementById(`view-${viewId}`);
    if (active) {
      active.classList.add("active-view");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function switchVerticalTab(vertKey, el) {
    document.querySelectorAll(".vertical-tab").forEach((node) => node.classList.remove("active-tab"));
    if (el) el.classList.add("active-tab");

    const table = {
      cpas: {
        title: "CPA & Accounting Solutions",
        sub: "Enable clear capital conversations while protecting client trust.",
        points: [
          "Use co-branded scorecards to pre-organize funding conversations.",
          "Route clients into compliant educational paths before submissions.",
          "Preserve attribution with static query-parameter tracking."
        ],
        scenarios: ["Tax season cash cycles", "Debt cleanup planning", "Equipment planning"]
      },
      "real-estate": {
        title: "Real Estate Professionals",
        sub: "Help operators evaluate capital readiness before deals stall.",
        points: [
          "Use the pre-flight checklist before presenting capital paths.",
          "Share caution flags and expected documentation early.",
          "Keep all partner links tracked without backend infrastructure."
        ],
        scenarios: ["Fix/flip planning", "Bridge liquidity", "DSCR review prep"]
      },
      ecommerce: {
        title: "Ecommerce Consultants",
        sub: "Prepare sellers for inventory and ad-cycle capital conversations.",
        points: [
          "Map growth capital pathways to performance windows.",
          "Use readiness scores to reduce poor-fit submissions.",
          "Share embed tools across partner channels."
        ],
        scenarios: ["Inventory growth", "Ad spend cycles", "Marketplace expansion"]
      }
    };

    const data = table[vertKey] || table.cpas;
    const box = document.getElementById("vertical-content-box");
    if (!box) return;
    const points = data.points.map((p) => `<li style="margin-bottom:12px; list-style:none;">${p}</li>`).join("");
    const scenarios = data.scenarios.map((s) => `<div class="scenario-pill"><span>${s}</span></div>`).join("");

    box.innerHTML = `
      <div class="vertical-layout">
        <div>
          <span class="badge badge-gold" style="margin-bottom:20px;">Recruiting Partners</span>
          <h3 style="font-family:var(--font-heading); font-size:32px; text-transform:uppercase; margin-bottom:14px;">${data.title}</h3>
          <p style="font-size:16px; color:var(--text-muted); margin-bottom:20px; border-left:6px solid var(--vivid-pink); padding-left:12px;">${data.sub}</p>
          <ul style="margin-bottom:20px;">${points}</ul>
          <a href="/partners/apply/" class="btn btn-primary" data-track-url data-utm-content="vertical-apply">Apply as Partner</a>
        </div>
        <div>
          <h4 style="margin-bottom:12px; color:var(--vivid-yellow); text-transform:uppercase;">Common Scenarios</h4>
          <div class="scenario-pill-grid">${scenarios}</div>
        </div>
      </div>
    `;
  }

  function toggleFaq(btn) {
    const item = btn.parentElement;
    const panel = item.querySelector(".faq-panel");
    const active = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach((node) => {
      node.classList.remove("active");
      node.querySelector(".faq-panel")?.style.setProperty("max-height", null);
      node.querySelector(".faq-trigger")?.setAttribute("aria-expanded", "false");
    });
    if (!active) {
      item.classList.add("active");
      if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
      btn.setAttribute("aria-expanded", "true");
    }
  }

  window.switchSessionPartner = switchSessionPartner;
  window.switchView = switchView;
  window.copyAttributedURL = copyAttributedURL;
  window.getActiveTallyUrl = getActiveTallyUrl;
  window.switchVerticalTab = switchVerticalTab;
  window.toggleFaq = toggleFaq;
  window.updateLiveSimulator = updateLiveSimulator;

  document.addEventListener("DOMContentLoaded", () => {
    const picker = document.getElementById("partner-session-select");
    const stored = window.getStoredAttribution ? window.getStoredAttribution() : {};
    const candidate = stored.partner && allPartners.find((p) => p.partnerSlug === stored.partner) ? stored.partner : (picker ? picker.value : "jane-smith");
    switchSessionPartner(candidate || "jane-smith");
    if (document.getElementById("directory-cards-container") && window.renderFundingDirectory) {
      window.renderFundingDirectory("all");
    }
    const firstVertical = document.querySelector(".vertical-tab");
    if (firstVertical) switchVerticalTab("cpas", firstVertical);
  });
})();

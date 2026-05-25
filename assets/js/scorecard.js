(function () {
  function scoreTier(score) {
    if (score >= 80) return "Highly Fundable";
    if (score >= 65) return "Fundable, But Needs Review";
    if (score >= 45) return "Possible Fit for Select Programs";
    return "Not Ready Yet - But Fixable";
  }

  function calculateScore(input) {
    const p = input || {};
    const baseScore =
      Number(p.monthlyRevenue || 0) +
      Number(p.timeInBusiness || 0) +
      Number(p.creditTier || 0) +
      Number(p.bankActivity || 0) +
      Number(p.businessStructure || 0) +
      Number(p.fundingPurpose || 0);

    const flags = p.redFlags || {};
    let penalty = 0;
    if (flags.openBankruptcy) penalty -= 25;
    if (flags.recentTaxLien) penalty -= 15;
    if (flags.recentMissedPayments) penalty -= 10;
    if (flags.recentNsfs) penalty -= 10;
    if (flags.newBusinessAccount) penalty -= 8;
    if (flags.existingMca) penalty -= 10;
    if (flags.suspendedMarketplace) penalty -= 15;
    if (flags.noCurrentRevenue) penalty -= 20;

    const score = Math.max(0, Math.min(100, baseScore + penalty));

    const strengths = [];
    if (Number(p.monthlyRevenue || 0) >= 15) strengths.push("Revenue profile supports broader review paths.");
    if (Number(p.timeInBusiness || 0) >= 12) strengths.push("Operating history shows stability.");
    if (Number(p.creditTier || 0) >= 16) strengths.push("Credit profile may support additional options.");

    const risks = Object.entries(flags)
      .filter(([, enabled]) => enabled)
      .map(([key]) => key.replace(/([A-Z])/g, " $1").toLowerCase());

    let recommendedFundingFamilies = ["Business credit builder", "Document checklist", "Partner readiness support"];
    if (score >= 80) {
      recommendedFundingFamilies = ["Revenue advance", "Business line access", "Structured growth loan path"];
    } else if (score >= 65) {
      recommendedFundingFamilies = ["Working capital review", "Line access review", "Structured growth review"];
    } else if (score >= 45) {
      recommendedFundingFamilies = ["Select program review", "Business credit builder", "Pre-flight checklist"];
    }

    return {
      score,
      scoreTier: scoreTier(score),
      recommendedFundingFamilies,
      risks,
      strengths,
      nextSteps: [
        "Review required documentation and clean up caution flags where possible.",
        "Use the document checklist before requesting a routing conversation.",
        "Share your readiness summary with a Moonshine Capital partner route."
      ],
      partnerAttribution: p.partnerAttribution || {},
      disclaimer:
        "This scorecard is for educational and readiness guidance only. It is not an approval, offer of credit, commitment to lend, or guarantee of funding."
    };
  }

  const state = { currentStep: 1, totalSteps: 6, answers: {}, redFlags: {} };

  function setProgress() {
    const pct = Math.round((state.currentStep / state.totalSteps) * 100);
    const labels = [
      "Category 1 of 6: Revenue",
      "Category 2 of 6: Time in Business",
      "Category 3 of 6: Credit Profile",
      "Category 4 of 6: Bank Activity",
      "Category 5 of 6: Business Structure",
      "Category 6 of 6: Funding Purpose"
    ];
    const pctEl = document.getElementById("scorecard-pct");
    const fillEl = document.getElementById("scorecard-progress");
    const labelEl = document.getElementById("scorecard-step-label");
    if (pctEl) pctEl.textContent = `${pct}%`;
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (labelEl) labelEl.textContent = labels[state.currentStep - 1] || labels[labels.length - 1];
  }

  function showStep(step) {
    document.querySelectorAll(".scorecard-step").forEach((x) => x.classList.remove("step-active"));
    const current = document.querySelector(`.scorecard-step[data-step="${step}"]`);
    if (current) current.classList.add("step-active");
    setProgress();
  }

  function selectScoreOption(step, value, choiceLabel) {
    state.answers[step] = Number(value);
    const stepEl = document.querySelector(`.scorecard-step[data-step="${step}"]`);
    if (stepEl) {
      stepEl.querySelectorAll(".option-button").forEach((btn) => {
        btn.classList.toggle("selected", btn.textContent.trim() === choiceLabel);
      });
    }
    if (state.currentStep < state.totalSteps) nextScoreStep();
  }

  function nextScoreStep() {
    if (state.currentStep < state.totalSteps) {
      state.currentStep += 1;
      showStep(state.currentStep);
      return;
    }
    const lead = document.getElementById("scorecard-lead-capture");
    const nav = document.getElementById("scorecard-nav-group");
    if (lead) {
      document.querySelectorAll(".scorecard-step").forEach((x) => x.classList.remove("step-active"));
      lead.classList.add("step-active");
      if (nav) nav.style.display = "none";
    }
  }

  function prevScoreStep() {
    if (state.currentStep <= 1) return;
    state.currentStep -= 1;
    showStep(state.currentStep);
  }

  function collectRedFlagsFromForm() {
    const ids = {
      "flag-open-bankruptcy": "openBankruptcy",
      "flag-tax-lien": "recentTaxLien",
      "flag-missed-payments": "recentMissedPayments",
      "flag-nsfs": "recentNsfs",
      "flag-new-bank": "newBusinessAccount",
      "flag-existing-mca": "existingMca",
      "flag-suspended-market": "suspendedMarketplace",
      "flag-no-revenue": "noCurrentRevenue"
    };
    const out = {};
    Object.entries(ids).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) out[key] = el.checked;
    });
    return out;
  }

  function processScorecardLead() {
    const name = document.getElementById("lead-name");
    const email = document.getElementById("lead-email");
    const consent = document.getElementById("lead-consent");
    if (name && !name.value.trim()) return alert("Please provide your name.");
    if (email && !email.value.trim()) return alert("Please provide your email.");
    if (consent && !consent.checked) return alert("Please confirm consent to continue.");

    state.redFlags = collectRedFlagsFromForm();

    const result = calculateScore({
      businessType: document.getElementById("business-type")?.value || "",
      monthlyRevenue: state.answers[1],
      timeInBusiness: state.answers[2],
      creditTier: state.answers[3],
      bankActivity: state.answers[4],
      businessStructure: state.answers[5],
      fundingPurpose: state.answers[6],
      desiredFundingAmount: document.getElementById("desired-funding-amount")?.value || "",
      redFlags: state.redFlags,
      partnerAttribution: window.getStoredAttribution ? window.getStoredAttribution() : {}
    });

    document.getElementById("scorecard-lead-capture")?.classList.remove("step-active");
    document.getElementById("scorecard-results-screen")?.classList.add("step-active");

    const stored = window.getStoredAttribution ? window.getStoredAttribution() : {};
    const resultMap = {
      "result-score-val": `${result.score}`,
      "result-tier": result.scoreTier,
      "result-desc": result.disclaimer,
      "result-path": result.recommendedFundingFamilies.join(", "),
      "result-attribution": stored.partner_name || "Direct"
    };
    Object.entries(resultMap).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });

    const circle = document.getElementById("gauge-progress-bar");
    if (circle) {
      const r = 80;
      const c = 2 * Math.PI * r;
      circle.style.strokeDashoffset = c - (result.score / 100) * c;
    }

    const output = document.getElementById("scorecard-json-output");
    if (output) output.textContent = JSON.stringify(result, null, 2);
  }

  function resetNativeScorecard() {
    state.currentStep = 1;
    state.answers = {};
    state.redFlags = {};
    document.querySelectorAll(".option-button").forEach((x) => x.classList.remove("selected"));
    document.querySelectorAll(".scorecard-step").forEach((x) => x.classList.remove("step-active"));
    document.querySelector('.scorecard-step[data-step="1"]')?.classList.add("step-active");
    const nav = document.getElementById("scorecard-nav-group");
    if (nav) nav.style.display = "flex";
    setProgress();
  }

  function toggleScorecardMode(mode) {
    const native = document.getElementById("native-scorecard-container");
    const iframe = document.getElementById("iframe-scorecard-container");
    if (!native || !iframe) return;
    const showNative = mode === "native";
    native.style.display = showNative ? "block" : "none";
    iframe.style.display = showNative ? "none" : "block";
  }

  function hydrateStandaloneScorecard() {
    const form = document.getElementById("standalone-scorecard-form");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const result = calculateScore({
        businessType: data.get("businessType"),
        monthlyRevenue: Number(data.get("monthlyRevenue") || 0),
        timeInBusiness: Number(data.get("timeInBusiness") || 0),
        creditTier: Number(data.get("creditTier") || 0),
        bankActivity: Number(data.get("bankActivity") || 0),
        businessStructure: Number(data.get("businessStructure") || 0),
        fundingPurpose: Number(data.get("fundingPurpose") || 0),
        desiredFundingAmount: data.get("desiredFundingAmount"),
        redFlags: {
          openBankruptcy: !!data.get("openBankruptcy"),
          recentTaxLien: !!data.get("recentTaxLien"),
          recentMissedPayments: !!data.get("recentMissedPayments"),
          recentNsfs: !!data.get("recentNsfs"),
          newBusinessAccount: !!data.get("newBusinessAccount"),
          existingMca: !!data.get("existingMca"),
          suspendedMarketplace: !!data.get("suspendedMarketplace"),
          noCurrentRevenue: !!data.get("noCurrentRevenue")
        },
        partnerAttribution: window.getStoredAttribution ? window.getStoredAttribution() : {}
      });
      document.getElementById("standalone-score").textContent = `${result.score}`;
      document.getElementById("standalone-tier").textContent = result.scoreTier;
      document.getElementById("standalone-families").textContent = result.recommendedFundingFamilies.join(", ");
      document.getElementById("standalone-risks").textContent = result.risks.join(", ") || "No major red flags selected.";
      document.getElementById("standalone-strengths").textContent = result.strengths.join(", ") || "Build additional readiness markers.";
      document.getElementById("standalone-next").textContent = result.nextSteps.join(" ");
      document.getElementById("standalone-disclaimer").textContent = result.disclaimer;
    });
  }

  window.calculateScore = calculateScore;
  window.toggleScorecardMode = toggleScorecardMode;
  window.selectScoreOption = selectScoreOption;
  window.nextScoreStep = nextScoreStep;
  window.prevScoreStep = prevScoreStep;
  window.processScorecardLead = processScorecardLead;
  window.resetNativeScorecard = resetNativeScorecard;

  document.addEventListener("DOMContentLoaded", () => {
    setProgress();
    hydrateStandaloneScorecard();
  });
})();

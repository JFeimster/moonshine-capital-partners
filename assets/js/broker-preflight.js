(function () {
  function evaluatePreflight(data) {
    let reviewFlags = 0;
    let routeFlags = 0;

    if (Number(data.monthlyRevenue || 0) < 10000) reviewFlags += 1;
    if (Number(data.timeInBusiness || 0) < 6) reviewFlags += 1;
    if (data.bankStatements !== "yes") reviewFlags += 1;
    if (data.existingAdvances === "multiple") reviewFlags += 1;
    if (data.recentNsfs === "yes") reviewFlags += 1;
    if (data.taxLiens === "yes") routeFlags += 1;
    if (data.bankruptcy === "yes") routeFlags += 1;
    if (data.industryRisk === "yes") routeFlags += 1;

    if (routeFlags > 0 || reviewFlags >= 3) return "route for review";
    if (reviewFlags > 0) return "review needed";
    return "possible fit";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("preflight-form");
    const output = document.getElementById("preflight-output");
    if (!form || !output) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fd = new FormData(form);
      const result = evaluatePreflight({
        monthlyRevenue: fd.get("monthlyRevenue"),
        timeInBusiness: fd.get("timeInBusiness"),
        bankStatements: fd.get("bankStatements"),
        existingAdvances: fd.get("existingAdvances"),
        recentNsfs: fd.get("recentNsfs"),
        taxLiens: fd.get("taxLiens"),
        bankruptcy: fd.get("bankruptcy"),
        industryRisk: fd.get("industryRisk")
      });
      output.textContent = `${result}\n\nThis is a broker pre-flight signal, not a funding decision, approval, credit outcome, or offer. Route the file with notes and documents for review.`;
    });
  });
})();

(function () {
  function getSuggestedLane(useOfFunds) {
    const laneMap = {
      workingCapital: "Moonshine Capital Revenue Advance Program",
      lineAccess: "Moonshine Capital Business Line Access Solution",
      equipment: "Moonshine Capital Equipment Finance Solution",
      realEstate: "Moonshine Capital Real Estate Capital Track",
      growth: "Moonshine Capital Structured Growth Loan Path"
    };
    return laneMap[useOfFunds] || "Moonshine Capital Business Credit Builder Path";
  }

  function evaluatePreflight(data) {
    let reviewFlags = 0;
    const cautionFlags = [];

    if (Number(data.monthlyRevenue || 0) < 10000) {
      reviewFlags += 1;
      cautionFlags.push("Lower monthly revenue consistency");
    }
    if (Number(data.timeInBusiness || 0) < 6) {
      reviewFlags += 1;
      cautionFlags.push("Short time in business");
    }
    if (data.bankStatements !== "yes") {
      reviewFlags += 1;
      cautionFlags.push("Bank statements not ready");
    }
    if (data.existingAdvances === "multiple") {
      reviewFlags += 1;
      cautionFlags.push("Multiple existing advances");
    }
    if (data.recentNsfs === "yes") {
      reviewFlags += 1;
      cautionFlags.push("Recent NSF activity");
    }
    if (data.taxLiens === "yes") cautionFlags.push("Tax liens need review");
    if (data.bankruptcy === "yes") cautionFlags.push("Bankruptcy item needs review");
    if (data.industryRisk === "yes") cautionFlags.push("Industry requires additional review");

    let status = "possible fit";
    if (cautionFlags.length >= 3 || data.taxLiens === "yes" || data.bankruptcy === "yes") status = "route for review";
    else if (reviewFlags > 0 || cautionFlags.length > 0) status = "review needed";

    return {
      status,
      lane: getSuggestedLane(data.useOfFunds),
      cautionFlags
    };
  }

  function renderOutput(result, output) {
    const cautionText = result.cautionFlags.length ? result.cautionFlags.join(", ") : "No immediate caution flags selected.";
    output.textContent =
`Result: ${result.status}
Suggested Moonshine funding lane: ${result.lane}
Caution flags: ${cautionText}

This is a routing aid only. Use possible fit, review needed, or route for review language and send the file for manual review with notes and documents.`;
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
        useOfFunds: fd.get("useOfFunds"),
        existingAdvances: fd.get("existingAdvances"),
        recentNsfs: fd.get("recentNsfs"),
        taxLiens: fd.get("taxLiens"),
        bankruptcy: fd.get("bankruptcy"),
        industryRisk: fd.get("industryRisk")
      });
      renderOutput(result, output);
    });
  });
})();

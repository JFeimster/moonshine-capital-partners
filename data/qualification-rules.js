window.qualificationRules = {
  tiers: [
    { min: 80, label: "Highly Fundable" },
    { min: 65, label: "Fundable, But Needs Review" },
    { min: 45, label: "Possible Fit for Select Programs" },
    { min: 0, label: "Not Ready Yet - But Fixable" }
  ],
  penalties: {
    openBankruptcy: -25,
    recentTaxLien: -15,
    recentMissedPayments: -10,
    recentNsfs: -10,
    newBusinessAccount: -8,
    existingMca: -10,
    suspendedMarketplace: -15,
    noCurrentRevenue: -20
  }
};

(function () {
  function renderFundingDirectory(filter) {
    const container = document.getElementById("directory-cards-container");
    if (!container) return;
    const list = (window.fundingTypes || []).filter((item) => {
      if (filter === "all") return true;
      if (filter === "asset") {
        return ["real-estate", "equipment", "marketplace"].includes(item.cardSlug);
      }
      return item.cardSlug === filter || item.slug === filter;
    });

    container.innerHTML = list.map((item) => `
      <article class="funding-detail-card" aria-label="${item.publicName}">
        <div class="card-meta-row">
          <span>${item.publicName}</span>
          <span class="badge badge-gold" style="font-size:9px;">STATIC TRACKED</span>
        </div>
        <h3>${item.publicName}</h3>
        <div class="detail-section"><strong>Best Fit:</strong><p>${item.bestFit}</p></div>
        <div class="detail-section"><strong>Use Cases:</strong><p>${item.commonUseCases.join(", ")}</p></div>
        <div class="detail-section"><strong>Readiness Markers:</strong><p>${item.readinessMarkers.join(", ")}</p></div>
        <div class="detail-section"><strong>Typical Documents:</strong><p>${item.typicalDocuments.join(", ")}</p></div>
        <div class="detail-section"><strong>Caution Flags:</strong><p>${item.cautionFlags.join(", ")}</p></div>
        <p><strong>Speed Expectation:</strong> ${item.speedExpectation}</p>
        <a class="btn btn-primary" href="/funding/${item.slug}/" data-track-url data-utm-content="funding-directory">View Path</a>
      </article>
    `).join("");

    window.appendTrackingToLinks && window.appendTrackingToLinks();
  }

  function filterDirectory(cat, el) {
    document.querySelectorAll(".filter-pill").forEach((btn) => btn.classList.remove("active-pill"));
    if (el) el.classList.add("active-pill");
    renderFundingDirectory(cat);
  }

  window.renderFundingDirectory = renderFundingDirectory;
  window.filterDirectory = filterDirectory;

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("directory-cards-container")) renderFundingDirectory("all");
  });
})();

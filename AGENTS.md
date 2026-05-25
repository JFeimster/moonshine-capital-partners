# Moonshine Capital Partners — Agent Instructions

## Project Identity

Repository: `moonshine-capital-partners`  
Working product name: **Moonshine Capital Referral OS**  
Live site: `https://moonshine-capital-partners.vercel.app/`

This is a static, GitHub/Vercel-ready referral and partner site for Moonshine Capital. The repo is intentionally static-first: HTML, CSS, vanilla JavaScript, and local data files.

## Product Goal

Build and maintain a static partner-powered funding referral system with co-branded partner lead pages, funding-readiness tools, partner attribution links, funding-path education pages, vertical-specific partner recruitment pages, compliance-safe partner marketing resources, and static dashboard/tool simulations where appropriate.

## Core Architecture

Primary folders:

```text
/
  index.html
  style.css
  script.js

/assets/
  css/
  js/
  images/
  logos/
  downloads/

/data/
  config.js
  partners.js
  funding-types.js
  tools.js
  verticals.js
  compliance-rules.js
  cta-map.js
  qualification-rules.js

/partners/
/brokers/
/affiliates/
/funding/
/tools/
/verticals/
/compliance/
```

## Static-First Rules

Do not add backend services, authentication, databases, paid dependencies, or framework migrations unless explicitly requested. Prefer plain HTML, CSS, vanilla JavaScript, static local data files, direct-load `index.html` route folders, and Vercel static deployment compatibility.

## Design System

Preserve the current Moonshine visual identity: dark neo-brutalist fintech, dark grid background, vivid yellow/cyan/pink/green accents, thick white borders, offset shadows, uppercase headings, dashboard cards, high-contrast CTA buttons, and sharp founder/operator energy. Do not redesign into generic SaaS minimalism.

## Tracking Requirements

Partner attribution is core. Preserve these query parameters across internal links, CTAs, embedded tools, and external links where possible:

```text
ref
partner
partner_name
partner_type
utm_source
utm_medium
utm_campaign
utm_content
```

Use helpers in `/assets/js/tracking.js` such as `readQueryParams()`, `storeAttribution()`, `getStoredAttribution()`, `buildTrackedUrl()`, `appendTrackingToLinks()`, `copyReferralLink()`, `buildTallyUrl()`, `buildToolEmbedUrl()`, and `mergeTrackingParams()`.

All important CTAs should use `data-track-url` where relevant.

## Compliance Rules

Never introduce claims that imply guaranteed funding, guaranteed approval, guaranteed income, guaranteed commissions, guaranteed credit outcomes, risk-free outcomes, or specific rates/terms/funding timelines unless clearly labeled as examples.

Use safe language: “possible fit,” “review needed,” “route for review,” “funding-readiness guidance,” “may help prepare,” and “options depend on eligibility, documentation, underwriting, and provider requirements.”

Avoid unsafe language: “approved,” “qualified,” “pre-approved,” “guaranteed,” “get funded today,” and “no credit impact.”

Required funding disclaimer:

> Moonshine Capital does not guarantee funding, approvals, credit outcomes, revenue, partner compensation, or specific financial results. All funding options are subject to eligibility, underwriting, lender requirements, documentation, business profile, industry, location, and other factors. This site is for educational and referral purposes only and does not provide legal, tax, or financial advice.

Required referral disclosure:

> Referral Disclosure: This page may be associated with a Moonshine Capital referral partner, affiliate, broker, or strategic partner. The referring partner may receive compensation, credit, or recognition for qualified referrals. Referral attribution does not affect eligibility, underwriting, funding decisions, or available options.

## Testing Commands

Local static server:

```powershell
python -m http.server 5500
```

JavaScript syntax check:

```powershell
Get-ChildItem assets\js\*.js | ForEach-Object { node --check $_.FullName }
```

Check route folders missing `index.html`:

```powershell
Get-ChildItem -Recurse -Directory partners,brokers,affiliates,funding,tools,verticals,compliance | ForEach-Object {
  if (!(Test-Path "$($_.FullName)\index.html")) { $_.FullName }
}
```

Risky language scan:

```powershell
Select-String -Path *.html,partners\*\index.html,brokers\*\index.html,affiliates\*\index.html,funding\*\index.html,tools\*\index.html,verticals\*\index.html,compliance\*\index.html,assets\js\*.js,data\*.js -Pattern "guaranteed approval|guaranteed funding|pre-approved|guaranteed commissions|guaranteed income|get funded today|no credit impact" -CaseSensitive:$false
```

Matches inside `/compliance/forbidden-claims/` are acceptable only when clearly labeled as “Do not say.”

## Task Style

When making changes: inspect existing files first, make small focused changes, preserve the visual style, preserve static deployment compatibility, avoid breaking the root homepage, prefer direct-load route folders, keep data centralized in `/data`, keep reusable behavior in `/assets/js`, run syntax checks, and summarize changed files plus testing performed.

## Priority Roadmap

1. Post-route QA and polish
2. Add `/sitemap.html`
3. Add `/robots.txt`
4. Improve README route checklist
5. Verify direct-load pages
6. Confirm tracking links
7. Review compliance language
8. Improve tool pages without adding backend requirements

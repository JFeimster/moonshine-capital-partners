# Jules Instructions — Moonshine Capital Partners

## Purpose

Use Jules as an asynchronous coding agent for the `moonshine-capital-partners` repository.

Repository:

```text
https://github.com/JFeimster/moonshine-capital-partners
```

Live deployment:

```text
https://moonshine-capital-partners.vercel.app/
```

Working project name:

```text
Moonshine Capital Referral OS
```

## What Jules Should Do

Jules should help complete focused static-site tasks such as route QA, static page creation, link validation, tracking-parameter preservation, README updates, sitemap/robots creation, compliance copy review, JavaScript syntax checks, static tool improvements, direct-load route verification, and small UI polish that preserves the current design system.

## What Jules Should Not Do

Jules should not add backend services, authentication, databases, payment processors, build tools, paid dependencies, large framework migrations, or claims that imply guaranteed funding, approvals, income, commissions, or credit outcomes.

## Repo Context

This is a static-first HTML/CSS/JS site with local data files.

Important folders:

```text
/assets/css/
/assets/js/
/data/
/partners/
/brokers/
/affiliates/
/funding/
/tools/
/verticals/
/compliance/
```

Important files:

```text
index.html
style.css
script.js
data/config.js
data/partners.js
data/funding-types.js
data/tools.js
data/verticals.js
data/compliance-rules.js
assets/js/tracking.js
assets/js/scorecard.js
assets/js/funding-directory.js
assets/js/link-builder.js
assets/js/widget-builder.js
assets/js/forms.js
assets/js/core.js
```

## Visual Style to Preserve

Keep the existing dark neo-brutalist fintech visual system with thick borders, offset shadows, bright accent colors, dashboard-style cards, high-contrast buttons, and uppercase operator-focused copy.

## Required QA

For most tasks, Jules should run or verify:

```powershell
Get-ChildItem assets\js\*.js | ForEach-Object { node --check $_.FullName }
```

If adding route pages, Jules should verify every created route has an `index.html`.

If changing links or CTAs, Jules should verify `data-track-url` usage where relevant.

## Local Test Command

```powershell
python -m http.server 5500
```

Key routes:

```text
/partners/
/partners/jane-smith/
/partners/marcus-vance/
/brokers/pre-flight/
/affiliates/
/funding/
/funding/working-capital/
/tools/funding-readiness-scorecard/
/tools/link-builder/
/tools/widget-builder/
/tools/commission-modeler/
/verticals/cpas/
/compliance/
/compliance/forbidden-claims/
```

## Safe Language Rules

Use “possible fit,” “review needed,” “route for review,” “funding-readiness guidance,” and “options depend on eligibility and underwriting.”

Avoid “approved,” “qualified,” “pre-approved,” “guaranteed,” “get funded today,” “no credit impact,” “guaranteed commissions,” and “guaranteed income.”

## Recommended Jules Task Format

```text
Repo: JFeimster/moonshine-capital-partners
Branch: main

Task:
[Clear task title]

Context:
[What is already done and what should not be changed]

Requirements:
- [Specific requirement]
- [Specific requirement]
- [Specific requirement]

Do not:
- Add backend/auth/database
- Redesign the visual system
- Add risky financial claims

Validation:
- Run node --check on assets/js
- Verify direct-load routes
- Summarize changed files
```

## Recommended Next Scheduled Task

Use the prompt in `skills.md` under:

```text
Scheduled Task: Post-route QA and deployment hygiene
```

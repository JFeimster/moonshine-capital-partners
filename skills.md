# Skills — Moonshine Capital Partners Agent Tasks

## Skill 1: Static Route QA

Use this skill when verifying that route folders load directly.

Checklist:
- Confirm every folder under `/partners`, `/brokers`, `/affiliates`, `/funding`, `/tools`, `/verticals`, and `/compliance` has `index.html`.
- Confirm direct-load routes use correct relative paths.
- Confirm pages link to global CSS and required JS/data files.
- Confirm primary CTAs use `data-track-url` where relevant.
- Confirm parent/back links work.
- Confirm no route requires a backend.

Command:

```powershell
Get-ChildItem -Recurse -Directory partners,brokers,affiliates,funding,tools,verticals,compliance | ForEach-Object {
  if (!(Test-Path "$($_.FullName)\index.html")) { $_.FullName }
}
```

## Skill 2: JavaScript Safety Check

Use this after changing any file in `/assets/js`.

```powershell
Get-ChildItem assets\js\*.js | ForEach-Object { node --check $_.FullName }
```

Expected result: no syntax errors.

## Skill 3: Partner Attribution QA

Use this after changing links, CTAs, partner pages, tools, or forms.

Required parameters:

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

Check that incoming query params are stored, internal links preserve attribution, Tally/Get Funded links preserve attribution, tool links preserve attribution, copy-link buttons preserve attribution, and CTAs use `data-track-url` where relevant.

Important file:

```text
/assets/js/tracking.js
```

## Skill 4: Compliance Copy Review

Use this before committing funding, partner, affiliate, broker, or compensation-related pages.

Risky claims to avoid:

```text
guaranteed approval
guaranteed funding
pre-approved
guaranteed commissions
guaranteed income
get funded today
no credit impact
```

Scan command:

```powershell
Select-String -Path *.html,partners\*\index.html,brokers\*\index.html,affiliates\*\index.html,funding\*\index.html,tools\*\index.html,verticals\*\index.html,compliance\*\index.html,assets\js\*.js,data\*.js -Pattern "guaranteed approval|guaranteed funding|pre-approved|guaranteed commissions|guaranteed income|get funded today|no credit impact" -CaseSensitive:$false
```

Matches are acceptable inside the compliance forbidden-claims page only when clearly marked as “Do not say.”

## Skill 5: README and Deployment Hygiene

Use this when improving repo docs and Vercel readiness.

README should include project overview, folder structure, local test command, key routes to test, how tracking works, how to update `data/config.js`, how to add a partner, how to add a funding path, how to add a vertical page, Vercel deployment notes, and compliance language requirements.

Useful files to add:

```text
/sitemap.html
/robots.txt
```

## Skill 6: Tool Page Enhancement

Use this when improving pages under `/tools`.

Rules:
- Keep tools static.
- Do not add backend services.
- Do not collect sensitive info unless using an external form placeholder.
- Make tool outputs educational.
- Preserve partner attribution.
- Add disclaimers where funding or compensation is mentioned.

Priority pages:
`/tools/funding-readiness-scorecard/`, `/tools/link-builder/`, `/tools/widget-builder/`, `/tools/document-checklist/`, `/tools/book-call/`, `/tools/commission-modeler/`.

## Scheduled Task: Post-route QA and Deployment Hygiene

Use this prompt for Jules.

```text
Repo: JFeimster/moonshine-capital-partners
Branch: main

Task:
Post-route QA and deployment hygiene for Moonshine Capital Referral OS.

Context:
The static route map has been created. Direct-load pages now exist across partners, brokers, affiliates, funding, tools, verticals, and compliance. The site is static HTML/CSS/JS and deploys through Vercel. Preserve the current neo-brutalist fintech visual identity.

Requirements:
1. Inspect all direct-load route pages under:
   - /
   - /partners/
   - /partners/jane-smith/
   - /partners/marcus-vance/
   - /brokers/
   - /brokers/pre-flight/
   - /affiliates/
   - /funding/
   - /tools/
   - /tools/funding-readiness-scorecard/
   - /tools/link-builder/
   - /tools/widget-builder/
   - /tools/commission-modeler/
   - /verticals/
   - /verticals/cpas/
   - /compliance/

2. Ensure every page has:
   - Correct relative paths to CSS
   - Correct relative paths to data JS
   - Correct relative paths to assets JS
   - No broken internal navigation links
   - No broken parent/back links
   - A primary CTA using data-track-url where relevant
   - Proper title and meta description
   - Required funding/referral disclaimer where relevant

3. Add `/sitemap.html` listing major routes grouped by:
   - Partner Program
   - Brokers
   - Affiliates
   - Funding Paths
   - Tools
   - Verticals
   - Compliance

4. Add `/robots.txt` with:

   User-agent: *
   Allow: /

   Sitemap: https://moonshine-capital-partners.vercel.app/sitemap.html

5. Update `README.md` with:
   - How to test locally
   - Key routes to verify
   - How to confirm attribution parameters
   - How to update Tally form ID
   - How to add a new partner page
   - How to add a new funding path
   - How to deploy through Vercel

6. Run JavaScript syntax checks:

   Get-ChildItem assets\js\*.js | ForEach-Object { node --check $_.FullName }

7. Scan for risky claims:

   Select-String -Path *.html,partners\*\index.html,brokers\*\index.html,affiliates\*\index.html,funding\*\index.html,tools\*\index.html,verticals\*\index.html,compliance\*\index.html,assets\js\*.js,data\*.js -Pattern "guaranteed approval|guaranteed funding|pre-approved|guaranteed commissions|guaranteed income|get funded today|no credit impact" -CaseSensitive:$false

Do not:
- Add backend, auth, database, or paid dependencies.
- Redesign the visual system.
- Introduce risky financial, approval, or compensation claims.

Acceptance Criteria:
- Site still works locally with `python -m http.server 5500`.
- Every major route loads directly.
- `/sitemap.html` exists.
- `/robots.txt` exists.
- `README.md` has local QA and deployment instructions.
- JS syntax checks pass.
- Risky language is only present in compliance forbidden-claims context.
- Attribution links preserve tracking via `data-track-url` where applicable.
```

## Schedule Note

Task title:

```text
6:33 PM — Moonshine Referral OS Post-route QA
```

Task body:

```text
Use the task in skills.md: “Scheduled Task: Post-route QA and Deployment Hygiene.”
```

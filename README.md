# Moonshine Capital Partners

## How to Test Locally
Run a local static server:
```bash
python -m http.server 5500
```

## Key Routes to Verify
- `/`
- `/partners/jane-smith/`
- `/brokers/pre-flight/`
- `/tools/funding-readiness-scorecard/`
- `/tools/funding-intelligence-engine/`
- `/tools/widget-builder/`
- `/compliance/`

## Funding Intelligence Engine Public Tool

Route: `/tools/funding-intelligence-engine/`

The Funding Intelligence Engine public tool is a static partner-facing borrower intake and readiness utility. It collects profile signals, calculates a readiness score, classifies a borrower archetype, routes to white-labeled funding families, and creates a CRM-ready analyst payload.

The route uses sanitized files from `/data/fie/`. It intentionally keeps detailed provider research, private operating notes, full internal prompt systems, and raw source files out of this public partner site.

The tool can be embedded through `/tools/widget-builder/` using the Funding Intelligence Engine option. Generated embeds preserve referral and UTM parameters.

## How to Confirm Attribution Parameters
Ensure internal links preserve required parameters like: `ref`, `partner`, `partner_name`, `partner_type`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` as defined in `skills.md`. Check the URL query parameters when navigating.

## How to Update Tally Form ID
Find `YOUR_TALLY_FORM_ID` in the codebase (e.g. `data/config.js` or `index.html`) and replace it with your actual form ID.

## How to Add a New Partner Page
Duplicate an existing partner folder, rename it to the new partner's slug, and update `index.html` with their details.

## How to Add a New Funding Path
Duplicate an existing funding folder, rename it, and update `index.html`.

## How to Deploy Through Vercel
Connect this repository to Vercel and deploy. Ensure the framework preset is set to "Other" (static).

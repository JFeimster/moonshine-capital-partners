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
- `/compliance/`

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

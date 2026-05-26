# FIE Public Tool Implementation Notes

Repo target: `JFeimster/moonshine-capital-partners`

Public route: `/tools/funding-intelligence-engine/`

## Public-safe data

```txt
/data/fie/
  app_config.json
  borrower_archetypes.json
  readiness_dimensions.json
  risk_flags.json
  routing_logic.public.json
  recommendation_weights.public.json
  products.public.json
  providers.public.json
  partner_fit_scoring.public.json
```

## Existing files patched

```txt
/data/config.js
/tools/widget-builder/index.html
/assets/js/widget-builder.js
/README.md
```

## Widget-builder target

```js
fieEngine: {
  path: "/tools/funding-intelligence-engine/",
  title: "Moonshine Capital Funding Intelligence Engine",
  defaultHeight: "980"
}
```

# Funding Intelligence Engine Public MVP

Route: `/tools/funding-intelligence-engine/`

This route adds a static public utility for borrower intake, readiness scoring, borrower archetype output, funding-family routing, recommended next steps, and a JSON payload panel for analyst or CRM handoff.

## Architecture

- Static HTML, CSS, and vanilla JavaScript
- No backend
- No database
- No framework migration
- Public-safe data under `/data/fie/`

## Integration hooks

The page stores the latest result at `window.fieMvpResult` and dispatches a `fieMvpCalculated` browser event after scoring.

# Cherry Credit Disclosure

Last updated: June 15, 2026

## Purpose

Cherry financing copy should reassure patients without overstating what happens after a patient confirms a payment plan. Use this guide whenever editing financing language, CTA modules, payment-plan pages, or static fallback content.

## Approved Copy

Shared copy lives in `src/constants/cherry.ts`.

Short reassurance:

> Checking options with Cherry does not impact your credit score.

Full disclosure:

> Checking options with Cherry uses a soft credit check and does not impact your credit score. If you choose and confirm a payment plan, Cherry may report payment activity to credit bureaus, so staying current on payments is important.

Terms reassurance:

> Plan availability, payment amounts, and terms are decided by Cherry and its lending partners.

## Placement Rules

- Use the short reassurance in compact CTAs, badges, highlights, and one-line footer strips.
- Use the full disclosure where patients are actively reviewing financing details, especially `/payment-plans/`, Cherry widget cards, and reusable financing sections.
- Keep "no hard credit check" only as short badge language, such as the homepage proof line.
- Do not use unqualified credit-check claims or any wording that implies active payment plans can never affect credit.
- Do not add Michael's older on-time-payments clause; it is less precise than the current disclosure.

## Required Coverage

The full disclosure should appear in these surfaces:

- `/payment-plans/` hero/supporting content and credit-score FAQ card
- Cherry widget preview/full cards
- `FinancingOptionsSection`
- Schedule Consultation financing module
- Smile Gallery financing module
- Static/no-JS Payment Plans HTML via `scripts/prerender-static.ts`

## Verification

Run these checks before deploying a Cherry copy change:

```sh
npm run lint
npm run test:content
npm run check:seo
npm run build
```

Then verify:

```sh
rg -n "remains\\s+that\\s+way|no\\s+credit\\s+check|No\\s+credit\\s+check|no\\s+credit\\s+checks|No\\s+credit\\s+checks|Checking\\s+your\\s+options" src scripts docs public dist README.md
rg -n "soft credit check|payment activity|Checking options with Cherry" dist/payment-plans/index.html
```

The first command should return no matches. The second should show the full disclosure in the built Payment Plans static HTML.

Manual route checks:

- `/payment-plans/`
- `/schedule-consultation/`
- `/smile-gallery/`
- `/services/`
- `/`

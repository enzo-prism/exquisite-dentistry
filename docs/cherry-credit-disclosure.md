# Cherry Credit Disclosure

Last updated: August 23, 2026

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

Floating widget copy:

> Pay over time
>
> No hard credit checks • 0% APR options

The floating-widget line is approved compact conversion copy, not a replacement for the full disclosure on financing-detail surfaces.

## Placement Rules

- Use the short reassurance in compact CTAs, badges, highlights, and one-line footer strips.
- Use the full disclosure where patients are actively reviewing financing details, especially `/payment-plans/`, Cherry widget cards, and reusable financing sections.
- Keep "no hard credit check" only as short badge language, such as the homepage proof line.
- Do not use unqualified credit-check claims or any wording that implies active payment plans can never affect credit.
- Do not add Michael's older on-time-payments clause; it is less precise than the current disclosure.

## Floating Widget Layout Contract

- Show the complete title and supporting line in the bottom-right Cherry launcher at every viewport size. Do not collapse the launcher to an icon-only button.
- Keep the standard launcher at 288px wide. Below 376px, use `min(288px, calc(100vw - 88px))` so the full copy can wrap without colliding with the bottom-left concierge.
- Allow the supporting line to wrap on narrow screens. Do not clip it, hide it, or apply an ellipsis.
- Keep the launcher above the mobile quick-action bar and below consent, navigation, and dialog overlays.
- A fixed launcher overlaying nearby headings or body copy while the visitor scrolls is expected. Do not shrink it, hide it, or add page padding solely to clear that overlay.
- Preserve a minimum 44px interactive target and verify 320px as the narrow-device regression case.

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

Responsive widget checks:

```sh
npx playwright test src/__tests__/cherry-widget.mobile.spec.ts --project=chromium --project=webkit --workers=2 --retries=0
```

Confirm the full floating copy is visible at 320px, 500px, and desktop widths, with no viewport overflow or overlap with the concierge and mobile quick actions.

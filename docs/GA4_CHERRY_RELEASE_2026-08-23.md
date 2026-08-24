# GA4 and Cherry release — August 23, 2026

## Release scope

This release combines two independently tested website changes:

- `0a4a875` rebuilds privacy-safe GA4 measurement, consent handling, SPA page views, first-touch attribution, and confirmed-success lead tracking.
- `c9abb27` restores the full Cherry floating-widget conversion copy on every device while preventing narrow-screen collisions.

The canonical production target is the `main` branch on the Vercel project `exquisite-dentistry`, served at `https://exquisitedentistryla.com`.

## GA4 website contract

- `G-1MZGF2XNB5` / property `498175984` is the canonical GA4 source of record.
- The unidentified `G-RECCC1K9GK` destination remains disabled. `G-2HKBYNRKYX` is not present in source.
- The app emits one manual, query-free `page_view` for the initial render and each completed React route change.
- `generate_lead` fires only after a real Formspree submission succeeds. Page visits, CTA clicks, invalid forms, failed forms, and honeypots are not leads.
- Analytics storage starts denied. Advertising storage, user data, and personalization remain denied. Vercel Analytics and Speed Insights require analytics consent.
- Localhost and preview hosts do not load production analytics vendors.
- User-entered values, full URLs, query strings, email-like or phone-like paths, exact financing amounts, and other high-cardinality values are excluded or redacted.

The detailed event schema and Admin checklist remain in `ga4-measurement-plan.md` and `ga4-audit-2026-08-23.md`.

## Cherry widget contract

The bottom-right launcher shows the complete compact copy on every device:

> Pay over time
>
> No hard credit checks • 0% APR options

The launcher is 288px wide on standard screens. On narrow mobile screens it uses `min(288px, calc(100vw - 88px))`, allowing the supporting line to wrap while reserving space for the bottom-left concierge. It must not collapse to icon-only, clip, or overlap the concierge or mobile quick actions.

This compact launcher copy does not replace the full financing disclosure required by `cherry-credit-disclosure.md` on financing-detail surfaces.

## Release gates

Before production:

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
git diff --check
```

After production:

```sh
npm run verify:prod
REDIRECT_TEST_BASE=https://exquisitedentistryla.com npm run test:redirects
```

Also verify that Vercel reports `READY` for the intended `main` commit, the apex domain serves that deployment, the Cherry copy is visible at desktop and mobile widths, and the public browser console has no release-related errors.

## External Admin work that remains separate

Website deployment does not complete the Google Analytics and Ads Admin cleanup. Before conversion reporting is trusted:

1. Remove the old Analytics custom event that converted `/contact` page views into `generate_lead`.
2. Mark only the confirmed-success website `generate_lead` as a key event.
3. Disable Enhanced Measurement browser-history page views so they do not duplicate manual SPA page views.
4. Resolve or remove the unidentified destination and linked secondary-property routing.
5. Link the canonical GA4 property to the correct Ads account and import `generate_lead` once.
6. Validate Realtime and DebugView after release, then treat the release date as the new reporting baseline.

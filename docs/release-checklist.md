# Release Checklist

# Preview handoff:
- Push the working branch and wait for the Vercel preview deployment to reach `READY`.
- Verify the preview reflects the latest branch commit before sharing it.
- If the raw preview URL is protected, generate a shareable `_vercel_share` link for client review.
- Smoke test the changed routes on preview before sending it out.

Smoke test pages:
- https://exquisitedentistryla.com/
- https://exquisitedentistryla.com/tour/
- https://exquisitedentistryla.com/client-experience/
- https://exquisitedentistryla.com/veneers/
- https://exquisitedentistryla.com/invisalign/
- https://exquisitedentistryla.com/emergency-dentist/
- https://exquisitedentistryla.com/blog/
- https://exquisitedentistryla.com/contact/
- https://exquisitedentistryla.com/schedule-consultation/
- https://exquisitedentistryla.com/payment-plans/
- https://exquisitedentistryla.com/smile-gallery/

Cherry financing copy check:
- Use `docs/cherry-credit-disclosure.md` as the source of truth.
- Confirm `/payment-plans/`, `/schedule-consultation/`, `/smile-gallery/`, `/services/`, and `/` do not contain unqualified credit-check claims or the older on-time-payments clause.
- Confirm `dist/payment-plans/index.html` contains the full soft-check/reporting disclosure after `npm run build`.
- Run `npx playwright test src/__tests__/cherry-widget.mobile.spec.ts --project=chromium --project=webkit --workers=2 --retries=0`.
- Confirm the floating launcher shows the complete `Pay over time` / `No hard credit checks • 0% APR options` copy at 320px, 390-430px, 667px landscape, 768px tablet, and desktop. Wrapping is allowed; clipping and ellipsis are not.
- Confirm no overlap with the Concierge or mobile quick-actions FAB, overlays remain above the widget, the target stays at least 44px, and activation opens Cherry.
- In Safari, confirm the pill stays visible while scrolling down after the first reveal. It should hide again only after returning to the true top of the page.
- Confirm gold/primary booking buttons use white text on the bronze fill (homepage hero, insurance band, navbar Book). Black-on-gold fails AA with the current gold token.

Curl checks:
- curl -I https://exquisitedentistryla.com/
- curl -I https://exquisitedentistryla.com/robots.txt
- curl -I https://exquisitedentistryla.com/sitemap.xml
- curl -I https://exquisitedentistryla.com/porcelain-veneers/
- curl -I https://exquisitedentistryla.com/front-teeth-veneers/
- curl -I https://exquisitedentistryla.com/single-tooth-veneers-guide/
- curl -I https://exquisitedentistryla.com/blog/front-teeth-veneers-complete-guide/

Redirect regression:
- Local production-parity redirect checks require Vercel routing, not plain Vite.
- Run `npx vercel dev --listen 127.0.0.1:8899 --yes`, then `npm run test:redirects`.
- For a preview or production deployment, run `REDIRECT_TEST_BASE=<deployment-url> npm run test:redirects`.

Analytics check:
- Use `docs/ga4-measurement-plan.md` as the website event and privacy contract.
- Confirm the source-controlled destination is only `G-1MZGF2XNB5`, with `AW-11373090310` configured for attribution and no direct Ads conversion labels.
- Confirm localhost and preview hosts send no production Google or Vercel analytics requests.
- Confirm the landing page and each completed React route change emit exactly one query-free `page_view`.
- Confirm invalid, failed, and honeypot submissions emit no `generate_lead`; only a confirmed Formspree success emits one.
- Confirm email-like and phone-like query/path data is redacted before any GA or Vercel payload is created.
- Confirm default/declined consent leaves advertising consent denied and accepting grants only `analytics_storage`.
- Complete the Analytics and Ads Admin actions in `docs/ga4-audit-2026-08-23.md` before treating conversion reporting as trustworthy.
- Visit a few production routes after deploy and confirm the Vercel Analytics dashboard starts recording pageviews for production traffic.
- Trigger at least two high-signal custom events from `docs/vercel-analytics-events.md` such as a schedule CTA, site search result, phone click, or financing CTA, then confirm they appear in Vercel Analytics.
- Give Vercel Speed Insights a minute to ingest traffic, then confirm the dashboard stops showing "No data available" for the visited routes. Test at least one desktop and one mobile session with content blockers disabled.

Canonical verification (apex only):
- Confirm <link rel="canonical"> uses https://exquisitedentistryla.com/... on key pages.

WWW redirect verification:
- curl -I https://www.exquisitedentistryla.com and confirm 301 or 308 to apex.

Cloudflare Security → Events check:
- Review recent events for blocked/managed rule hits after deploy.

Production release proof:
- Confirm `origin/main` contains the intended release commit and the Vercel production deployment reports `READY` for that same commit.
- Confirm the apex production domain resolves to the new deployment; a ready preview or deployment URL alone is not production proof.
- Run `npm run verify:prod` and `REDIRECT_TEST_BASE=https://exquisitedentistryla.com npm run test:redirects`.
- Read back `/`, `/payment-plans/`, `/contact/`, `/privacy-policy/`, `/robots.txt`, and `/sitemap.xml` from the public domain.
- Check the production browser console and recent Vercel error logs before closing the release.

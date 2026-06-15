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
- Visit a few production routes after deploy and confirm the Vercel Analytics dashboard starts recording pageviews for production traffic.
- Trigger at least two high-signal custom events from `docs/vercel-analytics-events.md` such as a schedule CTA, site search result, phone click, or financing CTA, then confirm they appear in Vercel Analytics.
- Give Vercel Speed Insights a minute to ingest traffic, then confirm the dashboard stops showing "No data available" for the visited routes. Test at least one desktop and one mobile session with content blockers disabled.

Canonical verification (apex only):
- Confirm <link rel="canonical"> uses https://exquisitedentistryla.com/... on key pages.

WWW redirect verification:
- curl -I https://www.exquisitedentistryla.com and confirm 301 or 308 to apex.

Cloudflare Security → Events check:
- Review recent events for blocked/managed rule hits after deploy.

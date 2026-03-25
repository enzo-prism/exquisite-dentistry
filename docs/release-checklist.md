# Release Checklist

Smoke test pages:
- https://exquisitedentistryla.com/
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

Analytics check:
- Visit a few production routes after deploy and confirm the Vercel Analytics dashboard starts recording pageviews for production traffic.
- Give Vercel Speed Insights a minute to ingest traffic, then confirm the dashboard stops showing "No data available" for the visited routes. Test at least one desktop and one mobile session with content blockers disabled.

Canonical verification (apex only):
- Confirm <link rel="canonical"> uses https://exquisitedentistryla.com/... on key pages.

WWW redirect verification:
- curl -I https://www.exquisitedentistryla.com and confirm 301 or 308 to apex.

Cloudflare Security → Events check:
- Review recent events for blocked/managed rule hits after deploy.

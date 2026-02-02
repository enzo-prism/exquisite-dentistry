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

Canonical verification (apex only):
- Confirm <link rel="canonical"> uses https://exquisitedentistryla.com/... on key pages.

WWW redirect verification:
- curl -I https://www.exquisitedentistryla.com and confirm 301 or 308 to apex.

Cloudflare Security → Events check:
- Review recent events for blocked/managed rule hits after deploy.

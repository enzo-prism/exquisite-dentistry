# Environments

## Production
- Branch: `main`
- Domain: https://exquisitedentistryla.com
- Fronted by Cloudflare (geo/WAF rules enabled)
- SEO is fully enabled (index/follow)

## Staging
- Branch: `staging`
- Domain: https://staging.exquisitedentistryla.com
- Direct to Vercel (no Cloudflare proxy, no geo/WAF rules)
- SEO is disabled with `noindex,nofollow`
- `robots.txt` and `sitemap.xml` are removed from the build output

## Preview
- Branches: any non-`main` branch (for example `feature/*`, `codex/*`, or other review branches)
- Domain: Vercel preview URLs
- Intended for quick reviews and internal QA
- Raw preview URLs may still be protected by Vercel Authentication
- For external/client review, prefer a shareable `_vercel_share` preview link over the raw protected deployment URL

## Local Testing
- `npm install`
- `npm run dev` for local development
- `npm run build` then `npm run preview` for a production-like check

## Sharing Preview Links
- Before sharing, confirm the Vercel deployment is `READY` and matches the current branch state.
- Smoke test the homepage plus the changed routes on the preview deployment.
- If the plain preview URL is auth-protected, generate a shareable `_vercel_share` link so clients do not need a Vercel account to review.

## Release Flow
1. Develop on a non-`main` branch.
2. Push the branch and review the Vercel preview.
3. Share a no-login preview link with stakeholders or clients when needed.
4. Promote to `main` only after preview approval.

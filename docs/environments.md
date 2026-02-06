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
- Branches: `feature/*` (and any non-main/non-staging branch)
- Domain: Vercel preview URLs
- Intended for quick reviews and internal QA

## Local Testing
- `npm install`
- `npm run dev` for local development
- `npm run build` then `npm run preview` for a production-like check

## Sharing Staging Links
- Share the staging domain directly with clients for review.
- Remind reviewers that staging may contain unreleased changes and is blocked from indexing.

## Release Flow
1. Develop on `feature/*` branches.
2. Merge into `staging` for stakeholder review and staging verification.
3. Promote to `main` for production release.

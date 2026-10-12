# SEO & Redirect Verification

This project now treats redirect QA as a first-class gate. Run the steps below (in order) whenever `vercel.json`, canonical content, or navigation changes.

## 1. Content QA (automated + manual)

Avoid shipping placeholder pages by running the content harness first:

```bash
npm run test:content
```

The script ensures every service and location page has an SEO title, meta description, H1, sufficient internal links, and ≥150 words of body copy. Fix any reported errors before continuing. Warnings indicate thin content that should be expanded prior to launch.

Manual spot-checks for new/edited pages:

- Confirm there is exactly one H1 on newly authored main-site pages. The preserved veneers documents retain their original heading structure; compare their body headings with the archive content audit instead of rewriting source content to meet this convention.
- Verify body content is unique, 200–300+ words, and includes at least two internal links (services) or one service link (geo pages).
- Ensure PageSEO data (title + meta description) is intentional, not boilerplate.
- Confirm schema markup renders (view-source to see the JSON-LD block from each template).
- For eligible routes, paste the deployed URL into Google’s Rich Results Test to validate WebSite/LocalBusiness, FAQPage, and VideoObject markup.

## 2. Automated Redirect Checks (local Vercel)

1. In one terminal, start Vercel dev so `vercel.json` redirects behave like production:

   ```bash
   npx vercel dev --listen 127.0.0.1:8899 --yes
   ```

2. In a second terminal, run the redirect harness. It reads `scripts/redirect-tests/legacy-urls.txt`, compares against `scripts/redirect-tests/canonical-map.json`, and ensures every legacy path hops directly to the expected canonical.

   ```bash
   npm run test:redirects
   ```

3. The script fails fast when a URL is missing from the map, an unexpected status is returned, or a `Location` header differs from the canonical value. Fix `vercel.json` (or the map) until the run is green.

Plain Vite (`npm run dev`) does not apply Vercel routing. You can override the target server by exporting `REDIRECT_TEST_BASE` (defaults to `http://127.0.0.1:8899`), for example to test a Vercel preview or production URL.

## 3. Production Build + Static Rendering

1. Build the production bundle and serve it statically:

   ```bash
   npm run build
   npm run preview -- --host localhost --port 4173
   ```

2. With the static server running:
   - Open priority routes (`/teeth-cleaning`, `/root-canal`, `/west-hollywood-dentist`, `/blog/the-shapes-and-styles-of-dental-veneers`).
   - Disable JavaScript in devtools to confirm static HTML renders meaningful content (no blank shells).
   - View-source to confirm canonical `<link>` tags reference the new URLs.
   - Hit `http://localhost:4173/sitemap.xml` to ensure every new canonical appears in the sitemap.

Record any discrepancies before shipping.

### Production hosting sanity check (common root cause of duplicate meta)

If an SEO crawler reports that dozens of pages share the *same* `<title>` / `<meta name="description">`, the most common cause is that the host is serving `dist/index.html` for every route (SPA fallback), instead of serving `dist/<route>/index.html` for `/route/`.

Quick checks against production:

```bash
curl -sSL https://exquisitedentistryla.com/about/ | rg '<title>|meta name="description"|<h1' | head
curl -sSL https://exquisitedentistryla.com/about/index.html | rg '<title>|meta name="description"|<h1' | head

# Dental implants hub (important for “dental implants los angeles”)
curl -sSL https://exquisitedentistryla.com/dental-implants/ | rg '<title>|meta name="description"|<h1' | head
curl -sSL https://exquisitedentistryla.com/dental-implants/index.html | rg '<title>|meta name="description"|<h1' | head

# Zoom landing (important for the “zoom whitening los angeles” query)
curl -sSL https://exquisitedentistryla.com/zoom-whitening/ | rg '<title>|meta name="description"|<h1' | head
curl -sSL https://exquisitedentistryla.com/zoom-whitening/index.html | rg '<title>|meta name="description"|<h1' | head

# Culver City teeth whitening landing
curl -sSL https://exquisitedentistryla.com/culver-city-teeth-whitening/ | rg '<title>|meta name="description"|<h1' | head
curl -sSL https://exquisitedentistryla.com/culver-city-teeth-whitening/index.html | rg '<title>|meta name="description"|<h1' | head

# Smile makeover landing (important for the “smile makeover los angeles” query)
curl -sSL https://exquisitedentistryla.com/smile-makeover-los-angeles/ | rg '<title>|meta name="description"|<h1' | head
curl -sSL https://exquisitedentistryla.com/smile-makeover-los-angeles/index.html | rg '<title>|meta name="description"|<h1' | head

# Invisalign near Beverly Hills landing (important for the “invisalign beverly hills” query)
curl -sSL https://exquisitedentistryla.com/invisalign-beverly-hills/ | rg '<title>|meta name="description"|<h1' | head
curl -sSL https://exquisitedentistryla.com/invisalign-beverly-hills/index.html | rg '<title>|meta name="description"|<h1' | head

# Teeth whitening near Beverly Hills landing (important for the “teeth whitening beverly hills” query)
curl -sSL https://exquisitedentistryla.com/teeth-whitening-beverly-hills/ | rg '<title>|meta name="description"|<h1' | head
curl -sSL https://exquisitedentistryla.com/teeth-whitening-beverly-hills/index.html | rg '<title>|meta name="description"|<h1' | head

# Santa Monica dental implants landing (important for the “santa monica dental implants” query)
curl -sSL https://exquisitedentistryla.com/santa-monica-dental-implants/ | rg '<title>|meta name="description"|<h1' | head
curl -sSL https://exquisitedentistryla.com/santa-monica-dental-implants/index.html | rg '<title>|meta name="description"|<h1' | head
```

These two outputs should both describe the **About** page. If `/about/` matches the homepage while `/about/index.html` is correct, the hosting layer is rewriting extensionless routes to `/index.html`. On Vercel, fix project routing/configuration so directory index HTML and `vercel.json` redirects are honored before any SPA fallback.

If you're on **Cloudflare Pages**, this repo includes `public/_worker.js` which maps `/route/` → `/route/index.html` (and returns real 404s) to prevent the “everything is index.html” issue.

### Veneers mini site acceptance

The mini site uses standalone archive documents and scoped shell styles, while the existing `/veneers/cost-los-angeles/`, `/veneers/front-teeth-veneers-los-angeles/`, `/veneers/2-front-teeth-veneers-cost-los-angeles/`, and `/veneers/1-tooth-veneer-los-angeles/` guides retain the main React layout. Verify the boundary rather than treating every `/veneers/*` URL as an archive route.

From the repository root, run integrity checks and start the built preview:

```sh
npm run test:veneers
VITE_OPENAI_ADS_PIXEL_ID=playwright-test-pixel npm run build
npm run preview -- --host localhost --port 4173
```

In another terminal:

```sh
VENEERS_TEST_ORIGIN=http://localhost:4173 npm run test:veneers -- --browser
npm run test:veneers:shell
```

The local build above uses a public fixture pixel identifier solely for mocked measurement tests; Vercel production uses its existing configured identifier. The focused Playwright suites cover consent/measurement with mocked providers, archive entry/search navigation, query preservation, missing-file 404s, shared shell uniqueness, current-route semantics, original content, legal destinations, and 390px/320px keyboard/menu behavior. The skip regression verifies focus on `#main` and heading clearance below the sticky header; resize assertions check automatic focus transfer both ways. The preview config runs Chromium and WebKit against `VENEERS_TEST_ORIGIN` (default `http://localhost:4173`) and does not launch a server. See [BUILD_WORKFLOW.md](BUILD_WORKFLOW.md) for generation prerequisites and [VENEERS_MIGRATION.md](VENEERS_MIGRATION.md) for retained content and provider boundaries.

Run `npx playwright test src/__tests__/veneers-measurement.spec.ts --project=chromium --project=webkit` for the separate bridge regressions. This uses the normal dev-server configuration with mocked providers, covering consent, style isolation, sanitized attribution, confirmed lead deduplication, failed/QA outcomes, and local simulation without sending real submissions.

After the authorized production release, record the deployed revision and test the live domain:

```sh
npm run verify:veneers
VENEERS_TEST_ORIGIN=https://exquisitedentistryla.com npm run test:veneers:shell
```

Run the read-only verifier from the released revision so its local manifest matches the expected published bytes; `VENEERS_VERIFY_ORIGIN` overrides its default production origin. It checks all archive document/asset hashes, manifest parity, canonical/slash behavior, MIME types, missing-file 404s, the built measurement entry, existing main guides, sitemap, and search integration. The focused browser specs allow only the selected site's origin, block third-party requests, and do not submit forms. These checks verify published routes without establishing live booking or form-provider delivery.

- Load `/veneers/`, `/veneers/process/`, `/veneers/blog/`, and `/veneers/common-questions-about-porcelain-veneers-answered/` as full documents. Confirm a single new header/footer, original body content and imagery, working comparison controls/search, and no main React shell on these pages.
- Check `/veneers/cost-los-angeles/` still has the main-site layout. Follow “Main website,” consultation inquiry, and footer legal links to their intended main/mini-site routes.
- Inspect raw HTML for each route's main-domain canonical and unique title; indexable archive URLs belong in `/sitemap.xml`, while duplicate archives and the navigation test page remain `noindex`.
- Confirm `/veneers/assets/` dependencies return their CSS/JavaScript/image MIME types, and missing assets return 404 instead of homepage HTML. Keep existing Vercel aliases pointing at their correct archive or guide destinations.
- Repeat Skip, menu keyboard/Escape/outside close, and resize checks on mobile. At 320px and 390px, content must fit without horizontal scrolling and closed menu links must not receive focus.
- Verify the isolated bridge honors the same consent choice as the main site and that footer analytics preferences can reopen it. Check shared denied storage defaults, optional event/provider guards, host restrictions, and manual page-view/attribution policy. Consent grants must follow the existing policy without restoring retired source-site trackers or exposing form values. Compare [the GA4 measurement contract](ga4-measurement-plan.md) when checking confirmed eligible lead events; local simulations and tests must never count as acquisition conversions.

Local form simulation and intercepted browser tests establish UI behavior only. Verify live Formspree acceptance/practice delivery separately with an explicitly authorized test submission; deployment by itself does not prove delivery. Do not send patient data or create real leads during routine regression tests. Retiring or redirecting the former domain is a separate operational action.

## 4. Google Search Console Live Tests

For each legacy bucket (services, geo, blogs with `/1000`, pagination junk), run “Test Live URL” inside GSC. Recommended sample set:

| Bucket | Legacy URL | Expected canonical |
| --- | --- | --- |
| Service slug | `/services/teeth-cleaning/` | `/teeth-cleaning/` |
| Legacy general dentistry | `/services/general-dentistry/` | `/teeth-cleaning/` |
| Root canal | `/root-canal-procedure/` | `/root-canal/` |
| Porcelain veneers alias | `/porcelain-veneers/` | `/veneers/` |
| Front teeth veneers alias | `/front-teeth-veneers/` | `/veneers/front-teeth-veneers-los-angeles/` |
| Single tooth veneer guide | `/single-tooth-veneers-guide/` | `/blog/single-tooth-veneers-perfect-solutions/` |
| Geo | `/cosmetic-dentist-culver-city-ca/` | `/culver-city-dentist/` |
| Geo variant | `/west-hollywood-dentist/teeth-whitening/` | `/west-hollywood-dentist/` |
| Blog oddity | `/the-material-options-for-dental-veneers//1000` | `/blog/the-material-options-for-dental-veneers` |
| Blog junk | `/blog/netflix-streaming-during-dental-procedures` | `/blog/` |

Confirm GSC observes the 301, reports the destination as indexable, and references `/sitemap.xml` as the discovered sitemap. Store screenshots in ticket/PR as proof.

## 5. Static HTML Fallbacks

Every service and geo route has a pre-rendered HTML fallback generated via:

```bash
npm run generate:fallbacks
```

This script uses the shared content configs to write `public/<slug>.html` and validates that each file contains a canonical tag, meta description, H1, and JSON-LD schema.

**Before deploying:**

1. Run `npm run generate:fallbacks` manually only when you are intentionally refreshing legacy static fallback HTML.
2. Spot-check a few HTML outputs (e.g., `public/teeth-cleaning.html`) to confirm the rendered copy matches the SPA content.
3. Once `serve -s dist` is running, visit `/teeth-cleaning`, `/root-canal`, `/west-hollywood-dentist`, etc., with JS disabled to ensure the fallback HTML contains meaningful content.

> Reminder: the fallback generator already fails if canonical/meta/schema tags go missing, so keep it green before promoting a build.

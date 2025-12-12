# SEO & Redirect Verification

This project now treats redirect QA as a first-class gate. Run the steps below (in order) whenever `_redirects`, canonical content, or navigation changes.

## 1. Content QA (automated + manual)

Avoid shipping placeholder pages by running the content harness first:

```bash
npm run test:content
```

The script ensures every service and location page has an SEO title, meta description, H1, sufficient internal links, and ≥150 words of body copy. Fix any reported errors before continuing. Warnings indicate thin content that should be expanded prior to launch.

Manual spot-checks for new/edited pages:

- Confirm there is exactly one H1 per page.
- Verify body content is unique, 200–300+ words, and includes at least two internal links (services) or one service link (geo pages).
- Ensure PageSEO data (title + meta description) is intentional, not boilerplate.
- Confirm schema markup renders (view-source to see the JSON-LD block from each template).
- For eligible routes, paste the deployed URL into Google’s Rich Results Test to validate WebSite/LocalBusiness, FAQPage, and VideoObject markup.

## 2. Automated Redirect Checks (local Netlify)

1. In one terminal, start the Netlify dev server so `_redirects` behave exactly like production:

   ```bash
   netlify dev
   ```

2. In a second terminal, run the redirect harness. It reads `scripts/redirect-tests/legacy-urls.txt`, compares against `scripts/redirect-tests/canonical-map.json`, and ensures every legacy path hops directly to the expected canonical.

   ```bash
   npm run test:redirects
   ```

3. The script fails fast when a URL is missing from the map, an unexpected status is returned, or a `Location` header differs from the canonical value. Fix `_redirects` (or the map) until the run is green.

You can override the target server by exporting `REDIRECT_TEST_BASE` (defaults to `http://localhost:8888`).

## 3. Production Build + Static Rendering

1. Build the production bundle and serve it statically:

   ```bash
   npm run build
   npx serve -s dist
   ```

2. With the static server running:
   - Open priority routes (`/teeth-cleaning`, `/root-canal`, `/west-hollywood-dentist`, `/blog/the-shapes-and-styles-of-dental-veneers`).
   - Disable JavaScript in devtools to confirm static HTML renders meaningful content (no blank shells).
   - View-source to confirm canonical `<link>` tags reference the new URLs.
   - Hit `http://localhost:3000/sitemap.xml` (or whichever port `serve` selected) to ensure every new canonical appears in the sitemap.

Record any discrepancies before shipping.

## 4. Google Search Console Live Tests

For each legacy bucket (services, geo, blogs with `/1000`, pagination junk), run “Test Live URL” inside GSC. Recommended sample set:

| Bucket | Legacy URL | Expected canonical |
| --- | --- | --- |
| Service slug | `/services/teeth-cleaning/` | `/teeth-cleaning/` |
| Legacy general dentistry | `/services/general-dentistry/` | `/teeth-cleaning/` |
| Root canal | `/root-canal-procedure/` | `/root-canal/` |
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

This script uses the shared content configs to write `public/<slug>.html`, validates that each file contains a canonical tag, meta description, H1, and JSON-LD schema, and the Netlify `_redirects` file serves these versions to bots when JavaScript is disabled.

**Before deploying:**

1. Run `npm run generate:fallbacks` (automatically executed by `npm run build` / `build:prod`).
2. Spot-check a few HTML outputs (e.g., `public/teeth-cleaning.html`) to confirm the rendered copy matches the SPA content.
3. Once `serve -s dist` is running, visit `/teeth-cleaning`, `/root-canal`, `/west-hollywood-dentist`, etc., with JS disabled to ensure the fallback HTML is returned by Netlify in your local environment.

> Reminder: the fallback generator already fails if canonical/meta/schema tags go missing, so keep it green before promoting a build.

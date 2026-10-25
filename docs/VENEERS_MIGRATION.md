# Veneers mini site migration

The original public site is preserved at `/veneers/` as independent static documents. Its body content, Elementor/OceanWP generated styles, photography, fonts, animations, and page flow remain intact. The user-approved navigation and footer refresh adds a consistent shell to all 35 documents. The main site links into it with a full document navigation so React styles cannot affect the legacy design.

## Scope and evidence

- Eight published WordPress pages, including the original navigation test page.
- Sixteen complete articles, with their original URLs nested under `/veneers/`.
- Eleven linked author/category/blog pagination documents.
- 425 self-hosted dependencies, including all image variants, Google font styles/files, Elementor named chunks, dialog, Swiper, and before/after comparison scripts.
- `public/veneers/manifest.json` records the 35 routes, original source hashes, final document hashes, source modification dates, and all local asset hashes. Its compact generated route mirror at `src/constants/legacyVeneersManifest.json` contains only `pages` for application routing and SEO generation; asset audit records stay outside the main app bundle.
- `integrationFiles` records hashes and byte lengths for the shell styles/script, form runtime, measurement bootstrap, and full-content search index. `contentAudit` records retained original body headings and hero element IDs, separate from the compact route mirror.
- `public/veneers/search-index.json` includes all original published content. Archive search keeps the original article-card markup and searches page/article text.

The durable source is checked in at `archive-source/veneers/originals.tar.gz`, with per-file hashes and asset provenance in `archive-source/veneers/provenance.json`. The compact bundle retains original HTML, public API fields, asset metadata, and original CSS. Unchanged original binary/script assets reuse checked-in `public/veneers/assets/` bytes only after source-hash verification. Root build output is ignored as `/dist/`; nested WordPress `dist` folders contain required published assets and must remain checked in. The archive integrity test audits every release path against Git ignore rules. After staging archive changes, run `npm run test:veneers -- --tracked` to confirm every required file is in Git; CI always enforces this check. Only public source material was captured. No forms were submitted to the old site or to a live lead provider during capture or validation.

## Deliberate migration changes

Original copy, phone numbers, photography, page hierarchy, and responsive presentation are preserved. Internal links now stay inside `/veneers/`. The original About-page Invisalign link points to the current main-site `/invisalign/` route.

The shared white header retains the original black/gold Exquisite Veneers logo, adds practice context and a consultation inquiry link, and keeps the six original veneer routes. The warm charcoal footer organizes those routes, practice links, legal links, and the current practice contact details. Both use scoped styles and the existing Montserrat font. The original decorative `pos-header`/`neg-header` bands, large brand marks, photographs, article text, comparison sliders, and post pagination remain unchanged.

`scripts/veneers-shell.py` parses original element boundaries and removes only the old navigation containers, mobile hamburger phone rows, empty OceanWP top bar/header, footer322, and untriggered popup84. It edits source offsets without reserializing retained markup. The first keyboard link bypasses the header to the focusable content area. Document scroll padding keeps native fragment targets clear of the 96px desktop / 80px mobile sticky header. Below 1100px a native `details`/`summary` menu works without JavaScript; the enhancement adds Escape, outside-click dismissal, current-state announcement, and visible focus transfer on desktop resize. The disclosure is nonmodal and does not trap keyboard focus. Footer bottom padding leaves the retained floating booking provider room above legal links.

Canonical, OpenGraph, and schema URLs use `https://exquisitedentistryla.com/veneers/`. Social/schema image URLs are absolute main-domain addresses. The navigation test page and duplicate author/category/pagination archives have `noindex, follow`.

Retired Google/Site Kit/GTM, Meta, Hotjar, and Crazy Egg trackers are removed. `public/veneers/measurement.js` loads the isolated Vite entry `/veneers/measurement-entry.js` from `src/legacy/veneersMeasurement.tsx`. A shadow root reuses the main site's consent banner, route observability, and OpenAI measurement policy without leaking React/Tailwind styles into the original design. Footer Analytics preferences reopens the same consent choice. Google initialization retains the current destination IDs, default denied advertising storage, manual safe page views, and canonical-host restrictions. Campaign fields and click references follow shared attribution/redaction rules; optional providers remain guarded by existing consent and test-traffic policy. The independent Simplifeye scheduling embed remains, with its existing practice key and booking provider flow.

The old WordPress form backend is replaced by the main site's existing Formspree endpoint, `https://formspree.io/f/xkgknpkl`. The source form's fields and visual treatment remain. A hidden honeypot and twelve-second request timeout protect the submission path. Routing metadata includes `site`, `form_key`, `environment`, and `page_path`, with shared UTM/click-reference and consent evidence. The bridge records an eligible acquisition lead only after a successful provider response; failures, QA submissions, and local simulations do not count. Form answers go only to the form endpoint and never to analytics or console logs.

The source reCAPTCHA key visibly failed on the original site and is removed. The Google map uses the original practice address in a keyless embed because the source map API embed was blank. The replacement was verified to show 6227 Wilshire Boulevard after scrolling the lazy iframe into view. Full-page captures taken before the iframe enters the viewport can show an unloaded map slot. The dormant original menu subscription form is removed with its navigation popup.

Localhost contact submissions are simulated. Success explicitly says no data was sent. Add `?formPreview=error` to a localhost page to review the error state. A production acceptance test of the provider and practice delivery still needs separately authorized live submission.

## Rebuild and checks

### Maintained search metadata

The seven main archive pages have descriptive, location-relevant page titles,
descriptions and matching OpenGraph/Twitter titles in `PAGE_SEO` inside the archive
generator. Search indexes and route manifests use those maintained titles. The
original visible copy, headings, photographs and page flow remain preserved.

Service/navigation pages use WebPage metadata rather than an inherited agency-authored
Article node. Genuine archived article authors remain unchanged; no new clinician
authorship or review credit is asserted. Archived Dentist schema uses the canonical
practice name, main-site URL and published Monday–Thursday, 8 AM–6 PM office hours.
The original source provenance remains immutable and generated hashes are refreshed.

Run from the repository root:

```sh
python3 scripts/archive-veneers.py --offline
node scripts/test-veneers-archive.mjs
node scripts/test-veneers-archive.mjs --browser
```

Offline regeneration seeds the ignored `work/veneers-source/` cache from the checked-in bundle and verified public assets without contacting the retired domain. `--source-dir <path>` selects a different cache. The generator verifies bundle length/hash, safe extraction paths, every source entry, and every asset body before reuse. A fresh empty-cache run was tested with network retrieval disabled. Omit `--offline` only for an intentional read-only source refresh while the old site remains available. Generation writes the full public audit manifest and compact client route mirror from the same inventory. Run the generator after editing the shared runtime or shell so integration hashes stay current; `npm run build` copies the generated documents and compiles the measurement entry.

The integrity test checks all route documents, source/final asset and integration hashes, one shell per document, retained hero IDs, local CSS/HTML/srcset references, canonical URLs, noindex flags, tracker removal, retired captcha removal, internal navigation, and every archived JavaScript file's syntax. The browser pass opens every route and compares original body headings, checks missing local assets and runtime errors, drags a comparison slider, verifies mobile disclosure keyboard/Escape/resize behavior, validates CSS/script response MIME types and source-card images, searches the original content, and exercises contact success/failure with local simulation. It intercepts Formspree and asserts zero real submissions. `src/__tests__/veneers-shell.spec.ts` covers the shared header/footer route contract and keyboard behavior in Chromium and WebKit. `src/__tests__/veneers-measurement.spec.ts` mocks every provider to cover consent, isolated styles, safe attribution, confirmed conversion deduplication, failed/QA outcomes, and local simulation. For compiled local measurement tests, build with `VITE_OPENAI_ADS_PIXEL_ID=playwright-test-pixel npm run build`, then use `npm run test:veneers:shell` with a running preview; `VENEERS_TEST_ORIGIN` can select an already-published site. The production-origin provider tests still mock submission transport. The localhost-only simulation test skips on a nonlocal origin.

## Release verification

Production hosting is the `exquisite-dentistry` Vercel project in `enzo-design-prisms-projects`, linked to this repository's `main` branch. Its canonical public domain is `https://exquisitedentistryla.com`; the similarly named `exquisite` project does not own that domain. Verify the Git revision, the production deployment's `READY` state, and the apex domain's deployment together.

After an authorized release, run from the exact released revision:

```sh
npm run verify:veneers
VENEERS_TEST_ORIGIN=https://exquisitedentistryla.com npm run test:veneers:shell
npm run verify:prod
REDIRECT_TEST_BASE=https://exquisitedentistryla.com npm run test:redirects
```

`verify:veneers` performs only GET/HEAD requests and compares all published archive bytes with the local manifest, including shell/runtime hashes, metadata, MIME types, slash/query behavior, real 404s, existing React guides, sitemap, and search. Browser providers are blocked or mocked. These checks do not prove live practice delivery or appointment completion. See [verification.md](verification.md) and [release-checklist.md](release-checklist.md) for the full release gates. Redirecting or retiring the former domain remains a separate operational action.

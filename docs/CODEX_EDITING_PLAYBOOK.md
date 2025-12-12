# Codex Editing Playbook

This playbook translates the Exquisite Dentistry codebase into the exact checkpoints Codex sessions need to ship safe, SEO-friendly changes. Use it alongside `docs/CODEX_CONTRIBUTOR_GUIDE.md` (quick-start) and `docs/BUILD_WORKFLOW.md` (command reference) whenever you plan a new edit.

---

## 1. System Snapshot

### App shell & routing
- `src/App.tsx` owns the BrowserRouter, lazy-loaded route table, and wraps every page with `Navbar`, `Footer`, `ScrollProgress`, `ScrollToTop`, `LegacyRedirectHandler`, `PageTransition`, and a suspense fallback (`PageLoader`). Anything rendered globally (banner CTAs, providers, analytics) belongs here.
- Every route component lives in `src/pages`. Keep route-level SEO (`<PageSEO>`) and page-specific structured data near the top of these files so reviewers can reason about head tags quickly.

### Layout primitives
- Shared sections/components live in `src/components`. UI primitives from shadcn are under `src/components/ui`, while marketing assemblies (VideoHero, DoctorIntroSection, etc.) live at the root.
- Hooks under `src/hooks` handle motion (`use-scroll-animations`), responsive tweaks (`use-responsive-scaling`), accessibility (`use-scroll-to-top`, `use-cleanup-effect`), and visual QA automation (`use-section-fix` → `src/hooks/use-section-fix.ts`).

### Content & data
- Static datasets (services, transformations, testimonials) sit in `src/data`. Legacy WordPress blog exports are stored in `Blog-Content/exq_dental_blog_posts`; run `npm run generate:blog` to refresh `src/data/generatedBlogPosts.ts`.
- Media originates in `public/lovable-uploads`. Optimized WebP variants are produced into `public/optimized` via `npm run optimize:images` (Sharp pipeline).

### SEO & compliance
- `<PageSEO>` (`src/components/seo/PageSEO.tsx`) centralizes canonical URLs, meta descriptions, and OG/Twitter tags. It enforces the trailing-slash policy defined in `src/utils/schemaValidation.ts`.
- `<MasterStructuredData>` (`src/components/seo/MasterStructuredData.tsx`) injects JSON-LD entities defined in `src/utils/centralizedSchemas.ts`, complete with duplicate detection and dev-time validation. Per-page schemas (Offer, Article, etc.) should compose through this component.
- `LegacyRedirectHandler` (`src/components/LegacyRedirectHandler.tsx`) mirrors Netlify redirects in-browser to fix indexed `.html` URLs. Avoid touching it unless Netlify rules change.

### Build & quality gates
- Primary commands live in `package.json`: `npm run dev`, `npm run lint`, `npm run build` (includes `generate:fallbacks` + `prerender:static`), `npm run build:prod`, `npm run preview`, `npm run check:seo`, `npm run generate:blog`, `npm run prerender:static`, and `node test-browser.js`.
- `scripts/seo-smoke.mjs` checks `public/emergency-dentist.html` for canonical/OG/JSON-LD tags—run it after builds touching SEO-critical assets.

---

## 2. Directory & Module Map (What Lives Where)

| Area | Purpose | When Codex touches it |
| --- | --- | --- |
| `src/pages/*` | Route components, each exporting a default React component + SEO configuration. | Adding/editing whole pages, long-form sections, route-specific CTAs. |
| `src/components/*` | Shared marketing blocks, structured data emitters, layout helpers, nav, footer. | Reusing sections across pages, injecting JSON-LD, tweaking nav/footer. |
| `src/components/ui/*` | shadcn primitives + theming helpers (`button`, `card`, `toast`, loaders, transitions). | Building new interactive UI without re-implementing primitives. |
| `src/hooks/*` | Performance, animation, accessibility, and scroll utilities. | Any new effect that touches DOM/scroll should start here (or reuse existing hook). |
| `src/utils/*` | Canonical URLs, schema validation, analytics guards, image/video helpers, redirect tracking. | When meta/structured data, analytics, or resource loading logic must change. |
| `src/data/*` | Source of truth for services, testimonials, transformations, generated blog posts. | Updating copy/images without hardcoding inside components. |
| `public/*` | Static assets and the SEO fallback page (`emergency-dentist.html`). | Adding icons, OG images, sitemap/robots, legacy HTML landing pages. |
| `scripts/*` | Automation (image optimization, sitemap generation, SEO smoke tests, validators). | Extend when workflow requires new preflight checks or generators. |

---

## 3. Core Systems In Detail

### 3.1 Layout + Navigation
- `Navbar` + `Footer` wrap every non-sitemap route (`src/App.tsx`). The navbar exports shared link arrays; mobile and desktop menus read from the same source to keep copy in sync.
- `ScrollProgress`, `FloatingActionButton`, and `ProgressiveLoader` (mobile) read scroll state—avoid redundant listeners; piggyback on `useScroll` / `useScrollToTop`.
- `useSectionFix` + `sectionAudit` utilities auto-patch layout gaps post-render. When introducing new background colors/gradients, rely on `.section-container` (see `src/index.css`) to keep these audits passing.

### 3.2 SEO & Structured Data
- `<PageSEO>` sanitizes meta descriptions and guards against duplicate canonicals/description tags. Always pass `description` and `path`; prefer `ogType="article"` on blog posts and include `articlePublishedTime`.
- `<MasterStructuredData>` composes business, doctor, website, and per-page schemas. Feed additional schemas via the `additionalSchemas` prop instead of mounting standalone `<script>` tags to benefit from validation + duplicate detection.
- `scripts/seo-smoke.mjs` inspects `public/emergency-dentist.html` (our emergency SEO landing page). Update this static file whenever you change canonical/OG defaults so the smoke test matches production reality.

### 3.3 Content Pipelines
- Blogs: run `npm run generate:blog` after editing files in `Blog-Content/exq_dental_blog_posts`. The generator deduplicates against `src/data/blogPosts.ts`, normalizes slugs, enforces excerpt lengths, and writes `generatedBlogPosts.ts`.
- Transformation stories/testimonials: data lives in `src/data/transformationStories.ts`, `patientTransformations.ts`, etc. Most pages import from these datasets rather than inlining strings—update data, not components, to keep reuse high.
- Gallery/media: `public/lovable-uploads` houses source images. Use `scripts/optimize-images.js` (or `npm run build:prod`) to refresh derivatives in `public/optimized`.

### 3.4 Animation & Performance Hooks
- `use-scroll-animations`, `use-reveal-on-scroll`, and `use-responsive-scaling` cooperate with Framer Motion to stagger reveals without tanking FPS.
- `use-cleanup-effect` and `useEventListener` enforce consistent teardown for listeners/timeouts. Any custom animation effect **must** leverage these to avoid duplicated observers across route transitions.
- `setupErrorReduction` (`src/utils/errorReduction.ts`) downgrades noisy console warnings; leave it initialized in `App` unless debugging deep React issues.

### 3.5 Automation Scripts
- `scripts/generate-sitemap.js` + `src/utils/sitemapGenerator.ts` build sitemap XML consumed by `public/sitemap.xml`.
- `scripts/validate-canonicals.ts` / `scripts/validate-images.js` spot broken canonical URLs or missing optimized assets—run them before large SEO/media pushes.
- `test-browser.js` is a Puppeteer smoke test for top traffic routes (expects a dev/preview server).

---

## 4. Change Recipes

### 4.1 UI or Copy Tweaks on Existing Sections
1. Locate the section component under `src/components` (e.g., `PatientExperienceSection`) or the owning page in `src/pages`.
2. Update copy, Tailwind classes, or props. Prefer pulling repeated strings/images into `src/data` if another route will reuse them.
3. If the section renders JSON-LD, update the relevant schema file or pass new props into `<MasterStructuredData>`.
4. Run `npm run lint && npm run build`. Spot-check in `npm run dev` or `npm run preview`.

### 4.2 Adding/Expanding a Route
1. Create/duplicate a page file in `src/pages` and wire SEO at the top (`<PageSEO>` + `<MasterStructuredData>`).
2. Import the page into `src/App.tsx` as a lazy route and add a `<Route>` entry. Update shared navigation menus (`Navbar`) and footer links if this page should be discoverable.
3. If the route needs unique structured data, wrap it with `<MasterStructuredData additionalSchemas={[...]}>`.
4. Update `public/sitemap.xml` or rerun `scripts/generate-sitemap.js` if the page is indexable.
5. Run `npm run lint && npm run build` (and `npm run preview` for manual QA).

### 4.3 Publishing Blog Content
1. Drop the raw export/markdown into `Blog-Content/exq_dental_blog_posts`.
2. Run `npm run generate:blog` to refresh `src/data/generatedBlogPosts.ts`.
3. Commit both the content file (if tracked) and the generated dataset.
4. Verify `/blog` and `/blog/:slug` render the new article locally; run `npm run lint && npm run build`.

### 4.4 Updating Media/OG Assets
1. Add the source file to `public/lovable-uploads`.
2. Run `npm run build:prod` (or `npm run optimize:images`) to generate optimized WebP derivatives.
3. Reference the asset by its public path (`/lovable-uploads/your-file.png` or `/optimized/name-xl.webp`).
4. If the asset feeds OG/meta tags, ensure `<PageSEO>` receives the new `ogImage`.

### 4.5 SEO / Structured Data Adjustments
1. Update centralized schemas in `src/utils/centralizedSchemas.ts` or add route-level schemas via `<MasterStructuredData additionalSchemas>`.
2. Adjust canonical helpers or validation logic in `src/utils/schemaValidation.ts` if URL policies change.
3. Run `npm run lint && npm run build && npm run check:seo`. Inspect console output for duplicate schema warnings when running `npm run dev`.

---

## 5. Verification Matrix

| Change Type | Required Commands | Extra Manual QA |
| --- | --- | --- |
| Copy/UI tweaks | `npm run lint && npm run build` | `npm run preview` for layout sanity, mobile viewport in devtools. |
| New page / major layout | `npm run lint && npm run build` | `npm run preview` + responsive sweep, ensure nav/footer links update, rerun `scripts/generate-sitemap.js` if needed. |
| Blog/content pipeline | `npm run generate:blog`, `npm run lint`, `npm run build` | Open `/blog` + the slug locally, check structured data via browser devtools. |
| Media changes | `npm run build:prod` | Confirm optimized assets exist under `public/optimized`, check network waterfall for WebP usage. |
| SEO/structured data | `npm run lint`, `npm run build`, `npm run check:seo` | View page source for canonical/JSON-LD, run Rich Results Test for targeted page. |
| Smoke tests | (after server running) `node test-browser.js` | Required when touching `/services/zoom-whitening` or contact/CTA flows. |

---

## 6. Full Verification Loop (run before every PR)

1. **Content QA** – `npm run test:content`  
   Blocks merges if any service/geo page is missing title/description/H1/internal links or falls below ~150 words. Warnings flag thin copy you should pad before shipping.

2. **Redirect harness** – `npx netlify dev --dir public --port 8888` (terminal #1), then `npm run test:redirects` (terminal #2).  
   The harness reads `scripts/redirect-tests/legacy-urls.txt` and `canonical-map.json`; keep both updated whenever you add/remove canonicals. The Netlify server must serve from `public/` so `_redirects` and the HTML fallbacks are honored.

3. **Production build** – `npm run build`  
   Automatically runs `npm run generate:fallbacks`, validates every generated HTML file (canonical/meta/schema/H1), compiles Vite, and then runs `npm run prerender:static` to write JS-free HTML snapshots into `dist/`. Investigate any warnings (eval, browserslist, etc.) before continuing.

4. **Static smoke** – `npx serve -s dist -l 4173`  
   Visit `/teeth-cleaning`, `/root-canal`, `/west-hollywood-dentist`, `/blog/the-material-options-for-dental-veneers` with JS disabled. Confirm HTML renders real content, canonical tags point to the right URL, and the JSON-LD block appears in view-source.

5. **GSC Live URL tests** – From Search Console, run “Test Live URL” for:
   - One service slug (e.g., `/services/teeth-cleaning/`)
   - One geo slug (e.g., `/culver-city-dentist/`)
   - A legacy blog slug with `/1000`
   - A “junk” pagination URL from the historic list  
   Verify Google sees the 301 chain, final page is “URL is available to Google,” and `/sitemap.xml` is reported as the discovered sitemap.

6. **PR summary** – Paste a short verification summary (e.g., `✅ test:content | ✅ test:redirects (netlify dev) | ✅ build/serve | ✅ GSC live`) into the PR description so reviewers know the gates passed.

---

## 6. Pitfalls & Guardrails

- **Canonical drift:** Always pass the `path` prop to `<PageSEO>` so `getCanonicalUrl` enforces trailing slashes. Hard-coded `<link rel="canonical">` tags elsewhere will get stripped by dev guards.
- **Navbar/scroll locking:** Mobile nav sets `document.body.style.position = 'fixed'`. When creating modals/drawers, reuse the same lock helpers or ensure cleanup on unmount.
- **Legacy redirects:** Don't delete entries from `LegacyRedirectHandler` or `netlify.toml` unless you confirm the indexed URL is gone. Both systems should stay in sync.
- **Animations:** Framer Motion + scroll observers can introduce layout thrash. Use `willChange` sparingly and rely on `use-cleanup-effect` utilities.
- **Static SEO page:** `public/emergency-dentist.html` serves as the SEO smoke-test fixture. Keep its head tags aligned with `<PageSEO>` defaults.

---

## 7. On-Call Checklist Before Hand-off

1. `git status` is clean (only intentional changes staged).
2. Latest `origin/main` is merged locally.
3. Commands from the verification matrix have been run (paste logs into the PR description).
4. Screenshots/videos captured for visual changes (home hero, new sections, etc.).
5. Documentation updated if you introduced a new script, dataset, or workflow nuance (add a note here and in `README.md` when applicable).

Keep this document current—Codex sessions rely on it for shared context. When you add a new automation, data pipeline, or routing pattern, append the corresponding guidance here so future edits stay fast and predictable.

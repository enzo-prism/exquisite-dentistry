# Codex Contributor Guide

This playbook distills the workflow conventions, scripts, and gotchas Codex agents keep running into on Exquisite Dentistry. Use it as the quick-start checklist before touching code or shipping changes.

## TL;DR Workflow

1. Use Node 20+ (CI uses 22), then `npm install`
2. `npm run dev` (Vite @ `http://localhost:8080`)
3. Make edits with the `@/` path alias (e.g., `@/components/Navbar`)
4. Run **at least** `npm run lint` + `npm run typecheck` + `npm run build`
5. For asset-heavy work, inspect build-generated asset diffs before pushing

`npm run build` now also produces static, crawlable HTML snapshots for key marketing, service, location, and blog routes in `dist/` (no JS required).

## Repo Map & Conventions

| Path | Purpose |
| --- | --- |
| `src/pages` | Top-level routes (React Router). Keep route-level SEO/meta here. |
| `src/components` | Shared UI, including `components/mobile` and `components/video-hero`. |
| `src/hooks` | Custom hooks (mobile detection, animations, performance). |
| `src/utils`, `src/constants`, `src/data` | Non-UI helpers, config, and generated content. |
| `public/lovable-uploads` | Raw image uploads. Generated WebP lives in `public/optimized`. |
| `public/veneers` | Standalone archived veneer documents, local dependencies, shared shell, and full audit manifest. |
| `archive-source/veneers` | Durable source capture bundle and checksum for offline regeneration after the old domain retires. |
| `scripts/archive-veneers.py`, `scripts/veneers-shell.py` | Offline archive regeneration and shared header/footer templates. |
| `scripts/*.js|mjs` | Automation: image optimization, blog generator, SEO smoke test. |

Quick rules:

- Use Tailwind for the main React site; add custom CSS to `src/index.css` only when utilities fall short. The standalone veneers archive keeps its original generated styles and scoped `public/veneers/shell.css`.
- Respect existing component naming (`PascalCase` for components, `useX` for hooks).
- When duplicating UI, start from shadcn primitives under `src/components/ui`.

## Essential Commands

| Command | When to run | Notes |
| --- | --- | --- |
| `npm run dev` | Any interactive work | Hot reload; picks up `.env`. |
| `npm run lint` | Before every PR/push | ESLint (TS + React Hooks). Add `-- --fix` when safe. |
| `npm run typecheck` | Before every PR/push | Standalone TypeScript gate; `npm run build` does not typecheck. |
| `npm run build` | Mandatory gate | Runs asset optimization, Vite build, route prerender, and SEO/search generation into `dist/`. |
| `npm run build:prod` | Production parity | Alias for `npm run build`; retained for old workflows. |
| `npm run preview` | Manual QA | Serves `dist/` on `http://localhost:4173`. |
| `npm run prerender:static` | After build if needed | Rebuilds static route HTML snapshots in `dist/` (already included in `build`). |
| `npm run generate:blog` | After editing `Blog-Content/` | Rebuilds `src/data/generatedBlogPosts.ts`. |
| `npm run check:seo` | Before launch | Ensures canonical + JSON-LD tags exist in build. |
| `npm run test:blog` | Blog/data cleanup | Verifies there are no draft posts, duplicate sources, or broken blog links. |
| `npm run test:veneers` | Archive changes | Verifies generated document/asset/integration hashes, preserved content, dependencies, and routes. |
| `npm run test:veneers:shell` | Built preview | Chromium/WebKit shell, navigation, and mocked measurement specs; requires a running preview, default port 4173. |
| `npm run verify:veneers` | After release | Read-only production document/asset proof against the local release manifest; no form submissions. |
| `npm run test:e2e` | Browser regressions | Maintained Chromium/WebKit Playwright suite; starts its own dev server. |

## Frequent Tasks & Tips

- **Navigation changes**: `src/components/Navbar.tsx` controls both desktop + mobile menu with shared data arrays. When adjusting mobile layout, test focus management (`tab`, `Escape`) and body scroll locking.
- **Veneers mini site**: Manifest-listed routes under `/veneers/` load independent documents; do not render them inside the React layout or apply global main-site CSS. Keep native links and query/hash preservation through `src/constants/legacyVeneers.ts`, `src/main.tsx`, and the route redirect component. Existing cost/front-teeth guides remain React pages. Header/footer changes belong in `scripts/veneers-shell.py`, `public/veneers/shell.css`, and `shell.js`; regenerate the archive to update every page and its hashes. The original body content and media remain intact. See [VENEERS_MIGRATION.md](VENEERS_MIGRATION.md).
- **Image swaps**: Add new assets to `public/lovable-uploads`, run `npm run build:prod` to generate optimized variants, and reference them via plain paths (e.g., `/lovable-uploads/foo.png`).
- **Blog updates**: Drop markdown/text exports into `Blog-Content/exq_dental_blog_posts`, run `npm run generate:blog`, and commit the regenerated file. Keep one source file per topic—if a post lives in `src/data/blogPosts.ts`, remove the duplicate `Blog-Content` file to prevent re-generating it.
- **Animations/perf**: Hooks like `use-hardware-acceleration` and `use-performance-monitor` already throttle effects on mobile. Prefer reusing them instead of reinventing scroll logic.
- **SEO & head tags**: Route components own their `<PageSEO>` config. Keep canonical URLs aligned with `getCanonicalUrl` helper to avoid drift.
  - `<PageSEO>` now always overwrites the canonical tag via Helmet—just pass `path="/route-slug"` and it emits the correct `<link rel="canonical">`. Skip one-off Helmet canonicals unless you have a special case.
  - For structured data, reuse `getCanonicalUrl('/slug')` inside new templates (services, geos, blogs) so schema + canonical references stay consistent across SPA, SSR, and static fallbacks.
- **Global analytics**: Consent defaults and tag configuration live in `index.html`; `RouteAwareObservability` emits one manual GA page view per completed React route and mounts Vercel Analytics/Speed Insights only after opt-in. Safe GA events live in `src/utils/googleAnalytics.ts`; Vercel custom events live in `src/utils/vercelAnalytics.ts`. Never add automatic page views, direct Ads conversion labels, or patient-entered dimensions. Follow `docs/ga4-measurement-plan.md`.
- **Archive measurement**: `src/legacy/veneersMeasurement.tsx` reuses current consent/observability/OpenAI components in a shadow root, loaded through `public/veneers/measurement.js`. Keep its CSS isolated and the footer analytics-preferences control working. Preserve shared denied defaults, host restrictions, sanitized attribution, and confirmed eligible lead classification; localhost simulation and tests must never convert. Annotate the archive submission with shared helpers, but keep form field values out of analytics and logs.
- **Cherry floating widget**: `CherryWidgetProvider` must preserve the full compact copy at every width, allow narrow wrapping, step aside on phones while a text field is focused, and ride above the mobile action bar on phones via `--mobile-action-bar-h`. Use `docs/cherry-credit-disclosure.md` as the copy/layout contract.
- **Prerendered routes**: `npm run build` runs `prerender:static` (writes `dist/<route>/index.html` for marketing, services/geos, and blog posts). `npm run generate:fallbacks` remains available for manually refreshing legacy `public/<slug>.html` fallback files.

## Testing Expectations

Minimum for every change:

```sh
npm run lint
npm run typecheck
npm run build
```

Run the extras when applicable:

- `npm run build:prod`: any time you touch assets or need the slower image-optimization pass.
- `npm run preview`: visual QA for layout shifts, mobile nav, etc.
- Veneers changes: `npm run test:veneers`, then `VENEERS_TEST_ORIGIN=http://localhost:4173 npm run test:veneers -- --browser` and `npm run test:veneers:shell` against a running preview. For the compiled local bridge tests, first build with `VITE_OPENAI_ADS_PIXEL_ID=playwright-test-pixel npm run build`. The shell command uses `playwright.veneers.config.ts` for Chromium/WebKit; normal CI uses the existing dev-server config. Localhost form handling is simulated; do not turn a UI test into a real lead submission.
- Bridge changes: `npx playwright test src/__tests__/veneers-measurement.spec.ts --project=chromium --project=webkit` runs mocked-provider consent/lead/privacy regressions with the normal dev-server configuration. Production-provider delivery remains a separate authorized check.
- `npx playwright test src/__tests__/cherry-widget.mobile.spec.ts --project=chromium --project=webkit --workers=2 --retries=0`: Cherry copy, responsive width, overlay, and collision coverage.
- `npm run test:e2e`: run the full Chromium/WebKit regression suite for changes to shared navigation and routing. The old Puppeteer script is superseded.
- `vercel.json` / canonical work:
  ```sh
  npx vercel dev --listen 127.0.0.1:8899 --yes
  npm run test:redirects
  npm run test:content
  ```
  The redirect harness requires Vercel routing, so skip the Vite dev server for this test.

## Known Pitfalls

- **React Hook warnings**: ESLint is strict (`react-hooks/exhaustive-deps`). Either satisfy dependencies or justify inline with a comment—don’t ignore build output.
- **Body scroll locking**: The mobile nav sets `document.body.style.position = 'fixed'`. Always restore styles in cleanup when creating overlays/modals.
- **Sharp install errors**: Install libvips (`brew install vips` or `apt install libvips-dev`) before re-running `npm install`.
- **Duplicate media**: When mapping gallery images (see `/tour`), dedupe Cloudinary URLs by filename to avoid repeating the same asset.
- **Archive regeneration**: `python3 scripts/archive-veneers.py --offline` verifies the committed source bundle in `archive-source/veneers/`, unpacks an ignored cache at `work/veneers-source/`, and reuses original public binary assets only after source-hash verification. Use `--source-dir /path/to/capture` for an explicit cache. Normal builds do not regenerate. Editing generated HTML or shell/runtime files without regeneration makes manifest hash checks fail. Do not add a broad `/veneers/*` redirect or SPA rewrite: it would swallow preserved archive pages or the main-site guides.
- **Browser signals**: Chromium can navigate to a prefetched archive document without a new page request. Prove native navigation using the window/document boundary, destination URL, and content rather than only `waitForRequest`. On macOS WebKit, Option+Tab reaches links that plain Tab skips; the shell regression suite uses the appropriate chord and verifies Skip, Escape, and automatic focus transfer in both resize directions.

## Deployment Notes

- Vercel CLI linkage is stored locally in the gitignored `.vercel/project.json`; confirm the intended project before deploying from a fresh checkout. Non-`main` branches are the default preview path; `main` is the production path.
- For external review, do not assume the raw preview URL is shareable. Generate a Vercel `_vercel_share` link if the preview is protected.
- If you add scripts/env vars or change the release flow, reflect them in `docs/BUILD_WORKFLOW.md` and this guide.
- Never commit `dist/` output. Treat it as disposable build artifacts.
- Record the deployed revision and read back `/veneers/`, a child page, an article, and a retained React guide on the production domain. Verify the shared shell, canonical URLs, local dependency responses, and main-site exit after deployment; Git and local browser checks are separate evidence. See [verification.md](verification.md).

Keep this guide updated whenever you introduce new scripts, data flows, or tricky UI patterns so the next Codex session hits the ground running.

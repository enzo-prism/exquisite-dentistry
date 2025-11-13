# Codex Contributor Guide

This playbook distills the workflow conventions, scripts, and gotchas Codex agents keep running into on Exquisite Dentistry. Use it as the quick-start checklist before touching code or shipping changes.

## TL;DR Workflow

1. `nvm use 18 && npm install`
2. `npm run dev` (Vite @ `http://localhost:5173`)
3. Make edits with the `@/` path alias (e.g., `@/components/Navbar`)
4. Run **at least** `npm run lint` + `npm run build`
5. For asset-heavy work, also run `npm run build:prod` before pushing

## Repo Map & Conventions

| Path | Purpose |
| --- | --- |
| `src/pages` | Top-level routes (React Router). Keep route-level SEO/meta here. |
| `src/components` | Shared UI, including `components/mobile` and `components/video-hero`. |
| `src/hooks` | Custom hooks (mobile detection, animations, performance). |
| `src/utils`, `src/constants`, `src/data` | Non-UI helpers, config, and generated content. |
| `public/lovable-uploads` | Raw image uploads. Generated WebP lives in `public/optimized`. |
| `scripts/*.js|mjs` | Automation: image optimization, blog generator, SEO smoke test. |

Quick rules:

- Tailwind everywhere; add custom CSS to `src/index.css` only when utilities fall short.
- Respect existing component naming (`PascalCase` for components, `useX` for hooks).
- When duplicating UI, start from shadcn primitives under `src/components/ui`.

## Essential Commands

| Command | When to run | Notes |
| --- | --- | --- |
| `npm run dev` | Any interactive work | Hot reload; picks up `.env`. |
| `npm run lint` | Before every PR/push | ESLint (TS + React Hooks). Add `-- --fix` when safe. |
| `npm run build` | Mandatory gate | Vite production bundle → `dist/`. |
| `npm run build:prod` | Media/launch parity | Runs Sharp optimizer + build. Mirrors Netlify. |
| `npm run preview` | Manual QA | Serves `dist/` on `http://localhost:4173`. |
| `npm run generate:blog` | After editing `Blog-Content/` | Rebuilds `src/data/generatedBlogPosts.ts`. |
| `npm run check:seo` | Before launch | Ensures canonical + JSON-LD tags exist in build. |
| `node test-browser.js` | Optional smoke test | Puppeteer suite; requires dev/preview server. |

## Frequent Tasks & Tips

- **Navigation changes**: `src/components/Navbar.tsx` controls both desktop + mobile menu with shared data arrays. When adjusting mobile layout, test focus management (`tab`, `Escape`) and body scroll locking.
- **Image swaps**: Add new assets to `public/lovable-uploads`, run `npm run build:prod` to generate optimized variants, and reference them via plain paths (e.g., `/lovable-uploads/foo.png`).
- **Blog updates**: Drop markdown/text exports into `Blog-Content/exq_dental_blog_posts`, run `npm run generate:blog`, and commit the regenerated file.
- **Animations/perf**: Hooks like `use-mobile-gestures`, `use-hardware-acceleration`, and `use-performance-monitor` already throttle effects on mobile. Prefer reusing them instead of reinventing scroll/gesture logic.
- **SEO & head tags**: Route components own their `<PageSEO>` config. Keep canonical URLs aligned with `getCanonicalUrl` helper to avoid drift.
  - `<PageSEO>` now always overwrites the canonical tag via Helmet—just pass `path="/route-slug"` and it emits the correct `<link rel="canonical">`. Skip one-off Helmet canonicals unless you have a special case.
  - For structured data, reuse `getCanonicalUrl('/slug')` inside new templates (services, geos, blogs) so schema + canonical references stay consistent across SPA, SSR, and static fallbacks.
- **Static fallbacks**: `npm run generate:fallbacks` runs automatically inside `npm run build`. It renders service + geo routes into `public/<slug>.html` and fails if canonical/meta/schema/H1 are missing. If you touch those configs, feel free to re-run the generator manually and spot-check the resulting HTML.

## Testing Expectations

Minimum for every change:

```sh
npm run lint
npm run build
```

Run the extras when applicable:

- `npm run build:prod`: any time you touch assets or need Netlify parity.
- `npm run preview`: visual QA for layout shifts, mobile nav, etc.
- `node test-browser.js`: after starting `npm run dev` or `npm run preview` when verifying high-traffic flows (e.g., `/services/zoom-whitening`).
- `_redirects` / canonical work: 
  ```sh
  npx netlify dev --dir public --port 8888   # serves static fallbacks + Netlify-style rewrites
  npm run test:redirects
  npm run test:content
  ```
  The redirect harness only passes when Netlify’s dev server is running from `public/`, so skip the Vite dev server for this test.

## Known Pitfalls

- **React Hook warnings**: ESLint is strict (`react-hooks/exhaustive-deps`). Either satisfy dependencies or justify inline with a comment—don’t ignore build output.
- **Body scroll locking**: The mobile nav sets `document.body.style.position = 'fixed'`. Always restore styles in cleanup when creating overlays/modals.
- **Sharp install errors**: Install libvips (`brew install vips` or `apt install libvips-dev`) before re-running `npm install`.
- **Duplicate media**: When mapping gallery images (see `/tour`), dedupe Cloudinary URLs by filename to avoid repeating the same asset.

## Deployment Notes

- Production deploys (Netlify) call `npm run build:prod`. If you add scripts/env vars, reflect them in `docs/BUILD_WORKFLOW.md` and this guide.
- Never commit `dist/` output. Treat it as disposable build artifacts.

Keep this guide updated whenever you introduce new scripts, data flows, or tricky UI patterns so the next Codex session hits the ground running.

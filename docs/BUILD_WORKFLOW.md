# Build Workflow Guide

This repository ships a Vite + React front end with image optimization, blog generation, and SEO smoke tests. Use this guide whenever you need to build or verify the project locally or in CI.

## Toolchain Requirements

- **Node.js**: 18.19+ (match Netlify’s current LTS). Use `nvm` to hop versions quickly: `nvm install 18 && nvm use 18`.
- **npm**: ships with Node; lockfile is `package-lock.json`, so avoid `pnpm`/`yarn`.
- **OS packages**: the Sharp-based optimizer needs system libvips; most macOS/Linux installs already include it. If you hit install errors, run `brew install vips` (macOS) or `apt install libvips-dev` (Debian/Ubuntu).

## Daily Development Loop

```sh
npm install          # one-time per machine
npm run dev          # Vite dev server @ http://localhost:5173
```

- Vite auto-picks up `.env` changes; copy `.env.example` if you need `VITE_GSC_VERIFICATION`.
- Hot reload works best when you leave `npm run dev` running and edit via the repo root.

## Release-Ready Build Checklist

| Step | Command | Notes |
| --- | --- | --- |
| 1 | `npm run generate:blog` | Only when files inside `Blog-Content/` change. |
| 2 | `npm run lint` | ESLint (TS + React Hooks). Add `-- --fix` to auto-fix style issues. |
| 3 | `npm run build` | Builds Vite assets **and** prerenders priority routes via `react-snap` so crawlers get HTML. |
| 4 | `npm run check:seo` | Verifies canonical, OG, and JSON-LD tags inside `dist/index.html`. |
| 5 | `npm run preview` | Serves `dist/` on `http://localhost:4173` for smoke checks. |
| 6 | `node test-browser.js` | (Optional) Puppeteer smoke test. Requires a running dev/preview server. |

## Image & Asset Pipeline

- `npm run build:prod` = `optimize:images` + `vite build` + prerender. Use this for Netlify parity or whenever you add media under `public/lovable-uploads/`. The optimizer writes WebP derivatives into `public/optimized/`; never commit `dist/`.
- The Sharp script skips files that already have an optimized counterpart, so rerunning it is safe but can take a couple minutes on large batches. Keep an eye on git status afterwards—no changes should appear because optimized files live under `public/`.

## Manual QA Scenarios

After the automated steps pass, run through the high-impact UX flows below. These catch regressions that lint/build cannot.

1. **Contact Hero CTA**
   - Visit `/contact`, click “Send Us a Message” on desktop + mobile widths.
   - Confirm the viewport centers the *Name* field and focus remains on the form card (hero button uses smooth scrolling logic based on element refs).
2. **Formspree submission**
   - Enter a valid email (format validation now blocks malformed addresses).
   - Submit and ensure the inline success message appears and the Formspree dashboard receives the entry.
   - Try an invalid email (`user@`) to confirm the red helper text displays and submission is blocked.
3. **Map & contact links**
   - Click the address block; it should open `https://maps.app.goo.gl/uZPw5AKARk8HuNh9A` in a new tab.
   - Tap the phone CTA on mobile to ensure `tel:` links still function.
4. **Hero/CTA parity**
   - Run `npm run preview`, load key marketing pages (Home, Services, Testimonials) to verify hero buttons still open the default scheduling link unless overridden.

## Form & Analytics Notes

- Form submissions hit Formspree (`https://formspree.io/f/xkgknpkl`). If you clone this workflow for other forms, you only need to swap the endpoint string and ensure `trackFormSubmission('contact_form')` fires after success.
- Google Ads conversions are handled inside `src/utils/googleAdsTracking.ts`. Keep those calls in place when restructuring CTAs or forms.

## CI / Automation Tips

- Cache `~/.npm` and `node_modules` between runs to cut `npm install` time.
- Run `npm run build:prod` instead of `npm run build` inside Netlify-style pipelines so image optimization happens every deploy.
- Add `npm run lint && npm run build && npm run check:seo` to PR workflows; those three commands surface 90% of issues before reviewers look at UI diffs.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `sharp` fails to install | Install libvips (`brew install vips` or `apt install libvips-dev`) and rerun `npm install`. |
| ESLint exits with React Hook dependency warnings | Address upstream, or suppress per-file only with a short inline justification. |
| Puppeteer test hangs | Ensure `npm run dev` or `npm run preview` is running on port 5173/4173 before invoking `node test-browser.js`. |
| Formspree returns 403 | The endpoint rate-limits unknown origins. Ensure your dev build runs on `http://localhost:5173` or configure the Formspree project to trust your domain. |

Keep this document up to date whenever you add new build steps, scripts, or verification tooling so future contributors can follow a single source of truth.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Modern React + TypeScript dental website with comprehensive performance optimizations, SEO features, and professional service pages. Built with Vite, shadcn/ui, and deployed on Vercel.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS + custom theme
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v6 with lazy loading
- **Forms**: React Hook Form + Zod validation
- **Animations**: CSS transitions/keyframes only (Framer Motion was removed in `936f6f0` for ~115KB — don't reintroduce it); reduced motion is honored via `prefers-reduced-motion` blocks in `src/index.css` and `usePerformance().isReducedMotion` (used by the hero to disable video)
- **Analytics / Observability**: GA4 + Consent Mode v2, with consent-gated Vercel Analytics + Speed Insights (Sentry was removed — it was never wired)
- **Deployment**: Vercel (preview per branch; production deploys from `main`). A legacy `netlify.toml` remains but Vercel is primary.

## Development Commands

### Essential Commands
```bash
nvm use 18               # Required: Node 18.19+
npm run dev              # Dev server @ http://localhost:8080
npm run lint             # ESLint (add -- --fix to auto-fix)
npm run typecheck        # tsc --noEmit — `npm run build` does NOT typecheck (see below)
npm run build            # Production bundle (runs generate:fallbacks automatically)
npm run build:prod       # Full pipeline: image optimization + build (mirrors production)
npm run preview          # Serve dist/ @ http://localhost:4173 for QA
npm run check:seo        # Verify canonical/OG/JSON-LD in built HTML
```

### Content & Testing Commands
```bash
npm run generate:blog    # Rebuild blog data from Blog-Content/ exports
npm run test:content     # Validate service/geo page content quality
npm run test:redirects   # Redirect regression (requires Vercel routing: npx vercel dev --listen 127.0.0.1:8899 --yes)
node test-browser.js     # Puppeteer smoke test (requires dev/preview server running)
```

### Pre-commit Workflow
```bash
npm run lint && npm run typecheck && npm run build
```

**`vite build` does not typecheck.** Vite strips types via esbuild without ever calling `tsc`, so a
green build says nothing about type correctness — type errors ship silently. `npm run typecheck`
(`tsc -p tsconfig.app.json --noEmit`) is the only gate that catches them; it runs in CI
(`.github/workflows/ci.yml`) and belongs in your local loop before every commit.

Note `tsconfig.app.json` sets `strict: false`, so the checker only catches hard errors (broken
interfaces, impossible narrowing, readonly/mutable mismatches) — not missing null guards. Don't read
a clean `typecheck` as "fully type-safe".

### Environment Setup
Copy `.env.example` to `.env` and set `VITE_GSC_VERIFICATION` for Google Search Console.

## Architecture & Code Organization

### Project Structure
```
src/
├── components/ui/       # shadcn/ui primitives - extend these for new UI
├── components/          # Feature components (blog/, video-hero/, mobile/)
├── pages/               # Route components - own their PageSEO config
├── data/                # Static content + generatedBlogPosts.ts (auto-generated)
├── hooks/               # Custom hooks (mobile detection, animations, perf)
├── utils/               # Helpers including centralizedSchemas.ts for SEO
├── constants/           # Business hours, contact info (single source of truth)
├── App.tsx              # Routing with lazy-loaded pages (Suspense fallbacks; the only error boundary is the blog's BlogErrorBoundary)
scripts/                 # Build automation (image optimizer, blog generator, SEO checks)
public/lovable-uploads/  # Referenced image ORIGINALS only (not a dumping ground) → runtime webp/avif in public/optimized/ (generated, gitignored)
```

### Key Architectural Patterns

1. **Lazy Loading**: All pages use React.lazy() with Suspense/PageLoader fallbacks
2. **Static Fallbacks**: `npm run generate:fallbacks` (runs automatically in build) renders service/geo routes to `public/<slug>.html` for SEO crawlers
3. **Blog Pipeline**: Legacy WordPress exports in `Blog-Content/` → `npm run generate:blog` → `src/data/generatedBlogPosts.ts` (+ it re-chains `generate:blog-index` so `blogIndex.json` never goes stale). NEVER hand-edit the generated file — regeneration silently discards hand edits. Durable per-post state lives in `scripts/generate-blog-posts.mjs`: `UNPUBLISHED_SLUGS` (retired posts that 301 elsewhere) and `SEO_OVERRIDES` (hand-tuned seoTitle/seoDescription). Content fixes (links, typos) go in the `Blog-Content/` source exports. List surfaces (blog listing, related-article cards, transformation-story cross-links, sitemap page) import the lightweight `src/data/blogIndex.ts` (typed accessors over the generated `blogIndex.json`); only `BlogPostContainer` and its post-view components import the full `@/data/blogPosts` dataset (~392KB chunk) — keep it that way.
4. **Route Categories**: Main pages, service pages, geo landing pages (`/beverly-hills-dentist`), blog (`/blog/:slug`), transformation stories
5. **Hero Media**: Looping hero videos render through `VideoHero` → `Desktop/MobileVideoHero` → `VideoBackground` (one shared chain; lazy-loaded via IntersectionObserver + idle scheduling). Every video-backed hero uses `/public/lovable-uploads/exquisite-black-gold-hero.png` as its canonical poster. Keep that poster visible until playback actually starts; a player `ready` event alone must not hide it. The same image is the static fallback for reduced motion, constrained connections, and `preferStaticOnMobile`. The two explicit `useGradient` routes remain poster-free because they have no hero video.

### Performance Optimizations
- **Manual chunking**: `react-vendor` and `ui-vendor` chunks in Vite config (the `motion-vendor` and dead `sentry` chunks were removed along with their libraries)
- **Image pipeline**: `Image.tsx` sibling-swaps `.png`→`.webp` in the same folder; `OptimizedImage` serves derivatives from `public/optimized/` (GENERATED by `npm run optimize:images`, gitignored). `src/utils/optimizedImageManifest.json` (generated by `scripts/validate-images.js`) maps each optimized base name to its available sizes — a manifest, NOT a fetch list. `scripts/validate-images.js` fails the build if a referenced image is missing. Keep `public/lovable-uploads/` to referenced originals only — don't bulk-add raw uploads (a one-time cleanup already pruned 104 unreferenced files).
- **Code splitting**: Enabled CSS code splitting
- **Bundle analysis**: Terser minification with console dropping in production
- **Deferred loading**: Third-party scripts loaded after main content

### SEO & Content Management
- **PageSEO Component**: Route components use `<PageSEO path="/route-slug">` which handles canonical URLs via `getCanonicalUrl()` helper
- **Structured Data**: Centralized schemas in `src/utils/centralizedSchemas.ts` and `src/components/ServiceStructuredData.tsx`
- **Sitemap**: Auto-generated during build via Vite plugin (`generateXmlSitemap`)

## Development Workflow

### Component Development
- Use existing shadcn/ui components from `components/ui/`
- Use `@/` path alias for imports (configured in vite.config.ts)
- Maintain mobile-first responsive design approach
- When duplicating UI, start from shadcn primitives

### Styling Patterns
- **Layout**: Use `.section-container` (defined in `src/index.css`) to constrain sections—centers content, caps width at ~1200px, responsive padding via `clamp()`
- **Section spacing**: Apply `py-16 md:py-24` on `<section>`, wrap inner content in `<div className="section-container">`
- **Narrow columns**: Nest `max-w-3xl mx-auto text-center` inside section-container for storytelling blocks
- **Colors**: Custom gold theme with black variants
- **Animations**: `fade-in`, `scale-in`, `float` (respect `motion-safe:` utilities)

### CTA & Button System
- Use `Button` component (or `ConversionButton`) for CTAs—includes lift/scale transition and `.cta-glow` sheen
- Keep CTA containers `relative overflow-hidden` for the sheen effect
- For static buttons (pagination, toolbars), add `.button-static` class
- Arrow icons: wrap with `group` and `transition-transform duration-300 group-hover:translate-x-1.5`
- **Contrast (WCAG AA)**: brand gold is a dark bronze (`hsl(38 24% 37%)`). Gold/primary buttons use WHITE text (~6.5:1). Do NOT revert to black-on-gold (~3.2:1, fails AA). Gold text/link buttons use gold-dark (~4.7:1 on white); red (destructive) / black buttons keep white text. Set in both `button.tsx` (cva) and the authoritative `!important` overrides in `src/index.css`.

### Accessibility baseline
- Reduced motion: `prefers-reduced-motion` media blocks in `src/index.css` cover CSS animation; JS-driven motion (hero video autoplay) checks `usePerformance().isReducedMotion`. (Framer Motion and its `MotionConfig` wrapper were removed with the library.)
- `SkipToContent` is rendered and `<main id="main-content">` exists (WCAG 2.4.1); don't drop either.
- `.heading-lg` / `.paragraph` utility classes are now defined in `src/index.css` (they were used on Contact/Services/ClientExperience but previously undefined).

### Form Submissions
- Contact forms use Formspree (`https://formspree.io/f/xkgknpkl`)
- Include honeypot field (`bot-field`) for spam protection
- Call `trackFormSubmission('contact_form')` only after the endpoint confirms success; it emits the canonical GA4 `generate_lead` and a privacy-safe Vercel event, never a direct Ads conversion label
- Business hours/address sourced from `src/constants/contact.ts`
- **Address + maps**: wherever the practice address (`ADDRESS`) is displayed, render `<OpenInMapsButton source="…" />` (`src/components/OpenInMapsButton.tsx`) beside it — opens `GOOGLE_MAPS_SHORT_URL` in a new tab with directions analytics. `Footer` and `PracticeLocationSection` already ship their own maps buttons (don't double up); never add one to JSON-LD/schema occurrences.

## Build & Deployment

### CI (pre-merge gate)
`.github/workflows/ci.yml` runs on PRs into `main`/`staging`. The existing `verify-prod` /
`verify-staging` workflows only smoke-test the live site *after* a deploy; this one runs on the PR
itself, in three parallel jobs:
- **Lint & content QA** — `lint`, `typecheck`, `test:content`, `test:blog`
- **Build & SEO acceptance** — full `build`, then `check:seo` and `test:seo` (needs `fetch-depth: 0`
  so `generate-file-dates.mjs` can derive real `<lastmod>` values, and pre-installs `netlify-cli`
  because `test:seo` boots `netlify dev` against `dist/`)
- **E2E** — Playwright (chromium + webkit), which boots the dev server itself

### Build Configuration
- **Target**: ES2015 for broader compatibility
- **Minification**: Terser with console removal in production
- **Source Maps**: Development only to reduce bundle size
- **Chunk Size Limit**: 1000kb warning threshold

### Vercel Configuration
- **Project**: linked via `.vercel/`; `vercel.json` sets `trailingSlash: true`
- **Preview deploy**: `vercel deploy` → unique `*.vercel.app` URL (also auto-created on branch push). Use previews for client review.
- **Production**: pushing to `main` auto-deploys to `exquisitedentistryla.com`; or run `vercel --prod`. Do not deploy to production without sign-off.
- **Build**: `npm run build` → `dist/` (image optimization + static prerender + sitemap/search-index)
- **Analytics**: `RouteAwareObservability` owns manual GA SPA page views and consent-gated Vercel/Speed Insights; safe GA events and redaction live in `src/utils/googleAnalytics.ts`. Follow `docs/ga4-measurement-plan.md` and never add automatic page views or direct Ads conversion labels.
- A legacy `netlify.toml` remains for redirect testing only (`npm run test:redirects`).

## Financing (Cherry)
- Cherry is integrated two ways: the app-wide floating estimator (`CherryWidgetProvider` + `useCherryWidgetRegistration`, practice slug in `src/constants/cherry.ts`) and the on-page **pre-approval block** (`CherryPreApprovalSection` on `/payment-plans`) with amount entry, benefit messaging, and an apply QR.
- **Responsive floating launcher**: show the complete `Pay over time` / `No hard credit checks • 0% APR options` copy at every width. The pill is 288px normally and 232px at 320px via `min(288px, calc(100vw - 88px))`; narrow copy wraps instead of clipping. The reserved left space clears the Concierge, and the homepage FAB remains lifted by safe area +96px above the pill. Preserve these collision rules if you touch any fixed control. The pill is allowed to overlay scrolling body copy; do not treat that as a bug or collapse it to an icon.
- **Safari visibility**: keep the launcher `position: fixed` with `transform: none`. Hide it only at the true page top (≤16px) and reveal it after 96px, using visualViewport-aware scroll measurement plus hysteresis so iOS/macOS Safari toolbar jitter cannot hide it mid-scroll.
- The patient-facing apply link is built by `buildCherryApplyUrl()` in `src/constants/cherry.ts`.
- **`VERIFY-BEFORE-PUBLIC` convention** (applies to TWO files): (1) regulated Cherry financing figures + the apply/QR URL in `src/constants/cherry.ts`; (2) the Los Angeles veneer **market** cost ranges in `src/constants/veneerCosts.ts`. Both are isolated and tagged with this comment — confirm against the source (Cherry dashboard / practice sign-off) before changing or publishing. The veneer cost page (`/veneers/cost-los-angeles/`) is gated on `VENEER_COST_VERIFIED`: while it is `false` the page shows "confirmed at your consultation" instead of dollar figures. Flip it to `true` ONLY after the practice signs off on the ranges (and update the figures).
- Financing engagement is tracked via `trackFinancingEngagement` in `src/utils/vercelAnalytics.ts`.

## Veneers cluster (single pillar)
`/veneers/` is the ONE veneers pillar. Its children:
- `/veneers/cost-los-angeles/` — cost guide (`src/pages/VeneersCostGuideLosAngeles.tsx`; prices gated on `VENEER_COST_VERIFIED`, FAQ set shared via `src/data/veneers-cost-faqs.ts`)
- `/veneers/front-teeth-veneers-los-angeles/` — 2–4 front-teeth hub (`FrontTeethVeneers.tsx`)
- `/veneers/2-front-teeth-veneers-cost-los-angeles/` — scoped long-tail child that links up to the hub
- `/veneers/1-tooth-veneer-los-angeles/` — single-tooth page

Retired: `/veneers-los-angeles/` (page deleted, 301 → `/veneers/`) and the duplicate blog `choosing-veneers-for-just-one-tooth` (unpublished, 301 → `/veneers/1-tooth-veneer-los-angeles/`). Redirects are authored in `vercel.json` (authoritative) + `public/_redirects` + `LegacyRedirectHandler`. All outbound links to the second domain `exquisiteveneersla.com` were internalized — don't re-add them. Don't reintroduce invented/inconsistent veneer prices; keep neutral "quote at your consultation" until verified figures land. Local-SEO playbook for the map-pack-gated head term: `docs/seo/veneers-local-seo-playbook.md`.

## Content & Copy Voice
The site uses one consistent marketing voice — keep new/edited copy on this bar:
- Calm, declarative, plain-spoken, low-pressure, patient-respecting.
- **No** superlatives ("world-class", "luxury", "finest", "premier", "gold standard", "dramatic"), **no** Hollywood/red-carpet/celebrity framing, **no** urgency, **no** exclamation marks, **no** overreach or guarantee claims.
- Never invent or alter clinical claims, prices, timeframes, or guarantees. Remove overreach rather than restate it. Don't edit real patient testimonial quotes.
- Reference pages for tone: `src/pages/PaymentPlans.tsx`, `src/pages/Insurance.tsx`, `src/pages/DentalImplants.tsx`, `src/pages/FrontTeethVeneers.tsx`.

## Open follow-ups
- **Verify veneer cost ranges**: the practice must review `src/constants/veneerCosts.ts`, then set `VENEER_COST_VERIFIED = true` so `/veneers/cost-los-angeles/` shows figures instead of "confirmed at your consultation".
- **Geo location pages** are thin near-duplicates — differentiate or consolidate.

Resolved (kept for context): the `exquisiteveneersla.com` second domain is **not used** for this site (decision 2026-07-12) — no registrar 301 needed; just never link to it from the site. The "Exquisite Dental" blog typo was fixed at the source exports and regenerated. The ~392KB `blogPosts` chunk was split — list surfaces now use `src/data/blogIndex.ts` (see Blog Pipeline above) and only the blog post view loads the full dataset.

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Sharp install fails | `brew install vips` (macOS) or `apt install libvips-dev` |
| React Hook dep warnings | Satisfy dependencies or justify inline—don't ignore |
| Build passes but types are wrong | Expected: `vite build` never runs `tsc`. Use `npm run typecheck` |
| Drag/resize widget keeps tracking the pointer after release | Handlers defined in the component body get new identities each render, so effect cleanup removes functions that were never registered. Define listeners *inside* the effect — see `src/components/ui/comparison-slider.tsx` |
| Formspree 403 | Endpoint rate-limits unknown origins; use localhost:8080 |
| Redirect tests fail | Start Vercel routing first: `npx vercel dev --listen 127.0.0.1:8899 --yes` (plain Vite/Netlify won't apply `vercel.json`) |
| Puppeteer test hangs | Ensure dev/preview server running before `node test-browser.js` |
| Body scroll stuck | Mobile nav sets `position: fixed`; always restore in cleanup |

## Additional Documentation
- `docs/BUILD_WORKFLOW.md` - Full build pipeline and CI tips
- `docs/CODEX_CONTRIBUTOR_GUIDE.md` - Quick-start for AI agents
- `docs/verification.md` - End-to-end QA checklist

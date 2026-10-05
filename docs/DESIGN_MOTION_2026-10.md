# Design, motion and conversion pass — October 5, 2026

Goal: more new patients reaching out (calls, callback requests, online bookings), with a calmer,
more premium feel and high-quality motion that never hides content or costs performance.

## Evidence this pass was built on

**GA4, 90 days to 2026-10-04 (property 498175984):**
- `/` takes ~66% of sessions and ~63% of engaged sessions, so it is the conversion page.
- Mobile visitors are more engaged than desktop (52% vs 26% engaged).
  - Only 6.4% of them reached `/contact` or `/schedule-consultation`, against 21.5% on desktop.
  - Mobile had no phone link in the first viewport at 375–390px.
- `financing_engagement` was the most-used interaction (198 events), so financing stays prominent.
- Real viewports: phones 390–440 wide, desktops 1440–1920.

**Measurement caveats:**
- GA4 `generate_lead` has been 0 since the Sep 15 rule fix.
- Consent-gated collection collapsed after late August.
- 40–50% of sessions look like bots.
- Judge this release on Formspree submissions plus Vercel `Consultation Intent` / `Contact Method Clicked`, not GA4 rates.
- GSC and Vercel MCP access were down during the audit (expired OAuth / 401).

**Live visual audit:** the top bugs fixed here are listed under "Bugs fixed" below.

## What changed

### Motion system
Full contract in CLAUDE.md, "Motion & conversion system".
- **Fail-open reveals.** `html.motion-ok` is set by `enableMotion()` only when IntersectionObserver exists and the visitor allows motion. All primitives live in `src/components/motion/*`, plus `SectionHeading` and `hooks/use-in-view.ts`.
- **Hero choreography,** shared by ~23 routes:
  - the scene lights up from black;
  - gold threads draw and a single glint passes;
  - words rise in masks, then copy, CTAs and proof cascade in;
  - desktop gets a gentle parallax.
  - Mount-time only; transform/opacity only.
- **Before/after sliders** sweep once (50→18→82→50) when they come into view, so visitors learn they can drag. Any input cancels the sweep.
- **Other motion:**
  - count-up on "1,000+ smile transformations";
  - gold rules that draw themselves;
  - a timeline line that draws across the "first visit" steps;
  - card lift and image zoom on hover;
  - link underline sweeps;
  - a smoked-glass navbar once scrolled;
  - a hairline reading-progress bar that is invisible at the top of the page.
- No motion library was added. The only new dependency is `@fontsource/cormorant-garamond`: the latin 500-italic file, about 24KB woff2, self-hosted, used for the gold accent words in headings.

### Conversion
- **Mobile action bar** (Concierge · Call · Book consultation).
  - Slides up after the hero and lifts the Cherry pill.
  - Hides while typing.
  - Excluded on the booking and contact pages.
- **Hero.**
  - Eyebrow, champagne serif accent.
  - Primary "Schedule Consultation"; full-width "Call (323) 272-2388" on phones, "or call" on desktop.
  - Star-led proof links and a live **Open now · until 6 PM** status (`OfficeStatus`).
- **Homepage order:**
  1. Hero
  2. Meet Dr. Aguil — credentials as published on /about/, count-up, patient quote
  3. Before/after
  4. Services — photo bento on desktop, swipe rail on phones
  5. Insurance & payment — one primary CTA per card
  6. Reviews
  7. "What happens after you reach out" — 3 steps + Schedule/Call + office status
- The old dark SEO block's copy moved into the Services intro and the first-visit band (including the "Serving Beverly Hills" link).
- The footer CTA panel was redesigned. It is skipped on `/`, `/schedule-consultation/` and `/contact/` to avoid a duplicate.
- **/schedule-consultation/:**
  - Concierge-desk layout: path cards (Book online / Request a callback / Call).
  - Premium callback form.
  - Branded scheduler frame with a loading state.
  - Sticky trust panel: doctor, credentials, hours/status, address + Maps, real review.
  - "Plan your first visit" timeline.
- **/contact/:** a compact header replaces the 100vh hero. Phone, email, address + Maps, hours/status and the form are within the first screen.
- Service pages, About, the blog, the gallery and testimonials received the same system. See the git log for this branch.

### Bugs fixed
- **The "Ask the Concierge" launcher never floated.** `.cta-glow { position: relative }` was unlayered and overrode Tailwind's `fixed`, so the launcher sat in a strip below the footer on every page. `.cta-glow` now lives in `@layer components`.
- **WebKit dropped paint tiles near the top of long pages.**
  - Cause: huge `filter: blur(120–160px)` blobs (footer, payment plans, financing/pre-approval cards).
  - Effect: blank regions over the hero, and the half-missing breadcrumb pill on /payment-plans/.
  - Fix: the blobs are now radial gradients, which look the same with no filter cost.
- **Blurry header logo on retina.** The 120/200px derivatives were upscaled ~3x. It now serves the 413px original (2KB webp).
- **1px gold sliver at the top-left.** It was the skip link peeking from `top: -40px`.
- **Scroll progress bar looked like a stuck loading bar at the top.** It is now hidden there and writes directly to the DOM instead of re-rendering React.
- **Footer slide-in caused layout shift.** It was a `gpu-slide-in` on the whole footer, now removed.
- **Unused Open Sans TTF download** removed from `index.html`. The body uses the system stack, as the app CSS already did.
- **Video review tiles were flat black** until lazy thumbnails loaded. They now get a branded placeholder.
- **Mobile menu "Popular Services" double focus ring.**
- **Global `--foreground` changed** from slate navy to warm ink, so headings no longer mix navy and black.

## Guardrails kept
- Every e2e contract held:
  - the poster-until-playback hero and crop-safe mobile poster;
  - 200% text zoom at 320/390/768;
  - no page-wide fade;
  - Cherry pill full copy, no overlap, Safari hysteresis, reduced motion;
  - review carousels (client-requested 3-up + Read More Reviews);
  - doctor-before-cases order;
  - no "Open quick actions" FAB;
  - analytics events.
- Voice rules held: no new clinical/price/rating claims. Credentials are the ones published on /about/. Insurance wording is untouched (pending client approval).

## QA
- `npm run lint`: 0 errors (9 pre-existing warnings).
- `npm run typecheck`, `npm run test:content`, `npm run test:blog`, `npm run build`, `npm run check:seo`: pass.
- Playwright: full suite, chromium + webkit, 292 passed, 0 failed.
- Visual passes at 320 / 375 / 390 / 768 / 1280 / 1440 / 1920 in Chromium and WebKit, with zero horizontal overflow. The /services/ CLS fell from 0.50 to 0.002.
- Bundle impact:
  - main JS +18KB raw (~+5KB gzip);
  - CSS +24KB raw;
  - +24KB serif woff2.

## Follow-ups (not done here)
- **Aggregate rating.** The audit recommends "4.9 ★ · N Google reviews" next to CTAs. We have no verified number; add it only from a verified source.
- **Measurement.** Restore GSC OAuth and Vercel MCP access, register GA4 custom dimensions `cta_location` / `interaction_method`, and add a bot filter.
- **Online scheduler.** The Simplifeye iframe is third-party styled (green, asks for DOB first). Ask the vendor for brand colors / a shorter first step.
- **Content freshness.** Blog post dates are still interpolated, and "Last updated" stamps need real dates.

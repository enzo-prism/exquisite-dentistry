# Veneers navigation and footer QA

final result: passed

No actionable P0, P1, or P2 findings remained in the navigation/footer preview review. Release checks additionally require the shared measurement bridge, durable source bundle, metadata, and integrated build tests described below. The new shell is intentionally redesigned under the user's creative direction. Original page bodies, photography, typography, comparison sliders, and article flow are retained. This report supersedes the original migration review for the navigation/footer only; the original report remains in `outputs/veneers-migration-qa.md`.

## Visual target and rendered evidence

Source: the previously captured public Exquisite Veneers site, https://exquisiteveneersla.com/. Implementation: the current production build at http://localhost:4173/veneers/.

All paths below are relative to `/Users/enzo/CodexTasks/2026-10-12/analyze-the-asdwasdawdawddawd/work/visual-evidence/`.

| Surface | Source visual truth | Rendered implementation | Combined comparison |
| --- | --- | --- | --- |
| Desktop header and hero | before-shell-header-desktop.png | shell-header-desktop-final.png | shell-comparison-header-desktop.png |
| Mobile header and hero | before-shell-header-mobile.png | shell-header-mobile-final.png | shell-comparison-header-mobile.png |
| Desktop footer | before-shell-footer-desktop.png | shell-footer-desktop-final-v2.png, footer crop | shell-comparison-footer-desktop.png |
| Mobile footer, bottom state | before-shell-footer-mobile.png | shell-footer-mobile-final.png | shell-comparison-footer-mobile.png |
| Retained body typography | source-home-copy-focused-desktop.png | local-shell-body-focused.png | shell-comparison-body-focused.png |

Each combined source-left/implementation-right input was opened and reviewed. Desktop CSS viewport is 1440 x 900; mobile is 390 x 844. Captures use one image pixel per CSS pixel. Header comparisons are 1440 x 900 and 390 x 844 per side. The original desktop footer crop is 1440 x 608; the new footer crop is 1440 x 625. Mobile footer source is 390 x 590 and the new bottom viewport is 390 x 844. Footer heights differ intentionally because the new footer adds practice navigation and legal/contact details. Crops retain native density; unequal heights are padded rather than stretched. The focused body comparison is 720 x 500 per side, aligned to the same original heading/paragraph and excluding the floating booking widget. Zero pixels differ by more than 12 RGB levels in that body region.

`outputs/veneers-navigation-footer-overview.png` combines two clearly separated captured regions: the 96px desktop header and the 625px footer crop, with a 16px divider. It is a component overview, not a continuous page screenshot. Original hero images can be partly faded in the earlier header capture because its entrance animation was still running; final imagery was reviewed in its settled state. That transient fade is not treated as an asset change.

Additional states reviewed: `shell-menu-mobile-final.png` and `shell-skip-mobile-final.png`. The former shows the expanded six-link menu, consultation CTA, and practice exit; the latter confirms that skip-link focus lands on the Blog content below the sticky header.

## Findings and repair history

1. [P2, resolved] Initial shell text was too small. Increased desktop navigation to 14px, mobile navigation to 14px, CTA text to 12px, footer links/contact to 13px, and legal text to 11px. Revised header, menu, and footer captures show readable hierarchy without horizontal overflow.
2. [P2, resolved] Desktop-to-mobile resize could leave focus on a hidden desktop link. Added visible focus transfer in both directions, including browsers that blur hidden controls before their media-change event. The final Chromium/WebKit suite asserts the automatic transfer before test helpers move focus.
3. [P2, resolved] The first skip link followed header controls and its fragment target could sit under the sticky header. Moved it to the first body link, made the original main area focusable, added document scroll padding, and preserved focus after the native fragment jump. The final mobile Blog capture and both engines verify visible heading placement.
4. [P2, resolved] Booking-widget overlap could hide bottom legal links. Reserved footer padding at desktop/mobile sizes. The reviewed bottom captures show the legal row above the booking widget, with room to activate the links.

No further actionable P0/P1/P2 issues were found after these fixes. New header/footer copy and geometry are approved design changes, not fidelity regressions.

## Required fidelity surfaces

- Fonts and typography: retained original local Montserrat font files. Original body headings, weight, line height, wrapping, and paragraphs match in the focused comparison. New shell text uses clear size/weight hierarchy and visible keyboard focus.
- Spacing and layout: body section structure remains intact. A compact 96px desktop / 80px mobile sticky header replaces the original navigation area; the resulting earlier start of body content is intentional. Navigation fits at 1100px and switches to a disclosure below it. Footer uses four columns on desktop and two columns plus full-width brand/contact blocks on mobile. No horizontal overflow was measured at 320, 390, 768, 1099, 1100, or 1440px.
- Colors and tokens: retained original gold, white, and charcoal body palette. New shell uses white, warm charcoal, muted gold actions, thin dividers, dark navigation text, and light footer text. Current route has a visible underline as well as a color change.
- Images and assets: original vector logos are reused in both shell regions. Original hero photographs, article images, and gallery variants retain their source assets and attributes. No replacement/generated imagery was introduced. All 425 asset records pass integrity checks.
- Copy and content: all six original navigation routes remain, with Resources representing related blog/article locations. The footer connects to the main practice, accurate current practice phone/address/email, and privacy/terms/HIPAA routes. An independent comparison across all 35 documents confirms unchanged body headings, paragraphs, images, and hero bands after shell insertion. A separate read-only source audit confirmed 295 content headings, 22 hero bands, 16 article bodies, and 171 image attribute signatures. Original inconsistent phone numbers in retained body copy remain outside the requested shell scope.

## Functional and build evidence

- Production preview: 34 tests pass without retries across Chromium and WebKit, including main-site service/search entry, fresh document navigation, original route/content retention, legal/contact contracts, mobile keyboard routes, Escape/outside close, hidden-link focus exclusion, 320px overflow, and automatic focus transfer in both resize directions.
- Full archive browser pass: all 35 routes, source headings, local CSS/JS MIME and errors, comparison drag, original-content search and decoded card imagery, and localhost contact success/error. Zero real form submissions and no missing local resources or runtime errors in the checked flows.
- Native mobile disclosure navigation also works with JavaScript disabled.
- Archive integrity: 35 routes, 425 asset records, 51 scripts parse, and local dependency references pass. Built output contains 378 byte-identical archive files. Sitemap and main search include all 23 indexable archive pages.
- TypeScript, production build, metadata/redirect SEO acceptance, and lint pass. Lint has nine existing warnings and zero errors. `git diff --check` passes.

Browser evidence uses `work/shell-production-tests-final.log`, `work/shell-archive-tests.log`, `work/shell-content-verification.json`, `work/final-build-verification.json`, and `work/visual-evidence/shell-visual-review.json`. Local contact responses are simulated. The retained external booking provider was visually checked without submitting patient information; live lead delivery and appointment completion are not claimed. This section records the pre-release design review, before the separately authorized main/production release. Publication status must be established from the exact Git revision, Vercel deployment, and public-domain readback; see `docs/verification.md`.

## Implementation checklist

- [x] Add one consistent navigation/footer shell to all 35 original documents.
- [x] Retain original bodies, typography, photographs, logos, and article flow.
- [x] Connect consultation, practice exit, current contact details, and legal routes.
- [x] Verify mobile disclosure, skip link, hidden controls, Escape, and resize focus.
- [x] Review combined source/rendered views and focused body typography after fixes.
- [x] Pass build, lint, TypeScript, archive integrity, and both browser engines.
- [x] Keep the updated localhost preview available for review.

## Release integration

The release adds the repository-owned source bundle and an isolated bridge to current consent/measurement. Analytics preferences is appended to the legal row. The main site's consent banner renders in a shadow root so its styles cannot change the archived body. Provider responses are mocked in measurement regressions, including approved/declined consent, failed responses, deduplicated eligible successes, and explicit QA/local exclusions. The metadata repair uses retained source evidence and does not rewrite visible body content.

Repeat the build, archive integrity, original-body comparison, both browser engines, and read-only live byte verification for the final integrated release. The screenshot paths above are historical review evidence in the task workspace; they are not required to regenerate the site. Durable generation evidence lives in `archive-source/veneers/provenance.json`, `public/veneers/manifest.json`, the static checker, and the browser specs.

The integrated mobile scanner found compact practice/contact/legal hit areas below 24px. Their clickable boxes now meet that minimum; primary/menu actions remain at least 44px. Header vertical padding accommodates the larger practice-context box while retaining the 96px/80px shell heights. The original body remains unchanged.

A fresh empty source cache regenerated the final release manifest unchanged with subprocess network retrieval forbidden. Final preview tests cover isolated consent, exact campaign/ad identifiers after integration with current main, QA exclusions, and optional measurement failures as well as the shell flows.

# Mobile QA Plan

Use this plan when a change touches layout, navigation, lead capture, widgets, hero media, search, forms, or any high-traffic route.

## Automated Guardrails

Run:

```sh
npm run test:mobile-design
```

The suite in `src/__tests__/mobile-design.spec.ts` checks:

- mobile viewport metadata: `width=device-width`, `initial-scale=1`, `viewport-fit=cover`, and no zoom-disabling directives.
- critical routes on small phone, iPhone SE, modern iPhone, large phone, and landscape phone sizes.
- page-level horizontal overflow and visible element overflow at top, mid-page, and bottom scroll positions.
- visible interactive targets against the WCAG 2.2 24 CSS pixel minimum, with inline text-link exceptions.
- mobile search drawer layout, typing, results, and result navigation.
- mobile navigation sheet sizing, scrollability, service expansion, and close-on-navigation behavior.
- contact form mobile validation visibility.
- homepage mobile quick actions after scroll.
- reduced-motion hero behavior so mobile visitors who prefer less motion get static media.

The existing focused specs still matter:

```sh
npm run test:mobile-nav
npx playwright test src/__tests__/cherry-widget.mobile.spec.ts --project=chromium --project=webkit --workers=2 --retries=0
```

Keep those when editing the header, menu, Cherry financing widget, or global route shell.

## Manual Device Matrix

Automated browser emulation catches layout and interaction regressions quickly, but real devices still matter for Safari toolbar resizing, virtual keyboard behavior, safe areas, and touch feel.

Before client review or production:

- iPhone small: SE-class viewport, Safari.
- iPhone modern: 390-430px width, Safari and Chrome iOS.
- Android mainstream: 360-412px width, Chrome.
- Landscape phone: 667x375 or similar, Safari or Chrome.
- Tablet edge case: iPad portrait around 768px, Safari.

Manual flows:

- inspect the full Cherry pill at 320px, 390-430px, 667px landscape, 768px tablet, and desktop. Both `Pay over time` and `No hard credit checks • 0% APR options` must remain visible; wrapping is allowed, clipping and ellipsis are not.
- at 320px, confirm the longest wrapped state stays inside the viewport, clears the bottom-left Concierge, and leaves the bottom-right quick-actions FAB above it. Consent, navigation, and dialog overlays must remain above the widget.
- keyboard-focus the Cherry control, confirm the target remains at least 44px, then activate it and verify the real Cherry experience opens.
- open homepage, scroll past hero, and expand quick actions. The floating quick-actions button (`FloatingActionButton`) must sit **above** the Cherry pill, not on top of it.
- on a hero with video, confirm the background is **solid black before the video starts** (no placeholder/poster image), then the looping video appears once it can play.
- open mobile menu, expand Popular Services, navigate to one service route, confirm the drawer closes.
- open search, type `veneers`, choose a result, confirm navigation.
- open `/contact/`, submit empty form, confirm errors are visible and focus lands on the first issue.
- open `/schedule-consultation/` and `/payment-plans/`, confirm Cherry/payment CTAs fit and stay reachable.
- rotate portrait to landscape on a long page and confirm no horizontal panning appears.
- test with reduced motion enabled and confirm hero/video-heavy sections stay calm.

## Research Basis

- web.dev recommends roughly 48 device-independent pixel tap targets with spacing for touch comfort: https://web.dev/articles/accessible-tap-targets
- WCAG 2.2 SC 2.5.8 sets the baseline target-size minimum at 24 by 24 CSS pixels, with specific exceptions: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- MDN documents the responsive viewport contract and warns against disabling user zoom: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport
- MDN documents safe-area environment variables used by modern mobile browsers: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env
- Playwright mobile emulation can simulate viewport, touch, and mobile viewport behavior, but it is not a substitute for a real-device Safari/Android smoke pass: https://playwright.dev/docs/emulation

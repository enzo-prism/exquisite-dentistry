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
playwright test src/__tests__/cherry-widget.mobile.spec.ts
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

- open homepage, scroll past hero, expand quick actions, confirm fixed controls do not overlap important CTAs.
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

# Before/after comparison slider

`src/components/ui/comparison-slider.tsx` powers every before/after photo on the site. It is rendered by `PatientTransformationCard` (`src/components/PatientTransformation.tsx`) and `CloseUpTransformationCard` (`src/components/CloseUpTransformation.tsx`). Those cards appear on:

- the homepage "Compare smile transformations" section (`SmileGalleryPreview`)
- `/smile-gallery/`
- treatment pages, through `ServiceProofSection`
- the veneers before-and-after blog post (`VeneersBeforeAfterContent`)

## Rebuild (2026-10-06)

The slider was reported as "broken and doesn't work well on all devices." A production repro (Playwright, Chromium/WebKit/Firefox desktop plus Pixel 7 and iPhone 14 touch emulation) confirmed three defects. The rebuild fixes all three:

| Defect on production (99efe3c) | Cause | Fix |
| --- | --- | --- |
| Desktop, every engine: grabbing the photo instead of the knob froze the divider at about 26% while the pointer moved to 80%. A ghost image followed the cursor. After the drop, the divider kept following the mouse with no button pressed. | The `<img>` elements were natively draggable. The browser's HTML5 drag-and-drop took over the gesture, swallowed `mousemove`, and ate the `mouseup`, so the document-level listeners stayed armed. | Photos are `draggable={false}`, `onDragStart` is cancelled, and `pointerdown` calls `preventDefault()` for mouse/pen. Pointer capture means a release outside the window still ends the drag (`lostpointercapture`). |
| Phones: a normal vertical scroll that started on a photo jumped the divider to the touch point, from 50 to 18. | `touchstart` moved the divider immediately, and `touchmove` kept tracking during the page scroll. | Touch waits for an 8px slop. A mostly-vertical gesture is released to the browser as a page scroll (`touch-action: pan-y`), a sideways gesture drags, and a tap with no travel jumps the divider to the tapped point. |
| Stylus/pen and hybrid devices had no code path. | Separate mouse and touch handlers. | One Pointer Events path handles mouse, pen and touch. |

Hardening done in the same pass:

- **Layers can't drift.** Before the rebuild, each photo sized its own `AspectRatio` box from its own natural size, so a pair with different proportions would misregister at the divider. Now one frame takes its CSS `aspect-ratio` from the after photo, clamped by `minAspectRatio`/`maxAspectRatio`. Both photos are `absolute inset-0 object-cover` inside it.
- **Keyboard and screen readers.** These use a native `<input type="range">`: it is invisible, spans the whole frame, `step=5`, and its `aria-valuetext` is "Before photo N%, after photo M%".
  - Keys: Arrow ±5, PageUp/PageDown ±10, Home 0, End 100.
  - VoiceOver and TalkBack swipe-to-adjust works because the input is native.
  - The frame shows the gold focus ring through `has-[input:focus-visible]`.
  - A mouse press moves focus to the input, so arrow keys work straight after a click.
  - The range input does not count as text entry for the phone action bar or the Cherry pill (both predicates exclude `type="range"`), so focusing a comparison never hides them.
- **Labels and touch details.**
  - The Before/After chips fade out when the divider would cover them (below 14% and above 86%).
  - The knob's hover scale is mouse-only, so it can't stick on touch screens.
  - `-webkit-touch-callout: none` stops the iOS long-press "Save image" sheet from appearing mid-drag.
- **Failure path.** If either photo fails to load, the frame shows "Photos unavailable right now." instead of a frame that can never be used.
- **Auto-peek is unchanged.** It sweeps 50→18→82→50 once, when the frame is at least 55% in view and both photos have loaded. It is skipped under reduced motion, and any pointer, focus, key or assistive-tech input cancels it.

## Input contract

| Input | Behaviour |
| --- | --- |
| Mouse / pen press | Divider jumps to the pointer and follows it until release (captured). Primary button only. |
| Touch: sideways swipe | Drags once the swipe has travelled 8px and is more horizontal than vertical. |
| Touch: vertical swipe | Page scrolls; divider untouched. |
| Touch: tap | Divider jumps to the tap point. |
| Second finger | Ignored while a gesture is active (pinch-zoom still works). |
| Keyboard | Arrow ±5, PageUp/PageDown ±10, Home/End. |
| Screen reader | Native slider named by the card label, e.g. "Compare Brittany before and after Porcelain Veneers". |

Don't reintroduce document-level `mousemove`/`touchmove` listeners or natively draggable images. Before shipping any change, run the spec below.

## Tests

- `src/__tests__/comparison-slider.spec.ts` covers:
  - mouse drag from the photo, with no native `dragstart`, no text selection, and no movement after release
  - both photo layers sharing one box at 360, 768 and 1440px
  - touch: a vertical swipe scrolls without moving the divider; a sideways swipe drags; a tap jumps (Chromium only, through CDP touch events)
  - auto-peek
- `src/__tests__/patient-journey.spec.ts` covers the keyboard path and the spoken value.

Run:

```sh
npx playwright test src/__tests__/comparison-slider.spec.ts src/__tests__/patient-journey.spec.ts
```

Manual device pass, from `docs/mobile-qa.md`: on a real iPhone (Safari) and an Android phone (Chrome), scroll the homepage past "Compare smile transformations" starting with your finger on a photo, then drag a divider sideways and tap one side.

# Lovable Deployment Playbook

Lovable.dev runs a strict TypeScript + Vite build (no relaxed tsconfig flags) followed by our prerender step (`react-snap`). Use this checklist before every push so the remote deploy succeeds even when your local build passes.

## 1. Required Commands

Run these exactly in this order:

```sh
npm run lint        # surfaces strict TS/ESLint issues Lovable enforces
npm run build       # Vite build + react-snap prerender
```

`npm run build` already runs `vite build && npm run prerender`, so you do **not** need a separate prerender invocation. If either command fails locally, Lovable will fail too.

## 2. Common Failure Modes

| Symptom | Root Cause | Fix |
| --- | --- | --- |
| `Cannot find BlogPost in '@/data/blogPosts'` | `BlogPost` type lives in `@/data/blogTypes.ts` | Import the type from `blogTypes`, reserve `blogPosts` for data functions. |
| `RefObject<HTMLHeadingElement>` vs `MutableRefObject<HTMLElement>` | `useRevealOnScroll` used without generic | Use the generic hook (`useRevealOnScroll<HTMLHeadingElement>()`) or keep the current generic-safe version so refs infer correctly. |
| `Property 'uploadDate' is missing in type {...}` | Video testimonial objects missing schema fields | When creating `VideoTestimonialItem`s, always include `uploadDate` (ISO string) and `duration` (`PTxxS`). |
| `window is not defined` during build | Server-side code touching `window` | Guard any `window` access (`if (typeof window !== 'undefined')`) before requiring Node modules. |
| `react-snap` / Puppeteer crash | Old Chromium binary | We pin Puppeteer 22+ and patch `react-snap`; rerun `npm install` to pick up the postinstall patch if the error reappears. |

## 3. Debug Workflow

1. **TypeScript only**: `npx tsc --noEmit` – isolates strict typing problems without collecting assets.
2. **Vite build**: `npm run build -- --debug` – prints Vite’s plugin graph if you suspect misconfiguration.
3. **Prerender only**: `npm run prerender` – useful if Vite succeeds but Puppeteer blows up.
4. **Clean install**: delete `node_modules` + `package-lock.json`, then `npm install` (applies `patch-package` fixes automatically).

## 4. Deployment Checklist

- [ ] All blog-related types import from `@/data/blogTypes`.
- [ ] Hooks that provide refs expose the correct generic type.
- [ ] No `window` or `document` access during module evaluation.
- [ ] `npm run lint` passes (warnings allowed, errors must be fixed).
- [ ] `npm run build` succeeds locally.
- [ ] Commit + push; Lovable will mirror the exact steps above.

Keep this document updated whenever the pipeline changes (new scripts, different puppeteer args, etc.) so future engineers can unblock Lovable deploys quickly.

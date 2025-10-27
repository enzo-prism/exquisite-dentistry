# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds all client code: route components in `pages`, shared UI (shadcn) in `components`, hooks in `hooks`, and helpers/config in `utils`, `constants`, `data`, and `lib/utils.ts`. Prefer the `@/...` alias from `tsconfig.json`.
- `public/` serves static assets. Keep source uploads in `public/lovable-uploads` and generated WebP output in `public/optimized`.
- `scripts/optimize-images.js` powers the Sharp-based asset pipeline used by `npm run build:prod`; treat `dist/` as disposable build output.

## Build, Test, and Development Commands
- `npm install` (Node 18+) bootstraps dependencies.
- `npm run dev` launches Vite on `http://localhost:5173`.
- `npm run build` bundles for production; `npm run build:prod` pre-optimizes images and mirrors the Netlify deploy step.
- `npm run preview` serves the built bundle locally for smoke checks.
- `npm run lint` runs the flat ESLint config (TypeScript + React Hooks). Append `-- --fix` for autofixes.
- `node test-browser.js` executes the Puppeteer smoke test against a running server; install `puppeteer` locally if prompted.

## Coding Style & Naming Conventions
- Use 2-space indentation, TypeScript modules, and React function components. Tailwind utility strings stay in `className`, with variants composed via helpers in `@/lib`.
- Name React components in PascalCase, hooks with a `use` prefix, utilities in camelCase, and persisted data files in kebab-case. Co-locate feature-specific assets with their component whenever possible.
- Let ESLint guide style and accessibility. Avoid disabling rules unless a short inline comment justifies the exception.

## Testing Guidelines
- Treat `npm run lint`, `npm run build`, and (when relevant) `npm run build:prod` as mandatory gates before merging.
- Run `node test-browser.js` after starting `npm run dev` or `npm run preview` to confirm high-traffic routes like `/services/zoom-whitening`.
- Place future automated specs in `src/__tests__/` so discovery stays predictable for tooling such as Vitest or Jest.

## Commit & Pull Request Guidelines
- Follow the repo’s existing log style: short, imperative subjects with lowercase prefixes (`fix:`, `feat:`, `style:`). Add body context only when it clarifies intent.
- Pull requests should summarize user-facing impact, link issues or tickets, attach visuals for UI updates, and list the verification commands you ran (`lint`, `build`, smoke test).
- Highlight changes to infra artifacts (`netlify.toml`, `tailwind.config.ts`, `components.json`) so reviewers can audit deployment and design-system effects early.

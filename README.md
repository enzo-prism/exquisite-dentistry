# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/03495860-0dae-47cc-9f99-6dca02a2f426

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/03495860-0dae-47cc-9f99-6dca02a2f426) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Environment variables

Copy `.env.example` to `.env` and fill in the values (currently just `VITE_GSC_VERIFICATION` for Google Search Console). The Vite dev server picks up changes automatically, but rebuild before deploying so the verification meta tag ships with the correct token.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Managing Blog Content

Legacy WordPress blog posts are stored as plain text exports inside `Blog-Content/exq_dental_blog_posts`.  
Run the generator below to rebuild the TypeScript dataset whenever new files are added or existing posts are updated:

```sh
npm run generate:blog
```

This command hydrates `src/data/generatedBlogPosts.ts`, which is merged with the hand-crafted articles in `src/data/blogPosts.ts`. Re-run `npm run build` afterwards to refresh the sitemap and feeds.

> Duplicate guardrails: The generator automatically normalizes titles (e.g., strips filler words such as “guide”, “comparison”, etc.) and hashes post content. If a new export matches an existing canonical title or body, it is skipped and logged. Rename the file or update the copy only when you truly intend to replace the prior article.

### Blog Typography

Rendered blog HTML is wrapped with Tailwind’s `@tailwindcss/typography` plugin. Customize headings, paragraphs, and links by updating the `.prose` utility overrides in `src/index.css`. Avoid reintroducing the legacy `.blog-content` class—new typography adjustments should rely on Tailwind prose modifiers (e.g., `prose-lg`, `prose-neutral`) so component CTAs and widgets retain consistent spacing.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/03495860-0dae-47cc-9f99-6dca02a2f426) and click on Share -> Publish.

## Local Build & QA Checklist

Keep releases consistent by running the following commands before opening a pull request or publishing:

```sh
# Install dependencies (one time per machine)
npm install

# 1. Generate blog data (only if Blog-Content changes)
npm run generate:blog

# 2. Lint for TypeScript/React issues
npm run lint

# 3. Build the production bundle
npm run build

# 4. Verify SEO-critical tags (canonical, OG, JSON-LD) on the public emergency page
npm run check:seo

# 5. (Optional) Smoke test the built site locally
npm run preview
```

`npm run build:prod` mirrors the Netlify pipeline by optimizing images first; use it when validating media-heavy changes. The generated files in `src/data/generatedBlogPosts.ts` are date-balanced automatically (between Jan 1 2020 and Nov 8 2025), so re-running the generator keeps the editorial calendar evenly spaced without manual edits.

> Need a deeper walkthrough of each command, required tooling, and common pitfalls? Check `docs/BUILD_WORKFLOW.md` for the full build playbook.

## Layout Utilities

- Use the shared `.section-container` helper (defined in `src/index.css`) to constrain long-form sections. It centers content, caps width at ~1200px, and applies responsive horizontal padding via `clamp()` so mobile layouts never hug the viewport edges.
- Each major section should include `py-16 md:py-24` on the `<section>` element, then wrap inner grids or stacks in a `<div className="section-container">`. This keeps vertical rhythm consistent while letting you alternate backgrounds (white, gray, black) for visual variety.
- When designing carousels (e.g., Comfort Menu, Comfort Highlights), use the built-in gradient hint classes sparingly. On mobile, hide the fades entirely with `hidden md:block` so overlays never cover card content.
- When you need a tighter column, nest a `max-w-3xl mx-auto text-center` block inside the section container rather than hardcoding margins. That pattern already ships on `/client-experience`, `/about`, `/services`, and blog landing pages—reuse it whenever you add storytelling blocks.

## Button & CTA Hover System

Primary CTAs share a single interaction model so motion feels consistent across hero sections, the navbar, and conversion widgets:

- `src/components/ui/button.tsx` centralizes the lift/scale transition, `cta-glow` sheen, and `motion-safe` guards. Prefer the `Button` component (or `ConversionButton`) over ad-hoc `<button>` elements so you get the premium hover treatment for free.
- The sheen effect lives in `src/index.css` (`.cta-glow`). Keep CTA containers `relative`/`overflow-hidden` to allow the pseudo-element sweep. Adjust opacity or speed there if you need a quieter animation for new campaigns.
- Wrap icons inside CTA buttons with a `group` and add `transition-transform duration-300 group-hover:translate-x-1.5` so arrow nudges stay synchronized with the button lift. See `HeroCtaButtons` and `ConversionButton` for working patterns.
- When a button must remain static (e.g., pagination controls or compact toolbars), append the `.button-static` helper class; it suppresses the glow, shadow, and transform without creating a new variant.
- Respect reduced-motion preferences when introducing new micro-interactions. Use `motion-safe:` utilities and verify the `prefers-reduced-motion` media queries in `src/index.css` still provide a color-only fallback.

## SEO Operations

- **Google Search Console** – populate `VITE_GSC_VERIFICATION` in `.env` (see `.env.example`) so the `<meta name="google-site-verification">` value is injected during Vite’s HTML compile. Re-run `npm run build` and redeploy after updating the token so ownership checks stay valid.
- **Robots & sitemap** – `public/robots.txt` now blocks only known tracking parameters. Keep it in sync with any new marketing tags and re-submit the sitemap (`https://exquisitedentistryla.com/sitemap.xml`) when URLs change.
- **Hero media** – `VideoHero` automatically drops down to a static poster for reduced-motion, slow connections, and mobile-first hero renders. Provide a high-resolution `posterSrc` whenever you introduce a new hero; rely on `disableVideo`/`preferStaticOnMobile` props to force static imagery for SEO-critical pages.
- **Structured data** – the centralized schemas in `src/utils/centralizedSchemas.ts` and `src/components/ServiceStructuredData.tsx` include map links, service channels, and service areas. Update those files when address or offerings change to keep LocalBusiness signals aligned.
- **Automated checks** – run `npm run check:seo` after `npm run build` to confirm the generated HTML still includes canonical, Open Graph, and JSON-LD blocks. The script inspects `dist/index.html` and fails fast if key tags disappear.

## Hero Media Guidelines

- Prefer supplying `posterSrc` when using `VideoHero`; this image automatically becomes the fallback for reduced-motion, slow-connection, or mobile visitors. Without a poster the component drops back to the gradient background.
- Use `disableVideo` to force a static hero (e.g., when LCP budgets are tight) or `preferStaticOnMobile` to keep autoplay video on desktop only.
- Posters should live in `/public/optimized` or `/public/lovable-uploads` and be exported as WebP when possible for better paint times.
- If you introduce a completely static hero, pass `useGradient` or your own background classes so the text still has adequate contrast; CTA components inherit the global hover/sheens automatically.

## Contact & Lead Capture Playbook

- **Contact hero CTA** – the `/contact` hero now exposes a “Send Us a Message” button (see `src/pages/Contact.tsx`) that calls `handleScrollToForm`, which simply `scrollIntoView`s the form container. Reuse this pattern for other long pages by attaching a `ref` to the destination block instead of hardcoding anchor hashes (keeps smooth scrolling + offset logic in React).
- **Form provider** – contact submissions are routed through Formspree (`https://formspree.io/f/xkgknpkl`). The page builds a `FormData` payload manually so we can keep local state, show inline success/error copy, and still POST to Formspree’s endpoint. Swap the URL or add hidden metadata fields directly in `handleSubmit`—no Netlify attributes remain.
- **Spam + analytics guards** – a lightweight honeypot field (`bot-field`) short circuits obvious spam while still returning a “success” UI, and `trackFormSubmission('contact_form')` fires on every confirmed submission so Google Ads conversion tracking stays aligned. Preserve both hooks if you add new form variants.
- **Field styling** – inputs share Tailwind classes for spacing + focus states (`focus:ring-2 focus:ring-gold`). Keep the grid wrapper `grid-cols-1 md:grid-cols-2` so name/email pair on tablet/desktop while stacking on mobile. Message textarea is fixed at six rows and uses `resize-none` to avoid layout jumps.
- **Hours + address single source of truth** – the contact page mirrors the `BUSINESS_HOURS` array from `src/constants/contact.ts`. Update that file once to keep the hero sidebar, footer, and any future Schema.org blocks consistent.
- **Optional phone field** – the UI exposes a non-required `phone` input that only gets appended to the Formspree payload when populated. When wiring up new fields follow the same pattern (trim, check for content, then `formData.append`) so empty strings never overwrite CRM data downstream.
- **Regression checklist** – when editing the page, run `npm run lint` plus a manual pass of (1) hero CTA scroll, (2) successful Formspree submission (watch for a 200 response), and (3) mobile viewport in devtools to confirm the grid collapses cleanly. Add those notes to PR descriptions so future contributors know what was validated.
- **Carousels & overlays** – when you convert a grid to a horizontal snap carousel, add gradient hints only on larger screens (`hidden md:block`) and match the gradient color to the section background (for dark sections use `from-black/80`). This avoids the “white curtain” effect we fixed on the Comfort Menu.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Modern React + TypeScript dental website with comprehensive performance optimizations, SEO features, and professional service pages. Built with Vite, shadcn/ui, and deployed on Netlify.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS + custom theme
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v6 with lazy loading
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Error Tracking**: Sentry integration
- **Deployment**: Netlify (automated CI/CD)

## Development Commands

### Essential Commands
```bash
nvm use 18               # Required: Node 18.19+
npm run dev              # Dev server @ http://localhost:8080
npm run lint             # ESLint (add -- --fix to auto-fix)
npm run build            # Production bundle (runs generate:fallbacks automatically)
npm run build:prod       # Full pipeline: image optimization + build (mirrors Netlify)
npm run preview          # Serve dist/ @ http://localhost:4173 for QA
npm run check:seo        # Verify canonical/OG/JSON-LD in built HTML
```

### Content & Testing Commands
```bash
npm run generate:blog    # Rebuild blog data from Blog-Content/ exports
npm run test:content     # Validate service/geo page content quality
npm run test:redirects   # Redirect regression (requires: npx netlify dev --dir public --port 8888)
node test-browser.js     # Puppeteer smoke test (requires dev/preview server running)
```

### Pre-commit Workflow
```bash
npm run lint && npm run build
```

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
├── App.tsx              # Routing with lazy-loaded pages and error boundaries
scripts/                 # Build automation (image optimizer, blog generator, SEO checks)
public/lovable-uploads/  # Raw assets → optimized variants in public/optimized/
```

### Key Architectural Patterns

1. **Lazy Loading**: All pages use React.lazy() with Suspense/PageLoader fallbacks
2. **Static Fallbacks**: `npm run generate:fallbacks` (runs automatically in build) renders service/geo routes to `public/<slug>.html` for SEO crawlers
3. **Blog Pipeline**: Legacy WordPress exports in `Blog-Content/` → `npm run generate:blog` → `src/data/generatedBlogPosts.ts`
4. **Route Categories**: Main pages, service pages, geo landing pages (`/beverly-hills-dentist`), blog (`/blog/:slug`), transformation stories

### Performance Optimizations
- **Manual chunking**: `react-vendor` and `ui-vendor` chunks in Vite config
- **Image optimization**: Sharp-based script for production builds
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

### Form Submissions
- Contact forms use Formspree (`https://formspree.io/f/xkgknpkl`)
- Include honeypot field (`bot-field`) for spam protection
- Call `trackFormSubmission('contact_form')` on success for Google Ads conversion tracking
- Business hours/address sourced from `src/constants/contact.ts`

## Build & Deployment

### Build Configuration
- **Target**: ES2015 for broader compatibility
- **Minification**: Terser with console removal in production
- **Source Maps**: Development only to reduce bundle size
- **Chunk Size Limit**: 1000kb warning threshold

### Netlify Configuration
- **Auto-deploy**: Push to main branch triggers deployment
- **Plugins**: Image optimization, Lighthouse, Critical CSS
- **Headers**: Security headers and caching rules configured
- **Redirects**: Old URL patterns redirect to new structure

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Sharp install fails | `brew install vips` (macOS) or `apt install libvips-dev` |
| React Hook dep warnings | Satisfy dependencies or justify inline—don't ignore |
| Formspree 403 | Endpoint rate-limits unknown origins; use localhost:8080 |
| Redirect tests fail | Run `npx netlify dev --dir public --port 8888` first |
| Puppeteer test hangs | Ensure dev/preview server running before `node test-browser.js` |
| Body scroll stuck | Mobile nav sets `position: fixed`; always restore in cleanup |

## Additional Documentation
- `docs/BUILD_WORKFLOW.md` - Full build pipeline and CI tips
- `docs/CODEX_CONTRIBUTOR_GUIDE.md` - Quick-start for AI agents
- `docs/verification.md` - End-to-end QA checklist
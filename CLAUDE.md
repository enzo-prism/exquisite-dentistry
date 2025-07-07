# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Modern React + TypeScript dental website with comprehensive performance optimizations, SEO features, and professional service pages. Built with Vite, shadcn/ui, and deployed on Netlify.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5 (dev server on port 8080)
- **UI Components**: shadcn/ui + Radix UI (50+ components)
- **Styling**: Tailwind CSS + custom theme
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v6 with lazy loading
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Error Tracking**: Sentry integration
- **Package Manager**: npm
- **Deployment**: Netlify (automated CI/CD)

## Development Commands

### Essential Commands
```bash
# Start development server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Production build with image optimization
npm run build:prod

# Development build (with source maps)
npm run build:dev

# Run ESLint
npm run lint

# Preview production build
npm run preview

# Optimize images only
npm run optimize:images
```

### Pre-commit Workflow
Always run before committing:
```bash
npm run lint
npm run build
```

## Architecture & Code Organization

### Project Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui base components (50+ components)
│   ├── blog/            # Blog-specific components
│   └── video-hero/      # Video hero components
├── pages/               # Route components (20+ pages, all lazy-loaded)
├── data/                # Static data and content
├── hooks/               # Custom React hooks
├── lib/                 # Core utilities and configurations
├── utils/               # Helper functions
├── App.tsx              # Main app with routing and error boundaries
└── main.tsx             # Entry point with providers
```

### Key Architectural Patterns

1. **Lazy Loading**: All page components use React.lazy() for code splitting
2. **Error Boundaries**: Custom ErrorBoundary with Sentry integration
3. **Suspense Loading**: Consistent PageLoader components for all routes
4. **Route Structure**: 
   - Main pages: Index, About, Services, Testimonials, Contact
   - Special events: Wedding, Graduation
   - Service pages: Veneers, Zoom Whitening
   - Support: FAQs, Privacy Policy, Terms, HIPAA
   - Blog: Dynamic routing with `/blog/:slug`

### Performance Optimizations
- **Manual chunking**: `react-vendor` and `ui-vendor` chunks in Vite config
- **Image optimization**: Sharp-based script for production builds
- **Code splitting**: Enabled CSS code splitting
- **Bundle analysis**: Terser minification with console dropping in production
- **Deferred loading**: Third-party scripts loaded after main content

### SEO & Content Management
- **React Helmet Async**: Dynamic meta tags and structured data
- **Canonical URLs**: Proper canonical URL handling
- **Redirects**: Multiple SEO-friendly redirects in routing
- **Structured Data**: Multiple JSON-LD schemas for different content types
- **Sitemap**: Static sitemap.xml in public folder

## Development Workflow

### Component Development
- Use existing shadcn/ui components from `components/ui/`
- Follow established TypeScript patterns (relaxed mode with `allowJs`)
- Maintain mobile-first responsive design approach
- Use `@/` path alias for imports

### Styling Guidelines
- Primary colors: Custom gold theme with black variants
- Use Tailwind utility classes
- Custom animations: `fade-in`, `scale-in`, `float`
- Typography plugin available for rich text content

### State Management
- React Query for server state and caching
- Local component state for UI interactions
- Form state managed by React Hook Form with Zod schemas

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

### Common Issues
- **Dev server fails**: Delete `node_modules` and `npm install`
- **Build errors**: Check TypeScript imports and component lazy loading
- **Styling issues**: Verify Tailwind classes and custom theme usage
- **Performance**: Check bundle analyzer and manual chunk configuration
- **SEO**: Verify React Helmet meta tags and canonical URLs

### Development Environment
- **Port**: 8080 (configured in vite.config.ts)
- **Hot reload**: Available with Vite HMR
- **Lovable.dev**: Component tagger active in development mode only
- **Error tracking**: Sentry integration for production errors

## Special Integrations
- **Lovable.dev**: Component tagging system for development
- **Sentry**: Error tracking and performance monitoring
- **Google Analytics**: Deferred loading for performance
- **Vimeo**: Video integration for hero sections
- **Review Systems**: Testimonial widgets and review displays
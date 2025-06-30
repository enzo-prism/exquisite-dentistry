# Exquisite Dentistry - Claude Code Setup

## Project Overview
Modern React + TypeScript dental website with Vite build system, shadcn/ui components, and Tailwind CSS.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Deployment**: Netlify (automated)

## Development Commands

### Essential Commands
```bash
# Start development server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Production build with image optimization
npm run build:prod

# Run ESLint
npm run lint

# Preview production build
npm run preview

# Optimize images
npm run optimize:images
```

## Development Workflow

### Making Changes
1. Make your edits to components in `src/`
2. Test locally with `npm run dev`
3. Run `npm run lint` to check for issues
4. Commit and push changes

### Before Committing
Always run these commands:
```bash
npm run lint
npm run build
```

### Project Structure
```
src/
├── components/     # React components
├── lib/           # Utilities and configurations
├── pages/         # Page components
└── styles/        # CSS files

public/            # Static assets
```

## Deployment
- **Automatic**: Push to main branch → Netlify deploys automatically
- **Manual**: Use Netlify dashboard to trigger builds
- **Custom Domain**: Configured via Netlify settings

## Key Features
- Responsive design optimized for mobile
- SEO-friendly with React Helmet
- Form handling with React Hook Form
- Animation with Framer Motion
- Date picker and carousel components
- TypeScript for type safety

## Troubleshooting
- If dev server fails: Delete `node_modules` and run `npm install`
- For build errors: Check TypeScript types and imports
- For styling issues: Verify Tailwind class names
- For deployment issues: Check Netlify build logs

## Notes
- Development server runs on port 8080
- Built with Lovable.dev integration
- Uses modern ES modules
- Optimized for performance and SEO
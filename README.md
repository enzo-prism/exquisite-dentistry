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

# 4. (Optional) Smoke test the built site locally
npm run preview
```

`npm run build:prod` mirrors the Netlify pipeline by optimizing images first; use it when validating media-heavy changes. The generated files in `src/data/generatedBlogPosts.ts` are date-balanced automatically (between Jan 1 2020 and Nov 8 2025), so re-running the generator keeps the editorial calendar evenly spaced without manual edits.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

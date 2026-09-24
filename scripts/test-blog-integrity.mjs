#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const BLOG_POSTS_PATH = path.join(ROOT, 'src', 'data', 'blogPosts.ts');
const GENERATED_POSTS_PATH = path.join(ROOT, 'src', 'data', 'generatedBlogPosts.ts');
const CONTENT_DIR = path.join(ROOT, 'Blog-Content', 'exq_dental_blog_posts');
const REDIRECTS_PATH = path.join(ROOT, 'public', '_redirects');
const SRC_DIR = path.join(ROOT, 'src');

const CANONICAL_STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'your',
  'that',
  'this',
  'have',
  'from',
  'into',
  'about',
  'what',
  'when',
  'will',
  'why',
  'some',
  'more',
  'than',
  'best',
  'guide',
  'ultimate',
  'comparison',
  'review',
  'complete',
  'los',
  'angeles',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  'shaping',
  'teeth',
  'smile',
  'dentistry'
]);

const canonicalizeTitle = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token && !CANONICAL_STOPWORDS.has(token))
    .join('-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const extractTitle = (raw, slug) => {
  const lines = raw.split(/\r?\n/);
  let idx = 0;
  while (idx < lines.length && !lines[idx].trim()) {
    idx += 1;
  }
  if (idx >= lines.length) {
    return slug;
  }

  const titleLine = lines[idx].trim();
  if (/^Title:\s*/i.test(titleLine)) {
    return titleLine.replace(/^Title:\s*/i, '').trim();
  }
  if (/^#+\s+/.test(titleLine)) {
    return titleLine.replace(/^#+\s+/, '').trim();
  }
  return slug.replace(/[-_]+/g, ' ');
};

const extractSlugs = (content) => {
  const slugs = new Set();
  const patterns = [
    /\bslug:\s*['"]([^'"]+)['"]/g,
    /"slug"\s*:\s*"([^"]+)"/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content))) {
      slugs.add(match[1]);
    }
  }

  return slugs;
};

const extractBlogLinks = (content) => {
  const links = [];
  const linkRegex = /(?:href|to)=["'](\/blog\/[^"']+)["']/g;
  let match;
  while ((match = linkRegex.exec(content))) {
    const rawPath = match[1];
    const cleanPath = rawPath.split(/[?#]/)[0].replace(/\/$/, '');
    if (cleanPath === '/blog') continue;
    const slug = cleanPath.replace(/^\/blog\//, '');
    if (!slug || slug.includes(':')) continue;
    links.push(slug);
  }
  return links;
};

const walkFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkFiles(fullPath));
    } else if (/\.(ts|tsx|js|jsx|mdx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
};

const loadLegacyBlogSlugs = (content) => {
  const slugs = new Set();
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [from] = trimmed.split(/\s+/);
    if (!from?.startsWith('/blog/')) continue;
    const slug = from.replace(/^\/blog\//, '').replace(/\/$/, '');
    if (slug) slugs.add(slug);
  }
  return slugs;
};

const main = async () => {
  const errors = [];

  let baseContent = '';
  let generatedContent = '';
  let redirectsContent = '';

  try {
    baseContent = await fs.readFile(BLOG_POSTS_PATH, 'utf-8');
  } catch (error) {
    errors.push(`Missing blog data file: ${BLOG_POSTS_PATH}`);
  }

  try {
    generatedContent = await fs.readFile(GENERATED_POSTS_PATH, 'utf-8');
  } catch (error) {
    errors.push(`Missing generated blog data file: ${GENERATED_POSTS_PATH}`);
  }

  try {
    redirectsContent = await fs.readFile(REDIRECTS_PATH, 'utf-8');
  } catch (error) {
    errors.push(`Missing redirects file: ${REDIRECTS_PATH}`);
  }

  // An unpublished post is only a problem when nothing redirects it.
  //
  // This used to reject every `published: false` in blogPosts.ts, which also
  // blocked the legitimate way to retire a post. Retiring means unpublishing
  // (so the slug leaves blogIndex.json, the sitemap and the prerender) AND
  // adding a 301 — leaving it published keeps a sitemap entry that redirects
  // away. An unpublished slug with no redirect is a true orphan: a draft
  // shipped by accident, or a post that now 404s.
  let indexedSlugs = new Set();
  try {
    const indexRaw = await fs.readFile(path.join(ROOT, 'src', 'data', 'blogIndex.json'), 'utf-8');
    const parsed = JSON.parse(indexRaw);
    indexedSlugs = new Set((Array.isArray(parsed) ? parsed : parsed.posts).map((post) => post.slug));
  } catch (error) {
    errors.push('Missing or unreadable src/data/blogIndex.json (run `npm run generate:blog-index`).');
  }

  let redirectSources = new Set();
  try {
    const vercelRaw = await fs.readFile(path.join(ROOT, 'vercel.json'), 'utf-8');
    redirectSources = new Set(
      (JSON.parse(vercelRaw).redirects ?? []).map((rule) => rule.source.replace(/\/$/, '')),
    );
  } catch (error) {
    errors.push('Missing or unreadable vercel.json.');
  }

  const baseSlugs = baseContent ? extractSlugs(baseContent) : new Set();
  const generatedSlugs = generatedContent ? extractSlugs(generatedContent) : new Set();
  const allSlugs = new Set([...baseSlugs, ...generatedSlugs]);

  const orphanedDrafts = [...allSlugs].filter(
    (slug) => !indexedSlugs.has(slug) && !redirectSources.has(`/blog/${slug}`),
  );
  if (orphanedDrafts.length) {
    errors.push(
      `Unpublished blog posts with no redirect (retire them with a 301, or publish them):\n  ${orphanedDrafts.join('\n  ')}`,
    );
  }

  const duplicates = [...baseSlugs].filter((slug) => generatedSlugs.has(slug));
  if (duplicates.length) {
    errors.push(`Duplicate blog slugs in base + generated data: ${duplicates.join(', ')}`);
  }

  let contentFiles = [];
  try {
    const entries = await fs.readdir(CONTENT_DIR);
    contentFiles = entries.filter((file) => file.endsWith('.txt'));
  } catch (error) {
    errors.push(`Missing blog content directory: ${CONTENT_DIR}`);
  }

  const canonicalTitles = new Map();
  for (const fileName of contentFiles) {
    const slug = fileName.replace(/\.txt$/i, '');
    const filePath = path.join(CONTENT_DIR, fileName);
    const raw = await fs.readFile(filePath, 'utf-8');
    const title = extractTitle(raw, slug);
    const canonicalTitle = canonicalizeTitle(title);

    if (baseSlugs.has(slug)) {
      errors.push(`Blog-Content duplicate slug in base blog posts: ${slug}`);
    }

    if (canonicalTitle) {
      const existing = canonicalTitles.get(canonicalTitle);
      if (existing) {
        errors.push(`Duplicate Blog-Content title: "${title}" (${existing}, ${fileName})`);
      } else {
        canonicalTitles.set(canonicalTitle, fileName);
      }
    }
  }

  const legacyBlogSlugs = redirectsContent ? loadLegacyBlogSlugs(redirectsContent) : new Set();
  const srcFiles = await walkFiles(SRC_DIR);
  const brokenLinks = [];

  for (const filePath of srcFiles) {
    const content = await fs.readFile(filePath, 'utf-8');
    const links = extractBlogLinks(content);
    for (const slug of links) {
      if (!allSlugs.has(slug)) {
        const reason = legacyBlogSlugs.has(slug) ? 'redirect-only slug' : 'missing slug';
        brokenLinks.push(`${path.relative(ROOT, filePath)} -> ${slug} (${reason})`);
      }
    }
  }

  if (brokenLinks.length) {
    errors.push(`Invalid blog links detected:\n  ${brokenLinks.join('\n  ')}`);
  }

  // Un-decoded HTML entities survive the WordPress export and render literally
  // in <title> and on-page headings — "USA &#038; the World" was live in
  // Google's results for months. Catch them at the source.
  const entityHits = [];
  for (const fileName of contentFiles) {
    const filePath = path.join(CONTENT_DIR, fileName);
    const raw = await fs.readFile(filePath, 'utf-8');
    for (const match of raw.match(/&#[0-9]+;|&(amp|quot|lsquo|rsquo|ldquo|rdquo|nbsp|hellip);/g) ?? []) {
      entityHits.push(`${path.relative(ROOT, filePath)} -> ${match}`);
    }
  }

  if (entityHits.length) {
    errors.push(
      `Un-decoded HTML entities in blog sources (write the literal character instead):\n  ${[
        ...new Set(entityHits),
      ].join('\n  ')}`,
    );
  }

  if (errors.length) {
    console.error('Blog integrity check failed:\n');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log('Blog integrity check passed.');
};

await main();

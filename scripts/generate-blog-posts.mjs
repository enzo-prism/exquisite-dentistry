#!/usr/bin/env node

/**
 * Auto-generate BlogPost data from downloaded WordPress exports.
 *
 * Reads the text files stored in Blog-Content/exq_dental_blog_posts,
 * converts them into BlogPost objects, and writes them to
 * src/data/generatedBlogPosts.ts for consumption by the app.
 *
 * This script is idempotent and skips slugs that already exist in
 * the base blogPosts.ts file so we do not duplicate content.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: true,
  smartypants: true,
  mangle: false,
  headerIds: false
});

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'Blog-Content', 'exq_dental_blog_posts');
const GENERATED_FILE = path.join(ROOT, 'src', 'data', 'generatedBlogPosts.ts');
const BASE_BLOG_FILE = path.join(ROOT, 'src', 'data', 'blogPosts.ts');

const AUTHOR = 'Dr. Alexie Aguil';
const AUTHOR_BIO =
  'With over 15 years of experience, Dr. Aguil combines artistic vision with technical expertise to deliver exceptional results in cosmetic and restorative dentistry.';

const CATEGORY_MAP = [
  { category: 'Orthodontics', keywords: ['invisalign', 'aligner', 'braces'] },
  { category: 'Restorative Dentistry', keywords: ['implant', 'crown', 'bridge'] },
  { category: 'Cosmetic Dentistry', keywords: ['veneer', 'whitening', 'smile', 'cosmetic'] },
  { category: 'Oral Health', keywords: ['oral', 'gum', 'tooth', 'teeth', 'cavity', 'floss'] },
  { category: 'Special Events', keywords: ['wedding', 'valentine', 'holiday'] },
  { category: 'Patient Experience', keywords: ['netflix', 'experience', 'fear', 'adult', 'luxury', 'comfort', 'high-end'] },
  { category: 'Emergency Dentistry', keywords: ['emergency', 'cracked', 'chipped'] }
];

const STOPWORDS = new Set([
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
  'into',
  'best',
  'ever',
  'looked',
  'part',
  'here',
  'make',
  'most',
  'very'
]);

const sentenceCase = (text) => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

const chooseCategory = (slug) => {
  const lowered = slug.toLowerCase();
  for (const entry of CATEGORY_MAP) {
    if (entry.keywords.some((keyword) => lowered.includes(keyword))) {
      return entry.category;
    }
  }
  return 'Cosmetic Dentistry';
};

const createExcerpt = (text) => {
  const sentences = text
    .replace(/\s+/g, ' ')
    .match(/[^.!?]+[.!?]*/g);
  const excerpt = sentences ? sentences.slice(0, 2).join(' ').trim() : text.trim();
  return excerpt.length > 260 ? `${excerpt.slice(0, 257)}…` : excerpt;
};

const computeReadTime = (text) => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};
const stripHtml = (html) =>
  html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractExcerpt = (rawMarkdown) => {
  const tokens = marked.lexer(rawMarkdown);
  for (const token of tokens) {
    if (token.type === 'paragraph' && token.text?.trim()) {
      const inlineHtml = marked.parseInline(token.text);
      return createExcerpt(stripHtml(inlineHtml));
    }
    if (token.type === 'list' && token.items?.length) {
      const inlineHtml = marked.parseInline(token.items[0].text);
      return createExcerpt(stripHtml(inlineHtml));
    }
  }

  const fallbackHtml = marked.parse(rawMarkdown);
  return createExcerpt(stripHtml(fallbackHtml));
};

const slugToTags = (slug) => {
  return slug
    .split('-')
    .map((token) => token.trim().toLowerCase())
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
};

const loadExistingSlugs = async () => {
  const baseContent = await fs.readFile(BASE_BLOG_FILE, 'utf-8');
  const slugMatches = baseContent.match(/slug:\s*'([^']+)'/g) || [];
  return new Set(slugMatches.map((match) => match.replace(/slug:\s*'([^']+)'/, '$1')));
};

const buildPostObject = async (fileName, existingSlugs) => {
  const slug = fileName.replace(/\.txt$/i, '');
  if (existingSlugs.has(slug)) {
    return null;
  }

  const filePath = path.join(CONTENT_DIR, fileName);
  const stat = await fs.stat(filePath);
  const raw = await fs.readFile(filePath, 'utf-8');

  const lines = raw.split(/\r?\n/);
  let idx = 0;
  while (idx < lines.length && !lines[idx].trim()) {
    idx += 1;
  }

  if (idx >= lines.length) {
    return null;
  }

  let titleLine = lines[idx].trim();
  let title = '';
  if (/^Title:\s*/i.test(titleLine)) {
    title = titleLine.replace(/^Title:\s*/i, '').trim();
    idx += 1;
  } else if (/^#+\s+/.test(titleLine)) {
    title = titleLine.replace(/^#+\s+/, '').trim();
    idx += 1;
  } else {
    title = sentenceCase(slug.replace(/[-_]+/g, ' '));
    idx += 1;
  }

  const body = lines.slice(idx).join('\n').trim();

  if (!title || !body) {
    return null;
  }

  const excerpt = extractExcerpt(body);
  const tags = slugToTags(slug);
  const category = chooseCategory(slug);
  const htmlContent = marked.parse(body).trim();
  const readTime = computeReadTime(stripHtml(htmlContent));
  const date = formatDate(stat.mtime);

  return {
    id: slug,
    title,
    slug,
    excerpt,
    content: `<div class="prose prose-lg max-w-none">
        ${htmlContent}
      </div>`,
    author: AUTHOR,
    authorBio: AUTHOR_BIO,
    date,
    readTime,
    category,
    tags,
    seoTitle: title,
    seoDescription: excerpt,
    seoKeywords: tags.join(', '),
    published: true
  };
};

const buildGeneratedFile = (posts) => {
  const header = `// Auto-generated by scripts/generate-blog-posts.mjs
// Do not edit manually.

import type { BlogPost } from './blogTypes';

export const generatedBlogPosts: BlogPost[] = [
`;

  const footer = `];
`;

  const body = posts
    .map((post) => {
      const serialized = JSON.stringify(post, null, 2);
      return `  ${serialized}`;
    })
    .join(',\n\n');

  return `${header}${body}\n${footer}`;
};

const main = async () => {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const txtFiles = files.filter((file) => file.endsWith('.txt'));
    if (txtFiles.length === 0) {
      console.warn('No .txt blog files found – skipping generation.');
      return;
    }

    const existingSlugs = await loadExistingSlugs();
    const posts = [];

    for (const fileName of txtFiles.sort()) {
      const post = await buildPostObject(fileName, existingSlugs);
      if (post) {
        posts.push(post);
      }
    }

    if (posts.length === 0) {
      console.warn('No new posts generated – existing slugs cover all content.');
      await fs.writeFile(GENERATED_FILE, buildGeneratedFile([]), 'utf-8');
      return;
    }

    const fileContent = buildGeneratedFile(posts);
    await fs.mkdir(path.dirname(GENERATED_FILE), { recursive: true });
    await fs.writeFile(GENERATED_FILE, fileContent, 'utf-8');

    console.log(`Generated ${posts.length} blog posts to ${path.relative(ROOT, GENERATED_FILE)}.`);
  } catch (error) {
    console.error('Error generating blog posts:', error);
    process.exitCode = 1;
  }
};

await main();

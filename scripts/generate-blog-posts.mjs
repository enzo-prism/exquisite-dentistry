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

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

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

const extractExcerpt = (raw) => {
  const blocks = raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  for (const block of blocks) {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const firstLine = lines[0];

    if (looksLikeHeading(firstLine)) {
      if (lines.length > 1) {
        const remainder = lines.slice(1).join(' ').replace(/\s+/g, ' ').trim();
        if (remainder) {
          return createExcerpt(remainder);
        }
      }
      continue;
    }
    if (/^(\d+[\).]|\-|\•)/.test(firstLine)) continue;

    const normalized = block.replace(/\s+/g, ' ').trim();
    if (normalized) {
      return createExcerpt(normalized);
    }
  }

  const fallback = blocks[0] ? blocks[0].replace(/\s+/g, ' ').trim() : raw.replace(/\s+/g, ' ').trim();
  return createExcerpt(fallback);
};

const computeReadTime = (text) => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const looksLikeHeading = (text) => {
  if (!text) return false;
  if (text.length > 100) return false;
  const cleaned = text.replace(/[“”"’',]/g, '');
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;
  if (words.length === 1) {
    return /^[A-Z]/.test(words[0]);
  }
  if (words.length <= 2) {
    return text === text.toUpperCase() && /[A-Z]/.test(text);
  }
  const capitalized = words.filter((word) => {
    const candidate = word.replace(/^[^A-Za-z]+/, '').replace(/[^A-Za-z]+$/, '');
    return /^[A-Z]/.test(candidate);
  });
  return capitalized.length / words.length >= 0.6;
};

const parseContent = (raw) => {
  const rawLines = raw.split('\n');

  const parts = [];
  let paragraphBuffer = '';
  let listBuffer = [];
  let prevBlank = true;
  let pendingNumberedList = false;

  const flushParagraph = () => {
    if (!paragraphBuffer.trim()) {
      paragraphBuffer = '';
      return;
    }
    parts.push(`<p>${escapeHtml(paragraphBuffer.trim())}</p>`);
    paragraphBuffer = '';
  };

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = listBuffer.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    parts.push(`<ul>${items}</ul>`);
    listBuffer = [];
  };

  for (const line of rawLines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      pendingNumberedList = false;
      prevBlank = true;
      continue;
    }

    if (/^[-•]/.test(line)) {
      flushParagraph();
      listBuffer.push(line.replace(/^[-•]\s*/, '').trim());
      prevBlank = false;
      continue;
    }

    const numberedMatch = trimmed.match(/^(\d+)[\)\.]\s*(.+)$/);
    if (numberedMatch) {
      flushParagraph();
      flushList();
      parts.push(
        `<h3>${escapeHtml(`${numberedMatch[1]}. ${numberedMatch[2].trim()}`)}</h3>`
      );
      pendingNumberedList = true;
      prevBlank = false;
      continue;
    }

    if (listBuffer.length) {
      flushList();
    }

    const headingCandidate =
      !paragraphBuffer && !pendingNumberedList && looksLikeHeading(trimmed);
    if (headingCandidate) {
      parts.push(`<h2>${escapeHtml(trimmed)}</h2>`);
      prevBlank = false;
      continue;
    }

    paragraphBuffer = paragraphBuffer ? `${paragraphBuffer} ${trimmed}` : trimmed;
    prevBlank = false;
    pendingNumberedList = false;

    if (/[.!?]"?$/.test(trimmed)) {
      flushParagraph();
    }
  }

  flushParagraph();
  flushList();

  return parts.join('\n        ');
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

  const [titleLine, ...rest] = raw.split('\n');
  const title = titleLine.replace(/^Title:\s*/i, '').trim();
  const body = rest.join('\n').trim();

  if (!title || !body) {
    return null;
  }

  const excerpt = extractExcerpt(body);
  const tags = slugToTags(slug);
  const category = chooseCategory(slug);
  const readTime = computeReadTime(body);
  const contentHtml = parseContent(body);
  const date = formatDate(stat.mtime);

  return {
    id: slug,
    title,
    slug,
    excerpt,
    content: `<div class="prose prose-lg max-w-none">
        ${contentHtml}
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

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

// Retired posts that must stay unpublished on regeneration. These slugs 301
// elsewhere (see vercel.json) — e.g. choosing-veneers-for-just-one-tooth →
// /veneers/1-tooth-veneer-los-angeles/. Republishing requires revisiting the
// redirects and sitemap first (see CLAUDE.md → Veneers cluster).
const UNPUBLISHED_SLUGS = new Set(['choosing-veneers-for-just-one-tooth']);

// Hand-tuned SEO metadata that must survive regeneration (the default is
// seoTitle = post title, seoDescription = excerpt). Add entries here instead
// of editing generatedBlogPosts.ts — hand edits to the generated file are
// silently lost on the next `npm run generate:blog`.
const SEO_OVERRIDES = {
  'choosing-veneers-for-the-four-front-teeth': {
    seoTitle: 'Front Teeth Veneers Los Angeles | 4-Tooth Smile Zone Guide',
    seoDescription:
      'Considering veneers for the four front teeth? Learn when a focused smile-zone veneer plan works, what to ask, and how Dr. Aguil plans natural results in Los Angeles.'
  },
  'finding-the-best-cosmetic-dentist-in-the-usa-the-world': {
    seoTitle: 'Finding a Cosmetic Dentist in the USA | What to Look For',
    seoDescription:
      'What to look for when choosing a cosmetic dentist: a calm setting, careful planning, and technology that supports natural-looking results. A Los Angeles guide from Exquisite Dentistry.'
  },
  'top-4-netflix-shows-to-explore-from-the-dentists-chair': {
    seoTitle: 'Netflix From the Dentist Chair | Exquisite Dentistry LA',
    seoDescription:
      'Four calm Netflix titles that work well during a dental visit, plus a look inside the Exquisite Dentistry treatment rooms on Wilshire Blvd in Los Angeles.'
  }
};

const FEATURED_IMAGE_OVERRIDES = {
  'top-4-netflix-shows-to-explore-from-the-dentists-chair':
    '/lovable-uploads/patient-in-seat-talking-with-dentist.png'
};

// Truthful editorial update dates for generated posts. Publication dates stay
// untouched; only add an entry when the corresponding source article receives
// a substantive review or revision.
const MODIFIED_AT_OVERRIDES = {
  'are-veneers-covered-by-insurance': '2026-08-23',
  'finding-the-best-cosmetic-dentist-in-the-usa-the-world': '2026-08-26',
  'top-4-netflix-shows-to-explore-from-the-dentists-chair': '2026-08-26',
  'female-smokers-are-at-a-higher-risk-of-oral-cancer': '2026-08-26',
  'what-a-teeth-whitening-dentist-can-do-for-you': '2026-08-26'
};

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

const normalizeTitle = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

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

const decodeWordpressEntities = (text) => {
  if (!text) return text;

  return text
    .replace(/&#0*38;|&amp;/gi, '&')
    .replace(/&#0*8217;|&#0*39;|&apos;|&rsquo;/gi, '\u2019')
    .replace(/&#0*8216;|&lsquo;/gi, '\u2018')
    .replace(/&#0*8220;|&ldquo;/gi, '\u201c')
    .replace(/&#0*8221;|&rdquo;/gi, '\u201d')
    .replace(/&#0*8211;|&ndash;/gi, '\u2013')
    .replace(/&#0*8212;|&mdash;/gi, '\u2014')
    .replace(/&#0*160;|&nbsp;/gi, ' ')
    .replace(/&#0*8230;|&hellip;/gi, '\u2026')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      const code = parseInt(hex, 16);
      if (!Number.isFinite(code) || code < 32) return _;
      try {
        return String.fromCodePoint(code);
      } catch {
        return _;
      }
    })
    .replace(/&#(\d+);/g, (_, decimal) => {
      const code = Number(decimal);
      if (!Number.isFinite(code) || code < 32) return _;
      try {
        return String.fromCodePoint(code);
      } catch {
        return _;
      }
    });
};

const isFragmentHeading = (heading) => {
  const trimmed = heading.trim();
  return (
    /[,;:]$/.test(trimmed)
    || /\b(at|of|for|and|to|in|with|by)$/i.test(trimmed)
    || /^(here at|dr\.?\s+alexie|invisalign\.?$|dental veneers\.?$|studies from)/i.test(trimmed)
  );
};

const repairOrphanMarkdownHeadings = (markdown) =>
  markdown.replace(
    /^(#{2,6})\s+([^\n]+)\n+(.+)/gm,
    (match, _hashes, heading, rest) => {
      const trimmedHeading = heading.trim();
      const trimmedRest = rest.trim();
      const shouldMerge =
        /^[,.;:]/.test(trimmedRest)
        || /^[a-z]/.test(trimmedRest)
        || isFragmentHeading(trimmedHeading);

      if (!shouldMerge) return match;

      const needsSpace = !/^[,.;:]/.test(trimmedRest);
      return `${trimmedHeading}${needsSpace ? ' ' : ''}${trimmedRest}`;
    }
  );

const replaceLegacyCtaBoilerplate = (markdown) =>
  markdown
    .replace(
      /## Restore Your Smile[^\n]*\n\nWith your smile the best it(?:'|’)s ever looked[^\n]*\n\n### CONTACT EXQUISITE DENTISTRY\n\n[^\n]*experience true luxury\.[^\n]*/gi,
      '## Visit Exquisite Dentistry\n\nIf you would like to talk through treatment, call (323) 272-2388 or [request a consultation](/schedule-consultation/).'
    )
    .replace(/^### CONTACT EXQUISITE DENTISTRY\s*$/gim, '### Contact Exquisite Dentistry')
    .replace(/experience true luxury\.?/gi, 'visit our Los Angeles studio.');

const decorateGeneratedImages = (html) =>
  html.replace(/<img\b([^>]*?)>/gi, (_match, attrs) => {
    const hasClass = /\bclass=/i.test(attrs);
    const classAttr = hasClass
      ? attrs.replace(/\bclass=(["'])(.*?)\1/i, 'class=$1$2 max-w-full h-auto rounded-xl$1')
      : `${attrs} class="max-w-full h-auto rounded-xl"`;
    const withLoading = /\bloading=/i.test(classAttr) ? classAttr : `${classAttr} loading="lazy"`;
    const withAlt = /\balt=/i.test(withLoading) ? withLoading : `${withLoading} alt=""`;
    return `<img${withAlt}>`;
  });

const prepareImportedMarkdown = (rawMarkdown) => {
  const decoded = decodeWordpressEntities(rawMarkdown);
  const withoutBoilerplate = replaceLegacyCtaBoilerplate(decoded);
  return repairOrphanMarkdownHeadings(withoutBoilerplate);
};

const tokenizeHeading = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2);

const shouldRemoveHeading = (headingText, title) => {
  const headingTokens = tokenizeHeading(headingText);
  const titleTokens = tokenizeHeading(title);
  if (!headingTokens.length || !titleTokens.length) return false;

  const overlap = headingTokens.filter(token => titleTokens.includes(token)).length;
  const coverage = overlap / Math.max(titleTokens.length, 1);
  return coverage >= 0.6;
};

const stripDuplicateHeading = (html, title) => {
  const headingRegex = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i;
  const match = headingRegex.exec(html);
  if (!match) return html;

  const headingText = stripHtml(match[1]);
  if (!shouldRemoveHeading(headingText, title)) {
    return html;
  }

  return `${html.slice(0, match.index)}${html.slice(match.index + match[0].length)}`.trim();
};

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

const canonicalizeTitle = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token && !CANONICAL_STOPWORDS.has(token))
    .join('-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const hashContent = (text) => {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return hash;
};

const loadExistingIdentifiers = async () => {
  const baseContent = await fs.readFile(BASE_BLOG_FILE, 'utf-8');

  const slugRegex = /(?<![A-Za-z])slug:\s*'([^']+)'/g;
  const sourceSlugRegex = /sourceSlug:\s*'([^']+)'/g;
  const titleRegex = /(?<![A-Za-z])title:\s*'([^']+)'/g;
  const contentRegex = /content:\s*`([^`]+)`/g;

  const identifiers = {
    slugs: new Set(),
    sourceSlugs: new Set(),
    titles: new Set(),
    canonicalTitles: new Set(),
    contentHashes: new Set()
  };

  let match;
  while ((match = slugRegex.exec(baseContent))) {
    identifiers.slugs.add(match[1]);
  }

  while ((match = sourceSlugRegex.exec(baseContent))) {
    identifiers.sourceSlugs.add(match[1]);
  }

  while ((match = titleRegex.exec(baseContent))) {
    const normalized = normalizeTitle(match[1]);
    identifiers.titles.add(normalized);
    const canonical = canonicalizeTitle(match[1]);
    if (canonical) {
      identifiers.canonicalTitles.add(canonical);
    }
  }

  while ((match = contentRegex.exec(baseContent))) {
    const cleaned = stripHtml(match[1] || '').toLowerCase();
    if (cleaned) {
      identifiers.contentHashes.add(hashContent(cleaned));
    }
  }

  return identifiers;
};

const MIN_DATE = new Date('2020-01-01');
const MAX_DATE = new Date('2025-11-08');

const pickDistributedDate = (index, total) => {
  const minTime = MIN_DATE.getTime();
  const maxTime = MAX_DATE.getTime();
  if (total <= 1) return new Date(maxTime);
  const ratio = index / (total - 1);
  const timestamp = minTime + ratio * (maxTime - minTime);
  return new Date(timestamp);
};

const buildPostObject = async (fileName, dedupeState, index, total) => {
  const slug = fileName.replace(/\.txt$/i, '');
  if (dedupeState.slugs.has(slug) || dedupeState.sourceSlugs.has(slug)) {
    return null;
  }

  const filePath = path.join(CONTENT_DIR, fileName);
  const raw = await fs.readFile(filePath, 'utf-8');

  const lines = raw.split(/\r?\n/);
  let idx = 0;
  while (idx < lines.length && !lines[idx].trim()) {
    idx += 1;
  }

  if (idx >= lines.length) {
    return null;
  }

  let titleLine = decodeWordpressEntities(lines[idx].trim());
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

  const body = prepareImportedMarkdown(lines.slice(idx).join('\n').trim());

  if (!title || !body) {
    return null;
  }

  const normalizedTitle = normalizeTitle(title);
  const canonicalTitle = canonicalizeTitle(title);
  if (dedupeState.titles.has(normalizedTitle) || (canonicalTitle && dedupeState.canonicalTitles.has(canonicalTitle))) {
    return null;
  }

  const excerpt = decodeWordpressEntities(extractExcerpt(body));
  const tags = slugToTags(slug);
  const category = chooseCategory(slug);
  const rawHtmlContent = marked.parse(body).trim();
  const htmlContentBody = decorateGeneratedImages(stripDuplicateHeading(rawHtmlContent, title));
  const cleanedContent = stripHtml(htmlContentBody).toLowerCase();
  const contentHash = hashContent(cleanedContent.slice(0, 5000));

  if (dedupeState.contentHashes.has(contentHash)) {
    return null;
  }

  const readTime = computeReadTime(stripHtml(htmlContentBody));
  const distributedDate = pickDistributedDate(index, total);
  const date = formatDate(distributedDate);
  const publishedAt = distributedDate.toISOString().split('T')[0];

  dedupeState.slugs.add(slug);
  dedupeState.titles.add(normalizedTitle);
  if (canonicalTitle) {
    dedupeState.canonicalTitles.add(canonicalTitle);
  }
  dedupeState.contentHashes.add(contentHash);

  return {
    id: slug,
    title,
    slug,
    excerpt,
    content: `<div class="prose prose-lg max-w-none">
        ${htmlContentBody}
      </div>`,
    author: AUTHOR,
    authorBio: AUTHOR_BIO,
    date,
    publishedAt,
    ...(MODIFIED_AT_OVERRIDES[slug] ? { modifiedAt: MODIFIED_AT_OVERRIDES[slug] } : {}),
    readTime,
    category,
    tags,
    ...(FEATURED_IMAGE_OVERRIDES[slug] ? { featuredImage: FEATURED_IMAGE_OVERRIDES[slug] } : {}),
    seoTitle: SEO_OVERRIDES[slug]?.seoTitle ?? title,
    seoDescription: SEO_OVERRIDES[slug]?.seoDescription ?? excerpt,
    seoKeywords: tags.join(', '),
    published: !UNPUBLISHED_SLUGS.has(slug)
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

    const identifiers = await loadExistingIdentifiers();
    const dedupeState = {
      slugs: new Set(identifiers.slugs),
      sourceSlugs: new Set(identifiers.sourceSlugs),
      titles: new Set(identifiers.titles),
      canonicalTitles: new Set(identifiers.canonicalTitles),
      contentHashes: new Set(identifiers.contentHashes)
    };

    const posts = [];

    const sortedFiles = txtFiles.sort();
    const totalFiles = sortedFiles.length;

    for (let i = 0; i < sortedFiles.length; i += 1) {
      const fileName = sortedFiles[i];
      const post = await buildPostObject(fileName, dedupeState, i, totalFiles);
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

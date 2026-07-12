/**
 * Generates src/data/blogIndex.json — a lightweight index of published blog
 * posts (no `content`/`faqs`/SEO bodies). List surfaces like RelatedArticles
 * import this instead of the full 385KB blog dataset, so service/money pages no
 * longer bundle every post body just to render four related-article cards.
 *
 * Run as part of `npm run build` (before vite build).
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  getPublishedPosts,
  getBlogPostTimestamp,
  getBlogPostIsoDate,
} from "../src/data/blogPosts";

// type-only import (erased at runtime) — a value import here would load
// blogIndex.json, the very file this script writes
import type { BlogIndexEntry } from "../src/data/blogIndex";

const OUTPUT_PATH = path.join(process.cwd(), "src", "data", "blogIndex.json");

const buildIndex = (): BlogIndexEntry[] =>
  getPublishedPosts().map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    readTime: post.readTime,
    date: post.date,
    author: post.author,
    featuredImage: post.featuredImage,
    isoDate: getBlogPostIsoDate(post),
    timestamp: getBlogPostTimestamp(post),
  }));

const index = buildIndex();
await writeFile(OUTPUT_PATH, JSON.stringify(index), "utf8");
// eslint-disable-next-line no-console
console.log(`📝 Generated blog index (${index.length} posts): ${OUTPUT_PATH}`);

#!/usr/bin/env node

import fs from "fs";
import path from "path";

import { ROUTE_METADATA } from "../src/constants/metadata.ts";
import { servicePageConfigs } from "../src/data/servicePages.ts";
import { locationPageConfigs } from "../src/data/locationPages.ts";
import { getPublishedPosts } from "../src/data/blogPosts.ts";
import { normalizeInternalHref } from "../src/utils/normalizeInternalHref.ts";

type SearchItemType = "page" | "service" | "location" | "blog";

interface SearchIndexItem {
  id: string;
  type: SearchItemType;
  title: string;
  href: string;
  description?: string;
  keywords?: string[];
}

interface SearchIndexFile {
  version: 1;
  items: SearchIndexItem[];
}

const ensureDir = (dirPath: string) => {
  if (fs.existsSync(dirPath)) return;
  fs.mkdirSync(dirPath, { recursive: true });
};

const splitKeywords = (keywords?: string): string[] => {
  if (!keywords) return [];
  return keywords
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
};

const uniq = (values: string[]): string[] => {
  const seen = new Set<string>();
  const output: string[] = [];
  values.forEach((value) => {
    const normalized = value.trim();
    if (!normalized) return;
    const key = normalized.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    output.push(normalized);
  });
  return output;
};

const normalizeHref = (href: string): string => normalizeInternalHref(href);

const buildSearchIndex = (): SearchIndexFile => {
  const items: SearchIndexItem[] = [];
  const dedupeByHref = new Map<string, SearchIndexItem>();

  const addItem = (item: Omit<SearchIndexItem, "id">) => {
    const href = normalizeHref(item.href);
    const key = href.toLowerCase();
    if (dedupeByHref.has(key)) return;

    const normalizedItem: SearchIndexItem = {
      ...item,
      href,
      id: `${item.type}:${href}`,
      keywords: item.keywords?.length ? uniq(item.keywords) : undefined,
    };

    dedupeByHref.set(key, normalizedItem);
    items.push(normalizedItem);
  };

  const serviceHrefs = new Set(
    Object.values(servicePageConfigs).map((config) => normalizeHref(`/${config.slug}`)),
  );
  const locationHrefs = new Set(
    Object.values(locationPageConfigs).map((config) => normalizeHref(`/${config.slug}`)),
  );

  Object.entries(servicePageConfigs).forEach(([slug, config]) => {
    addItem({
      type: "service",
      title: config.title,
      description: config.seo.description,
      href: `/${slug}`,
      keywords: config.seo.keywords,
    });
  });

  Object.entries(locationPageConfigs).forEach(([slug, config]) => {
    addItem({
      type: "location",
      title: `${config.cityLabel} Dentist`,
      description: config.seo.description,
      href: `/${slug}`,
      keywords: config.seo.keywords,
    });
  });

  Object.entries(ROUTE_METADATA).forEach(([href, meta]) => {
    const normalized = normalizeHref(href);
    if (serviceHrefs.has(normalized) || locationHrefs.has(normalized)) return;

    addItem({
      type: "page",
      title: meta.title,
      description: meta.description,
      href,
      keywords: splitKeywords(meta.keywords),
    });
  });

  getPublishedPosts().forEach((post) => {
    addItem({
      type: "blog",
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      keywords: uniq([post.category, ...(post.tags ?? []), ...(post.sourceSlug ? [post.sourceSlug] : []), ...splitKeywords(post.seoKeywords)]),
    });
  });

  const typeOrder: Record<SearchItemType, number> = {
    service: 0,
    location: 1,
    page: 2,
    blog: 3,
  };

  items.sort((a, b) => {
    const typeDiff = typeOrder[a.type] - typeOrder[b.type];
    if (typeDiff !== 0) return typeDiff;
    return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
  });

  return { version: 1, items };
};

const writeSearchIndex = (outputPath: string, data: SearchIndexFile) => {
  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
};

const generateSearchIndex = () => {
  try {
    console.log("🔎 Generating search index...");

    const searchIndex = buildSearchIndex();

    const publicPath = path.join(process.cwd(), "public", "search-index.json");
    writeSearchIndex(publicPath, searchIndex);

    const distDir = path.join(process.cwd(), "dist");
    if (fs.existsSync(distDir)) {
      const distPath = path.join(distDir, "search-index.json");
      writeSearchIndex(distPath, searchIndex);
    }

    console.log(`✅ Search index generated successfully!`);
    console.log(`📍 Location: /public/search-index.json`);
    if (fs.existsSync(path.join(process.cwd(), "dist"))) {
      console.log(`📍 Location: /dist/search-index.json`);
    }
    console.log(`🔢 Items included: ${searchIndex.items.length}`);
  } catch (error) {
    console.error("❌ Search index generation failed:", error);
    process.exit(1);
  }
};

if (process.argv[1] === new URL(import.meta.url).pathname) {
  generateSearchIndex();
}

export default generateSearchIndex;


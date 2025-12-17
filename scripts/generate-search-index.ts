#!/usr/bin/env node

import fs from "fs";
import path from "path";

import { ROUTE_METADATA } from "../src/constants/metadata.ts";
import { servicePageConfigs } from "../src/data/servicePages.ts";
import { locationPageConfigs } from "../src/data/locationPages.ts";
import { getPublishedPosts } from "../src/data/blogPosts.ts";
import { transformationStories } from "../src/data/transformationStories.ts";
import { normalizeInternalHref } from "../src/utils/normalizeInternalHref.ts";
import { manualPages } from "./prerender-static.ts";

type SearchItemType = "page" | "service" | "location" | "blog";

interface SearchIndexItem {
  id: string;
  type: SearchItemType;
  title: string;
  href: string;
  description?: string;
  h1?: string;
  keywords?: string[];
}

interface SearchIndexFile {
  version: 2;
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
  type SearchIndexDraft = Omit<SearchIndexItem, "id">;

  const byHref = new Map<string, SearchIndexDraft>();

  const typeRank: Record<SearchItemType, number> = {
    page: 0,
    location: 1,
    service: 2,
    blog: 3,
  };

  const normalizeComparable = (value?: string) => (value ?? "").trim().toLowerCase();

  const mergeDrafts = (existing: SearchIndexDraft, incoming: SearchIndexDraft): SearchIndexDraft => {
    const existingRank = typeRank[existing.type];
    const incomingRank = typeRank[incoming.type];

    const primary = incomingRank > existingRank ? incoming : existing;
    const secondary = primary === existing ? incoming : existing;

    const primaryH1 = primary.h1?.trim();
    const secondaryH1 = secondary.h1?.trim();

    const mergedKeywords = uniq([
      ...(primary.keywords ?? []),
      ...(secondary.keywords ?? []),
      ...(primaryH1 && secondaryH1 && normalizeComparable(primaryH1) !== normalizeComparable(secondaryH1)
        ? [secondaryH1]
        : []),
    ]);

    return {
      type: primary.type,
      href: primary.href,
      title: primary.title || secondary.title,
      description: primary.description || secondary.description,
      h1: primaryH1 || secondaryH1,
      keywords: mergedKeywords.length ? mergedKeywords : undefined,
    };
  };

  const upsertItem = (item: SearchIndexDraft) => {
    const href = normalizeHref(item.href);
    const key = href.toLowerCase();

    const normalizedItem: SearchIndexDraft = {
      ...item,
      href,
      keywords: item.keywords?.length ? uniq(item.keywords) : undefined,
      h1: item.h1?.trim() || undefined,
    };

    const existing = byHref.get(key);
    byHref.set(key, existing ? mergeDrafts(existing, normalizedItem) : normalizedItem);
  };

  const serviceHrefs = new Set(
    Object.values(servicePageConfigs).map((config) => normalizeHref(`/${config.slug}`)),
  );
  const locationHrefs = new Set(
    Object.values(locationPageConfigs).map((config) => normalizeHref(`/${config.slug}`)),
  );

  manualPages.forEach((route) => {
    upsertItem({
      type: "page",
      title: route.title,
      description: route.description,
      href: route.path,
      h1: route.h1,
    });
  });

  Object.entries(servicePageConfigs).forEach(([slug, config]) => {
    upsertItem({
      type: "service",
      title: config.title,
      description: config.seo.description,
      href: `/${slug}`,
      h1: config.hero.heading,
      keywords: config.seo.keywords,
    });
  });

  Object.entries(locationPageConfigs).forEach(([slug, config]) => {
    upsertItem({
      type: "location",
      title: `${config.cityLabel} Dentist`,
      description: config.seo.description,
      href: `/${slug}`,
      h1: config.hero.heading,
      keywords: config.seo.keywords,
    });
  });

  Object.entries(ROUTE_METADATA).forEach(([href, meta]) => {
    const normalized = normalizeHref(href);
    if (serviceHrefs.has(normalized) || locationHrefs.has(normalized)) return;

    upsertItem({
      type: "page",
      title: meta.title,
      description: meta.description,
      href,
      keywords: splitKeywords(meta.keywords),
    });
  });

  getPublishedPosts().forEach((post) => {
    upsertItem({
      type: "blog",
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      h1: post.title,
      keywords: uniq([post.category, ...(post.tags ?? []), ...(post.sourceSlug ? [post.sourceSlug] : []), ...splitKeywords(post.seoKeywords)]),
    });
  });

  transformationStories.forEach((story) => {
    upsertItem({
      type: "page",
      title: story.title,
      description: story.shortDescription || story.seo.description,
      href: `/transformation-stories/${story.slug}`,
      h1: story.title,
      keywords: uniq([
        ...(story.patientName ? [story.patientName] : []),
        ...(story.location ? [story.location] : []),
        ...splitKeywords(story.seo.keywords),
      ]),
    });
  });

  const typeOrder: Record<SearchItemType, number> = {
    service: 0,
    location: 1,
    page: 2,
    blog: 3,
  };

  const items: SearchIndexItem[] = Array.from(byHref.values()).map((item) => ({
    ...item,
    id: `${item.type}:${item.href}`,
    keywords: item.keywords?.length ? uniq(item.keywords) : undefined,
  }));

  items.sort((a, b) => {
    const typeDiff = typeOrder[a.type] - typeOrder[b.type];
    if (typeDiff !== 0) return typeDiff;
    return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
  });

  return { version: 2, items };
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

#!/usr/bin/env tsx

import { generateSitemapData } from '@/utils/sitemapGenerator';
import { getCanonicalUrl } from '@/utils/schemaValidation';

interface ValidationIssue {
  url: string;
  problem: string;
}

const EXPECTED_HOST = 'exquisitedentistryla.com';

const validateSitemapCanonicals = () => {
  const sitemapEntries = generateSitemapData();
  const issues: ValidationIssue[] = [];
  const seen = new Map<string, string[]>();

  for (const entry of sitemapEntries) {
    const { loc } = entry;

    let parsed: URL;
    try {
      parsed = new URL(loc);
    } catch (error) {
      issues.push({ url: loc, problem: `Invalid URL (${(error as Error).message})` });
      continue;
    }

    if (parsed.protocol !== 'https:') {
      issues.push({ url: loc, problem: `Protocol should be https, received ${parsed.protocol}` });
    }

    if (parsed.hostname !== EXPECTED_HOST) {
      issues.push({ url: loc, problem: `Unexpected hostname ${parsed.hostname}` });
    }

    const canonical = getCanonicalUrl(parsed.pathname || '/');
    if (loc !== canonical) {
      issues.push({ url: loc, problem: `Expected ${canonical}` });
    }

    const normalizedPath = parsed.pathname || '/';
    const recorded = seen.get(normalizedPath) ?? [];
    recorded.push(loc);
    seen.set(normalizedPath, recorded);
  }

  for (const [path, urls] of seen.entries()) {
    if (urls.length > 1) {
      issues.push({ url: urls.join(', '), problem: `Duplicate entries for path ${path}` });
    }
  }

  return issues;
};

const main = () => {
  const issues = validateSitemapCanonicals();

  if (issues.length === 0) {
    console.log('✅ Canonical validation passed – sitemap URLs already match getCanonicalUrl outputs.');
    process.exit(0);
  }

  console.error('❌ Canonical validation found issues:\n');
  for (const issue of issues) {
    console.error(` • ${issue.url} → ${issue.problem}`);
  }
  process.exit(1);
};

main();

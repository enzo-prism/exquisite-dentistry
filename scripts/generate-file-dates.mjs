#!/usr/bin/env node
/**
 * Generates src/data/pageLastmod.json — a map of source-file path -> real last
 * modification date (YYYY-MM-DD), used for honest <lastmod> values in the
 * sitemap. Previously the sitemap fabricated dates from a hash of the path,
 * which Google discounts. We prefer the git last-commit date and fall back to
 * the filesystem mtime, then to the build date.
 *
 * Runs in the build before generate-sitemap. sitemapGenerator.ts imports the
 * resulting JSON (safe in the browser bundle — it's just static data).
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, 'src', 'pages');

const toIsoDate = (date) => date.toISOString().split('T')[0];

const gitLastCommitDate = (relativePath) => {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${relativePath}"`, {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : '';
  } catch {
    return '';
  }
};

const buildDate = toIsoDate(new Date());
const map = { __generatedAt: buildDate };

const files = fs
  .readdirSync(PAGES_DIR)
  .filter((name) => name.endsWith('.tsx'));

for (const name of files) {
  const relativePath = `src/pages/${name}`;
  const gitDate = gitLastCommitDate(relativePath);
  let date = gitDate;
  if (!date) {
    try {
      date = toIsoDate(fs.statSync(path.join(PAGES_DIR, name)).mtime);
    } catch {
      date = buildDate;
    }
  }
  map[relativePath] = date;
}

const outPath = path.join(ROOT, 'src', 'data', 'pageLastmod.json');
fs.writeFileSync(outPath, JSON.stringify(map, null, 0), 'utf8');
console.log(`🗓️  Generated page lastmod map (${Object.keys(map).length - 1} pages): ${outPath}`);

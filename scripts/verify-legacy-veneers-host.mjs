/**
 * Eggbot-style vsim pass: every sitemap + WP path from the retired host
 * must land on a 200 /veneers page, and main-site hosts must match main.
 */
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { follow, load } from './vsim.mjs';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const headCfg = path.join(root, 'vercel.json');
const mainCfg = path.join(mkdtempSync(path.join(tmpdir(), 'veneers-main-')), 'vercel.json');
writeFileSync(mainCfg, execFileSync('git', ['show', 'origin/main:vercel.json']));

const sitemap = [...readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
const wp = [
  '/feed/',
  '/feed',
  '/comments/feed/',
  '/tag/veneers/',
  '/wp-admin/',
  '/wp-json/',
  '/wp-json/wp/v2/posts',
  '/wp-content/x',
  '/wp-content/uploads/2024/01/a.jpg',
  '/page/2/',
  '/blog/page/3/',
  '/category/choosing-veneers/page/2/',
  '/author/nkraus/page/3/',
  '/xmlrpc.php',
  '/ABOUT/',
  '/some-unknown-post/',
  '/veneers/',
  '/zoom-whitening/',
  '/about/feed/',
  '/robots.txt',
  '/sitemap.xml',
];

const head = load(headCfg, distDir);
const main = load(mainCfg, distDir);
const veneersHosts = ['exquisiteveneersla.com', 'www.exquisiteveneersla.com'];

const isVeneersDest = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'exquisitedentistryla.com' && parsed.pathname.startsWith('/veneers');
  } catch {
    return false;
  }
};

const summarize = (hops) => hops.map((h) => `${h.status}${h.location ? `→${h.location}` : ''}`).join(' | ');

const legacy = { ok: 0, bad: [] };
for (const host of veneersHosts) {
  for (const p of [...sitemap, ...wp]) {
    const hops = follow(head, `https://${host}${p}`);
    const last = hops.at(-1);
    const redirects = hops.filter((h) => h.location);
    const firstRedirect = redirects[0];
    const oneHop = !firstRedirect || isVeneersDest(firstRedirect.location) || (redirects.length === 1 && last.status === 200);
    const lands =
      last.status === 200 &&
      isVeneersDest(last.url) &&
      (redirects.length === 0 ? p.startsWith('/veneers') : redirects.every((h) => isVeneersDest(h.location) || h.status === 308));
    if (lands && last.status === 200 && isVeneersDest(last.url)) {
      legacy.ok += 1;
    } else {
      legacy.bad.push({ host, path: p, chain: summarize(hops), oneHop, final: last.url, status: last.status });
    }
  }
}

const app = [...readFileSync(path.join(root, 'src/App.tsx'), 'utf8').matchAll(/path="([^"]*)"/g)]
  .map((m) => m[1])
  .filter((p) => !p.includes(':') && !p.includes('*'));
const cfg = JSON.parse(readFileSync(headCfg, 'utf8'));
const redirSrc = cfg.redirects.map((r) => r.source).filter((s) => !/[:*(]/.test(s));
const legacyUrls = readFileSync(path.join(root, 'scripts/redirect-tests/legacy-urls.txt'), 'utf8')
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith('#'));
const extra = [
  '/',
  '/wp-admin/',
  '/wp-json/',
  '/wp-content/x',
  '/feed/',
  '/feed',
  '/sitemap.xml',
  '/robots.txt',
  '/favicon.ico',
  '/.well-known/security.txt',
  '/index.html',
  '/veneers/index.html',
  '/zzz/',
  '/zzz',
];
const base = new Set([...sitemap, ...app, ...redirSrc, ...legacyUrls, ...extra]);
const paths = new Set();
for (const p of base) {
  const q = p.startsWith('/') ? p : `/${p}`;
  paths.add(q);
  paths.add(q.endsWith('/') && q !== '/' ? q.slice(0, -1) : `${q}/`);
}
const mainHosts = [
  'exquisitedentistryla.com',
  'www.exquisitedentistryla.com',
  'exquisite-dentistry-git-feature-x-prism.vercel.app',
  'exquisite-dentistry.vercel.app',
];
const diffs = [];
let comparisons = 0;
for (const h of mainHosts) {
  for (const p of paths) {
    for (const s of ['', '?utm_source=x']) {
      comparisons += 1;
      const a = JSON.stringify(main(h, p, s));
      const b = JSON.stringify(head(h, p, s));
      if (a !== b) diffs.push({ h, p, s, main: a, head: b });
    }
  }
}

const report = {
  sitemap: sitemap.length,
  wp: wp.length,
  legacyHostCases: veneersHosts.length * (sitemap.length + wp.length),
  legacyHostOk: legacy.ok,
  legacyHostBad: legacy.bad,
  mainSiteComparisons: comparisons,
  mainSiteDiffs: diffs.length,
  mainSiteDiffSamples: diffs.slice(0, 10),
};
console.log(JSON.stringify(report, null, 2));
if (legacy.bad.length || diffs.length) process.exitCode = 1;

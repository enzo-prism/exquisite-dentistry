/**
 * Rebuild the host-scoped exquisiteveneersla.com block at the top of
 * vercel.json from the archive manifest. The committed fixture at
 * scripts/redirect-tests/legacy-veneers-host-map.json is the expected
 * table — this script does not overwrite it.
 *
 * Usage: node scripts/generate-legacy-veneers-host-redirects.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { buildLegacyVeneersHostRedirects, isHostScoped } from './legacy-veneers-host-redirects.mjs';

const vercelPath = 'vercel.json';
const manifestPath = 'src/constants/legacyVeneersManifest.json';

const cfg = JSON.parse(await readFile(vercelPath, 'utf8'));
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const generated = buildLegacyVeneersHostRedirects(manifest.pages);
const existing = (cfg.redirects ?? []).filter((rule) => !isHostScoped(rule));

cfg.redirects = [...generated, ...existing];
await writeFile(vercelPath, `${JSON.stringify(cfg, null, 2)}\n`);

console.log(
  `Wrote ${generated.length} host-scoped veneers redirects and ${existing.length} existing rules to ${vercelPath}`,
);

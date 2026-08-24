#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUTPUT_PATH = path.resolve('src/data/demandForceReviews.generated.ts');

const normalizeKey = (value) => String(value || '').trim().toLowerCase().replace(/[\s_-]+/g, '');

const FIELD_ALIASES = {
  name: ['name', 'reviewer', 'reviewername', 'author', 'patientname'],
  rating: ['rating', 'stars', 'starrating'],
  quote: ['quote', 'review', 'reviewtext', 'comment', 'comments', 'body'],
  publishedDate: ['date', 'reviewdate', 'publisheddate', 'createdat'],
  externalId: ['id', 'reviewid', 'externalid']
};

const parseCsvRows = (source) => {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && next === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
};

const pick = (record, aliases) => {
  const entry = Object.entries(record).find(([key]) => aliases.includes(normalizeKey(key)));
  return entry?.[1];
};

const parseInput = (inputPath, source) => {
  if (path.extname(inputPath).toLowerCase() === '.json') {
    const parsed = JSON.parse(source);
    if (!Array.isArray(parsed)) throw new Error('Demand Force JSON must contain an array of reviews.');
    return parsed;
  }

  const rows = parseCsvRows(source);
  if (rows.length < 2) throw new Error('Demand Force CSV must include a header and at least one review.');
  const [headers, ...values] = rows;
  return values.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));
};

const normalizeReview = (record, index) => {
  const name = String(pick(record, FIELD_ALIASES.name) || '').trim();
  const quote = String(pick(record, FIELD_ALIASES.quote) || '').trim();
  const rating = Number(pick(record, FIELD_ALIASES.rating));
  const rawDate = String(pick(record, FIELD_ALIASES.publishedDate) || '').trim();
  const externalId = String(pick(record, FIELD_ALIASES.externalId) || '').trim();

  if (!name || !quote || !Number.isFinite(rating) || rating < 1 || rating > 5) {
    throw new Error(`Review ${index + 1} needs a reviewer name, review text, and rating from 1 to 5.`);
  }

  let publishedDate;
  if (rawDate) {
    const parsed = new Date(rawDate);
    if (Number.isNaN(parsed.valueOf())) throw new Error(`Review ${index + 1} has an invalid date.`);
    publishedDate = parsed.toISOString().slice(0, 10);
  }

  return {
    name,
    rating,
    quote,
    source: 'Demand Force',
    ...(publishedDate ? { publishedDate } : {}),
    ...(externalId ? { externalId } : {})
  };
};

export const importDemandForceReviews = (inputPath, source) => {
  const normalized = parseInput(inputPath, source).map(normalizeReview);
  const deduped = new Map();

  for (const review of normalized) {
    const key = review.externalId || `${review.name.toLowerCase()}::${review.quote.toLowerCase()}`;
    deduped.set(key, review);
  }

  return [...deduped.values()];
};

export const renderReviewModule = (reviews) => `import type { FeaturedReview } from '@/data/featuredReviews';

/** Generated from a reviewed Demand Force export. Do not edit by hand. */
export const demandForceReviews: FeaturedReview[] = ${JSON.stringify(reviews, null, 2)};
`;

const run = async () => {
  const inputPath = process.argv[2];
  if (!inputPath) {
    throw new Error('Usage: node scripts/import-demandforce-reviews.mjs <export.csv|export.json>');
  }

  const source = await readFile(path.resolve(inputPath), 'utf8');
  const reviews = importDemandForceReviews(inputPath, source);
  await writeFile(OUTPUT_PATH, renderReviewModule(reviews), 'utf8');
  process.stdout.write(`Imported ${reviews.length} Demand Force reviews into ${OUTPUT_PATH}\n`);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}

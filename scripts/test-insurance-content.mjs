#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'dist', 'insurance', 'index.html');
const searchIndexPath = path.join(root, 'public', 'search-index.json');

const errors = [];

const stripTags = (value) =>
  value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractJsonLdBlocks = (html) => {
  const blocks = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html))) {
    blocks.push(match[1].trim());
  }
  return blocks;
};

const flattenSchema = (schema) => {
  if (!schema || typeof schema !== 'object') return [];
  if (Array.isArray(schema)) return schema.flatMap(flattenSchema);
  if (Array.isArray(schema['@graph'])) return schema['@graph'];
  return [schema];
};

const assertIncludes = (label, source, expected) => {
  if (!source.includes(expected)) errors.push(`${label} missing required copy: ${expected}`);
};

const assertNotMatches = (label, source, pattern) => {
  if (pattern.test(source)) errors.push(`${label} contains banned copy matching ${pattern}`);
};

if (!existsSync(htmlPath)) {
  errors.push(`Missing built insurance HTML at ${htmlPath}. Run npm run build first.`);
} else {
  const html = readFileSync(htmlPath, 'utf8');
  const normalizedHtml = html.replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  const visibleText = stripTags(html);

  [
    'Dental Insurance Accepted in Los Angeles',
    "If you have a PPO dental insurance plan, there's a strong chance we can help you use your benefits",
    'Guardian PPO',
    'Guardian Advantage PPO',
    'We are preparing to support additional PPO access through the Zealous Network',
    'We may be able to work with MetLife PPO members',
    'Cherry financing',
    'FAQPage',
    'tel:+13232722388',
    '/contact/#contact-form',
  ].forEach((copy) => assertIncludes('insurance HTML', normalizedHtml, copy));

  [
    /\bdirect in-network\b/i,
    /\bpartner billing\b/i,
    /\bbilling contracts?\b/i,
    /\ball PPO plans accepted\b/i,
    /\bMetLife accepted\b/i,
    /\bwe most likely accept\b/i,
    /\bMost PPO plans accepted\b/i,
  ].forEach((pattern) => {
    assertNotMatches('insurance HTML', visibleText, pattern);
    assertNotMatches('insurance source', html, pattern);
  });

  const schemas = [];
  for (const block of extractJsonLdBlocks(html)) {
    try {
      schemas.push(...flattenSchema(JSON.parse(block)));
    } catch (error) {
      errors.push(`Invalid JSON-LD block: ${error.message}`);
    }
  }

  const faqSchemas = schemas.filter((schema) => schema['@type'] === 'FAQPage');
  if (!faqSchemas.length) {
    errors.push('Missing FAQPage JSON-LD schema on insurance page.');
  }

  const faqQuestions = faqSchemas.flatMap((schema) =>
    Array.isArray(schema.mainEntity) ? schema.mainEntity.map((item) => item.name) : [],
  );

  [
    'Do you accept PPO dental insurance?',
    'What if I do not see my insurance carrier listed?',
    'Do you accept MetLife PPO insurance?',
    'Do you work with Guardian PPO?',
    'Do you work with the Zealous Network?',
    'Can you verify my benefits before treatment?',
    'Can I use insurance for cosmetic dentistry?',
    'Do you offer financing if insurance does not cover cosmetic treatment?',
  ].forEach((question) => {
    if (!faqQuestions.includes(question)) {
      errors.push(`FAQ schema missing visible question: ${question}`);
    }
  });
}

if (!existsSync(searchIndexPath)) {
  errors.push(`Missing search index at ${searchIndexPath}.`);
} else {
  const searchIndex = readFileSync(searchIndexPath, 'utf8');
  [
    /\bMetLife dentist Los Angeles\b/i,
    /\bCigna dentist Los Angeles\b/i,
    /\bPrincipal dentist Los Angeles\b/i,
    /\bProSense dentist Los Angeles\b/i,
    /\bEmeritus dentist Los Angeles\b/i,
  ].forEach((pattern) => assertNotMatches('search index', searchIndex, pattern));
}

if (errors.length) {
  console.error('Insurance content regression failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Insurance content regression passed.');

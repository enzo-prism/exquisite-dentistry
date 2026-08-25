import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { CANONICAL_ANALYTICS_HOSTS } from '../utils/analyticsHost';

export const CANONICAL_ANALYTICS_TEST_HOST = CANONICAL_ANALYTICS_HOSTS[0];

export const LOCAL_AND_PREVIEW_ANALYTICS_HOSTS = [
  '127.0.0.1',
  'localhost',
  'exquisite-dentistry-git-main.vercel.app',
  'preview.lovable.app',
] as const;

export const installCanonicalAnalyticsHost = async (page: Page) => {
  await page.addInitScript((hostname) => {
    window.__EXQUISITE_ANALYTICS_TEST_HOST__ = hostname;
  }, CANONICAL_ANALYTICS_TEST_HOST);
};

export const installAnalyticsHostOverride = async (page: Page, hostname: string) => {
  await page.addInitScript((value) => {
    window.__EXQUISITE_ANALYTICS_TEST_HOST__ = value;
  }, hostname);
};

export const readIndexHtml = () => readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

export const extractInlineGoogleTagSnippet = (html = readIndexHtml()) => {
  const match = html.match(
    /<!-- Consent-aware Google tag[\s\S]*?<script>([\s\S]*?)<\/script>/,
  );
  if (!match?.[1]) {
    throw new Error('Could not find the inline Google tag snippet in index.html');
  }
  return match[1];
};

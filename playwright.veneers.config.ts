import { defineConfig } from '@playwright/test';

// Run against an already-started production preview or the published site.
// Providers are blocked or mocked; no real lead or appointment is submitted.
export default defineConfig({
  testDir: './src/__tests__',
  testMatch: ['legacy-veneers-navigation.spec.ts', 'veneers-shell.spec.ts', 'veneers-measurement.spec.ts'],
  outputDir: './test-results/veneers-production',
  timeout: 45_000,
  fullyParallel: true,
  workers: 2,
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.VENEERS_TEST_ORIGIN || 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});

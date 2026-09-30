import { test, expect } from '@playwright/test';
import { TWO_FRONT_VENEERS } from '../data/twoFrontVeneers';
import { buildSeoTitle, toMeta } from '../utils/seoText';

// This tests the production HTML path, not Vite's empty dev-server index.html.
const preview = process.env.TREATMENT_PREVIEW_URL;
test.skip(!preview, 'Set TREATMENT_PREVIEW_URL to a built preview server.');
const url = `${preview}${TWO_FRONT_VENEERS.path}/`;

test('complete treatment content and navigation work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(url);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(TWO_FRONT_VENEERS.h1);
  await expect(page.locator('[data-cost-answer]')).toHaveText(TWO_FRONT_VENEERS.answer);
  await expect(page.getByRole('link', { name: 'Plan a veneers consultation', exact: true })).toHaveAttribute('href', '/schedule-consultation/?service=porcelain-veneers');
  await expect(page.getByRole('link', { name: 'View veneer results in the smile gallery' })).toHaveAttribute('href', '/smile-gallery/?treatment=veneers');
  await page.getByText(TWO_FRONT_VENEERS.faqItems[0].question, { exact: true }).click();
  await expect(page.getByText(TWO_FRONT_VENEERS.faqItems[0].answer, { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await context.close();
});

test('hydration preserves the original content DOM and metadata without warnings', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => { if (/hydrat|did not match|server HTML|Minified React error/i.test(message.text())) errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const state = window as Window & { __initialTreatmentNode?: Element };
    const observer = new MutationObserver(() => {
      const node = document.querySelector('[data-shared-treatment]');
      if (node && !state.__initialTreatmentNode) { state.__initialTreatmentNode = node; observer.disconnect(); }
    });
    observer.observe(document, { subtree: true, childList: true });
  });
  await page.goto(url);
  await expect(page.locator('#root')).toHaveAttribute('data-treatment-hydrated', 'true');
  expect(await page.evaluate(() => {
    const state = window as Window & { __initialTreatmentNode?: Element };
    return state.__initialTreatmentNode === document.querySelector('[data-shared-treatment]');
  })).toBe(true);
  expect(errors).toEqual([]);
  await expect(page).toHaveTitle(buildSeoTitle(TWO_FRONT_VENEERS.title));
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', toMeta(TWO_FRONT_VENEERS.description));
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://exquisitedentistryla.com${TWO_FRONT_VENEERS.path}/`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(TWO_FRONT_VENEERS.h1);
  await expect(page.getByRole('region', { name: 'Analytics preferences' })).toBeVisible();
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Analytics preferences' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Privacy choices', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Analytics preferences' })).toBeVisible();
});

test('treatment booking link preserves service context outside the pilot', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('#root')).toHaveAttribute('data-treatment-hydrated', 'true');
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  // A normal treatment link preserves the booking context on the next page.
  await page.getByRole('link', { name: 'Plan a veneers consultation', exact: true }).click();
  await expect(page).toHaveURL(/\/schedule-consultation\/\?service=porcelain-veneers$/);
  await expect(page.locator('#root')).not.toHaveAttribute('data-treatment-pilot', 'two-front-veneers');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});


test('shared Navbar router links and browser back work across the pilot boundary', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('#root')).toHaveAttribute('data-treatment-hydrated', 'true');
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  await page.locator('header').getByRole('link', { name: 'Smile Gallery', exact: true }).first().click();
  await expect(page).toHaveURL(/\/smile-gallery\/?$/);
  await expect(page.locator('#root')).not.toHaveAttribute('data-treatment-pilot', 'two-front-veneers');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${TWO_FRONT_VENEERS.path}/?$`));
  // Browser history may return through App's SPA router; both entries render
  // the exact shared body and metadata, without requiring a document reload.
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(TWO_FRONT_VENEERS.h1);
  await expect(page.locator('[data-cost-answer]')).toHaveText(TWO_FRONT_VENEERS.answer);
  await expect(page).toHaveTitle(buildSeoTitle(TWO_FRONT_VENEERS.title));
});


test('a failed pilot chunk recovers through the established App route', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.route('**/assets/HydratedTreatmentPilot-*.js', route => route.abort());
  await page.goto(url);
  await expect(page.locator('#root')).not.toHaveAttribute('data-treatment-pilot', 'two-front-veneers');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(TWO_FRONT_VENEERS.h1);
  await expect(page.locator('[data-cost-answer]')).toHaveText(TWO_FRONT_VENEERS.answer);
  await expect(page.getByRole('region', { name: 'Analytics preferences' })).toBeVisible();
  expect(pageErrors).toEqual([]);
});

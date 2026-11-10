import { expect, test } from '@playwright/test';

const GUIDES = [
  {
    path: '/veneers/porcelain-vs-no-prep/',
    heading: 'Porcelain Veneers vs No-Prep Veneers in Los Angeles',
    title: /Porcelain vs No-Prep Veneers in Los Angeles/,
  },
  {
    path: '/veneers/vs-crowns-bonding/',
    heading: 'Veneers vs Crowns and Bonding in Los Angeles',
    title: /Veneers vs Crowns and Bonding in Los Angeles/,
  },
  {
    path: '/veneers/what-to-expect/',
    heading: 'The Veneer Process: What to Expect and Aftercare',
    title: /Veneer Process and Aftercare in Los Angeles/,
  },
] as const;

for (const guide of GUIDES) {
  test(`${guide.path} renders the main-site veneer guide`, async ({ page }) => {
    await page.goto(guide.path);
    await expect(page).toHaveTitle(guide.title);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(guide.heading);
    await expect(page.locator('main').getByRole('link', { name: 'Schedule Consultation' }).first()).toHaveAttribute(
      'href',
      /\/schedule-consultation\/\?service=porcelain-veneers/,
    );
    await expect(page.locator('nav[aria-label="Breadcrumb"]').getByRole('link', { name: 'Porcelain Veneers' })).toHaveAttribute(
      'href',
      '/veneers/',
    );
  });
}

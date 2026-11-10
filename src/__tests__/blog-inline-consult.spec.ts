import { expect, test } from '@playwright/test';

const SHORT_POSTS = [
  '/blog/how-hollywood-veneers-can-transform-your-smile/',
  '/blog/marijuana-use-increases-risk-gum-disease/',
] as const;

for (const path of SHORT_POSTS) {
  test(`inline consult card renders on ${path}`, async ({ page }) => {
    await page.goto(path);

    const card = page.locator('aside[aria-label="Consultation"]');
    await expect(card).toBeVisible();
    await expect(card.getByRole('link', { name: 'Schedule a consultation' })).toBeVisible();
    await expect(card.locator('a[href="tel:+13232722388"]')).toBeVisible();

    await expect(page.getByRole('link', { name: 'request a consultation' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Schedule Consultation' }).first()).toBeVisible();

    const visitCtaTogether = await page.evaluate(() => {
      const booking = [...document.querySelectorAll('p')].find((node) =>
        node.textContent?.includes('request a consultation'),
      );
      const tel = [...document.querySelectorAll('p')].find((node) =>
        node.textContent?.includes('to talk through a visit'),
      );
      if (!booking || !tel) return 'missing';
      let node = booking.nextElementSibling;
      while (node && node !== tel) {
        if (
          node instanceof HTMLElement &&
          (node.matches('aside') || node.hasAttribute('data-blog-inline-cta'))
        ) {
          return 'split';
        }
        node = node.nextElementSibling;
      }
      return node === tel ? 'together' : 'apart';
    });
    expect(visitCtaTogether).toBe('together');
  });
}

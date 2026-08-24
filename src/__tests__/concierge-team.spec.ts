import { expect, test } from '@playwright/test';

test.describe('privacy-safe website concierge', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Ask the Concierge' }).click();
  });

  test('answers fixed topics without collecting patient data', async ({ page }) => {
    const dialog = page.getByRole('dialog', { name: 'Website Concierge' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('textbox')).toHaveCount(0);
    await expect(dialog).toContainText('Please do not share health, insurance ID, or other private information');

    await dialog.getByRole('button', { name: 'Services' }).click();
    await expect(dialog.getByRole('status')).toContainText('veneers, Invisalign, whitening, implants');

    await dialog.getByRole('button', { name: 'Directions' }).click();
    await expect(dialog.getByRole('status').getByRole('link', { name: 'Open directions' })).toHaveAttribute(
      'href',
      /maps\.app\.goo\.gl/
    );

    await dialog.getByRole('button', { name: 'Scheduling' }).click();
    await expect(dialog.getByRole('status').getByRole('link', { name: 'Schedule a consultation' })).toHaveAttribute(
      'href',
      '/schedule-consultation/'
    );
  });

  test('offers Spanish and human escalation at all times', async ({ page }) => {
    const dialog = page.getByRole('dialog', { name: 'Website Concierge' });
    await dialog.getByRole('button', { name: 'Español' }).click();
    await expect(page.getByRole('dialog', { name: 'Concierge del Sitio' })).toContainText(
      'No comparta información de salud'
    );
    await expect(page.getByRole('link', { name: /Llamar al/ })).toHaveAttribute('href', 'tel:+13232722388');
    await expect(page.getByRole('link', { name: 'Programar Consulta' })).toHaveAttribute(
      'href',
      '/schedule-consultation/'
    );
  });
});

test.describe('team excellence page', () => {
  test('uses confirmed doctor facts and bundled reviews without unsupported totals', async ({ page }) => {
    await page.goto('/why-us/team-excellence/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('whole team communicates');
    await expect(page.getByText('UCLA School of Dentistry graduate', { exact: true })).toBeVisible();
    await expect(page.getByText('Invisalign Lifetime Achievement Award provider', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reviews that mention the team' })).toBeVisible();
    await expect(page.locator('body')).not.toContainText('356 reviews');
    await expect(page.locator('body')).not.toContainText('98.3%');
  });
});

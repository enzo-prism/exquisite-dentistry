import { expect, test, type Page } from '@playwright/test';
import {
  DEFAULT_VIDEO_HERO_POSTER,
  VIDEO_HERO_POSTERS_BY_ROUTE,
  getVideoHeroPosterForPath,
} from '../components/video-hero/route-posters';

const SHARED_POSTER = '/lovable-uploads/exquisite-black-gold-hero.png';

const preparePage = async (page: Page) => {
  await page.addInitScript(() => {
    localStorage.setItem('exquisite_analytics_consent_v1', 'denied');
  });
  await page.route('https://player.vimeo.com/**', (route) => route.abort());
  await page.route('https://files.withcherry.com/**', (route) => route.abort());
};

const heroPoster = (page: Page) =>
  page.locator(`section picture img[src="${SHARED_POSTER}"]`).first();

test('all video-backed hero routes resolve the canonical shared poster', () => {
  expect(DEFAULT_VIDEO_HERO_POSTER).toBe(SHARED_POSTER);
  expect(Object.keys(VIDEO_HERO_POSTERS_BY_ROUTE)).toHaveLength(21);

  for (const [route, poster] of Object.entries(VIDEO_HERO_POSTERS_BY_ROUTE)) {
    expect(poster).toBe(SHARED_POSTER);
    expect(getVideoHeroPosterForPath(route)).toBe(SHARED_POSTER);
    expect(getVideoHeroPosterForPath(`${route}/`)).toBe(SHARED_POSTER);
  }

  expect(getVideoHeroPosterForPath('/future-video-hero/')).toBe(SHARED_POSTER);
});

test('desktop hero keeps the poster until Vimeo playback actually starts', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparePage(page);
  await page.goto('/');

  const heading = page.getByRole('heading', { name: /Los Angeles Cosmetic Dentist/i });
  const poster = heroPoster(page);
  await expect(heading).toBeVisible();
  await expect(poster).toBeVisible();
  await expect(poster).toHaveAttribute('alt', '');
  await expect(poster).toHaveAttribute('aria-hidden', 'true');
  await expect(poster).toHaveAttribute('loading', 'eager');
  await expect(poster).toHaveAttribute('decoding', 'async');
  await expect(poster).toHaveAttribute('sizes', '100vw');
  await expect(poster).toHaveCSS('object-fit', 'cover');
  await expect(poster).toHaveCSS('opacity', '1');

  const iframe = page.locator('iframe[title="Background video"]');
  await expect(iframe).toBeAttached({ timeout: 8_000 });
  const iframeSrc = await iframe.getAttribute('src');
  const playerId = new URL(iframeSrc!, 'http://127.0.0.1').searchParams.get('player_id');
  expect(playerId).toBeTruthy();

  await page.evaluate((id) => {
    window.dispatchEvent(new MessageEvent('message', {
      origin: 'https://player.vimeo.com',
      data: { event: 'ready', player_id: id },
    }));
  }, playerId);
  await expect(poster).toHaveCSS('opacity', '1');

  await page.evaluate((id) => {
    window.dispatchEvent(new MessageEvent('message', {
      origin: 'https://player.vimeo.com',
      data: { event: 'playing', player_id: id },
    }));
  }, playerId);
  await expect(poster).toHaveCSS('opacity', '0');
  await expect(iframe).toHaveCSS('opacity', '1');
});

test('mobile static hero uses the same crop-safe poster without autoplay media', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await preparePage(page);
  await page.goto('/');

  const heading = page.getByRole('heading', { name: /Los Angeles Cosmetic Dentist/i });
  const section = heading.locator('xpath=ancestor::section[1]');
  const poster = heroPoster(page);

  await expect(heading).toBeVisible();
  await expect(page.getByRole('link', { name: 'Schedule Consultation' }).first()).toBeVisible();
  await expect(poster).toBeVisible();
  await expect(poster).toHaveCSS('object-fit', 'cover');
  await expect(section.locator('iframe[title="Background video"], video')).toHaveCount(0);

  const [sectionBox, posterBox] = await Promise.all([section.boundingBox(), poster.boundingBox()]);
  expect(sectionBox).not.toBeNull();
  expect(posterBox).not.toBeNull();
  expect(Math.abs(posterBox!.width - sectionBox!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(posterBox!.height - sectionBox!.height)).toBeLessThanOrEqual(1);
});

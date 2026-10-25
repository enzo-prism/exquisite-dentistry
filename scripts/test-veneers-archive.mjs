import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';

const root = process.cwd();
const directory = path.join(root, 'public/veneers');
const manifestText = fs.readFileSync(path.join(directory, 'manifest.json'), 'utf8');
const manifest = JSON.parse(manifestText);
const digest = data => crypto.createHash('sha256').update(data).digest('hex');
// WordPress publishes real assets inside nested dist folders. A broad build
// ignore can leave local tests green while silently excluding them from Git.
const releasePaths = [...new Set([
  'public/veneers/manifest.json',
  ...manifest.pages.map(page => `public${page.path}index.html`),
  ...manifest.assets.map(asset => `public${asset.path}`),
  ...manifest.integrationFiles.map(asset => `public${asset.path}`),
  `public${manifest.searchIndex.path}`,
])];
const ignored = spawnSync('git', ['check-ignore', '--no-index', '--stdin'], {
  cwd: root,
  input: `${releasePaths.join('\n')}\n`,
  encoding: 'utf8',
});
assert.equal(ignored.error, undefined, 'Git ignore audit can run');
assert.ok(ignored.status === 0 || ignored.status === 1, `Git ignore audit succeeds: ${ignored.stderr}`);
assert.equal(ignored.stdout.trim(), '', `Every archive dependency can be committed: ${ignored.stdout}`);
if (process.argv.includes('--tracked')) {
  const tracked = new Set(execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0'));
  assert.deepEqual(releasePaths.filter(file => !tracked.has(file)), [], 'Every archive dependency is included in the release index');
}
assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'src/constants/legacyVeneersManifest.json'), 'utf8')).pages, manifest.pages, 'Client route inventory matches static archive');
assert.equal(manifest.pages.filter(page => page.kind === 'page').length, 8, 'All eight published pages retained');
assert.equal(manifest.pages.filter(page => page.kind === 'post').length, 16, 'All sixteen published articles retained');
assert.ok(manifest.pages.length >= 35, 'Linked archives and pagination retained');
assert.deepEqual(manifest.assetFailures, [], 'All dependency downloads succeeded');
const paths = new Set(manifest.pages.map(page => page.path));
assert.ok(fs.existsSync(path.join(directory, 'assets/exquisiteveneersla.com/wp-content/plugins/elementor/assets/css/conditionals/dialog.min.css')), 'Original dynamically loaded dialog CSS is archived');
const searchIndex = fs.readFileSync(path.join(root, 'public', manifest.searchIndex.path));
assert.equal(digest(searchIndex), manifest.searchIndex.sha256, 'Search index hash matches');
assert.equal(JSON.parse(searchIndex).pages.filter(page => page.kind === 'post').length, 16, 'Search covers every original article');
const visitedScripts = new Set();
let references = 0;

function metadataFromMarkup(markup) {
  const entries = new Map();
  for (const tag of markup.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = new Map([...tag[0].matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(match => [match[1].toLowerCase(), match[3]]));
    const key = attributes.get('name') || attributes.get('property');
    if (key) entries.set(key.toLowerCase(), attributes.get('content') || '');
  }
  return entries;
}

function schemaHasType(value, type) {
  if (Array.isArray(value)) return value.some(item => schemaHasType(item, type));
  if (!value || typeof value !== 'object') return false;
  const types = Array.isArray(value['@type']) ? value['@type'] : [value['@type']];
  return types.includes(type) || Object.values(value).some(item => schemaHasType(item, type));
}
for (const asset of manifest.integrationFiles) {
  const file = path.join(root, 'public', asset.path);
  const buffer = fs.readFileSync(file);
  assert.equal(digest(buffer), asset.sha256, `Integration file hash matches: ${asset.path}`);
  assert.equal(buffer.length, asset.bytes, 'Integration file length matches');
  if (file.endsWith('.js')) execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
}
for (const page of JSON.parse(searchIndex).pages.filter(page => page.kind === 'post')) {
  assert.ok(page.cardHtml, `Original article card retained: ${page.path}`);
  for (const match of page.cardHtml.matchAll(/\b(?:src|poster)=["']([^"']+)["']/g)) verifyLocalReference(match[1], `search card ${page.path}`);
  for (const match of page.cardHtml.matchAll(/\bsrcset=["']([^"']+)["']/g)) {
    for (const entry of match[1].split(',')) verifyLocalReference(entry.trim().split(/\s+/)[0], `search card ${page.path}`);
  }
}

function verifyLocalReference(value, from) {
  value = value.replaceAll('\\/', '/').replaceAll('&amp;', '&');
  assert.ok(!/^https?:\/(?!\/)/.test(value), `No malformed absolute URL: ${value} in ${from}`);
  const [pathname] = value.split(/[?#]/);
  if (!pathname.startsWith('/veneers/')) return;
  const file = path.join(root, 'public', decodeURIComponent(pathname));
  assert.ok(fs.existsSync(file), `Local dependency exists: ${pathname} in ${from}`);
  references += 1;
}

for (const asset of manifest.assets) {
  const file = path.join(root, 'public', asset.path);
  const buffer = fs.readFileSync(file);
  assert.equal(digest(buffer), asset.sha256, `Archived asset unchanged: ${asset.path}`);
  assert.equal(buffer.length, asset.bytes, 'Asset length matches manifest');
  if (/\.js$/.test(file) && !visitedScripts.has(file)) {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    visitedScripts.add(file);
    const script = buffer.toString();
    for (const match of script.matchAll(/__elementorLoadChunk\([`"']([^`"']+)[`"']/g)) {
      verifyLocalReference(`/veneers/assets/exquisiteveneersla.com/wp-content/plugins/elementor/assets/js/chunks/${match[1]}.min.js`, asset.path);
    }
  }
  if (/\.css$/.test(file)) {
    const css = buffer.toString();
    for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) verifyLocalReference(match[1], asset.path);
    assert.ok(!/https?:\/\/exquisiteveneersla\.com/.test(css), 'No CSS dependency on old host');
  }
}
execFileSync(process.execPath, ['--check', path.join(directory, 'archive-runtime.js')], { stdio: 'pipe' });

for (const page of manifest.pages) {
  assert.ok(page.path.startsWith('/veneers/'));
  const file = path.join(root, 'public', page.path, 'index.html');
  const markup = fs.readFileSync(file, 'utf8');
  if (page.path === '/veneers/where-can-i-get-the-best-porcelain-veneers-in-los-angeles/') {
    assert.ok(markup.includes('href="/contact/"'), 'Original main-site consultation link stays on the main contact page');
  }
  assert.equal(digest(markup), page.sha256, `Page hash matches: ${page.path}`);
  assert.ok(markup.includes(`href="https://exquisitedentistryla.com${page.path}"`), `Correct canonical: ${page.path}`);
  assert.ok(!/https?:\/?\\?\/\/?\\?\/exquisiteveneersla\.com/.test(markup), `No old host dependency: ${page.path}`);
  assert.ok(!/googletagmanager|google_gtag|googlesitekit|facebook\.com\/tr\?|fbq\(|hotjar|crazyegg/.test(markup.replace(/<!--.*?-->/gs, '')), `Retired trackers removed: ${page.path}`);
  assert.equal((markup.match(/data-veneers-shell="header"/g) || []).length, 1, `One shared header: ${page.path}`);
  assert.equal((markup.match(/data-veneers-shell="footer"/g) || []).length, 1, `One shared footer: ${page.path}`);
  assert.ok(/<html\b[^>]*class="[^"]*veneers-shell-document/.test(markup), 'Native fragment scroll offset is scoped to archive');
  assert.ok(/<main\b[^>]*id="main"[^>]*tabindex="-1"/.test(markup), 'Skip target can receive focus');
  assert.ok(!/<(?:div|header)\b[^>]*(?:class="[^"]*nav-links-con|id="(?:site-header|top-bar-wrap)")/.test(markup), `Original navigation removed: ${page.path}`);
  assert.ok(!/data-elementor-type="(?:footer|popup)"/.test(markup), `Retired footer and navigation popup removed: ${page.path}`);
  const audit = manifest.contentAudit.find(item => item.path === page.path);
  assert.ok(audit, 'Content retention evidence exists');
  for (const id of audit.heroIds) assert.ok(markup.includes(`data-id="${id}"`), `Original hero retained: ${page.path}`);
  if (page.indexable) {
    const metadata = metadataFromMarkup(markup);
    for (const key of ['description', 'og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) assert.ok(metadata.get(key)?.trim(), `Complete indexable metadata ${key}: ${page.path}`);
    assert.ok(metadata.get('description').length >= 50, `Meaningful page description: ${page.path}`);
    for (const key of ['og:image', 'twitter:image']) {
      const address = new URL(metadata.get(key));
      assert.equal(address.origin, 'https://exquisitedentistryla.com', `Social image remains on main host: ${page.path}`);
      verifyLocalReference(address.pathname, page.path);
    }
    const schemas = [...markup.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
    assert.ok(schemas.some(schema => schemaHasType(schema, 'BreadcrumbList')), `Breadcrumb schema exists: ${page.path}`);
    if (page.path === '/veneers/') {
      assert.equal(page.title, 'Porcelain Veneers in Los Angeles | Exquisite Dentistry');
      assert.equal(metadata.get('og:title'), page.title);
      assert.equal(metadata.get('twitter:title'), page.title);
      assert.ok(!schemas.some(schema => schemaHasType(schema, 'Article')), 'Veneers service hub is not an agency-authored article');
      const dentist = schemas.flatMap(schema => schema['@graph'] ?? [schema]).find(node => [node['@type']].flat().includes('Dentist'));
      assert.deepEqual(dentist.openingHours, ['Mo-Th 08:00-18:00']);
      assert.equal(dentist.name, 'Exquisite Dentistry');
    }
  }
  for (const match of markup.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs)) {
    JSON.parse(match[1]);
    assert.ok(!match[1].includes('"/veneers/assets/'), 'Schema image addresses are absolute');
    assert.ok(!match[1].includes('/veneers/?s='), 'Schema search points to archive search');
  }
  for (const match of markup.matchAll(/<meta\b[^>]*(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)/g)) {
    assert.ok(match[1].startsWith('https://'), 'Social image addresses are absolute');
  }
  assert.ok(!/elementor-g-recaptcha|www\.google\.com\/recaptcha/.test(markup), `Retired captcha removed: ${page.path}`);
  for (const match of markup.matchAll(/\bsrcset=["']([^"']+)["']/g)) {
    for (const entry of match[1].split(',')) verifyLocalReference(entry.trim().split(/\s+/)[0], page.path);
  }
  for (const match of markup.matchAll(/\b(?:src|poster)=["']([^"']+)["']/g)) verifyLocalReference(match[1], page.path);
  for (const match of markup.matchAll(/\b(?:href|action)=["']([^"']+)["']/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/veneers')) continue;
    if (href.startsWith('/veneers/assets/') || href.endsWith('/shell.css') || href.endsWith('/shell.js')) { verifyLocalReference(href, page.path); continue; }
    const pathname = href.split(/[?#]/)[0];
    const route = pathname.endsWith('/') ? pathname : `${pathname}/`;
    assert.ok(paths.has(route), `Archived navigation resolves: ${href} in ${page.path}`);
  }
  if (!page.indexable) assert.ok(/noindex/.test(markup), `Noindex on noncanonical/test archive ${page.path}`);
}
console.log(`Archive integrity passed: ${manifest.pages.length} routes, ${manifest.assets.length} assets, ${visitedScripts.size} scripts parsed, ${references} local dependency references.`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('@playwright/test');
  const origin = process.env.VENEERS_TEST_ORIGIN || 'http://localhost:8080';
  assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname), 'The simulation browser harness requires localhost; use test:veneers:shell for a live site.');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(() => {
    if (window !== window.top) return;
    localStorage.setItem('exquisite_analytics_consent_v2', 'denied');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2', 'denied');
  });
  let realSubmissions = 0;
  await context.route('https://formspree.io/**', route => {
    realSubmissions += 1;
    return route.abort();
  });
  const tab = await context.newPage();
  const errors = [];
  const failures = [];
  tab.on('pageerror', error => errors.push(error.message));
  tab.on('console', message => {
    if (message.type() === 'error' && /Refused to apply style|MIME type|SyntaxError|Failed to load module script/.test(message.text())) errors.push(message.text());
  });
  tab.on('request', request => {
    const host = new URL(request.url()).hostname;
    assert.notEqual(host, 'exquisiteveneersla.com', 'No request to retired host');
    if (request.frame() === tab.mainFrame()) assert.ok(!['fonts.googleapis.com', 'fonts.gstatic.com'].includes(host), 'Archived document fonts are self-hosted');
  });
  tab.on('response', response => {
    if (!response.url().startsWith(origin)) return;
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
    const resource = new URL(response.url()).pathname;
    const type = response.headers()['content-type'] || '';
    if (resource.endsWith('.css') && !type.startsWith('text/css')) failures.push(`Invalid CSS MIME ${type} ${response.url()}`);
    if (resource.endsWith('.js') && !/(?:text|application)\/javascript/.test(type)) failures.push(`Invalid script MIME ${type} ${response.url()}`);
  });
  try {
    for (const page of manifest.pages) {
      await tab.goto(`${origin}${page.path}`, { waitUntil: 'load' });
      await tab.locator('body').waitFor();
      await tab.waitForTimeout(120);
      assert.equal(await tab.locator('header[data-veneers-shell="header"]').count(), 1, 'Exactly one shared header');
      assert.equal(await tab.locator('footer[data-veneers-shell="footer"]').count(), 1, 'Exactly one shared footer');
      const headings = await tab.locator('h1,h2,h3,h4,h5,h6').evaluateAll(elements => elements.filter(element => !element.closest('[data-veneers-shell]')).map(element => element.textContent.replace(/\s+/g, ' ').trim()));
      assert.deepEqual(headings, manifest.contentAudit.find(item => item.path === page.path).headings, `Source body headings retained: ${page.path}`);
    }
    await tab.goto(`${origin}/veneers/results/`, { waitUntil: 'networkidle' });
    assert.equal(await tab.locator('.twentytwenty-handle').count(), 9, 'Every before/after comparison initialized');
    const handle = tab.locator('.twentytwenty-handle').first();
    await handle.scrollIntoViewIfNeeded();
    await tab.waitForTimeout(150);
    const before = await handle.boundingBox();
    assert.ok(before);
    await tab.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
    await tab.mouse.down();
    await tab.mouse.move(before.x - 100, before.y + before.height / 2, { steps: 5 });
    await tab.mouse.up();
    const after = await handle.boundingBox();
    assert.ok(after && Math.abs(after.x - before.x) > 30, 'Comparison responds to drag');
    await tab.setViewportSize({ width: 390, height: 844 });
    await tab.goto(`${origin}/veneers/blog/`, { waitUntil: 'networkidle' });
    await tab.keyboard.press('Tab');
    assert.equal(await tab.evaluate(() => document.activeElement.textContent), 'Skip to content', 'Skip link is first keyboard control');
    await tab.keyboard.press('Enter');
    await tab.waitForFunction(() => document.activeElement.id === 'main');
    const skipGeometry = await tab.evaluate(() => ({headerBottom: document.getElementById('veneers-shell-header').getBoundingClientRect().bottom, titleTop: document.querySelector('h1').getBoundingClientRect().top}));
    assert.ok(skipGeometry.titleTop >= skipGeometry.headerBottom, 'Skip navigation leaves article/archive title below sticky header');
    await tab.goto(`${origin}/veneers/`, { waitUntil: 'networkidle' });
    const toggle = tab.locator('#veneers-shell-menu-toggle');
    const panel = tab.locator('#veneers-shell-menu-panel');
    await toggle.focus();
    await tab.keyboard.press('Enter');
    await panel.waitFor({ state: 'visible' });
    await tab.waitForFunction(() => document.getElementById('veneers-shell-menu-toggle').getAttribute('aria-expanded') === 'true');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true', 'Mobile disclosure announces state');
    await tab.keyboard.press('Tab');
    assert.equal(await tab.evaluate(() => document.activeElement.textContent), 'Home', 'Menu links follow disclosure in keyboard order');
    await tab.keyboard.press('Escape');
    assert.equal(await toggle.evaluate(element => document.activeElement === element), true, 'Escape restores menu focus');
    assert.equal(await panel.isVisible(), false, 'Escape closes menu');
    await toggle.click();
    await panel.locator('a[href="/veneers/process/"]').focus();
    await tab.setViewportSize({ width: 1440, height: 1000 });
    await tab.waitForFunction(() => document.activeElement.closest('.veneers-shell-desktop-nav') !== null);
    assert.equal(await panel.isVisible(), false, 'Desktop resize closes disclosure');
    assert.equal(await tab.evaluate(() => document.activeElement.closest('#veneers-shell-menu-panel') === null), true, 'Resize moves focus out of hidden panel');
    await tab.setViewportSize({ width: 390, height: 844 });
    await tab.waitForFunction(() => document.activeElement.id === 'veneers-shell-menu-toggle');
    assert.equal(await toggle.evaluate(element => document.activeElement === element), true, 'Mobile resize transfers hidden desktop focus to Menu');
    await tab.goto(`${origin}/veneers/contact/`, { waitUntil: 'networkidle' });
    const form = tab.locator('form[name="Main Contact Form"]');
    const honeypot = form.locator('[name="_gotcha"]');
    assert.equal(await honeypot.evaluate(field => getComputedStyle(field).display), 'none', 'Honeypot remains hidden despite original Elementor form CSS');
    assert.equal(await honeypot.boundingBox(), null, 'Honeypot occupies no layout space');
    assert.equal(await honeypot.getAttribute('tabindex'), '-1', 'Honeypot cannot receive keyboard focus');
    async function fillContact() {
      await form.locator('[name="form_fields[first_name]"]').fill('Local');
      await form.locator('[name="form_fields[last_name]"]').fill('Preview');
      await form.locator('[name="form_fields[email]"]').fill('local-preview@example.com');
    }
    await fillContact();
    await form.locator('button[type="submit"]').click();
    await form.locator('.elementor-message-success').waitFor();
    await tab.goto(`${origin}/veneers/contact/?formPreview=error`, { waitUntil: 'networkidle' });
    await fillContact();
    await form.locator('button[type="submit"]').click();
    await form.locator('.elementor-message-danger').waitFor();
    await tab.goto(`${origin}/veneers/blog/?s=vacation`, { waitUntil: 'networkidle' });
    await tab.locator('#blog-entries a[href*="pre-vacation"]').first().waitFor();
    const searchImages = tab.locator('#blog-entries .thumbnail img');
    assert.ok(await searchImages.count() > 0, 'Search retains original article images');
    for (const image of await searchImages.all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode());
      assert.ok(await image.evaluate(element => element.complete && element.naturalWidth > 0), 'Search card image loads');
    }
    await tab.goto(`${origin}/veneers/blog/?s=enhance`, { waitUntil: 'networkidle' });
    await tab.locator('#blog-entries a[href*="common-questions-about"]').first().waitFor();
    assert.equal(realSubmissions, 0, 'Preview made no external form submissions');
    assert.deepEqual(errors, [], 'No runtime JavaScript errors');
    assert.deepEqual(failures, [], 'No missing local resources');
    console.log('Browser passed: all archive routes, retained body headings, shared mobile menu and keyboard/resize focus, comparison drag, search, contact success/error. Zero real form submissions.');
  } finally { await browser.close(); }
}

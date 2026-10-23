/**
 * Offline Vercel router model used by Dr Eggbot: routes from
 * @vercel/routing-utils getTransformedRoutes, evaluated in order, first
 * terminating match wins; then filesystem (dist) → 200/404.
 *
 * `has` host values are matched as one anchored regex: ^(?:<value>)$.
 */
import { getTransformedRoutes } from '@vercel/routing-utils';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

export function load(cfgPath, distDir, { anchoredHas = true } = {}) {
  const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
  const { routes, error } = getTransformedRoutes(cfg);
  if (error) throw new Error(JSON.stringify(error));
  const compiled = routes.map((r) => ({ r, re: r.src ? new RegExp(r.src) : null }));
  const hasOk = (r, host) =>
    (r.has ?? []).every((h) => {
      if (h.type === 'host') {
        const v = String(h.value);
        return (anchoredHas ? new RegExp(`^(?:${v})$`) : new RegExp(v)).test(host);
      }
      throw new Error('unsupported has ' + h.type);
    }) && (r.missing ?? []).length === 0;
  const fsLookup = (p) => {
    if (!distDir) return 200;
    let decoded;
    try {
      decoded = decodeURIComponent(p);
    } catch {
      return 400;
    }
    const f = path.join(distDir, decoded);
    if (decoded.endsWith('/')) return existsSync(path.join(f, 'index.html')) ? 200 : 404;
    if (existsSync(f) && statSync(f).isFile()) return 200;
    if (existsSync(`${f}.html`)) return 200;
    return 404;
  };
  return function route(host, pathname, search = '') {
    for (const { r, re } of compiled) {
      if (r.handle) break;
      if (!re) continue;
      const m = re.exec(pathname);
      if (!m) continue;
      if (!hasOk(r, host, search)) continue;
      if (r.continue) continue;
      if (r.status && r.headers?.Location) {
        let loc = r.headers.Location.replace(/\$(\d+)/g, (_, i) => m[+i] ?? '');
        if (search && !loc.includes('?')) loc += search;
        return { status: r.status, location: loc };
      }
      if (r.status) return { status: r.status };
      if (!r.dest) return { status: fsLookup(pathname), fs: true, note: 'stop-route' };
    }
    return { status: fsLookup(pathname), fs: true };
  };
}

export function follow(route, url, max = 6) {
  const hops = [];
  let u = new URL(url);
  for (let i = 0; i <= max; i += 1) {
    const res = route(u.hostname, u.pathname, u.search);
    hops.push({ url: u.href, ...res });
    if (res.location) {
      const next = new URL(res.location, u.href);
      if (
        ![
          'exquisitedentistryla.com',
          'www.exquisitedentistryla.com',
          'exquisiteveneersla.com',
          'www.exquisiteveneersla.com',
        ].includes(next.hostname)
      ) {
        return hops;
      }
      u = next;
      continue;
    }
    return hops;
  }
  hops.push({ loop: true });
  return hops;
}

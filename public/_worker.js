/**
 * Cloudflare Pages `_worker.js` (static site edge worker).
 *
 * Fixes Loveable/SPA-style hosting where extensionless routes like `/about/`
 * incorrectly return `/index.html`, causing duplicate meta descriptions and
 * soft-404s. This worker maps `/path/` → `/path/index.html` when it exists and
 * returns a real 404 when it doesn't.
 */

let cachedHomeEtagPromise;

const hasExtension = (pathname) => /\.[a-z0-9]+$/i.test(pathname);

const assetFetch = (env, request) => {
  if (env?.ASSETS?.fetch) return env.ASSETS.fetch(request);
  return fetch(request);
};

const getHomeEtag = async (env, request) => {
  if (!cachedHomeEtagPromise) {
    const url = new URL(request.url);
    url.pathname = "/index.html";
    cachedHomeEtagPromise = assetFetch(env, new Request(url.toString(), request)).then(
      (res) => res.headers.get("etag"),
    );
  }
  return cachedHomeEtagPromise;
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (request.method !== "GET" && request.method !== "HEAD") {
      return assetFetch(env, request);
    }

    // Avoid duplicate homepage variants.
    if (pathname === "/index.html") {
      url.pathname = "/";
      return Response.redirect(url.toString(), 301);
    }

    // Canonicalize index.html URLs.
    if (pathname.endsWith("/index.html") && pathname !== "/index.html") {
      url.pathname = pathname.slice(0, -"index.html".length);
      return Response.redirect(url.toString(), 301);
    }

    // Canonicalize *.html legacy URLs.
    if (pathname.endsWith(".html")) {
      url.pathname = pathname.replace(/\.html$/, "/");
      return Response.redirect(url.toString(), 301);
    }

    // Serve files with extensions directly (assets, sitemap.xml, robots.txt, etc.).
    if (hasExtension(pathname)) {
      return assetFetch(env, request);
    }

    // Enforce trailing slash policy for directory-style routes.
    if (pathname !== "/" && !pathname.endsWith("/")) {
      url.pathname = `${pathname}/`;
      return Response.redirect(url.toString(), 301);
    }

    // Map /foo/ -> /foo/index.html so crawlers get route-specific prerendered HTML.
    const indexPath = pathname === "/" ? "/index.html" : `${pathname}index.html`;
    const indexUrl = new URL(url.toString());
    indexUrl.pathname = indexPath;

    const indexResponse = await assetFetch(env, new Request(indexUrl.toString(), request));

    if (indexResponse.status === 404) {
      return new Response("Not Found", { status: 404 });
    }

    // Some hosts run in SPA-fallback mode and return the homepage HTML for missing files.
    // Detect that by comparing ETags to `/index.html` and return a real 404 instead.
    if (indexPath !== "/index.html") {
      const responseEtag = indexResponse.headers.get("etag");
      if (responseEtag) {
        const homeEtag = await getHomeEtag(env, request);
        if (homeEtag && responseEtag === homeEtag) {
          return new Response("Not Found", { status: 404 });
        }
      }
    }

    return indexResponse;
  },
};


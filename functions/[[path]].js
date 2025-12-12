let cachedHomeEtagPromise;

const getHomeEtag = async (env, request) => {
  if (!cachedHomeEtagPromise) {
    const url = new URL(request.url);
    url.pathname = "/index.html";
    cachedHomeEtagPromise = env.ASSETS.fetch(new Request(url.toString(), request)).then((res) =>
      res.headers.get("etag"),
    );
  }
  return cachedHomeEtagPromise;
};

const hasExtension = (pathname) => /\.[a-z0-9]+$/i.test(pathname);

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (request.method !== "GET" && request.method !== "HEAD") {
    return context.env.ASSETS.fetch(request);
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
    return context.env.ASSETS.fetch(request);
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

  const indexResponse = await context.env.ASSETS.fetch(
    new Request(indexUrl.toString(), request),
  );

  if (indexResponse.status === 404) {
    return new Response("Not Found", { status: 404 });
  }

  // Some hosts run in SPA-fallback mode and return the homepage HTML for missing files.
  // Detect that by comparing ETags to `/index.html` and return a real 404 instead.
  if (indexPath !== "/index.html") {
    const responseEtag = indexResponse.headers.get("etag");
    if (responseEtag) {
      const homeEtag = await getHomeEtag(context.env, request);
      if (homeEtag && responseEtag === homeEtag) {
        return new Response("Not Found", { status: 404 });
      }
    }
  }

  return indexResponse;
}

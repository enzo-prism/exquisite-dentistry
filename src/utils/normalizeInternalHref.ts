export const normalizeInternalHref = (href: string): string => {
  if (!href) return href;
  if (href.startsWith('#')) return href;
  if (/^(https?:)?\/\//i.test(href)) return href;
  if (/^(mailto|tel):/i.test(href)) return href;
  if (!href.startsWith('/')) return href;

  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? href;
  const suffix = match?.[2] ?? '';

  if (pathname === '/' || pathname.endsWith('/')) return href;
  if (/\/[^/]+\.[^/]+$/.test(pathname)) return href;

  return `${pathname}/${suffix}`;
};


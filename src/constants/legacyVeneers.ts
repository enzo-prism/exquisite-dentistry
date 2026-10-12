import archiveManifest from './legacyVeneersManifest.json';

export interface LegacyVeneersPage {
  path: string;
  sourcePath: string;
  title: string;
  indexable: boolean;
  lastModified?: string;
}

// The archive and the main site share one route inventory. Matching only these
// paths keeps the existing React veneers cost and treatment guides available.
export const LEGACY_VENEERS_PAGES: readonly LegacyVeneersPage[] = archiveManifest.pages;

const normalizeDocumentPath = (pathname: string): string => {
  const withoutIndex = pathname.replace(/\/index\.html$/i, '/');
  return `${withoutIndex.replace(/\/+$/, '')}/`;
};

const archivedPaths = new Set(LEGACY_VENEERS_PAGES.map((page) => page.path));

export const getLegacyVeneersPath = (pathname: string): string | null => {
  const normalized = normalizeDocumentPath(pathname);
  return archivedPaths.has(normalized) ? normalized : null;
};

export const isLegacyVeneersPath = (pathname: string): boolean => getLegacyVeneersPath(pathname) !== null;

export const getLegacyVeneersDocumentUrl = (url: URL, currentOrigin: string): string | null => {
  if (url.origin !== currentOrigin) return null;
  const archivePath = getLegacyVeneersPath(url.pathname);
  return archivePath ? `${archivePath}${url.search}${url.hash}` : null;
};


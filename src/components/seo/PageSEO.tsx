import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const BASE_URL = 'https://exquisitedentistryla.com';

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// Sanitize meta description
const toMeta = (input: string, max = 155) => {
  const text = (input || "")
    .replace(/<[^>]+>/g, " ")     // strip HTML
    .replace(/\s+/g, " ")
    .replace(/["<>]/g, "")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "");
};

// Truncate title to max length without breaking words
const truncateTitle = (input: string, max = 70) => {
  if (input.length <= max) return input;
  return input.slice(0, max).replace(/\s+\S*$/, "").trim();
};

// Dev-time duplicate detection
const trackMeta = (url: string, desc: string) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    window.__metaTracker = window.__metaTracker || new Map<string, string[]>();
    const seen = window.__metaTracker;
    const key = (desc || "").trim().toLowerCase();
    const arr = seen.get(key) || [];
    arr.push(url);
    seen.set(key, arr);
    
    // Report duplicates
    for (const [descKey, urls] of seen.entries()) {
      if (urls.length > 1) {
        console.warn("Duplicate meta description detected:", descKey, "on URLs:", urls);
      }
    }
  }
};

export const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  path = '',
  keywords,
  ogImage = 'https://exquisitedentistryla.com/lovable-uploads/dr-aguil-banner-2024-m.webp',
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  noindex = false,
  nofollow = false,
}) => {
  const normalizedPath = path === undefined ? '/' : path || '/';
  const canonicalUrl = getCanonicalUrl(normalizedPath);
  const sanitizedDescription = toMeta(description);

  // Differentiate <title> from on-page H1 by adding brand suffix
  const brandSuffix = 'Exquisite Dentistry Los Angeles';
  const lowerTitle = title.toLowerCase();
  const shouldAppendBrand = !lowerTitle.includes('exquisite dentistry');
  
  const separator = ' | ';
  let fullTitle: string = shouldAppendBrand
    ? `${title}${separator}${brandSuffix}`
    : title;

  // Final safety check: ensure total length is within limit
  fullTitle = truncateTitle(fullTitle, 70);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;

    const pruneDuplicates = (
      selector: string,
      isCurrent: (element: Element) => boolean,
    ) => {
      const nodes = Array.from(document.head.querySelectorAll(selector));
      if (nodes.length <= 1) return;

      const keep =
        nodes.find(isCurrent) ??
        nodes.find(
          (node) =>
            node.getAttribute('data-rh') === 'true' ||
            node.getAttribute('data-react-helmet') === 'true',
        ) ??
        nodes[nodes.length - 1];

      nodes.forEach((node) => {
        if (node !== keep) node.parentNode?.removeChild(node);
      });
    };

    pruneDuplicates(
      'meta[name="description"]',
      (node) => node.getAttribute('content') === sanitizedDescription,
    );
    pruneDuplicates(
      'meta[property="og:title"]',
      (node) => node.getAttribute('content') === fullTitle,
    );
    pruneDuplicates(
      'meta[property="og:description"]',
      (node) => node.getAttribute('content') === sanitizedDescription,
    );
    pruneDuplicates(
      'meta[name="twitter:title"]',
      (node) => node.getAttribute('content') === fullTitle,
    );
    pruneDuplicates(
      'meta[name="twitter:description"]',
      (node) => node.getAttribute('content') === sanitizedDescription,
    );
    pruneDuplicates(
      'link[rel="canonical"]',
      (node) => node.getAttribute('href') === canonicalUrl,
    );
  }, [canonicalUrl, fullTitle, sanitizedDescription]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={sanitizedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Robots */}
      {(noindex || nofollow) && (
        <meta
          name="robots"
          content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}
        />
      )}

      {/* Canonical */}
      <link key="canonical" rel="canonical" href={canonicalUrl} data-helmet="canonical" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={sanitizedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={sanitizedDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article-specific meta (if provided) */}
      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {articleAuthor && <meta name="author" content={articleAuthor} />}
    </Helmet>
  );
};

export default PageSEO;

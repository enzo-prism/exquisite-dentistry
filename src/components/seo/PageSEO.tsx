import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const BASE_URL = 'https://exquisitedentistryla.com';

interface PageSEOProps {
  title: string;
  description: string; // REQUIRED - no default allowed
  path?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
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
  nofollow = false
}) => {
  // Build canonical URL with trailing slash policy
  const buildCanonicalUrl = (inputPath: string) => {
    // Start with base URL
    let url = BASE_URL;
    
    // Add path if provided
    if (inputPath) {
      // Ensure path starts with /
      const cleanPath = inputPath.startsWith('/') ? inputPath : `/${inputPath}`;
      url += cleanPath;
    }
    
    // Enforce trailing slash policy (non-root pages get trailing slash)
    if (url === BASE_URL) {
      // Root URL should not have trailing slash
      return url;
    } else if (!url.endsWith('/')) {
      // All non-root pages should have trailing slash
      return url + '/';
    }
    
    return url;
  };

  const canonicalUrl = buildCanonicalUrl(path);
  const sanitizedDescription = toMeta(description);

  // Dev tracking
  if (process.env.NODE_ENV !== 'production') {
    trackMeta(canonicalUrl, sanitizedDescription);
  }

  const shouldRenderDescription =
    typeof document === 'undefined' ||
    !document.querySelector('meta[name="description"]');

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      {shouldRenderDescription && <meta name="description" content={sanitizedDescription} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      <link
        key="canonical"
        rel="canonical"
        href={canonicalUrl}
        data-helmet="canonical"
      />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={sanitizedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Exquisite Dentistry" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={sanitizedDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article specific meta tags */}
      {ogType === 'article' && (
        <>
          {articlePublishedTime && (
            <meta property="article:published_time" content={articlePublishedTime} />
          )}
          {articleModifiedTime && (
            <meta property="article:modified_time" content={articleModifiedTime} />
          )}
          {articleAuthor && (
            <meta property="article:author" content={articleAuthor} />
          )}
        </>
      )}
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Los Angeles" />
      <meta name="geo.position" content="34.0522;-118.2437" />
      <meta name="ICBM" content="34.0522, -118.2437" />
    </Helmet>
  );
};

export default PageSEO;

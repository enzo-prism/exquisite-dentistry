import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://exquisitedentistryla.com';

interface PageSEOProps {
  title: string;
  description: string;
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

  // Runtime guard to prevent duplicate canonicals
  const shouldRenderCanonical = 
    typeof document === 'undefined' || 
    !document.querySelector('link[rel="canonical"]');

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL - Single source of truth with runtime guard */}
      {shouldRenderCanonical && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Exquisite Dentistry" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
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
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#1e40af" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Los Angeles" />
      <meta name="geo.position" content="34.0522;-118.2437" />
      <meta name="ICBM" content="34.0522, -118.2437" />
    </Helmet>
  );
};

export default PageSEO;
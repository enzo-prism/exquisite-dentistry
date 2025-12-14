import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

interface WebPageStructuredDataProps {
  title: string;
  description: string;
  url: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage';
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const normalizeUrl = (value: string): string => {
  if (!value) {
    return getCanonicalUrl('/');
  }

  try {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      const parsed = new URL(value);
      return getCanonicalUrl(parsed.pathname || '/');
    }
  } catch {
    // Ignore parse errors and fall through to default behavior
  }

  return getCanonicalUrl(value);
};

const WebPageStructuredData: React.FC<WebPageStructuredDataProps> = ({ 
  title, 
  description, 
  url, 
  pageType = 'WebPage',
  breadcrumbs = []
}) => {
  const canonicalUrl = normalizeUrl(url);
  const webPageData = {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description: description,
    url: canonicalUrl,
    isPartOf: {
      '@id': 'https://exquisitedentistryla.com/#website'
    },
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    publisher: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    inLanguage: 'en-US',
    dateModified: new Date().toISOString().split('T')[0]
  };

  const breadcrumbData = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getCanonicalUrl('/')
      },
      ...breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: breadcrumb.name,
        item: normalizeUrl(breadcrumb.url)
      }))
    ]
  } : null;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(webPageData)}</script>
      {breadcrumbData && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      )}
    </Helmet>
  );
};

export default WebPageStructuredData;

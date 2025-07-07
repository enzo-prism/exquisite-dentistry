import React from 'react';
import { Helmet } from 'react-helmet-async';

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

const WebPageStructuredData: React.FC<WebPageStructuredDataProps> = ({ 
  title, 
  description, 
  url, 
  pageType = 'WebPage',
  breadcrumbs = []
}) => {
  const webPageData = {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description: description,
    url: url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Exquisite Dentistry',
      url: 'https://exquisitedentistryla.com/'
    },
    provider: {
      '@type': 'DentistPractice',
      name: 'Exquisite Dentistry',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6227 Wilshire Blvd',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90048',
        addressCountry: 'US'
      },
      telephone: '(323) 272-2388'
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
        item: 'https://exquisitedentistryla.com/'
      },
      ...breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: breadcrumb.name,
        item: breadcrumb.url
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
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONTACT_PAGE_BUSINESS_ENTITY } from '@/utils/centralizedSchemas';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const ContactPageStructuredData: React.FC = () => {
  const contactPageData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Exquisite Dentistry Los Angeles',
    description: 'Contact Exquisite Dentistry in Los Angeles to schedule your cosmetic dental consultation. Located at 6227 Wilshire Blvd.',
    url: getCanonicalUrl('/contact'),
    mainEntity: CONTACT_PAGE_BUSINESS_ENTITY,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Exquisite Dentistry',
      url: getCanonicalUrl('/')
    },
    inLanguage: 'en-US'
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getCanonicalUrl('/')
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: getCanonicalUrl('/contact')
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(contactPageData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
    </Helmet>
  );
};

export default ContactPageStructuredData;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const ContactPageStructuredData: React.FC = () => {
  const contactPageData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Exquisite Dentistry Los Angeles',
    description: 'Contact Exquisite Dentistry in Los Angeles to schedule your cosmetic dental consultation. Located at 6227 Wilshire Blvd.',
    url: getCanonicalUrl('/contact'),
    mainEntity: {
      '@type': ['LocalBusiness', 'Dentist'],
      name: 'Exquisite Dentistry',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6227 Wilshire Blvd',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90048',
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 34.063844,
        longitude: -118.3650287
      },
      telephone: '(323) 272-2388',
      email: 'info@exquisitedentistryla.com',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '08:00',
          closes: '18:00'
        }
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '(323) 272-2388',
          contactType: 'customer service',
          availableLanguage: 'English',
          areaServed: 'Los Angeles'
        }
      ]
    },
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

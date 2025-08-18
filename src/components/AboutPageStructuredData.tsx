import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutPageStructuredData: React.FC = () => {
  const aboutPageData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Dr. Alexie Aguil | Top Cosmetic Dentist Los Angeles',
    description: 'Meet Dr. Alexie Aguil, Los Angeles leading cosmetic dentist with expertise in smile transformations, porcelain veneers, and advanced dental techniques.',
    url: 'https://exquisitedentistryla.com/about/',
    mainEntity: {
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      jobTitle: 'Cosmetic Dentist',
      description: 'Leading cosmetic dentist in Los Angeles specializing in smile transformations and advanced dental techniques',
      worksFor: {
        '@type': 'DentistPractice',
        name: 'Exquisite Dentistry',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '6227 Wilshire Blvd',
          addressLocality: 'Los Angeles',
          addressRegion: 'CA',
          postalCode: '90048',
          addressCountry: 'US'
        }
      },
      knowsAbout: [
        'Cosmetic Dentistry',
        'Porcelain Veneers',
        'Teeth Whitening',
        'Smile Makeover',
        'Dental Implants',
        'Invisalign'
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Invisalign Lifetime Achievement Award'
        },
        {
          '@type': 'OrganizationRole',
          memberOf: {
            '@type': 'Organization',
            name: 'American Academy of Cosmetic Dentistry'
          }
        }
      ],
      telephone: '(323) 272-2388',
      url: 'https://exquisitedentistryla.com/about/'
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Exquisite Dentistry',
      url: 'https://exquisitedentistryla.com/'
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
        item: 'https://exquisitedentistryla.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://exquisitedentistryla.com/about/'
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(aboutPageData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
    </Helmet>
  );
};

export default AboutPageStructuredData;
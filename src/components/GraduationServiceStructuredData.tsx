import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const GraduationServiceStructuredData: React.FC = () => {
  const graduationCanonical = getCanonicalUrl('/graduation');
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Graduation Smile Makeover',
    description: 'Quick cosmetic dental treatments designed specifically for graduates to look their best in graduation photos and celebrations',
    url: graduationCanonical,
    provider: {
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    procedureType: 'Cosmetic Dentistry',
    bodyLocation: {
      '@type': 'AnatomicalStructure',
      name: 'Teeth'
    },
    preparation: 'Minimal preparation required for most treatments',
    followup: 'Regular dental hygiene maintenance',
    benefits: [
      'Quick results perfect for graduation photos',
      'Multiple treatment options to fit timeline',
      'Professional teeth whitening',
      'Cosmetic bonding for chips and gaps',
      'Complete smile makeover packages'
    ]
  };

  const offerData = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: 'Graduation Dental Packages',
    description: 'Special dental treatment packages for graduates with flexible timing options',
    itemOffered: {
      '@type': 'Service',
      name: 'Graduation Smile Makeover',
      provider: {
        '@id': 'https://exquisitedentistryla.com/#business'
      }
    },
    availableAtOrFrom: {
      '@type': 'Place',
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
    category: 'Cosmetic Dentistry',
    validFrom: '2024-01-01',
    availability: 'https://schema.org/InStock'
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
        name: 'Graduation Smile Makeover',
        item: graduationCanonical
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(serviceData)}</script>
      <script type="application/ld+json">{JSON.stringify(offerData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
    </Helmet>
  );
};

export default GraduationServiceStructuredData;

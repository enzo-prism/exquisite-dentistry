import React from 'react';
import { Helmet } from 'react-helmet-async';

const GraduationServiceStructuredData: React.FC = () => {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Graduation Smile Makeover',
    description: 'Quick cosmetic dental treatments designed specifically for graduates to look their best in graduation photos and celebrations',
    url: 'https://exquisitedentistryla.com/graduation/',
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
        '@type': 'DentistPractice',
        name: 'Exquisite Dentistry'
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
        item: 'https://exquisitedentistryla.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Graduation Smile Makeover',
        item: 'https://exquisitedentistryla.com/graduation/'
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
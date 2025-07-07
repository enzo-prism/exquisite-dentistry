import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoStructuredData: React.FC = () => {
  const practiceData = {
    '@context': 'https://schema.org',
    '@type': 'DentistPractice',
    name: 'Exquisite Dentistry',
    alternateName: 'Exquisite Dentistry LA',
    description: 'Premier cosmetic dentistry practice in Los Angeles specializing in porcelain veneers, teeth whitening, and smile makeovers.',
    image: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    '@id': 'https://exquisitedentistryla.com',
    url: 'https://exquisitedentistryla.com',
    telephone: '(323) 272-2388',
    email: 'info@exquisitedentistryla.com',
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Insurance'],
    currenciesAccepted: 'USD',
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '18:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/ExquisiteDentistry/',
      'https://www.instagram.com/exquisitedentistryla/',
      'https://exquisiteveneersla.com/'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dental Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Porcelain Veneers',
            description: 'Custom porcelain veneers for smile transformation'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Teeth Whitening',
            description: 'Professional teeth whitening treatments'
          }
        },
        {
          '@type': 'MedicalProcedure',
          name: 'Smile Makeover',
          description: 'Comprehensive cosmetic dentistry treatments'
        }
      ]
    }
  };

  const doctorData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Alexie Aguil',
    jobTitle: 'Cosmetic Dentist',
    worksFor: {
      '@type': 'DentistPractice',
      name: 'Exquisite Dentistry'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6227 Wilshire Blvd',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90048',
      addressCountry: 'US'
    },
    telephone: '(323) 272-2388',
    url: 'https://exquisitedentistryla.com/about',
    knowsAbout: [
      'Cosmetic Dentistry',
      'Porcelain Veneers',
      'Teeth Whitening',
      'Smile Makeover',
      'Dental Implants'
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(practiceData)}</script>
      <script type="application/ld+json">{JSON.stringify(doctorData)}</script>
    </Helmet>
  );
};

export default SeoStructuredData;

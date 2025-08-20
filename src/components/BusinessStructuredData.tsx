import React from 'react';
import { Helmet } from 'react-helmet-async';

const BusinessStructuredData: React.FC = () => {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': 'DentistPractice',
    '@id': 'https://exquisitedentistryla.com/#business',
    name: 'Exquisite Dentistry',
    url: 'https://exquisitedentistryla.com/',
    description: 'Premier cosmetic dentistry practice in Los Angeles specializing in veneers, teeth whitening, and smile makeovers',
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
      latitude: 34.0622,
      longitude: -118.3417
    },
    telephone: '(323) 272-2388',
    email: 'info@exquisitedentistryla.com',
    openingHours: [
      'Mo-Fr 08:00-17:00',
      'Sa 09:00-15:00'
    ],
    priceRange: '$$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Insurance'],
    currenciesAccepted: 'USD',
    hasMap: 'https://maps.google.com/?cid=12345678901234567890',
    founder: {
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      jobTitle: 'Cosmetic Dentist'
    },
    employee: {
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      jobTitle: 'Cosmetic Dentist'
    },
    logo: {
      '@type': 'ImageObject',
      url: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
      width: 300,
      height: 100
    },
    image: [
      'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png'
    ],
    sameAs: [
      'https://www.instagram.com/exquisitedentistryla/',
      'https://www.facebook.com/exquisitedentistryla'
    ],
    medicalSpecialty: [
      'Cosmetic Dentistry',
      'Restorative Dentistry',
      'Preventive Dentistry'
    ],
    availableService: [
      {
        '@type': 'MedicalTherapy',
        name: 'Porcelain Veneers'
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Teeth Whitening'
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Smile Makeover'
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(businessData)}</script>
    </Helmet>
  );
};

export default BusinessStructuredData;
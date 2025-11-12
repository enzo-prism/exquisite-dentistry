import React from 'react';
import { Helmet } from 'react-helmet-async';
import { validateLocalBusiness, logValidationErrors, getCanonicalUrl } from '@/utils/schemaValidation';

const BusinessStructuredData: React.FC = () => {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Dentist'],
    '@id': 'https://exquisitedentistryla.com/#business',
    name: 'Exquisite Dentistry',
    url: getCanonicalUrl('/'),
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
      latitude: 34.063844,
      longitude: -118.3650287
    },
    telephone: '(323) 272-2388',
    email: 'info@exquisitedentistryla.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00'
      }
    ],
    priceRange: '$$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Insurance'],
    currenciesAccepted: 'USD',
    hasMap: 'https://maps.google.com/?cid=12345678901234567890',
    founder: {
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      jobTitle: 'Dentist',
      speciality: 'Cosmetic Dentistry'
    },
    employee: [{
      '@type': 'Person',
      name: 'Dr. Alexie Aguil',
      jobTitle: 'Dentist',
      speciality: 'Cosmetic Dentistry'
    }],
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
      'https://www.facebook.com/ExquisiteDentistry'
    ],
    medicalSpecialty: [
      'Cosmetic Dentistry',
      'Restorative Dentistry',
      'Preventive Dentistry'
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Porcelain Veneers',
        category: 'Cosmetic Dentistry'
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Teeth Whitening',
        category: 'Cosmetic Dentistry'
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Smile Makeover',
        category: 'Cosmetic Dentistry'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '50+'
    }
  };

  // Validate schema in development
  const validationResult = validateLocalBusiness(businessData);
  logValidationErrors('BusinessStructuredData', validationResult);

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(businessData)}</script>
    </Helmet>
  );
};

export default BusinessStructuredData;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { validateLocalBusiness, logValidationErrors, getCanonicalUrl } from '@/utils/schemaValidation';
import type { JsonLd, LocalBusinessSchema } from '@/utils/schemaValidation';

interface ConsolidatedStructuredDataProps {
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'testimonials' | 'other';
  includeServices?: boolean;
}

/**
 * Consolidated structured data component to prevent duplicate business entities
 * Use this instead of multiple overlapping structured data components
 */
const ConsolidatedStructuredData: React.FC<ConsolidatedStructuredDataProps> = ({
  pageType = 'other',
  includeServices = false
}) => {
  // Main business entity - single source of truth
  const businessData: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Dentist'],
    '@id': 'https://exquisitedentistryla.com/#business',
    name: 'Exquisite Dentistry',
    alternateName: 'Exquisite Dentistry LA',
    url: getCanonicalUrl('/'),
    description: 'Premier cosmetic dentistry practice in Los Angeles specializing in porcelain veneers, teeth whitening, and smile makeovers.',
    image: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    logo: {
      '@type': 'ImageObject',
      url: 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
      width: 300,
      height: 100
    },
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
    priceRange: '$$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Insurance'],
    currenciesAccepted: 'USD',
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
    sameAs: [
      'https://www.instagram.com/exquisitedentistryla/',
      'https://www.facebook.com/ExquisiteDentistry'
    ],
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
    medicalSpecialty: [
      'Cosmetic Dentistry',
      'Restorative Dentistry',
      'Preventive Dentistry'
    ],
    // NOTE: Do not include AggregateRating/Review for self-serving pages.
  };

  // Add services if requested
  if (includeServices) {
    businessData.availableService = [
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
    ];
  }

  // Website entity
  const websiteData: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://exquisitedentistryla.com/#website',
    name: 'Exquisite Dentistry',
    url: getCanonicalUrl('/'),
    publisher: {
      '@type': ['LocalBusiness', 'Dentist'],
      '@id': 'https://exquisitedentistryla.com/#business'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: getCanonicalUrl('/') + '?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // Validate schema in development
  const validationResult = validateLocalBusiness(businessData);
  logValidationErrors('ConsolidatedStructuredData', validationResult);

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(businessData)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
    </Helmet>
  );
};

export default ConsolidatedStructuredData;

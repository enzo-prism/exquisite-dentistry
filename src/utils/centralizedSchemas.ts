/**
 * Centralized schema management for structured data
 * Single source of truth for all business and entity schemas
 */

import { getCanonicalUrl } from './schemaValidation';
import type { JsonLd, LocalBusinessSchema } from './schemaValidation';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Exquisite+Dentistry/@34.0622,-118.3567,17z';

// Master business entity - single source of truth
export const MASTER_BUSINESS_ENTITY: LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Dentist', 'MedicalBusiness'],
  '@id': 'https://exquisitedentistryla.com/#business',
  name: 'Exquisite Dentistry',
  alternateName: 'Exquisite Dentistry Los Angeles',
  description: 'Premier cosmetic dentistry practice in Los Angeles specializing in porcelain veneers, teeth whitening, Invisalign, and complete smile makeovers',
  url: 'https://exquisitedentistryla.com/',
  telephone: '+1-323-272-2388',
  email: 'info@exquisitedentistryla.com',
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: ['Cash', 'Credit Card', 'Insurance'],
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
    longitude: -118.3567
  },
  hasMap: GOOGLE_MAPS_URL,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '08:00',
      closes: '16:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00'
    }
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Los Angeles'
    },
    {
      '@type': 'City', 
      name: 'Beverly Hills'
    },
    {
      '@type': 'City',
      name: 'West Hollywood'
    },
    {
      '@type': 'City',
      name: 'Santa Monica'
    }
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 34.0622,
      longitude: -118.3567
    },
    geoRadius: 25000
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dental Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: 'Porcelain Veneers'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: 'Teeth Whitening'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: 'Invisalign'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: 'Teeth Whitening'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: 'Dental Implants'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: 'Emergency Dental Care'
        }
      }
    ]
  },
  image: [
    'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    'https://exquisitedentistryla.com/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png'
  ],
  logo: 'https://exquisitedentistryla.com/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp',
  sameAs: [
    'https://www.instagram.com/exquisitedentistryLA',
    'https://www.facebook.com/ExquisiteDentistry',
    'https://www.yelp.com/biz/exquisite-dentistry-los-angeles',
    'https://maps.google.com/ExquisiteDentistryLA',
    GOOGLE_MAPS_URL
  ]
};

// Master doctor entity
export const MASTER_DOCTOR_ENTITY: JsonLd = {
  '@type': 'Person',
  '@id': 'https://exquisitedentistryla.com/#doctor',
  name: 'Dr. Alexie Aguil',
  jobTitle: 'Cosmetic Dentist',
  description: 'Board-certified cosmetic dentist specializing in porcelain veneers, smile makeovers, and advanced dental aesthetics',
  url: getCanonicalUrl('/about'),
  image: 'https://exquisitedentistryla.com/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png',
  worksFor: {
    '@id': 'https://exquisitedentistryla.com/#business'
  },
  knowsAbout: [
    'Cosmetic Dentistry',
    'Porcelain Veneers', 
    'Teeth Whitening',
    'Invisalign',
    'Smile Makeovers',
    'Dental Aesthetics'
  ],
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'University of Southern California School of Dentistry'
    }
  ],
  memberOf: [
    {
      '@type': 'Organization',
      name: 'American Academy of Cosmetic Dentistry'
    },
    {
      '@type': 'Organization', 
      name: 'California Dental Association'
    }
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Doctor of Dental Surgery (DDS)',
      credentialCategory: 'degree'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Invisalign Lifetime Achievement Award',
      credentialCategory: 'award'
    }
  ]
};

// Website schema
export const WEBSITE_ENTITY: JsonLd = {
  '@type': 'WebSite',
  '@id': 'https://exquisitedentistryla.com/#website',
  name: 'Exquisite Dentistry',
  alternateName: 'Exquisite Dentistry Los Angeles',
  url: getCanonicalUrl('/'),
  description: 'Premier cosmetic dentistry practice in Los Angeles specializing in porcelain veneers, teeth whitening, and smile makeovers',
  publisher: {
    '@id': 'https://exquisitedentistryla.com/#business'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://exquisitedentistryla.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  inLanguage: 'en-US'
};

// Common review aggregation data
export const REVIEW_AGGREGATE_DATA: JsonLd = {
  '@type': 'AggregateRating',
  ratingValue: 4.9,
  reviewCount: 127,
  bestRating: 5,
  worstRating: 1
};

/**
 * Generate consistent business reference for use in other schemas
 */
export function getBusinessReference(): JsonLd {
  return {
    '@id': 'https://exquisitedentistryla.com/#business'
  };
}

/**
 * Generate consistent doctor reference for use in other schemas
 */
export function getDoctorReference(): JsonLd {
  return {
    '@id': 'https://exquisitedentistryla.com/#doctor'
  };
}

/**
 * Generate website reference for use in other schemas
 */
export function getWebsiteReference(): JsonLd {
  return {
    '@id': 'https://exquisitedentistryla.com/#website'
  };
}

/**
 * Schema type utilities for validation
 */
export const SCHEMA_TYPES = {
  LOCAL_BUSINESS: ['LocalBusiness', 'Dentist'],
  PERSON: 'Person',
  WEBSITE: 'WebSite',
  MEDICAL_PROCEDURE: 'MedicalProcedure',
  ITEM_LIST: 'ItemList',
  FAQ_PAGE: 'FAQPage',
  REVIEW: 'Review',
  WEB_PAGE: 'WebPage',
  ABOUT_PAGE: 'AboutPage',
  CONTACT_PAGE: 'ContactPage'
} as const;

/**
 * Duplicate detection utility
 */
export function detectSchemaDuplicates(schemas: JsonLd[]): string[] {
  const typeCount: Record<string, number> = {};
  const warnings: string[] = [];

  schemas.forEach(schema => {
    const rawType = schema['@type'];
    const normalizedType = Array.isArray(rawType)
      ? rawType.join(',')
      : typeof rawType === 'string'
        ? rawType
        : 'unknown';

    typeCount[normalizedType] = (typeCount[normalizedType] || 0) + 1;

    if (typeCount[normalizedType] > 1) {
      warnings.push(`Duplicate schema type detected: ${normalizedType}`);
    }
  });

  return warnings;
}

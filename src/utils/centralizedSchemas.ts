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
  name: 'Exquisite Dentistry Los Angeles',
  alternateName: 'Exquisite Dentistry',
  description: 'Premier cosmetic dentistry practice in Los Angeles specializing in porcelain veneers, teeth whitening, Invisalign, and complete smile makeovers',
  url: 'https://exquisitedentistryla.com/',
  telephone: '+1-323-272-2388',
  email: 'info@exquisitedentistryla.com',
  priceRange: '$$$',
  currenciesAccepted: 'USD',
  paymentAccepted: ['Cash', 'Credit Card', 'Insurance'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6222 Wilshire Blvd Suite 101',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90048',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.064851,
    longitude: -118.370092
  },
  hasMap: GOOGLE_MAPS_URL,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '19:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
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
      latitude: 34.064851,
      longitude: -118.370092
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
    'https://exquisitedentistryla.com/lovable-uploads/dr-aguil-banner-2024-m.webp',
    'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png',
    'https://exquisitedentistryla.com/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png'
  ],
  logo: 'https://exquisitedentistryla.com/lovable-uploads/dr-aguil-banner-2024-m.webp',
  sameAs: [
    'https://www.google.com/maps/place/Exquisite+Dentistry',
    'https://www.facebook.com/exquisitedentistryla',
    'https://www.instagram.com/exquisitedentistryla/',
    'https://www.yelp.com/biz/exquisite-dentistry-los-angeles-3'
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

// ============================================
// Schema Generator Functions
// Use these to create schemas that can be passed to MasterStructuredData
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQ schema object
 */
export function createFAQSchema(faqs: FAQItem[], about = 'Cosmetic Dentistry Services'): JsonLd {
  return {
    '@type': 'FAQPage',
    about: {
      '@type': 'Thing',
      name: about
    },
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    provider: getBusinessReference()
  };
}

export interface ProcedureStep {
  name: string;
  description: string;
}

export interface MedicalProcedureOptions {
  procedureName: string;
  description: string;
  url: string;
  image?: string;
  procedureType: string;
  bodyLocation: string;
  preparation?: string[];
  steps?: ProcedureStep[];
  followupCare?: string[];
  risks?: string[];
  benefits?: string[];
  duration?: string;
  recoveryTime?: string;
  priceRange?: string;
}

/**
 * Generate MedicalProcedure schema object
 */
export function createMedicalProcedureSchema(options: MedicalProcedureOptions): JsonLd {
  const schema: JsonLd = {
    '@type': 'MedicalProcedure',
    name: options.procedureName,
    description: options.description,
    url: `https://exquisitedentistryla.com${options.url}`,
    procedureType: options.procedureType,
    bodyLocation: {
      '@type': 'BodySystem',
      name: options.bodyLocation
    },
    provider: getBusinessReference(),
    performer: getDoctorReference()
  };

  if (options.image) schema.image = options.image;
  if (options.preparation?.length) schema.preparation = options.preparation.join('. ');
  if (options.followupCare?.length) schema.followupCare = options.followupCare.join('. ');
  if (options.risks?.length) schema.riskFactor = options.risks;
  if (options.benefits?.length) schema.expectedPrognosis = options.benefits.join('. ');
  if (options.recoveryTime) schema.recoveryTime = options.recoveryTime;
  if (options.priceRange) schema.priceRange = options.priceRange;

  if (options.steps?.length) {
    schema.howPerformed = options.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.description
    }));
  }

  return schema;
}

export interface WebPageOptions {
  title: string;
  description: string;
  url: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage';
}

/**
 * Generate WebPage schema object
 */
export function createWebPageSchema(options: WebPageOptions): JsonLd {
  return {
    '@type': options.pageType || 'WebPage',
    name: options.title,
    description: options.description,
    url: getCanonicalUrl(options.url),
    isPartOf: getWebsiteReference(),
    provider: getBusinessReference(),
    inLanguage: 'en-US'
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList schema object
 */
export function createBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getCanonicalUrl('/')
      },
      ...breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: breadcrumb.name,
        item: getCanonicalUrl(breadcrumb.url)
      }))
    ]
  };
}

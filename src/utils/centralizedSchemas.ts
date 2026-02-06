/**
 * Centralized schema management for structured data
 * Single source of truth for all business and entity schemas
 */

import { getCanonicalUrl } from './schemaValidation';
import type { JsonLd, LocalBusinessSchema } from './schemaValidation';
import {
  STREET_ADDRESS,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  POSTAL_CODE,
  ADDRESS_COUNTRY,
  PHONE_NUMBER_E164,
  EMAIL,
  SOCIAL_MEDIA
} from '../constants/contact';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Exquisite+Dentistry/@34.0622,-118.3567,17z';
const LOGO_URL = 'https://exquisitedentistryla.com/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp';
const BASE_URL = 'https://exquisitedentistryla.com';

const toAbsoluteUrl = (value?: string): string | undefined => {
  const raw = (value || '').trim();
  if (!raw) return undefined;

  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  if (raw.startsWith('//')) return `https:${raw}`;
  if (raw.startsWith('/')) return `${BASE_URL}${raw}`;
  return `${BASE_URL}/${raw}`;
};

// Master business entity - single source of truth
export const MASTER_BUSINESS_ENTITY: LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  '@id': 'https://exquisitedentistryla.com/#business',
  name: 'Exquisite Dentistry',
  alternateName: ['Exquisite Dentistry LA', 'Exquisite Dentistry Los Angeles'],
  description: 'Premier cosmetic dentistry practice in Los Angeles specializing in porcelain veneers, teeth whitening, Invisalign, and complete smile makeovers',
  url: 'https://exquisitedentistryla.com/',
  telephone: PHONE_NUMBER_E164,
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: STREET_ADDRESS,
    addressLocality: ADDRESS_LOCALITY,
    addressRegion: ADDRESS_REGION,
    postalCode: POSTAL_CODE,
    addressCountry: ADDRESS_COUNTRY
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
      closes: '18:00'
    }
  ],
  image: LOGO_URL,
  logo: LOGO_URL,
  sameAs: [
    SOCIAL_MEDIA.facebook,
    SOCIAL_MEDIA.instagram,
    SOCIAL_MEDIA.youtube
  ]
};

// Master doctor entity
export const MASTER_DOCTOR_ENTITY: JsonLd = {
  '@type': 'Person',
  '@id': 'https://exquisitedentistryla.com/#doctor',
  name: 'Dr. Alexie Aguil',
  jobTitle: 'Cosmetic Dentist',
  url: getCanonicalUrl('/about'),
  image: 'https://exquisitedentistryla.com/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png',
  worksFor: {
    '@id': 'https://exquisitedentistryla.com/#business'
  }
};

// Website schema
export const WEBSITE_ENTITY: JsonLd = {
  '@type': 'WebSite',
  '@id': 'https://exquisitedentistryla.com/#website',
  name: 'Exquisite Dentistry',
  alternateName: ['Exquisite Dentistry LA', 'Exquisite Dentistry Los Angeles'],
  url: getCanonicalUrl('/')
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
    url: getCanonicalUrl(options.url),
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

export interface BlogPostingOptions {
  headline: string;
  description: string;
  url: string;
  authorName: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
}

/**
 * Generate BlogPosting schema object
 */
export function createBlogPostingSchema(options: BlogPostingOptions): JsonLd {
  const imageUrl = toAbsoluteUrl(options.image);
  const schema: JsonLd = {
    '@type': 'BlogPosting',
    headline: options.headline,
    description: options.description,
    url: getCanonicalUrl(options.url),
    mainEntityOfPage: getCanonicalUrl(options.url),
    isPartOf: getWebsiteReference(),
    author: {
      '@type': 'Person',
      name: options.authorName
    },
    publisher: getBusinessReference(),
    inLanguage: 'en-US'
  };

  if (options.datePublished) schema.datePublished = options.datePublished;
  if (options.dateModified) schema.dateModified = options.dateModified;
  if (imageUrl) schema.image = [imageUrl];
  if (options.keywords?.length) schema.keywords = options.keywords.join(', ');

  return schema;
}

export interface VideoObjectOptions {
  name: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  embedUrl?: string;
  uploadDate?: string;
  duration?: string;
}

/**
 * Generate VideoObject schema object (for transformation stories and testimonials)
 */
export function createVideoObjectSchema(options: VideoObjectOptions): JsonLd {
  const thumbnailUrl = toAbsoluteUrl(options.thumbnailUrl);
  const contentUrl = toAbsoluteUrl(options.contentUrl);
  const embedUrl = toAbsoluteUrl(options.embedUrl);

  const schema: JsonLd = {
    '@type': 'VideoObject',
    name: options.name,
    description: options.description,
    url: getCanonicalUrl(options.url),
    publisher: getBusinessReference(),
    inLanguage: 'en-US'
  };

  if (thumbnailUrl) schema.thumbnailUrl = thumbnailUrl;
  if (contentUrl) schema.contentUrl = contentUrl;
  if (embedUrl) schema.embedUrl = embedUrl;
  if (options.uploadDate) schema.uploadDate = options.uploadDate;
  if (options.duration) schema.duration = options.duration;

  return schema;
}

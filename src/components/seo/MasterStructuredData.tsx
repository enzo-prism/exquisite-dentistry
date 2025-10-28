import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MASTER_BUSINESS_ENTITY,
  MASTER_DOCTOR_ENTITY,
  WEBSITE_ENTITY,
  REVIEW_AGGREGATE_DATA,
  detectSchemaDuplicates
} from '@/utils/centralizedSchemas';
import { validateLocalBusiness, validateJsonLd, logValidationErrors } from '@/utils/schemaValidation';
import type { JsonLd, LocalBusinessSchema } from '@/utils/schemaValidation';

interface MasterStructuredDataProps {
  includeBusiness?: boolean;
  includeDoctor?: boolean;
  includeWebsite?: boolean;
  includeReviews?: boolean;
  additionalSchemas?: JsonLd[];
}

const SCHEMA_ORG_CONTEXT = 'https://schema.org';

const ensureSchemaOrgContext = (schema: JsonLd): JsonLd => {
  const context = schema['@context'];
  const hasContext =
    (typeof context === 'string' && context.trim().length > 0) ||
    (Array.isArray(context) && context.length > 0);

  return hasContext
    ? schema
    : {
        '@context': SCHEMA_ORG_CONTEXT,
        ...schema
      };
};

/**
 * Master structured data component - single source of truth
 * Prevents duplication and ensures consistency across all pages
 */
const MasterStructuredData: React.FC<MasterStructuredDataProps> = ({
  includeBusiness = true,
  includeDoctor = false,
  includeWebsite = false,
  includeReviews = false,
  additionalSchemas = []
}) => {
  const schemas: JsonLd[] = [];

  // Add business entity
  if (includeBusiness) {
    const businessWithReviews = includeReviews ? {
      ...MASTER_BUSINESS_ENTITY,
      aggregateRating: REVIEW_AGGREGATE_DATA
    } : MASTER_BUSINESS_ENTITY;
    
    schemas.push(businessWithReviews);
  }

  // Add doctor entity
  if (includeDoctor) {
    schemas.push(MASTER_DOCTOR_ENTITY);
  }

  // Add website entity
  if (includeWebsite) {
    schemas.push(WEBSITE_ENTITY);
  }

  // Add additional schemas
  schemas.push(...additionalSchemas);

  const normalizedSchemas = schemas.map(ensureSchemaOrgContext);

  // Validate schemas and detect duplicates
  if (process.env.NODE_ENV === 'development') {
    normalizedSchemas.forEach((schema, index) => {
      const validationResult = validateJsonLd(schema);
      logValidationErrors(`Schema[${index}]`, validationResult);

      if (schema['@type'] === 'LocalBusiness' || (Array.isArray(schema['@type']) && schema['@type'].includes('LocalBusiness'))) {
        const businessValidation = validateLocalBusiness(schema as LocalBusinessSchema);
        logValidationErrors('BusinessSchema', businessValidation);
      }
    });

    const duplicateWarnings = detectSchemaDuplicates(normalizedSchemas);
    if (duplicateWarnings.length > 0) {
      console.warn('🔍 Schema duplication detected:', duplicateWarnings);
    }
  }

  return (
    <Helmet>
      {normalizedSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default MasterStructuredData;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MASTER_BUSINESS_ENTITY,
  MASTER_DOCTOR_ENTITY,
  WEBSITE_ENTITY,
  detectSchemaDuplicates
} from '@/utils/centralizedSchemas';
import { validateLocalBusiness, validateJsonLd, logValidationErrors } from '@/utils/schemaValidation';
import type { JsonLd, LocalBusinessSchema } from '@/utils/schemaValidation';

interface MasterStructuredDataProps {
  includeBusiness?: boolean;
  includeDoctor?: boolean;
  includeWebsite?: boolean;
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
 * Uses @graph pattern to ensure only one LocalBusiness entity exists
 */
const MasterStructuredData: React.FC<MasterStructuredDataProps> = ({
  includeBusiness = true,
  includeDoctor = false,
  includeWebsite = false,
  additionalSchemas = []
}) => {
  const graphEntities: JsonLd[] = [];

  // Add business entity (always first in graph if included)
  if (includeBusiness) {
    graphEntities.push(MASTER_BUSINESS_ENTITY);
  }

  // Add website entity
  if (includeWebsite) {
    graphEntities.push(WEBSITE_ENTITY);
  }

  // Add doctor entity
  if (includeDoctor) {
    graphEntities.push(MASTER_DOCTOR_ENTITY);
  }

  // Add additional schemas (must NOT contain LocalBusiness/Dentist/MedicalBusiness types)
  graphEntities.push(...additionalSchemas);

  // Create @graph wrapper
  const schemaGraph = {
    '@context': SCHEMA_ORG_CONTEXT,
    '@graph': graphEntities.map(ensureSchemaOrgContext)
  };

  // Validate schemas and detect duplicates
  if (process.env.NODE_ENV === 'development') {
    graphEntities.forEach((schema, index) => {
      const validationResult = validateJsonLd(schema);
      logValidationErrors(`Schema[${index}]`, validationResult);

      if (schema['@type'] === 'LocalBusiness' || (Array.isArray(schema['@type']) && schema['@type'].includes('LocalBusiness'))) {
        const businessValidation = validateLocalBusiness(schema as LocalBusinessSchema);
        logValidationErrors('BusinessSchema', businessValidation);
      }
    });

    const duplicateWarnings = detectSchemaDuplicates(graphEntities);
    if (duplicateWarnings.length > 0) {
      console.warn('🔍 Schema duplication detected:', duplicateWarnings);
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
};

export default MasterStructuredData;

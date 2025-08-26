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

interface MasterStructuredDataProps {
  includeBusiness?: boolean;
  includeDoctor?: boolean;
  includeWebsite?: boolean;
  includeReviews?: boolean;
  additionalSchemas?: any[];
}

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
  const schemas: any[] = [];

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

  // Validate schemas and detect duplicates
  if (process.env.NODE_ENV === 'development') {
    schemas.forEach((schema, index) => {
      const validationResult = validateJsonLd(schema);
      logValidationErrors(`Schema[${index}]`, validationResult);
      
      if (schema['@type'] === 'LocalBusiness' || (Array.isArray(schema['@type']) && schema['@type'].includes('LocalBusiness'))) {
        const businessValidation = validateLocalBusiness(schema);
        logValidationErrors('BusinessSchema', businessValidation);
      }
    });

    const duplicateWarnings = detectSchemaDuplicates(schemas);
    if (duplicateWarnings.length > 0) {
      console.warn('🔍 Schema duplication detected:', duplicateWarnings);
    }
  }

  return (
    <Helmet>
      {schemas.map((schema, index) => (
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
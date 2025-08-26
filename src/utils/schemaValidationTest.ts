/**
 * Testing utilities for structured data validation
 * Run these checks in development to ensure schema integrity
 */

import { validateLocalBusiness, validateItemList, validateJsonLd } from './schemaValidation';
import { MASTER_BUSINESS_ENTITY, MASTER_DOCTOR_ENTITY, detectSchemaDuplicates } from './centralizedSchemas';

/**
 * Run comprehensive schema validation tests
 */
export function runSchemaValidationTests(): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group('🔍 Schema Validation Tests');

  // Test master business entity
  const businessValidation = validateLocalBusiness(MASTER_BUSINESS_ENTITY);
  console.log('Business Entity Validation:', businessValidation);

  // Test doctor entity
  const doctorValidation = validateJsonLd(MASTER_DOCTOR_ENTITY);
  console.log('Doctor Entity Validation:', doctorValidation);

  // Test duplicate detection
  const testSchemas = [
    { '@type': 'LocalBusiness', name: 'Test 1' },
    { '@type': 'LocalBusiness', name: 'Test 2' },
    { '@type': 'Person', name: 'Test 3' }
  ];
  const duplicates = detectSchemaDuplicates(testSchemas);
  console.log('Duplicate Detection Test:', duplicates);

  console.groupEnd();
}

/**
 * Validate page-specific schemas
 */
export function validatePageSchemas(pageName: string, schemas: any[]): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group(`🔍 ${pageName} Schema Validation`);

  schemas.forEach((schema, index) => {
    const validation = validateJsonLd(schema);
    console.log(`Schema ${index + 1} (${schema['@type']}):`, validation);

    // Additional validation for specific types
    if (schema['@type'] === 'LocalBusiness' || 
        (Array.isArray(schema['@type']) && schema['@type'].includes('LocalBusiness'))) {
      const businessValidation = validateLocalBusiness(schema);
      console.log(`Business Schema ${index + 1}:`, businessValidation);
    }

    if (schema['@type'] === 'ItemList') {
      const itemListValidation = validateItemList(schema);
      console.log(`ItemList Schema ${index + 1}:`, itemListValidation);
    }
  });

  // Check for duplicates
  const duplicates = detectSchemaDuplicates(schemas);
  if (duplicates.length > 0) {
    console.warn('⚠️ Duplicate schemas detected:', duplicates);
  }

  console.groupEnd();
}

/**
 * URL consistency checker
 */
export function checkUrlConsistency(schemas: any[]): string[] {
  const issues: string[] = [];
  const baseUrl = 'https://exquisitedentistryla.com';

  schemas.forEach((schema, index) => {
    if (schema.url) {
      if (!schema.url.startsWith(baseUrl)) {
        issues.push(`Schema ${index + 1}: URL should start with ${baseUrl}`);
      }
      
      if (schema.url.includes('http://')) {
        issues.push(`Schema ${index + 1}: URL should use HTTPS`);
      }
      
      // Check for trailing slash consistency
      if (schema.url !== baseUrl + '/' && !schema.url.endsWith('/')) {
        issues.push(`Schema ${index + 1}: URL should end with trailing slash for consistency`);
      }
    }

    if (schema['@id']) {
      if (!schema['@id'].startsWith(baseUrl)) {
        issues.push(`Schema ${index + 1}: @id should start with ${baseUrl}`);
      }
    }
  });

  return issues;
}

/**
 * Schema completeness checker
 */
export function checkSchemaCompleteness(schema: any, requiredFields: string[]): string[] {
  const missing: string[] = [];

  requiredFields.forEach(field => {
    if (!schema[field]) {
      missing.push(field);
    }
  });

  return missing;
}

/**
 * Development helper to log all validation results
 */
export function logValidationSummary(pageName: string, schemas: any[]): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group(`📊 ${pageName} Validation Summary`);

  console.log(`Total schemas: ${schemas.length}`);
  
  const schemaTypes = schemas.map(s => s['@type']).join(', ');
  console.log(`Schema types: ${schemaTypes}`);

  const urlIssues = checkUrlConsistency(schemas);
  if (urlIssues.length > 0) {
    console.warn('URL issues:', urlIssues);
  }

  const duplicates = detectSchemaDuplicates(schemas);
  if (duplicates.length > 0) {
    console.warn('Duplicates:', duplicates);
  }

  console.groupEnd();
}
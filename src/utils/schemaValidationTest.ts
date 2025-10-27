/**
 * Testing utilities for structured data validation
 * Run these checks in development to ensure schema integrity
 */

import { validateLocalBusiness, validateItemList, validateJsonLd } from './schemaValidation';
import { MASTER_BUSINESS_ENTITY, MASTER_DOCTOR_ENTITY, detectSchemaDuplicates } from './centralizedSchemas';
import type { JsonLd, ItemListSchema, LocalBusinessSchema } from './schemaValidation';

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
  const testSchemas: JsonLd[] = [
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
export function validatePageSchemas(pageName: string, schemas: JsonLd[]): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group(`🔍 ${pageName} Schema Validation`);

  schemas.forEach((schema, index) => {
    const validation = validateJsonLd(schema);
    const schemaType = schema['@type'];
    const schemaTypeLabel = Array.isArray(schemaType)
      ? schemaType.join(', ')
      : typeof schemaType === 'string'
        ? schemaType
        : 'unknown';

    console.log(`Schema ${index + 1} (${schemaTypeLabel}):`, validation);

    if (
      schemaType === 'LocalBusiness' ||
      (Array.isArray(schemaType) && schemaType.includes('LocalBusiness'))
    ) {
      const businessValidation = validateLocalBusiness(schema as LocalBusinessSchema);
      console.log(`Business Schema ${index + 1}:`, businessValidation);
    }

    if (schemaType === 'ItemList') {
      const itemListValidation = validateItemList(schema as ItemListSchema);
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
export function checkUrlConsistency(schemas: JsonLd[]): string[] {
  const issues: string[] = [];
  const baseUrl = 'https://exquisitedentistryla.com';

  schemas.forEach((schema, index) => {
    const schemaUrl = typeof schema['url'] === 'string' ? schema['url'] : undefined;

    if (schemaUrl) {
      if (!schemaUrl.startsWith(baseUrl)) {
        issues.push(`Schema ${index + 1}: URL should start with ${baseUrl}`);
      }

      if (schemaUrl.includes('http://')) {
        issues.push(`Schema ${index + 1}: URL should use HTTPS`);
      }

      if (schemaUrl !== `${baseUrl}/` && !schemaUrl.endsWith('/')) {
        issues.push(`Schema ${index + 1}: URL should end with trailing slash for consistency`);
      }
    }

    const schemaId = typeof schema['@id'] === 'string' ? schema['@id'] : undefined;

    if (schemaId && !schemaId.startsWith(baseUrl)) {
      issues.push(`Schema ${index + 1}: @id should start with ${baseUrl}`);
    }
  });

  return issues;
}

/**
 * Schema completeness checker
 */
export function checkSchemaCompleteness(schema: JsonLd, requiredFields: string[]): string[] {
  const missing: string[] = [];

  requiredFields.forEach(field => {
    if (schema[field] === undefined || schema[field] === null) {
      missing.push(field);
    }
  });

  return missing;
}

/**
 * Development helper to log all validation results
 */
export function logValidationSummary(pageName: string, schemas: JsonLd[]): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group(`📊 ${pageName} Validation Summary`);

  console.log(`Total schemas: ${schemas.length}`);
  
  const schemaTypes = schemas
    .map(schema => {
      const type = schema['@type'];
      if (Array.isArray(type)) {
        return type.join(', ');
      }
      if (typeof type === 'string') {
        return type;
      }
      return 'unknown';
    })
    .join(', ');
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

/**
 * Schema validation utilities for structured data
 * Validates JSON-LD structured data against Google's requirements
 */

interface ValidationError {
  field: string;
  error: string;
  severity: 'error' | 'warning';
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Validates LocalBusiness structured data
 */
export function validateLocalBusiness(data: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Required fields
  if (!data.name) {
    errors.push({ field: 'name', error: 'Name is required', severity: 'error' });
  }

  if (!data.address || !data.address.streetAddress) {
    errors.push({ field: 'address.streetAddress', error: 'Street address is required', severity: 'error' });
  }

  if (!data.telephone) {
    errors.push({ field: 'telephone', error: 'Telephone is required', severity: 'error' });
  }

  if (!data.url) {
    errors.push({ field: 'url', error: 'URL is required', severity: 'error' });
  }

  // Recommended fields
  if (!data.openingHours && !data.openingHoursSpecification) {
    warnings.push({ field: 'openingHours', error: 'Opening hours are recommended', severity: 'warning' });
  }

  if (!data.priceRange) {
    warnings.push({ field: 'priceRange', error: 'Price range is recommended', severity: 'warning' });
  }

  if (!data.geo || !data.geo.latitude || !data.geo.longitude) {
    warnings.push({ field: 'geo', error: 'Geographic coordinates are recommended', severity: 'warning' });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates ItemList structured data for carousels
 */
export function validateItemList(data: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!data.itemListElement || !Array.isArray(data.itemListElement)) {
    errors.push({ field: 'itemListElement', error: 'itemListElement array is required', severity: 'error' });
  } else {
    data.itemListElement.forEach((item: any, index: number) => {
      if (!item['@type'] || item['@type'] !== 'ListItem') {
        errors.push({ field: `itemListElement[${index}].@type`, error: 'Must be ListItem', severity: 'error' });
      }
      if (!item.position) {
        errors.push({ field: `itemListElement[${index}].position`, error: 'Position is required', severity: 'error' });
      }
      if (!item.item) {
        errors.push({ field: `itemListElement[${index}].item`, error: 'Item is required', severity: 'error' });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * General JSON-LD validation
 */
export function validateJsonLd(data: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!data['@context']) {
    errors.push({ field: '@context', error: '@context is required', severity: 'error' });
  }

  if (!data['@type']) {
    errors.push({ field: '@type', error: '@type is required', severity: 'error' });
  }

  // URL validation
  if (data.url && !isValidUrl(data.url)) {
    errors.push({ field: 'url', error: 'Invalid URL format', severity: 'error' });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates URL format
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Development helper to log validation errors
 */
export function logValidationErrors(schemaType: string, result: ValidationResult): void {
  if (process.env.NODE_ENV === 'development') {
    if (!result.isValid) {
      console.warn(`🔍 Schema validation errors for ${schemaType}:`, result.errors);
    }
    if (result.warnings.length > 0) {
      console.info(`⚠️ Schema validation warnings for ${schemaType}:`, result.warnings);
    }
  }
}

/**
 * Standardized canonical URL generator
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = 'https://exquisitedentistryla.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const pathWithSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return `${baseUrl}${pathWithSlash}`;
}
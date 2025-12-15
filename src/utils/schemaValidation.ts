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

export type JsonLd = Record<string, unknown>;

interface PostalAddress {
  streetAddress?: string;
  [key: string]: unknown;
}

interface GeoCoordinatesSchema {
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}

export interface LocalBusinessSchema extends JsonLd {
  name?: string;
  address?: PostalAddress;
  telephone?: string;
  url?: string;
  openingHours?: unknown;
  openingHoursSpecification?: unknown;
  priceRange?: string;
  geo?: GeoCoordinatesSchema;
}

interface ItemListEntry extends JsonLd {
  position?: number | string;
  item?: JsonLd;
}

export interface ItemListSchema extends JsonLd {
  itemListElement?: ItemListEntry[];
}

/**
 * Validates LocalBusiness structured data
 */
export function validateLocalBusiness(data: LocalBusinessSchema): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Required fields
  if (typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push({ field: 'name', error: 'Name is required', severity: 'error' });
  }

  if (!data.address || typeof data.address.streetAddress !== 'string' || data.address.streetAddress.trim() === '') {
    errors.push({ field: 'address.streetAddress', error: 'Street address is required', severity: 'error' });
  }

  if (typeof data.telephone !== 'string' || data.telephone.trim() === '') {
    errors.push({ field: 'telephone', error: 'Telephone is required', severity: 'error' });
  }

  if (typeof data.url !== 'string' || data.url.trim() === '') {
    errors.push({ field: 'url', error: 'URL is required', severity: 'error' });
  }

  // Recommended fields
  if (!data.openingHours && !data.openingHoursSpecification) {
    warnings.push({ field: 'openingHours', error: 'Opening hours are recommended', severity: 'warning' });
  }

  if (
    !data.geo ||
    typeof data.geo.latitude !== 'number' ||
    typeof data.geo.longitude !== 'number'
  ) {
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
export function validateItemList(data: ItemListSchema): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!data.itemListElement || !Array.isArray(data.itemListElement)) {
    errors.push({ field: 'itemListElement', error: 'itemListElement array is required', severity: 'error' });
  } else {
    data.itemListElement.forEach((item, index) => {
      const itemType = item['@type'];
      const isListItem =
        itemType === 'ListItem' ||
        (Array.isArray(itemType) && itemType.includes('ListItem'));

      if (!isListItem) {
        errors.push({ field: `itemListElement[${index}].@type`, error: 'Must be ListItem', severity: 'error' });
      }

      if (item.position === undefined) {
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
export function validateJsonLd(data: JsonLd): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  const context = data['@context'];
  if (
    (typeof context !== 'string' || context.trim() === '') &&
    !Array.isArray(context)
  ) {
    errors.push({ field: '@context', error: '@context is required', severity: 'error' });
  }

  const type = data['@type'];
  if (
    (typeof type !== 'string' || type.trim() === '') &&
    (!Array.isArray(type) || type.length === 0)
  ) {
    errors.push({ field: '@type', error: '@type is required', severity: 'error' });
  }

  // URL validation
  if (typeof data.url === 'string' && !isValidUrl(data.url)) {
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
  
  // Handle root path
  if (!path || path === '/' || path === '') {
    return `${baseUrl}/`;
  }
  
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Add trailing slash for consistency
  const pathWithSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  
  return `${baseUrl}${pathWithSlash}`;
}

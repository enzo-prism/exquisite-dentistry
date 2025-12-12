/**
 * Contact information constants for Exquisite Dentistry
 */

// Phone numbers
export const PHONE_NUMBER_E164 = '+13232722388';
export const PHONE_NUMBER_DISPLAY = '(323) 272-2388';

// Other contact details
export const EMAIL = 'info@exquisitedentistryla.com';

// Address pieces for UI + schema consistency
export const STREET_ADDRESS = '6227 Wilshire Blvd';
export const ADDRESS_LOCALITY = 'Los Angeles';
export const ADDRESS_REGION = 'CA';
export const POSTAL_CODE = '90048';
export const ADDRESS_COUNTRY = 'US';
export const ADDRESS = `${STREET_ADDRESS}, ${ADDRESS_LOCALITY}, ${ADDRESS_REGION} ${POSTAL_CODE}`;

// Social media URLs
export const SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/exquisitedentistryla/',
  facebook: 'https://www.facebook.com/ExquisiteDentistry',
  youtube: 'https://www.youtube.com/@exquisitedentistryla7390'
} as const;

// Business hours (matches footer presentation)
export const BUSINESS_HOURS = [
  { label: 'Monday-Thursday', value: '8AM-6PM' },
  { label: 'Friday', value: 'Closed' },
  { label: 'Saturday', value: 'Closed' },
  { label: 'Sunday', value: 'Closed' }
] as const;

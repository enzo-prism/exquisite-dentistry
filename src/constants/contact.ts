/**
 * Contact information constants for Exquisite Dentistry
 */

// Phone numbers
export const PHONE_NUMBER_E164 = '+13232722388';
export const PHONE_NUMBER_DISPLAY = '(323) 272-2388';

// Other contact details
export const EMAIL = 'info@exquisitedentistry.com';
export const ADDRESS = '6227 Wilshire Blvd, Los Angeles, CA 90048';

// Social media URLs
export const SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/exquisitedentistryla/',
  facebook: 'https://www.facebook.com/exquisitedentistryla',
  youtube: 'https://www.youtube.com/@exquisitedentistryla'
} as const;

// Business hours (matches footer presentation)
export const BUSINESS_HOURS = [
  { label: 'Monday-Thursday', value: '8AM-6PM' },
  { label: 'Friday', value: 'Closed' },
  { label: 'Saturday', value: 'Closed' },
  { label: 'Sunday', value: 'Closed' }
] as const;

/**
 * Phone number formatting utilities for consistent tel: link generation
 */

/**
 * Converts various phone number formats to E.164 format for tel: links
 * @param phoneNumber - Phone number in any common format
 * @returns E.164 formatted phone number (e.g., +13232722388)
 */
export function formatPhoneForTel(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // If it's a 10-digit US number, add +1 prefix
  if (digitsOnly.length === 10) {
    return `+1${digitsOnly}`;
  }
  
  // If it already has country code (11 digits starting with 1)
  if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+${digitsOnly}`;
  }
  
  // Return as-is with + prefix if it doesn't match expected patterns
  return `+${digitsOnly}`;
}

/**
 * Formats phone number for display purposes
 * @param phoneNumber - Raw phone number
 * @returns Formatted display number (e.g., (323) 272-2388)
 */
export function formatPhoneForDisplay(phoneNumber: string): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Format 10-digit US numbers as (XXX) XXX-XXXX
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  
  // Format 11-digit numbers (with country code) as (XXX) XXX-XXXX
  if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    const withoutCountryCode = digitsOnly.slice(1);
    return `(${withoutCountryCode.slice(0, 3)}) ${withoutCountryCode.slice(3, 6)}-${withoutCountryCode.slice(6)}`;
  }
  
  // Return original if it doesn't match expected patterns
  return phoneNumber;
}
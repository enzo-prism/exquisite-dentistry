import React from 'react';
import { trackPhoneClick } from '@/utils/googleAdsTracking';
import { formatPhoneForTel } from '@/utils/phoneFormatting';

interface PhoneLinkProps {
  phoneNumber: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Enhanced phone link component that tracks phone clicks as potential conversions
 * Automatically formats phone numbers to E.164 format for proper tel: links
 */
const PhoneLink: React.FC<PhoneLinkProps> = ({ phoneNumber, children, className }) => {
  const handlePhoneClick = () => {
    trackPhoneClick(phoneNumber);
  };

  // Convert phone number to E.164 format for tel: link
  const telHref = formatPhoneForTel(phoneNumber);

  return (
    <a 
      href={`tel:${telHref}`}
      className={className}
      onClick={handlePhoneClick}
    >
      {children}
    </a>
  );
};

export default PhoneLink;
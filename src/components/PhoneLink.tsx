import React from 'react';
import { trackPhoneClick } from '@/utils/googleAdsTracking';

interface PhoneLinkProps {
  phoneNumber: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Enhanced phone link component that tracks phone clicks as potential conversions
 */
const PhoneLink: React.FC<PhoneLinkProps> = ({ phoneNumber, children, className }) => {
  const handlePhoneClick = () => {
    trackPhoneClick(phoneNumber);
  };

  return (
    <a 
      href={`tel:${phoneNumber}`}
      className={className}
      onClick={handlePhoneClick}
    >
      {children}
    </a>
  );
};

export default PhoneLink;
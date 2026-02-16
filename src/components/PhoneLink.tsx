import React from 'react';
import { trackPhoneClick } from '@/utils/googleAdsTracking';
import { formatPhoneForTel } from '@/utils/phoneFormatting';

interface PhoneLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  phoneNumber: string;
  children: React.ReactNode;
}

/**
 * Enhanced phone link component that tracks phone clicks as potential conversions
 * Automatically formats phone numbers to E.164 format for proper tel: links
 */
const PhoneLink = React.forwardRef<HTMLAnchorElement, PhoneLinkProps>(
  ({ phoneNumber, children, className, onClick, ...props }, ref) => {
    const handlePhoneClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      trackPhoneClick(phoneNumber);
      onClick?.(event);
    };

    // Convert phone number to E.164 format for tel: link
    const telHref = formatPhoneForTel(phoneNumber);

    return (
      <a
        ref={ref}
        href={`tel:${telHref}`}
        className={className}
        onClick={handlePhoneClick}
        {...props}
      >
        {children}
      </a>
    );
  },
);

PhoneLink.displayName = 'PhoneLink';

export default PhoneLink;

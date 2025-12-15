import React from 'react';
import { Button } from '@/components/ui/button';
import { gtagSendEvent } from '@/utils/googleAdsTracking';
import { cn } from '@/lib/utils';
import { normalizeInternalHref } from '@/utils/normalizeInternalHref';

interface ConversionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  trackConversion?: boolean;
}

/**
 * Enhanced Button component that automatically tracks Google Ads conversions
 * for consultation booking links and important CTAs
 */
const ConversionButton = React.forwardRef<HTMLButtonElement, ConversionButtonProps>(
  ({ 
    variant = "default", 
    size = "default", 
    asChild = false,
    href,
    target,
    rel,
    children, 
    className,
    trackConversion = true,
    onClick,
    ...props 
  }, ref) => {
    const normalizedHref = href ? normalizeInternalHref(href) : undefined;
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Track conversion if enabled and href is provided
      if (trackConversion && normalizedHref) {
        e.preventDefault();
        
        // For new tab navigation, open immediately to avoid popup blockers
        if (target === '_blank') {
          try {
            const newWindow = window.open(normalizedHref, '_blank', rel || 'noopener,noreferrer');
            if (newWindow) {
              // Window opened successfully, send tracking event without callback
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
                  'value': 1.0,
                  'currency': 'USD',
                  'custom_parameters': {
                    'conversion_type': 'consultation_booking',
                    'source_page': window.location.pathname,
                    'timestamp': new Date().toISOString()
                  }
                });
                console.log('Google Ads conversion event sent for new tab');
              }
            } else {
              console.warn('Popup blocked, using fallback tracking navigation');
              gtagSendEvent(normalizedHref, target);
            }
          } catch (error) {
            console.error('Error opening new tab:', error);
            gtagSendEvent(normalizedHref, target);
          }
        } else {
          // Same tab navigation - use tracking with callback
          gtagSendEvent(normalizedHref, target);
        }
      }
      
      // Call original onClick if provided
      if (onClick) {
        onClick(e);
      }
    };

    // If asChild is true and href is provided, render as anchor with tracking
    if (asChild && normalizedHref) {
      return (
        <Button 
          asChild={false}
          variant={variant}
          size={size}
          className={cn("group", className)}
          onClick={handleClick}
          ref={ref}
          {...props}
        >
          {children}
        </Button>
      );
    }

    // If href is provided but not asChild, render as button with tracking
    if (normalizedHref) {
      return (
        <Button 
          variant={variant}
          size={size}
          className={cn("group", className)}
          onClick={handleClick}
          ref={ref}
          {...props}
        >
          {children}
        </Button>
      );
    }

    // Regular button without href
    return (
      <Button
        variant={variant}
        size={size}
        className={cn("group", className)}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ConversionButton.displayName = "ConversionButton";

export default ConversionButton;

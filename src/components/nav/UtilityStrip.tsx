import React, { useEffect, useRef } from 'react';
import { MapPin, Phone } from 'lucide-react';
import OfficeStatus from '@/components/OfficeStatus';
import PhoneLink from '@/components/PhoneLink';
import { cn } from '@/lib/utils';
import { ADDRESS, PHONE_NUMBER_DISPLAY, STREET_ADDRESS } from '@/constants/contact';
import { GOOGLE_MAPS_SHORT_URL } from '@/constants/urls';
import { trackContactMethodClick } from '@/utils/vercelAnalytics';

const STRIP_LINK_CLASS =
  'group inline-flex h-9 items-center gap-2 rounded-sm text-white/65 transition-colors duration-200 hover:text-white focus-visible:!outline-none focus-visible:ring-1 focus-visible:ring-champagne/70';

/**
 * Desktop-only top strip: where, whether we're open, and the phone number.
 * The header is `sticky top-[-36px]`, so this strip scrolls away with the page
 * (no layout change, no CLS) while the main bar stays pinned.
 */
const UtilityStrip: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Once it has scrolled out of view, keep keyboard focus from landing on it.
  useEffect(() => {
    if (contentRef.current) contentRef.current.inert = hidden;
  }, [hidden]);

  return (
    <div className="hidden h-9 border-b border-white/[0.07] lg:block">
      <div
        ref={contentRef}
        className={cn(
          'nav-strip-content mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-6 px-6 text-[12px] font-medium tracking-[0.01em] xl:px-8',
          hidden && 'opacity-0',
        )}
      >
        <a
          href={GOOGLE_MAPS_SHORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${ADDRESS} in Google Maps (opens in a new tab)`}
          className={STRIP_LINK_CLASS}
          onClick={() =>
            trackContactMethodClick({
              method: 'directions',
              source: 'desktop_nav_strip',
              destination: GOOGLE_MAPS_SHORT_URL,
            })
          }
        >
          <MapPin
            className="h-3.5 w-3.5 text-champagne/80"
            aria-hidden="true"
          />
          <span>
            {STREET_ADDRESS} <span className="px-1 text-white/30">·</span>{" "}
            Near Beverly Hills
          </span>
        </a>

        <div className="flex items-center gap-5">
          <OfficeStatus className="text-[12px] font-medium tracking-[0.01em] text-white/65" />
          <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          <PhoneLink
            phoneNumber={PHONE_NUMBER_DISPLAY}
            analyticsSource="desktop_nav_text"
            className={cn(STRIP_LINK_CLASS, 'text-white/80')}
          >
            <Phone
              className="h-3.5 w-3.5 text-champagne/80"
              aria-hidden="true"
            />
            <span className="tabular-nums">{PHONE_NUMBER_DISPLAY}</span>
          </PhoneLink>
        </div>
      </div>
    </div>
  );
};

export default UtilityStrip;

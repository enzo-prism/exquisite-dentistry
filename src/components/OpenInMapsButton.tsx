import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GOOGLE_MAPS_SHORT_URL } from '@/constants/urls';
import { ADDRESS } from '@/constants/contact';
import { trackContactMethodClick } from '@/utils/vercelAnalytics';

interface OpenInMapsButtonProps {
  /** Analytics source id for the click, e.g. "contact_page", "locations_hub". */
  source: string;
  /** Visible label. Defaults to "Open in Google Maps". */
  label?: string;
  /** Extra classes (typically spacing such as `mt-2`). */
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

/**
 * Reusable "Open in Google Maps" button shown beside the practice address
 * (6227 Wilshire Blvd, Los Angeles, CA 90048). Opens the canonical maps link
 * in a new tab and reports the engagement. Use this anywhere the address is
 * displayed so every occurrence has a consistent maps affordance.
 */
const OpenInMapsButton: React.FC<OpenInMapsButtonProps> = ({
  source,
  label = 'Open in Google Maps',
  className,
  size = 'sm',
}) => (
  <Button asChild variant="outline" size={size} className={cn('button-static', className)}>
    <a
      href={GOOGLE_MAPS_SHORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${ADDRESS} in Google Maps (opens in a new tab)`}
      onClick={() =>
        trackContactMethodClick({
          method: 'directions',
          source,
          destination: GOOGLE_MAPS_SHORT_URL,
        })
      }
    >
      <span className="inline-flex items-center gap-2">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {label}
      </span>
    </a>
  </Button>
);

export default OpenInMapsButton;

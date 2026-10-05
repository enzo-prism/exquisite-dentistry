import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getOfficeStatus, type OfficeStatus as Status } from '@/utils/officeHours';

/**
 * "Open now · until 6 PM" with a live dot. Rendered only after mount so the
 * prerendered/initial HTML never claims a status computed at build time.
 */
const OfficeStatus: React.FC<{ className?: string; tone?: 'light' | 'dark' }> = ({ className, tone = 'dark' }) => {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOfficeStatus());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!status) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-medium tracking-wide',
        tone === 'dark' ? 'text-white/80' : 'text-gray-600',
        className,
      )}
    >
      <span className={cn('status-dot', !status.isOpen && 'status-dot--closed')} aria-hidden="true" />
      {status.label}
    </span>
  );
};

export default OfficeStatus;

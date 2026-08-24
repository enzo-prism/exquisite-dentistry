import { useEffect } from 'react';
import { trackPhoneClick } from '@/utils/googleAdsTracking';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';

const SCHEDULE_PATH = '/schedule-consultation';
const SCHEDULER_HOSTNAME = 'scheduling.simplifeye.co';
const PRACTICE_HOSTNAME = 'exquisitedentistryla.com';

const normalizePath = (pathname: string) => (
  pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/'
);

const isSchedulingHref = (href: string) => {
  try {
    const url = new URL(href, window.location.origin);
    const hostname = url.hostname.replace(/^www\./, '');
    const isPracticeOrigin = url.origin === window.location.origin || hostname === PRACTICE_HOSTNAME;

    return (
      hostname === SCHEDULER_HOSTNAME
      || (isPracticeOrigin && normalizePath(url.pathname) === SCHEDULE_PATH)
    );
  } catch {
    return false;
  }
};

const GlobalIntentTracking = () => {
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.dataset.analyticsTracking === 'off') return;

      const href = anchor.getAttribute('href')?.trim();
      if (!href) return;

      if (/^tel:/i.test(href)) {
        trackPhoneClick(
          href.replace(/^tel:/i, ''),
          anchor.dataset.analyticsSource || 'unclassified_phone_link',
        );
        return;
      }

      if (isSchedulingHref(href)) {
        trackConsultationIntent({
          source: anchor.dataset.analyticsSource || 'unclassified_schedule_link',
          ctaText: 'Schedule consultation',
          destination: href,
        });
      }
    };

    // React handlers run first at the app root. This bubbling listener then
    // fills analytics gaps for plain anchors; the analytics helpers dedupe links
    // already handled by PhoneLink or another tracked CTA.
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return null;
};

export default GlobalIntentTracking;

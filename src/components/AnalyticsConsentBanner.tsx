import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ANALYTICS_PREFERENCES_EVENT,
  getAnalyticsConsent,
  updateAnalyticsConsent,
} from '@/utils/googleAnalytics';

const AnalyticsConsentBanner = () => {
  const [isOpen, setIsOpen] = useState(() => getAnalyticsConsent() === null);

  const openPreferences = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
  }, [openPreferences]);

  const choose = (consent: 'granted' | 'denied') => {
    const previousConsent = getAnalyticsConsent();
    updateAnalyticsConsent(consent);
    setIsOpen(false);

    // The Vercel packages leave injected scripts and globals behind when
    // unmounted. Reload after revocation so the denied state starts clean.
    if (previousConsent === 'granted' && consent === 'denied') {
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <section
      aria-label="Analytics preferences"
      className="fixed bottom-3 left-1/2 z-[100] w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/15 bg-black/95 p-5 text-white shadow-2xl backdrop-blur md:bottom-6 md:p-6"
    >
      <h2 className="text-lg font-semibold text-white">Your analytics choice</h2>
      <p className="mt-2 text-sm leading-6 text-white/75">
        We use privacy-limited analytics to understand which pages and marketing work. We do not send
        your contact-form answers to Google Analytics. You can allow or decline analytics and change
        this choice later. If you decline, Google may still receive limited cookieless measurement
        signals, but optional analytics storage and Vercel analytics stay off.
      </p>
      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="inline-flex min-h-11 items-center text-sm text-gold-light underline underline-offset-4"
          to="/privacy-policy/"
        >
          Privacy Policy
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            onClick={() => choose('denied')}
          >
            Decline
          </Button>
          <Button type="button" className="min-h-11 bg-gold text-black hover:bg-gold/90" onClick={() => choose('granted')}>
            Allow analytics
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsConsentBanner;

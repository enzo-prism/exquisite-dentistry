import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ANALYTICS_PREFERENCES_EVENT,
  getAnalyticsConsent,
  updateAnalyticsConsent,
} from '@/utils/googleAnalytics';
import {
  getChatGptAdsMeasurementConsent,
  updateChatGptAdsMeasurementConsent,
} from '@/utils/chatgptAdsTracking';

const AnalyticsConsentBanner = () => {
  const getCurrentConsent = useCallback(() => {
    const analytics = getAnalyticsConsent();
    const ads = getChatGptAdsMeasurementConsent();
    return analytics === ads ? analytics : null;
  }, []);
  const [isOpen, setIsOpen] = useState(() => getCurrentConsent() === null);

  const openPreferences = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
  }, [openPreferences]);

  useEffect(() => {
    setIsOpen(getCurrentConsent() === null);
  }, [getCurrentConsent]);

  const choose = (consent: 'granted' | 'denied') => {
    const previouslyGranted = getAnalyticsConsent() === 'granted'
      || getChatGptAdsMeasurementConsent() === 'granted';
    const analyticsPersisted = updateAnalyticsConsent(consent);
    const adsPersisted = updateChatGptAdsMeasurementConsent(consent);
    const persisted = analyticsPersisted && adsPersisted;
    setIsOpen(false);

    // The Vercel packages leave injected scripts and globals behind when
    // unmounted. Reload after revocation so the denied state starts clean.
    // If storage rejects this choice, reloading could restore an older grant.
    if (persisted && previouslyGranted && consent === 'denied') {
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <section
      aria-label="Analytics preferences"
      className="fixed bottom-3 left-1/2 z-[100] w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/15 bg-black/95 p-4 text-white shadow-2xl backdrop-blur md:bottom-6 md:p-6"
    >
      <h2 className="text-base font-semibold text-white">Your analytics choice</h2>
      <p className="mt-2 text-sm leading-5 text-white/75">
        Allow Google Analytics, Vercel Analytics, and the OpenAI Ads conversion tag to measure visits and requests? We do not send your form answers.
      </p>
      <details className="mt-2 text-xs leading-5 text-white/75">
        <summary className="cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light">Details and privacy</summary>
        <p className="mt-2">
          If you decline, Google may still receive limited cookieless signals; optional analytics storage, Vercel Analytics, and OpenAI measurement stay off. You can change your choice later.
        </p>
        <Link className="inline-flex min-h-11 items-center text-white underline underline-offset-4" to="/privacy-policy/">Privacy Policy</Link>
      </details>
      <div className="mt-3">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            onClick={() => choose('denied')}
          >
            Decline
          </Button>
          <Button type="button" className="min-h-11 bg-gold text-black hover:bg-gold/90" onClick={() => choose('granted')}>
            Allow measurement
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsConsentBanner;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { isCanonicalAnalyticsHost } from '@/utils/analyticsHost';
import {
  CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT,
  getChatGptAdsMeasurementConsent,
  type ChatGptAdsMeasurementConsent,
} from '@/utils/chatgptAdsTracking';

const OPENAI_ADS_LEAD_CONFIRMED_EVENT = 'exquisite:chatgpt-ads-lead-confirmed';
const OPENAI_ADS_PIXEL_SCRIPT_ID = 'openai-ads-measurement-pixel';
const OPENAI_ADS_PIXEL_SRC = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';

const getPixelId = () => {
  const pixelId = import.meta.env.VITE_OPENAI_ADS_PIXEL_ID?.trim() ?? '';
  return pixelId.length <= 128 ? pixelId : '';
};

const installQueue = () => {
  if (window.oaiq) return window.oaiq;

  const queue = ((...args: unknown[]) => {
    queue.q?.push(args);
  }) as NonNullable<Window['oaiq']>;
  queue.q = [];
  window.oaiq = queue;
  return queue;
};

const isChatGptAdsLanding = (pathname: string) => (
  pathname.replace(/\/+$/, '') === '/lp/chatgpt'
);

const OpenAIAdsMeasurement = () => {
  const location = useLocation();

  useEffect(() => {
    const pixelId = getPixelId();
    if (!pixelId || !isCanonicalAnalyticsHost() || !isChatGptAdsLanding(location.pathname)) {
      return undefined;
    }

    const syncConsent = (nextConsent: boolean) => {
      if (window.__exquisiteOpenAIAdsConsent === nextConsent) return;
      window.oaiq?.('consent', nextConsent);
      window.__exquisiteOpenAIAdsConsent = nextConsent;
    };

    const initializeMeasurement = () => {
      if (getChatGptAdsMeasurementConsent() !== 'granted') return false;

      const oaiq = installQueue();
      // OpenAI defaults consent to true. Queue the explicit site choice before init.
      syncConsent(true);

      const initializedPixelIds = window.__exquisiteOpenAIAdsInitializedPixelIds ?? [];
      if (!initializedPixelIds.includes(pixelId)) {
        oaiq('init', {
          pixelId,
          debug: import.meta.env.DEV,
        });
        window.__exquisiteOpenAIAdsInitializedPixelIds = [...initializedPixelIds, pixelId];
      }

      if (!document.getElementById(OPENAI_ADS_PIXEL_SCRIPT_ID)) {
        const script = document.createElement('script');
        script.id = OPENAI_ADS_PIXEL_SCRIPT_ID;
        script.async = true;
        script.src = OPENAI_ADS_PIXEL_SRC;
        document.head.appendChild(script);
      }

      return true;
    };

    const handleConsentChange = (event: Event) => {
      const nextConsent = (event as CustomEvent<ChatGptAdsMeasurementConsent>).detail;
      if (nextConsent === 'granted') initializeMeasurement();
      else syncConsent(false);
    };

    const handleLeadConfirmed = () => {
      if (!initializeMeasurement()) return;

      window.oaiq?.(
        'measure',
        'lead_created',
        { type: 'customer_action' },
        { opt_out: true },
      );
    };

    window.addEventListener(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, handleConsentChange);
    window.addEventListener(OPENAI_ADS_LEAD_CONFIRMED_EVENT, handleLeadConfirmed);
    initializeMeasurement();

    return () => {
      window.removeEventListener(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, handleConsentChange);
      window.removeEventListener(OPENAI_ADS_LEAD_CONFIRMED_EVENT, handleLeadConfirmed);
    };
  }, [location.pathname]);

  return null;
};

export default OpenAIAdsMeasurement;

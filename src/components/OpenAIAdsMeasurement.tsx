import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isCanonicalAnalyticsHost, isAnalyticsSuppressedPath } from '@/utils/analyticsHost';
import { getUTMAttribution } from '@/utils/utmTracking';
import {
  CHATGPT_ADS_LEAD_CONFIRMED_EVENT,
  CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT,
  CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY,
  getChatGptAdsMeasurementConsent,
  clearChatGptAdsMemoryConsent,
} from '@/utils/chatgptAdsTracking';

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const MAX_FRAME_ATTEMPTS = 3;

/** The vendor runs in an opaque frame, never in the document containing the form. */
const OpenAIAdsMeasurement = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pixelId = import.meta.env.VITE_OPENAI_ADS_PIXEL_ID?.trim() ?? '';
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(pixelId)
      || !isCanonicalAnalyticsHost() || !isAnalyticsSuppressedPath(pathname)) return;

    let frame: HTMLIFrameElement | undefined;
    let channel = '';
    let ready = false;
    let attempts = 0;
    let retryTimer: number | undefined;
    let loadTimer: number | undefined;
    let disposed = false;
    const pending = new Set<string>();
    const seen = new Set<string>();

    const allowed = () => !disposed && isAnalyticsSuppressedPath()
      && getChatGptAdsMeasurementConsent() === 'granted';

    const removeFrame = () => {
      window.clearTimeout(loadTimer);
      window.clearTimeout(retryTimer);
      frame?.remove();
      frame = undefined;
      ready = false;
    };

    const flush = () => {
      if (!ready || !frame?.contentWindow || !allowed()) return;
      for (const eventId of pending) {
        // An opaque sandbox has no addressable origin. This targets only our
        // frame's WindowProxy; the frame authenticates source, origin and channel.
        frame.contentWindow.postMessage({ type: 'exquisite:openai-lead', channel, eventId }, '*');
      }
    };

    const recover = () => {
      removeFrame();
      if (allowed() && attempts < MAX_FRAME_ATTEMPTS) {
        retryTimer = window.setTimeout(initialize, attempts * 1_000);
      }
    };

    function initialize() {
      if (!allowed() || frame || attempts >= MAX_FRAME_ATTEMPTS) return;
      attempts += 1;
      channel = crypto.randomUUID();
      const url = new URL('/measurement/openai.html', window.location.origin);
      url.searchParams.set('pixel_id', pixelId);
      url.searchParams.set('channel', channel);
      const oppref = getUTMAttribution().oppref;
      if (oppref) url.searchParams.set('oppref', oppref);
      frame = document.createElement('iframe');
      frame.id = 'openai-ads-measurement-frame';
      frame.title = 'Campaign measurement';
      frame.hidden = true;
      frame.setAttribute('aria-hidden', 'true');
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.referrerPolicy = 'no-referrer';
      frame.src = url.toString();
      frame.onerror = recover;
      document.body.appendChild(frame);
      // The child owns three 10-second script attempts plus 1s/2s backoff.
      loadTimer = window.setTimeout(recover, 35_000);
    }

    const handleMessage = (event: MessageEvent) => {
      if (!frame || event.source !== frame.contentWindow || event.origin !== 'null'
        || !event.data || event.data.channel !== channel || !allowed()) return;
      if (event.data.type === 'exquisite:openai-ready') {
        window.clearTimeout(loadTimer);
        ready = true;
        flush();
      } else if (event.data.type === 'exquisite:openai-queued'
        && typeof event.data.eventId === 'string') {
        pending.delete(event.data.eventId);
      } else if (event.data.type === 'exquisite:openai-error') recover();
    };

    const syncConsent = () => {
      if (allowed()) initialize();
      else {
        removeFrame();
        pending.clear(); // Never replay a conversion after consent was withdrawn.
        attempts = 0;
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY) {
        clearChatGptAdsMemoryConsent();
        syncConsent();
      }
    };
    const handleLeadConfirmed = (event: Event) => {
      const eventId = (event as CustomEvent<{ eventId?: unknown }>).detail?.eventId;
      if (!allowed() || typeof eventId !== 'string' || !UUID.test(eventId) || seen.has(eventId)) return;
      seen.add(eventId);
      pending.add(eventId);
      initialize();
      flush();
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('storage', handleStorage);
    window.addEventListener(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, syncConsent);
    window.addEventListener(CHATGPT_ADS_LEAD_CONFIRMED_EVENT, handleLeadConfirmed);
    initialize();
    return () => {
      disposed = true;
      removeFrame();
      pending.clear();
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, syncConsent);
      window.removeEventListener(CHATGPT_ADS_LEAD_CONFIRMED_EVENT, handleLeadConfirmed);
    };
  }, [pathname]);

  return null;
};

export default OpenAIAdsMeasurement;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isCanonicalAnalyticsHost } from '@/utils/analyticsHost';
import { getOpenAIClickReference, clearOpenAIClickReference, resetOpenAIClickCache, OPENAI_CLICK_STORAGE_KEY } from '@/utils/openaiClickReference';
import {
  CHATGPT_ADS_LEAD_CONFIRMED_EVENT,
  CHATGPT_ADS_CONSENT_RECORD_KEY,
  CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT,
  CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY,
  getChatGptAdsMeasurementConsent,
  getChatGptAdsConsentSnapshot,
  clearChatGptAdsMemoryConsent,
} from '@/utils/chatgptAdsTracking';

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const REFERENCE = /^[A-Za-z0-9._~+/=-]{1,2048}$/;
type Transport = {
  reference?: string; frame?: HTMLIFrameElement; channel: string; ready: boolean;
  attempts: number; pending: Set<string>; retryTimer?: number; loadTimer?: number;
};

/** Each accepted request keeps its own click snapshot; the vendor sees no parent forms. */
const OpenAIAdsMeasurement = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    getOpenAIClickReference(getChatGptAdsMeasurementConsent());
  }, [pathname, search]);

  useEffect(() => {
    const pixelId = import.meta.env.VITE_OPENAI_ADS_PIXEL_ID?.trim() ?? '';
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(pixelId) || !isCanonicalAnalyticsHost()) return;
    let disposed = false;
    let activeEpoch: string | null | undefined;
    const transports = new Map<string, Transport>();
    const seen = new Set<string>();
    const allowed = () => !disposed && getChatGptAdsMeasurementConsent() === 'granted';
    const removeFrame = (transport: Transport) => {
      window.clearTimeout(transport.loadTimer);
      window.clearTimeout(transport.retryTimer);
      transport.frame?.remove(); transport.frame = undefined; transport.ready = false;
    };
    const discard = () => {
      for (const transport of transports.values()) { removeFrame(transport); transport.pending.clear(); }
      transports.clear();
    };
    const flush = (transport: Transport) => {
      if (!transport.ready || !transport.frame?.contentWindow || !allowed()
          || transports.get(transport.reference ?? '') !== transport) return;
      for (const eventId of transport.pending) {
        transport.frame.contentWindow.postMessage({ type: 'exquisite:openai-lead', channel: transport.channel, eventId }, '*');
      }
    };
    const recover = (transport: Transport) => {
      if (transports.get(transport.reference ?? '') !== transport) return;
      removeFrame(transport);
      if (allowed() && transport.attempts < 3) transport.retryTimer = window.setTimeout(() => initialize(transport), transport.attempts * 1_000);
    };
    function initialize(transport: Transport) {
      if (!allowed() || transport.frame || transport.attempts >= 3) return;
      if (transports.get(transport.reference ?? '') !== transport) return;
      transport.attempts += 1; transport.channel = crypto.randomUUID();
      const url = new URL('/measurement/openai.html', window.location.origin);
      url.searchParams.set('pixel_id', pixelId); url.searchParams.set('channel', transport.channel);
      if (transport.reference) url.searchParams.set('oppref', transport.reference);
      const frame = document.createElement('iframe');
      frame.id = transports.size === 1 ? 'openai-ads-measurement-frame' : `openai-ads-measurement-frame-${transport.channel}`; frame.title = 'Campaign measurement';
      frame.hidden = true; frame.setAttribute('aria-hidden', 'true'); frame.setAttribute('sandbox', 'allow-scripts');
      frame.referrerPolicy = 'no-referrer'; frame.src = url.toString(); frame.onerror = () => recover(transport);
      transport.frame = frame; document.body.appendChild(frame);
      transport.loadTimer = window.setTimeout(() => recover(transport), 35_000);
    }
    const getTransport = (reference?: string) => {
      const key = reference ?? '';
      let transport = transports.get(key);
      if (!transport) {
        transport = { reference, channel: '', ready: false, attempts: 0, pending: new Set() };
        transports.set(key, transport);
      }
      initialize(transport);
      return transport;
    };
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'null' || !event.data || !allowed()) return;
      const transport = [...transports.values()].find(t => event.source === t.frame?.contentWindow && event.data.channel === t.channel);
      if (!transport) return;
      if (event.data.type === 'exquisite:openai-ready') {
        window.clearTimeout(transport.loadTimer); transport.ready = true; flush(transport);
      } else if (event.data.type === 'exquisite:openai-queued' && typeof event.data.eventId === 'string') {
        transport.pending.delete(event.data.eventId);
      } else if (event.data.type === 'exquisite:openai-error') recover(transport);
    };
    const syncConsent = () => {
      if (allowed()) {
        const epoch = getChatGptAdsConsentSnapshot().updatedAt;
        if (activeEpoch !== undefined && activeEpoch !== epoch) discard();
        activeEpoch = epoch;
        getTransport(getOpenAIClickReference(getChatGptAdsMeasurementConsent(), Date.now()));
      } else { activeEpoch = undefined; discard(); } // Never replay a conversion after withdrawal.
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === OPENAI_CLICK_STORAGE_KEY) {
        if (event.newValue === null) clearOpenAIClickReference(); else resetOpenAIClickCache();
      }
      if (event.key === null || event.key === CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY || event.key === CHATGPT_ADS_CONSENT_RECORD_KEY) {
        // An intervening withdrawal still cancels accepted queues even if another
        // tab has already written a new grant before this event is handled.
        if (event.key === null || (event.key === CHATGPT_ADS_MEASUREMENT_CONSENT_STORAGE_KEY && event.newValue !== 'granted')) discard();
        clearChatGptAdsMemoryConsent(); syncConsent();
      }
    };
    const handleLeadConfirmed = (event: Event) => {
      const detail = (event as CustomEvent<{ eventId?: unknown; openaiClickReference?: unknown; consentUpdatedAt?: unknown }>).detail;
      const eventId = detail?.eventId;
      if (!allowed()) { discard(); return; }
      const epoch = getChatGptAdsConsentSnapshot().updatedAt;
      if (activeEpoch !== undefined && activeEpoch !== epoch) discard();
      activeEpoch = epoch;
      if (typeof eventId !== 'string' || !UUID.test(eventId) || seen.has(eventId)) return;
      // A request begun under an earlier consent grant cannot revive after withdrawal/regrant.
      if (Object.prototype.hasOwnProperty.call(detail, 'consentUpdatedAt')
          && detail.consentUpdatedAt !== getChatGptAdsConsentSnapshot().updatedAt) return;
      const reference = detail.openaiClickReference;
      if (reference !== undefined && (typeof reference !== 'string' || !REFERENCE.test(reference))) return;
      seen.add(eventId);
      const transport = getTransport(reference as string | undefined);
      transport.pending.add(eventId); flush(transport);
    };
    window.addEventListener('message', handleMessage);
    window.addEventListener('storage', handleStorage);
    window.addEventListener(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, syncConsent);
    window.addEventListener(CHATGPT_ADS_LEAD_CONFIRMED_EVENT, handleLeadConfirmed);
    syncConsent();
    return () => {
      disposed = true; discard();
      window.removeEventListener('message', handleMessage); window.removeEventListener('storage', handleStorage);
      window.removeEventListener(CHATGPT_ADS_MEASUREMENT_CONSENT_CHANGED_EVENT, syncConsent);
      window.removeEventListener(CHATGPT_ADS_LEAD_CONFIRMED_EVENT, handleLeadConfirmed);
    };
  }, []);
  return null;
};
export default OpenAIAdsMeasurement;

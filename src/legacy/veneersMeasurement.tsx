import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AnalyticsConsentBanner from '@/components/AnalyticsConsentBanner';
import OpenAIAdsMeasurement from '@/components/OpenAIAdsMeasurement';
import RouteAwareObservability from '@/components/RouteAwareObservability';
import { isCanonicalAnalyticsHost } from '@/utils/analyticsHost';
import { getAnalyticsConsent, openAnalyticsPreferences } from '@/utils/googleAnalytics';
import { initializeGoogleAdsTracking, trackFormSubmission } from '@/utils/googleAdsTracking';
import { annotateLeadSubmission } from '@/utils/leadMeasurement';
import { ATTRIBUTION_FIELDS, getCurrentUTMParameters, getUTMAttribution, initializeUTMTracking } from '@/utils/utmTracking';
import { isVercelTestTraffic, sanitizeTrackedPath } from '@/utils/vercelAnalytics';
import styles from '@/index.css?inline';

type LeadSnapshot = ReturnType<typeof annotateLeadSubmission> & { acquisitionLead: boolean };
type MeasurementBridge = {
  annotate: (payload: FormData, acquisitionLead: boolean) => LeadSnapshot;
  confirmed: (snapshot: LeadSnapshot) => void;
};

declare global {
  interface Window {
    exquisiteVeneersMeasurement?: MeasurementBridge;
  }
}

// The archived document does not load index.html's tag bootstrap. Use the
// same host, consent, URL redaction and manually emitted pageview policies.
const initializeGoogleTag = () => {
  if (!isCanonicalAnalyticsHost() || document.querySelector('script[data-name="google-tag"]')) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args) { window.dataLayer!.push(args); };
  window.gtag('consent', 'default', {
    analytics_storage: getAnalyticsConsent() === 'granted' ? 'granted' : 'denied',
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500,
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('set', 'url_passthrough', true);
  window.gtag('js', new Date());

  const safeLocation = new URL(sanitizeTrackedPath(location.pathname), location.origin);
  for (const [field, value] of Object.entries(getCurrentUTMParameters())) {
    if (field !== 'oppref' && value.length <= 120 && !value.includes('@') && !/(?:\+?\d[\s().-]*){7,}/.test(value)) {
      safeLocation.searchParams.set(field, value);
    }
  }
  const config = {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: safeLocation.toString(),
  };
  window.gtag('config', 'G-1MZGF2XNB5', config);
  window.gtag('config', 'AW-11373090310', config);
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1MZGF2XNB5';
  script.dataset.name = 'google-tag';
  document.head.append(script);
};

initializeUTMTracking();
initializeGoogleAdsTracking();
initializeGoogleTag();

const confirmed = new Set<string>();
window.exquisiteVeneersMeasurement = {
  annotate(payload, acquisitionLead) {
    const attribution = getUTMAttribution();
    for (const field of ATTRIBUTION_FIELDS) payload.set(field, attribution[field] ?? '');
    // A tab marked as QA remains excluded after subsequent document navigation.
    if (!isCanonicalAnalyticsHost() || isVercelTestTraffic()) payload.set('_codex_test', 'true');
    return { ...annotateLeadSubmission(payload, acquisitionLead), acquisitionLead };
  },
  confirmed(snapshot) {
    if (snapshot.isTest || isVercelTestTraffic() || confirmed.has(snapshot.eventId)) return;
    confirmed.add(snapshot.eventId);
    trackFormSubmission('contact_form', {
      ...snapshot,
      whichBestDescribesYou: snapshot.acquisitionLead ? 'Thinking about becoming a new patient' : undefined,
    });
  },
};
window.dispatchEvent(new Event('exquisite:veneers-measurement-ready'));

const mount = () => {
  if (document.getElementById('veneers-measurement')) return;
  const host = document.createElement('span');
  host.id = 'veneers-measurement';
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = `${styles}\n:host{all:initial;display:contents;font-family:Montserrat,Arial,sans-serif;--gold:38 24% 37%;--gold-light:42 30% 65%;--primary:38 24% 37%;--ring:38 23% 40%;--background:0 0% 100%}.veneers-preferences{display:inline-flex;align-items:center;min-height:24px;font:inherit;font-size:12px;color:#c9c5bf;background:transparent;border:0;padding:0;cursor:pointer;line-height:1.8}.veneers-preferences:hover{text-decoration:underline}.veneers-preferences:focus-visible{outline:2px solid #b4a582;outline-offset:4px}section[aria-label="Analytics preferences"]{z-index:2147483646}`;
  shadow.append(style);
  const root = document.createElement('span');
  shadow.append(root);
  (document.querySelector('#veneers-shell-footer .veneers-shell-footer-bottom nav') ?? document.body).append(host);

  // React Router's privacy Link must cross back into the main-site document.
  shadow.addEventListener('click', (event) => {
    if (!(event instanceof MouseEvent) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
    event.preventDefault();
    event.stopPropagation();
    window.location.assign(anchor.href);
  }, true);

  createRoot(root).render(
    <BrowserRouter>
      <RouteAwareObservability />
      <OpenAIAdsMeasurement />
      <AnalyticsConsentBanner />
      <button type="button" className="veneers-preferences" onClick={openAnalyticsPreferences}>Analytics preferences</button>
    </BrowserRouter>,
  );
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
else mount();

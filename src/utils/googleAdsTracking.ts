import {
  trackContactFormSubmitted,
  trackContactMethodClick,
  trackConsultationIntent,
  trackCtaClick,
} from '@/utils/vercelAnalytics';
import { SCHEDULE_CONSULTATION_PATH, SCHEDULING_URL } from '@/constants/urls';

const navigateToUrl = (url: string, target?: string) => {
  if (target === '_blank') {
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
    return;
  }

  window.location.href = url;
};

const isSchedulingDestination = (url?: string) => {
  if (!url) return false;

  try {
    const parsed = new URL(url, window.location.origin);
    const schedulingHost = new URL(SCHEDULING_URL).hostname;
    return parsed.pathname.replace(/\/+$/, '/') === SCHEDULE_CONSULTATION_PATH
      || parsed.hostname === schedulingHost;
  } catch {
    return false;
  }
};

/** Track the actual intent represented by the destination, then navigate immediately. */
export function gtagSendEvent(url?: string, target?: string, source = 'schedule_link'): boolean {
  if (typeof window === 'undefined') return false;

  if (isSchedulingDestination(url)) {
    trackConsultationIntent({
      source,
      ctaText: 'Consultation booking',
      destination: url,
    });
  } else {
    trackCtaClick({
      source,
      ctaText: 'Marketing action',
      destination: url,
    });
  }

  if (url) navigateToUrl(url, target);
  return true;
}

export function trackPhoneClick(phoneNumber: string, source = 'phone_link'): void {
  trackContactMethodClick({ method: 'phone', source, destination: `tel:${phoneNumber}` });
}

export function trackSMSClick(phoneNumber: string, source = 'sms_link'): void {
  trackContactMethodClick({ method: 'sms', source, destination: `sms:${phoneNumber}` });
}

/** Call only after the form endpoint has confirmed success. */
export function trackFormSubmission(formType: string, additionalData?: Record<string, unknown>): void {
  trackContactFormSubmitted({
    form: formType,
    persona: typeof additionalData?.whichBestDescribesYou === 'string'
      ? additionalData.whichBestDescribesYou
      : undefined,
    hasPhone: Boolean(additionalData?.hasPhone),
  });
}

export function trackCTAClick(ctaType: string, ctaText: string): void {
  trackCtaClick({ source: ctaType, ctaText });
}

export function initializeGoogleAdsTracking(): void {
  if (typeof window === 'undefined') return;
  window.gtagSendEvent = gtagSendEvent;
}

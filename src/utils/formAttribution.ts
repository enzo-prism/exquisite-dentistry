import {
  ATTRIBUTION_FIELDS,
  getCurrentUTMParameters,
  getStoredUTMAttribution,
} from '@/utils/utmTracking';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkgknpkl';

const sanitizeOperationalUrl = (value: string) => {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`.slice(0, 240);
  } catch {
    return '';
  }
};

const readQueryValue = (field: string) => {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(field)?.trim() ?? '';
};

export function appendFormspreeOpsMetadata(formData: FormData, formKey = 'contact') {
  formData.set('site', 'exquisite');
  formData.set('form_key', formKey);
  formData.set('environment', import.meta.env.MODE ?? 'production');
  formData.set('_codex_test', 'false');

  const currentAttribution = getCurrentUTMParameters();
  const storedAttribution = getStoredUTMAttribution() ?? {};
  formData.set('page_path', window.location.pathname);
  formData.set('referrer', sanitizeOperationalUrl(document.referrer));
  for (const field of ATTRIBUTION_FIELDS) {
    const currentValue = currentAttribution[field];
    const resolvedValue = currentValue
      ? currentValue
      : storedAttribution[field] ?? readQueryValue(field);
    formData.set(field, resolvedValue);
  }
}

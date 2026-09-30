/** OpenAI click identity has its own consented lifetime, independent of UTM campaigns. */
export const OPENAI_CLICK_STORAGE_KEY = 'exquisite_openai_click_v1';
export const resetOpenAIClickCache = () => { memoryRecord = undefined; memoryOnly = false; };
export const OPENAI_CLICK_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const SESSION_ATTRIBUTION_KEY = 'exquisite_session_attribution_v2';
type ClickRecord = { value: string; capturedAt: number };
let memoryRecord: ClickRecord | undefined;
let memoryOnly = false;

const validClick = (value: unknown): value is string => typeof value === 'string'
  && value.length > 0 && value.length <= 2048 && /^[A-Za-z0-9._~+/=-]+$/.test(value);

/** Withdrawal also removes legacy/session and URL copies so regrant cannot resurrect them. */
export const clearOpenAIClickReference = () => {
  memoryRecord = undefined;
  memoryOnly = true;
  if (typeof window === 'undefined') return;
  try { window.localStorage.removeItem(OPENAI_CLICK_STORAGE_KEY); } catch { /* Fail closed in memory. */ }
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(SESSION_ATTRIBUTION_KEY) ?? 'null');
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      delete stored.oppref;
      window.sessionStorage.setItem(SESSION_ATTRIBUTION_KEY, JSON.stringify(stored));
    }
  } catch { /* Do not depend on legacy attribution storage. */ }
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('oppref')) {
      url.searchParams.delete('oppref');
      window.history.replaceState(window.history.state, '', url.toString());
    }
  } catch { /* Storage/URL restrictions must never break the request form. */ }
};

export const getOpenAIClickReference = (
  consent: 'granted' | 'denied' | null,
  now = Date.now(),
): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  if (consent === 'denied') { clearOpenAIClickReference(); return undefined; }
  if (consent !== 'granted') return undefined;

  const current = new URLSearchParams(window.location.search).get('oppref');
  let record: ClickRecord | undefined = memoryRecord;
  if (!memoryOnly) {
    try { record = JSON.parse(window.localStorage.getItem(OPENAI_CLICK_STORAGE_KEY) ?? 'null') ?? undefined; }
    catch { memoryOnly = true; }
  }
  if (record && validClick(record.value) && current === record.value
      && (record.capturedAt > now || now - record.capturedAt >= OPENAI_CLICK_TTL_MS)) {
    clearOpenAIClickReference();
    return undefined;
  }
  if (!record || !validClick(record.value) || !Number.isFinite(record.capturedAt)
      || record.capturedAt > now || now - record.capturedAt >= OPENAI_CLICK_TTL_MS) {
    record = undefined;
    memoryRecord = undefined;
    try { window.localStorage.removeItem(OPENAI_CLICK_STORAGE_KEY); } catch { memoryOnly = true; }
  }
  if (current !== null) {
    if (!validClick(current)) { clearOpenAIClickReference(); return undefined; }
    // Reading the same landing URL does not prolong the original click lifetime.
    if (!record || record.value !== current) {
      record = { value: current, capturedAt: now };
      memoryRecord = record;
      try {
        window.localStorage.setItem(OPENAI_CLICK_STORAGE_KEY, JSON.stringify(record));
        memoryOnly = false;
      } catch { memoryOnly = true; }
      }
  }
  return record?.value;
};

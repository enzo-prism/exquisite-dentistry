const RECEIPT_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

/** One accepted receipt, once per document. Optional reporting never changes intake success. */
export const createConfirmedSubmissionReporter = () => {
  const reported = new Set<string>();
  return (eventId: unknown, destinations: Array<() => void>) => {
    if (typeof eventId !== 'string' || !RECEIPT_ID.test(eventId) || reported.has(eventId)) return false;
    // Reserve before invoking callbacks, including reentrant handlers.
    reported.add(eventId);
    for (const report of destinations) {
      try { report(); } catch { /* Accepted intake must not encourage a duplicate submission. */ }
    }
    return true;
  };
};

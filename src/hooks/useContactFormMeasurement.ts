import { useCallback, useRef, type FormEvent } from 'react';
import { trackContactFormStarted, trackContactFormAttempted } from '@/utils/vercelAnalytics';

/** Only form-layout labels leave this hook. No field names or values are read. */
export const useContactFormMeasurement = (form: string) => {
  const startRecorded = useRef(false);
  const recordStart = useCallback((event: FormEvent<HTMLFormElement>) => {
    if (!(event.target instanceof HTMLElement)
      || event.target.closest('[aria-hidden="true"], .hidden')
      || startRecorded.current) return;
    // If consent is granted later, a subsequent interaction can record the start.
    startRecorded.current = trackContactFormStarted(form);
  }, [form]);
  const recordAttempt = useCallback(() => trackContactFormAttempted(form), [form]);
  return { recordStart, recordAttempt };
};

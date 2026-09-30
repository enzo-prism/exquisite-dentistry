import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PhoneLink from '@/components/PhoneLink';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { CONSULTATION_SERVICES, getConsultationService } from '@/data/consultation';
import { annotateLeadSubmission } from '@/utils/leadMeasurement';
import { submitContactRequest } from '@/utils/submitContactRequest';
import { trackFormSubmission } from '@/utils/googleAdsTracking';
import { trackContactFormFailed } from '@/utils/vercelAnalytics';
import { ATTRIBUTION_FIELDS, getUTMAttribution } from '@/utils/utmTracking';

const FORM_ENDPOINT = 'https://formspree.io/f/xkgknpkl';
const SUCCESS_MESSAGE = 'Your callback request was received. Your appointment is not booked yet. Our team will contact you to discuss the next step.';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidPhone = (value: string) => {
  if (!/^[+\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return value.trim().startsWith('+')
    ? digits.length >= 8 && digits.length <= 15
    : digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
};

const ConsultationCallbackForm = ({ initialService }: { initialService?: string }) => {
  const [values, setValues] = useState({ name: '', phone: '', email: '', service: getConsultationService(initialService)?.id ?? '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    if (name in errors) setErrors(current => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current || status === 'success') return;
    if (honeypot) {
      setStatus('success');
      return;
    }
    const nextErrors = {
      name: values.name.trim() ? '' : 'Please enter your name.',
      phone: isValidPhone(values.phone) ? '' : 'Enter a 10-digit phone number or an international number starting with +.',
      email: !values.email.trim() || EMAIL_PATTERN.test(values.email.trim()) ? '' : 'Please enter a valid email address.',
    };
    setErrors(nextErrors);
    const firstInvalid = Object.entries(nextErrors).find(([, error]) => error);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid[0]}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setStatus('submitting');
    try {
      const data = new FormData();
      data.set('name', values.name.trim());
      data.set('phone', values.phone.trim());
      if (values.email.trim()) data.set('email', values.email.trim());
      data.set('request_type', 'Consultation callback request');
      data.set('form_key', 'consultation_callback');
      data.set('site', 'exquisite');
      data.set('environment', import.meta.env.MODE);
      data.set('page_path', window.location.pathname);
      const service = getConsultationService(values.service);
      if (service) data.set('service_interest', service.id);
      try {
        const referrer = new URL(document.referrer);
        data.set('referrer', `${referrer.origin}${referrer.pathname}`.slice(0, 240));
      } catch { /* An absent referrer is expected for direct visits. */ }
      const attribution = getUTMAttribution();
      for (const field of ATTRIBUTION_FIELDS) data.set(field, attribution[field] ?? '');
      const measurement = annotateLeadSubmission(data);
      await submitContactRequest(FORM_ENDPOINT, data);
      setStatus('success');
      setValues({ name: '', phone: '', email: '', service: '' });
      // Service choice and personal fields must never enter analytics events.
      try {
        trackFormSubmission('consultation_callback', { ...measurement, hasPhone: true });
      } catch {
        // Accepted delivery stays successful even when optional measurement fails.
      }
      requestAnimationFrame(() => feedbackRef.current?.focus());
    } catch {
      setStatus('error');
      trackContactFormFailed({ form: 'consultation_callback', reason: 'formspree_request_failed' });
    } finally {
      submitting.current = false;
    }
  };

  const inputClass = 'mt-2 w-full min-h-11 rounded-lg border border-border bg-background px-3 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-secondary';

  return (
    <section id="request-callback" className="scroll-mt-24 mt-10 rounded-2xl border border-border bg-stone-50 p-5 md:p-6" aria-labelledby="callback-heading">
      <h2 id="callback-heading" className="text-2xl font-semibold text-foreground">Request a callback</h2>
      <p className="mt-3 text-muted-foreground">Have questions before booking? Leave your number so our team can help you plan your visit.</p>
      <form ref={formRef} action={FORM_ENDPOINT} method="POST" noValidate onSubmit={handleSubmit} className="mt-6 space-y-5" aria-busy={status === 'submitting'}>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="callback-honeypot">Leave this empty</label>
          <input id="callback-honeypot" name="_gotcha" value={honeypot} onChange={event => setHoneypot(event.target.value)} tabIndex={-1} autoComplete="off" />
        </div>
        {status !== 'success' && <>
          <div className="grid gap-5 sm:grid-cols-2">
            {(['name', 'phone', 'email'] as const).map(field => (
              <div key={field}>
                <label htmlFor={`callback-${field}`} className="text-sm font-semibold text-foreground">{field === 'name' ? 'Name (required)' : field === 'phone' ? 'Phone (required)' : 'Email (optional)'}</label>
                <input id={`callback-${field}`} name={field} type={field === 'phone' ? 'tel' : field === 'email' ? 'email' : 'text'} autoComplete={field === 'phone' ? 'tel' : field} maxLength={field === 'name' ? 100 : field === 'phone' ? 30 : 254} required={field !== 'email'} disabled={status === 'submitting'} value={values[field]} onChange={handleChange} className={inputClass} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `callback-${field}-error` : undefined} />
                {errors[field] && <p id={`callback-${field}-error`} className="mt-2 text-sm text-red-700">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="callback-service" className="text-sm font-semibold text-foreground">Interested in (optional)</label>
              <div className="relative">
                <select id="callback-service" name="service" value={values.service} disabled={status === 'submitting'} onChange={handleChange} className={`${inputClass} h-12 appearance-none !py-2 pr-10`}>
                  <option value="">Help me choose</option>
                  {CONSULTATION_SERVICES.map(service => <option key={service.id} value={service.id}>{service.label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              </div>
            </div>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">By sending this request, you ask our team to contact you about your visit. Please do not include medical details. Read our <Link to="/privacy-policy/" className="text-secondary underline underline-offset-4">privacy policy</Link>.</p>
          <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">{status === 'submitting' ? 'Sending request…' : 'Request a callback'}</Button>
        </>}
        <div ref={feedbackRef} tabIndex={-1} role={status === 'error' ? 'alert' : 'status'} aria-live="polite" className="text-sm leading-6 text-foreground">
          {status === 'success' && SUCCESS_MESSAGE}
          {status === 'error' && <>We couldn’t confirm your request. Your details are still here. You can try again or call <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} className="text-secondary underline">{PHONE_NUMBER_DISPLAY}</PhoneLink> for help.</>}
        </div>
      </form>
    </section>
  );
};

export default ConsultationCallbackForm;

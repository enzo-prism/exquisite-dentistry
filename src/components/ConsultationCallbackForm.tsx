import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
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

  const fieldClass = 'block w-full h-12 rounded-xl border border-black/10 bg-white px-4 text-base text-ink shadow-[inset_0_1px_2px_rgba(23,18,10,0.04)] transition-[border-color,box-shadow] duration-300 placeholder:text-gray-400 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/15';
  const inputClass = `mt-2 ${fieldClass}`;
  const labelClass = 'block text-sm font-semibold text-ink';
  const fieldLabels = {
    name: ['Name', 'required'],
    phone: ['Phone', 'required'],
    email: ['Email', 'optional'],
  } as const;
  const labelHint = (hint: 'required' | 'optional') => (
    <span className={hint === 'required' ? 'text-xs font-medium text-gold-dark' : 'text-xs font-normal text-gray-500'}>({hint})</span>
  );

  return (
    <section id="request-callback" className="scroll-mt-24 rounded-2xl border border-gold/15 bg-white p-5 shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)] sm:p-7 md:p-9" aria-labelledby="callback-heading">
      <h2 id="callback-heading" className="text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-3xl">Request a callback</h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">Have questions before booking? Leave your number so our team can help you plan your visit.</p>
      <span aria-hidden="true" className="mt-6 block h-px w-full bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
      <form ref={formRef} action={FORM_ENDPOINT} method="POST" noValidate onSubmit={handleSubmit} className="mt-6 space-y-6" aria-busy={status === 'submitting'}>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="callback-honeypot">Leave this empty</label>
          <input id="callback-honeypot" name="_gotcha" value={honeypot} onChange={event => setHoneypot(event.target.value)} tabIndex={-1} autoComplete="off" />
        </div>
        {status !== 'success' && <>
          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            {(['name', 'phone', 'email'] as const).map(field => (
              <div key={field}>
                <label htmlFor={`callback-${field}`} className={labelClass}>{fieldLabels[field][0]} {labelHint(fieldLabels[field][1])}</label>
                <input id={`callback-${field}`} name={field} type={field === 'phone' ? 'tel' : field === 'email' ? 'email' : 'text'} autoComplete={field === 'phone' ? 'tel' : field} maxLength={field === 'name' ? 100 : field === 'phone' ? 30 : 254} required={field !== 'email'} disabled={status === 'submitting'} value={values[field]} onChange={handleChange} className={inputClass} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `callback-${field}-error` : undefined} />
                {errors[field] && <p id={`callback-${field}-error`} className="mt-2 text-sm leading-5 text-red-700">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="callback-service" className={labelClass}>Interested in {labelHint('optional')}</label>
              <div className="relative mt-2">
                <select id="callback-service" name="service" value={values.service} disabled={status === 'submitting'} onChange={handleChange} className={`${fieldClass} appearance-none !py-2 pr-11`}>
                  <option value="">Help me choose</option>
                  {CONSULTATION_SERVICES.map(service => <option key={service.id} value={service.id}>{service.label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 border-t border-gold/10 pt-6 md:flex-row-reverse md:items-center md:justify-between md:gap-8">
            <Button type="submit" size="lg" disabled={status === 'submitting'} className="group h-12 w-full shrink-0 px-8 text-[15px] font-semibold md:w-auto">
              {status === 'submitting' ? 'Sending request…' : 'Request a callback'}
              <ArrowRight className="transition-transform duration-300 motion-reduce:transform-none group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <p className="text-sm leading-6 text-gray-600 md:max-w-sm">By sending this request, you ask our team to contact you about your visit. Please do not include medical details. Read our <Link to="/privacy-policy/" className="font-medium text-gold-dark underline underline-offset-4 hover:no-underline">privacy policy</Link>.</p>
          </div>
        </>}
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role={status === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          className={cn(
            'text-sm leading-6 text-ink outline-none',
            status === 'success' && 'flex items-start gap-3 rounded-xl border border-emerald-700/15 bg-emerald-50/70 p-4 text-[15px] leading-7',
            status === 'error' && 'rounded-xl border border-red-700/15 bg-red-50/70 p-4',
          )}
        >
          {status === 'success' && <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />}
          {status === 'success' && SUCCESS_MESSAGE}
          {status === 'error' && <>We couldn’t confirm your request. Your details are still here. You can try again or call <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} className="text-secondary underline">{PHONE_NUMBER_DISPLAY}</PhoneLink> for help.</>}
        </div>
      </form>
    </section>
  );
};

export default ConsultationCallbackForm;

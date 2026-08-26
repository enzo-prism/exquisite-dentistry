import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneLink from '@/components/PhoneLink';
import PageSEO from '@/components/seo/PageSEO';
import { Button } from '@/components/ui/button';
import { ADDRESS, PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { ROUTE_METADATA } from '@/constants/metadata';
import { appendFormspreeOpsMetadata, FORMSPREE_ENDPOINT } from '@/utils/formAttribution';
import { trackFormSubmission } from '@/utils/googleAdsTracking';
import { trackContactFormFailed, trackContactFormValidationFailed } from '@/utils/vercelAnalytics';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  interest: '',
};

const inputClassName =
  'w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-shadow focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold';

const ChatGptAdsLanding = () => {
  const meta = ROUTE_METADATA['/lp/chatgpt'];
  const [values, setValues] = useState(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (name in errors && errors[name as keyof typeof errors]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    if (honeypot) {
      setStatus('success');
      setFeedback('Thank you. Our team will follow up shortly.');
      setValues(EMPTY_FORM);
      setHoneypot('');
      return;
    }

    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedPhone = values.phone.trim();
    const nextErrors = {
      name: trimmedName ? '' : 'Please enter your name.',
      email: !trimmedEmail
        ? 'Please enter your email address.'
        : EMAIL_PATTERN.test(trimmedEmail)
          ? ''
          : 'Please enter a valid email address (example: name@domain.com).',
      phone: trimmedPhone ? '' : 'Please enter a phone number.',
    };

    if (nextErrors.name || nextErrors.email || nextErrors.phone) {
      setErrors(nextErrors);
      setStatus('idle');
      const focusable = nextErrors.name
        ? nameRef.current
        : nextErrors.email
          ? emailRef.current
          : phoneRef.current;
      focusable?.focus();
      trackContactFormValidationFailed({
        form: 'chatgpt_ads_lead',
        fieldCount: Object.values(nextErrors).filter(Boolean).length,
        personaMissing: false,
        nameMissing: Boolean(nextErrors.name),
        emailMissing: nextErrors.email === 'Please enter your email address.',
        emailInvalid: nextErrors.email.startsWith('Please enter a valid'),
        messageMissing: false,
      });
      return;
    }

    setErrors({ name: '', email: '', phone: '' });
    setStatus('submitting');

    try {
      const formData = new FormData();
      formData.set('name', trimmedName);
      formData.set('email', trimmedEmail);
      formData.set('phone', trimmedPhone);
      if (values.interest.trim()) formData.set('interest', values.interest.trim());
      formData.set('lead_source', 'chatgpt_ads');
      formData.set('_subject', 'ChatGPT ads lead — Exquisite Dentistry');
      appendFormspreeOpsMetadata(formData, 'chatgpt_ads');

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setStatus('success');
      setFeedback('Thank you. Our team will follow up shortly.');
      setValues(EMPTY_FORM);
      trackFormSubmission('chatgpt_ads_lead', { hasPhone: true });
    } catch (error) {
      console.error('ChatGPT ads lead request failed', error);
      setStatus('error');
      setFeedback(`We could not send this request. Please call ${PHONE_NUMBER_DISPLAY}.`);
      trackContactFormFailed({
        form: 'chatgpt_ads_lead',
        reason: 'formspree_request_failed',
      });
    }
  };

  return (
    <>
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/lp/chatgpt"
        ogImage={meta.ogImage}
        noindex
      />

      <div className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-white via-stone-50 to-white">
          <div className="absolute inset-0">
            <div className="absolute left-[-10%] top-[-18rem] h-[28rem] w-[28rem] rounded-full bg-gold/18 blur-[140px]" />
            <div className="absolute bottom-[-12rem] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-[150px]" />
          </div>

          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,24rem)] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  Request a visit
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-foreground md:text-5xl">
                  A calm consultation for veneers, implants, or a second opinion.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  Share your name and how to reach you. This form is only a request — it does not
                  book a time on the calendar. A team member will follow up to find a visit that fits.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  Exquisite Dentistry is on Wilshire Blvd in Los Angeles, near Beverly Hills.
                  Private rooms, noise-canceling headphones, and a clear plan before treatment starts.
                </p>

                <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-[0_32px_80px_-44px_rgba(15,23,42,0.35)]">
                  <img
                    src="/lovable-uploads/office-tour.png"
                    alt="Dr. Alexie Aguil welcoming a patient near the reception desk"
                    className="h-auto w-full max-w-full object-cover"
                    width={1200}
                    height={800}
                  />
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-gold/20 bg-white/95 p-6 shadow-[0_20px_48px_-34px_rgba(0,0,0,0.18)] md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                  ChatGPT inquiry
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">
                  Request a callback
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Or call{' '}
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    analyticsSource="chatgpt_ads_landing_phone"
                    className="font-semibold text-foreground underline underline-offset-4 hover:text-secondary"
                  >
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                  .
                </p>

                {status === 'success' ? (
                  <p className="mt-6 rounded-sm border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-6 text-foreground" role="status">
                    {feedback}
                  </p>
                ) : (
                  <form
                    action={FORMSPREE_ENDPOINT}
                    method="POST"
                    noValidate
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                  >
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="chatgpt-bot-field">
                        Do not fill this out
                        <input
                          id="chatgpt-bot-field"
                          name="bot-field"
                          value={honeypot}
                          onChange={(event) => setHoneypot(event.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </label>
                    </div>

                    <div>
                      <label htmlFor="chatgpt-name" className="text-sm font-semibold text-foreground">
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        ref={nameRef}
                        id="chatgpt-name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'chatgpt-name-error' : undefined}
                        className={`${inputClassName} mt-2 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name ? <p id="chatgpt-name-error" className="mt-2 text-sm text-red-600">{errors.name}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="chatgpt-email" className="text-sm font-semibold text-foreground">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        ref={emailRef}
                        id="chatgpt-email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'chatgpt-email-error' : undefined}
                        className={`${inputClassName} mt-2 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email ? <p id="chatgpt-email-error" className="mt-2 text-sm text-red-600">{errors.email}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="chatgpt-phone" className="text-sm font-semibold text-foreground">
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <input
                        ref={phoneRef}
                        id="chatgpt-phone"
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'chatgpt-phone-error' : undefined}
                        className={`${inputClassName} mt-2 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone ? <p id="chatgpt-phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="chatgpt-interest" className="text-sm font-semibold text-foreground">
                        What would you like to discuss? <span className="font-normal text-muted-foreground">(optional)</span>
                      </label>
                      <textarea
                        id="chatgpt-interest"
                        name="interest"
                        rows={3}
                        value={values.interest}
                        onChange={handleChange}
                        className={`${inputClassName} mt-2`}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending…' : 'Request a callback'}
                    </Button>

                    {status === 'error' ? (
                      <p className="text-sm text-red-600" role="alert">{feedback}</p>
                    ) : null}
                  </form>
                )}

                <p className="mt-6 text-xs leading-5 text-muted-foreground">
                  We use this form only to follow up about a visit. Analytics stay on the same
                  consent settings as the rest of the site. See our{' '}
                  <Link to="/privacy-policy/" className="underline underline-offset-4 hover:text-foreground">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-gold/15 bg-gradient-to-br from-stone-50 to-white p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                The studio
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                {ADDRESS}. Monday–Thursday, 8AM–6PM. This page is separate from online scheduling
                so we can see which inquiries arrived from ChatGPT ads.
              </p>
              <div className="mt-5">
                <Button asChild variant="outline">
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    analyticsSource="chatgpt_ads_landing_footer_phone"
                    className="inline-flex items-center justify-center font-semibold"
                  >
                    Call {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChatGptAdsLanding;

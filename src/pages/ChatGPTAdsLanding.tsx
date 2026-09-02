import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Phone } from 'lucide-react';
import ImageComponent from '@/components/Image';
import OptimizedImage from '@/components/seo/OptimizedImage';
import PageSEO from '@/components/seo/PageSEO';
import PhoneLink from '@/components/PhoneLink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ADDRESS, PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { ATTRIBUTION_FIELDS, getCurrentUTMParameters, getStoredUTMAttribution } from '@/utils/utmTracking';
import { trackFormSubmission } from '@/utils/googleAdsTracking';
import { openAnalyticsPreferences } from '@/utils/googleAnalytics';
import { trackContactFormFailed, trackContactFormValidationFailed } from '@/utils/vercelAnalytics';
import { signalChatGptAdsLeadConfirmed } from '@/utils/chatgptAdsTracking';

const FORM_ENDPOINT = 'https://formspree.io/f/xkgknpkl';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_PATTERN = /\d/g;
const EMAIL_LIKE_PATH = /[^/\s@]+@[^/\s@]+\.[^/\s@]+/;
const PHONE_LIKE_PATH = /(?:\+?\d[\s().-]*){7,}/;

const INTEREST_OPTIONS = [
  { value: 'porcelain_veneers', label: 'Porcelain veneers' },
  { value: 'cosmetic_consultation', label: 'Cosmetic consultation' },
  { value: 'not_sure', label: 'Not sure yet' },
] as const;

type Interest = typeof INTEREST_OPTIONS[number]['value'] | '';
type FormValues = {
  name: string;
  email: string;
  phone: string;
  consultationInterest: Interest;
};

type FormErrors = Record<keyof FormValues, string>;

const EMPTY_FORM: FormValues = {
  name: '',
  email: '',
  phone: '',
  consultationInterest: '',
};

const EMPTY_ERRORS: FormErrors = {
  name: '',
  email: '',
  phone: '',
  consultationInterest: '',
};

const sanitizeOperationalUrl = (value: string) => {
  try {
    const url = new URL(value);
    const decodedPath = decodeURIComponent(url.pathname);
    if (EMAIL_LIKE_PATH.test(decodedPath) || PHONE_LIKE_PATH.test(decodedPath)) {
      return url.origin.slice(0, 240);
    }
    return `${url.origin}${url.pathname}`.slice(0, 240);
  } catch {
    return '';
  }
};

const appendAttributionMetadata = (formData: FormData) => {
  const currentAttribution = getCurrentUTMParameters();
  const storedAttribution = getStoredUTMAttribution() ?? {};
  const attribution = Object.keys(currentAttribution).length > 0
    ? currentAttribution
    : storedAttribution;

  formData.set('site', 'exquisite');
  formData.set('form_key', 'chatgpt_ads_consultation');
  formData.set('source', 'chatgpt_ads');
  formData.set('environment', import.meta.env.MODE ?? 'production');
  formData.set('_codex_test', 'false');
  formData.set('page_path', window.location.pathname);
  formData.set('referrer', sanitizeOperationalUrl(document.referrer));

  for (const field of ATTRIBUTION_FIELDS) {
    formData.set(field, attribution[field] ?? '');
  }
};

const ChatGPTAdsLanding = () => {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const interestRef = useRef<HTMLButtonElement | null>(null);
  const submissionInFlightRef = useRef(false);

  const setField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validate = () => {
    const nextErrors: FormErrors = { ...EMPTY_ERRORS };
    const name = values.name.trim();
    const email = values.email.trim();
    const phoneDigits = values.phone.match(PHONE_DIGITS_PATTERN)?.length ?? 0;

    if (!name) nextErrors.name = 'Please enter your name.';
    if (!email) nextErrors.email = 'Please enter your email address.';
    else if (!EMAIL_PATTERN.test(email)) nextErrors.email = 'Please enter a valid email address.';
    if (!values.phone.trim()) nextErrors.phone = 'Please enter your phone number.';
    else if (phoneDigits < 7) nextErrors.phone = 'Please enter a valid phone number.';
    if (!values.consultationInterest) nextErrors.consultationInterest = 'Please choose a consultation interest.';

    return nextErrors;
  };

  const focusFirstError = (nextErrors: FormErrors) => {
    if (nextErrors.name) nameRef.current?.focus();
    else if (nextErrors.email) emailRef.current?.focus();
    else if (nextErrors.phone) phoneRef.current?.focus();
    else if (nextErrors.consultationInterest) interestRef.current?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting' || submissionInFlightRef.current) return;

    if (honeypot) {
      setStatus('success');
      setFeedback('Thank you. Our team will follow up about your consultation request.');
      setValues(EMPTY_FORM);
      setHoneypot('');
      return;
    }

    const nextErrors = validate();
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      setStatus('error');
      setFeedback('Please correct the highlighted fields and try again.');
      focusFirstError(nextErrors);
      trackContactFormValidationFailed({
        form: 'chatgpt_ads_consultation',
        fieldCount: Object.values(nextErrors).filter(Boolean).length,
        personaMissing: false,
        nameMissing: Boolean(nextErrors.name),
        emailMissing: nextErrors.email === 'Please enter your email address.',
        emailInvalid: nextErrors.email === 'Please enter a valid email address.',
        messageMissing: false,
      });
      return;
    }

    setErrors(EMPTY_ERRORS);
    submissionInFlightRef.current = true;
    setStatus('submitting');
    setFeedback('');

    const selectedInterest = INTEREST_OPTIONS.find(
      (option) => option.value === values.consultationInterest,
    );

    try {
      const formData = new FormData();
      formData.set('name', values.name.trim());
      formData.set('email', values.email.trim());
      formData.set('phone', values.phone.trim());
      formData.set('consultation_interest', selectedInterest?.label ?? 'Not sure yet');
      appendAttributionMetadata(formData);

      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12_000);
      let response: Response;

      try {
        response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeout);
      }

      if (!response.ok) throw new Error('Formspree request failed');

      setStatus('success');
      setFeedback('Thank you. Our team will contact you soon to discuss consultation times.');
      setValues(EMPTY_FORM);
      setHoneypot('');

      trackFormSubmission('chatgpt_ads_consultation', { hasPhone: true });
      signalChatGptAdsLeadConfirmed();
    } catch (error) {
      console.error('ChatGPT Ads consultation request failed', error);
      setStatus('error');
      setFeedback(`We couldn't send your request. Please call ${PHONE_NUMBER_DISPLAY}.`);
      trackContactFormFailed({
        form: 'chatgpt_ads_consultation',
        reason: 'formspree_request_failed',
      });
    } finally {
      submissionInFlightRef.current = false;
    }
  };

  const inputClassName =
    'h-12 rounded-lg border-stone-300 bg-white px-4 text-base text-stone-950 placeholder:text-stone-400 focus-visible:ring-[#9b835e]';

  return (
    <>
      <PageSEO
        title="Cosmetic & Veneer Consultation in Los Angeles"
        description="Request a cosmetic or porcelain veneer consultation with Dr. Alexie Aguil at Exquisite Dentistry in Los Angeles."
        path="/lp/chatgpt"
        ogImage="/lovable-uploads/chatgpt-ads/dr-aguil-office-square-1200.jpg"
        noindex
        nofollow
        noarchive
      />

      <div className="min-h-screen bg-[#f7f5f0] text-stone-900">
        <header className="border-b border-white/10 bg-black">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
            <Link
              to="/"
              aria-label="Exquisite Dentistry home"
              className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5a077]"
            >
              <ImageComponent
                src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png"
                alt="Exquisite Dentistry"
                responsive
                logoType="main"
                priority
                className="h-7 w-auto max-w-[176px] object-contain sm:h-8 sm:max-w-[205px]"
              />
            </Link>
            <PhoneLink
              phoneNumber={PHONE_NUMBER_DISPLAY}
              analyticsSource="chatgpt_ads_header"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition-colors hover:border-[#b5a077] hover:text-[#d7c49a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5a077]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{PHONE_NUMBER_DISPLAY}</span>
              <span className="sm:hidden">Call</span>
            </PhoneLink>
          </div>
        </header>

        <div>
          <section className="relative overflow-hidden border-b border-stone-200">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(181,160,119,0.20),transparent_34%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.03fr_0.97fr] lg:items-start lg:gap-16 lg:px-8 lg:py-20">
              <div className="pt-2 lg:sticky lg:top-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#725f43]">
                  Cosmetic consultation · Los Angeles
                </p>
                <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-stone-950 sm:text-5xl lg:text-[3.6rem]">
                  A thoughtful first step toward the smile you have in mind.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
                  Meet with Dr. Alexie Aguil to discuss porcelain veneers and other cosmetic options. Your consultation is a conversation, not a commitment.
                </p>

                <Button
                  asChild
                  className="mt-7 h-12 rounded-lg bg-stone-950 px-6 text-base font-semibold !text-white shadow-none hover:bg-stone-800 lg:hidden"
                >
                  <a href="#consultation-form">
                    Request a consultation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>

                <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 shadow-[0_24px_70px_-42px_rgba(28,25,23,0.55)]">
                  <OptimizedImage
                    src="/lovable-uploads/dr-aguil-banner-2024-m.webp"
                    alt="Dr. Alexie Aguil at Exquisite Dentistry"
                    width={2400}
                    height={1368}
                    priority
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    context="team"
                    className="aspect-[3/2] h-full w-full object-cover"
                  />
                </div>

                <ul className="mt-7 grid gap-3 text-sm text-stone-700 sm:grid-cols-3">
                  {['Discuss your goals', 'Review appropriate options', 'Understand next steps'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9b835e] text-white">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="consultation-form" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_30px_90px_-50px_rgba(28,25,23,0.55)] sm:p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#725f43]">Private consultation request</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
                  Request a cosmetic consultation
                </h2>
                <p className="mt-3 leading-7 text-stone-600">
                  Tell us how to reach you. Our team will follow up about scheduling.
                </p>
                <p className="mt-2 text-sm text-stone-500">All fields are required.</p>

                <form action={FORM_ENDPOINT} method="POST" noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="hidden" aria-hidden="true">
                    <Label htmlFor="chatgpt-ads-bot-field">Do not fill this out</Label>
                    <Input
                      id="chatgpt-ads-bot-field"
                      name="chatgpt-ads-bot-field"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <Label htmlFor="chatgpt-ads-name" className="text-stone-800">Name</Label>
                    <Input
                      ref={nameRef}
                      id="chatgpt-ads-name"
                      name="name"
                      value={values.name}
                      onChange={(event) => setField('name', event.target.value)}
                      autoComplete="name"
                      required
                      aria-required="true"
                      maxLength={100}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'chatgpt-ads-name-error' : undefined}
                      className={`mt-2 ${inputClassName} ${errors.name ? 'border-red-600' : ''}`}
                    />
                    {errors.name ? <p id="chatgpt-ads-name-error" className="mt-2 text-sm text-red-700">{errors.name}</p> : null}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="chatgpt-ads-email" className="text-stone-800">Email</Label>
                      <Input
                        ref={emailRef}
                        id="chatgpt-ads-email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={(event) => setField('email', event.target.value)}
                        autoComplete="email"
                        inputMode="email"
                        required
                        aria-required="true"
                        maxLength={160}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'chatgpt-ads-email-error' : undefined}
                        className={`mt-2 ${inputClassName} ${errors.email ? 'border-red-600' : ''}`}
                      />
                      {errors.email ? <p id="chatgpt-ads-email-error" className="mt-2 text-sm text-red-700">{errors.email}</p> : null}
                    </div>

                    <div>
                      <Label htmlFor="chatgpt-ads-phone" className="text-stone-800">Phone</Label>
                      <Input
                        ref={phoneRef}
                        id="chatgpt-ads-phone"
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={(event) => setField('phone', event.target.value)}
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        aria-required="true"
                        maxLength={40}
                        placeholder="(323) 555-0123"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'chatgpt-ads-phone-error' : undefined}
                        className={`mt-2 ${inputClassName} ${errors.phone ? 'border-red-600' : ''}`}
                      />
                      {errors.phone ? <p id="chatgpt-ads-phone-error" className="mt-2 text-sm text-red-700">{errors.phone}</p> : null}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="chatgpt-ads-interest" className="text-stone-800">Consultation interest</Label>
                    <Select
                      value={values.consultationInterest}
                      onValueChange={(value: Interest) => setField('consultationInterest', value)}
                    >
                      <SelectTrigger
                        ref={interestRef}
                        id="chatgpt-ads-interest"
                        aria-required="true"
                        aria-invalid={Boolean(errors.consultationInterest)}
                        aria-describedby={errors.consultationInterest ? 'chatgpt-ads-interest-error' : undefined}
                        className={`mt-2 h-12 rounded-lg border-stone-300 bg-white px-4 text-base text-stone-950 focus:ring-[#9b835e] ${errors.consultationInterest ? 'border-red-600' : ''}`}
                      >
                        <SelectValue placeholder="Choose one" />
                      </SelectTrigger>
                      <SelectContent>
                        {INTEREST_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.consultationInterest ? (
                      <p id="chatgpt-ads-interest-error" className="mt-2 text-sm text-red-700">{errors.consultationInterest}</p>
                    ) : null}
                  </div>

                  <div className="rounded-xl border border-[#9b835e]/25 bg-[#f7f5f0] p-4 text-sm leading-6 text-stone-600">
                    Please do not include symptoms, medical history, insurance details, or other health information in this initial request.
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="h-12 w-full rounded-lg bg-stone-950 text-base font-semibold !text-white shadow-none hover:bg-stone-800"
                  >
                    {status === 'submitting' ? 'Sending request…' : 'Request my consultation'}
                    {status !== 'submitting' ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
                  </Button>

                  {feedback ? (
                    <div
                      role={status === 'error' ? 'alert' : 'status'}
                      aria-live="polite"
                      className={`rounded-lg border p-4 text-sm leading-6 ${
                        status === 'success'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                          : 'border-red-200 bg-red-50 text-red-900'
                      }`}
                    >
                      {feedback}
                    </div>
                  ) : null}

                  <p className="text-xs leading-5 text-stone-500">
                    By submitting, you agree that Exquisite Dentistry may contact you about this request. Review our{' '}
                    <Link to="/privacy-policy/" className="font-medium text-stone-800 underline underline-offset-2 hover:text-[#725f43]">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </div>
          </section>

          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#725f43]">What to expect</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                  Clear information, at your pace.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
                  Cosmetic dentistry is personal. The first visit is an opportunity to explain what you are considering, ask questions, and understand what an examination may show before deciding on treatment.
                </p>
              </div>

              <ol className="space-y-6">
                {[
                  ['01', 'Our team contacts you', 'We will reach out using the phone number or email you provide to discuss available consultation times.'],
                  ['02', 'You meet with Dr. Aguil', 'Share what you are hoping to explore and review options that may be appropriate after an in-person evaluation.'],
                  ['03', 'You receive clear next steps', 'If you choose to continue, the team can explain timing, fees, and the next stage of planning.'],
                ].map(([number, title, description]) => (
                  <li key={number} className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-stone-200 pt-6 first:border-t-0 first:pt-0">
                    <span className="text-sm font-semibold text-[#725f43]">{number}</span>
                    <div>
                      <h3 className="font-semibold text-stone-950">{title}</h3>
                      <p className="mt-2 leading-7 text-stone-600">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="border-y border-stone-200 bg-[#eeeae2] py-12">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#725f43]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-stone-950">Exquisite Dentistry</p>
                  <p className="mt-1 text-stone-600">{ADDRESS}</p>
                </div>
              </div>
              <Button asChild variant="outline" className="h-11 rounded-lg border-stone-400 bg-transparent text-stone-900 hover:bg-stone-950 hover:!text-white">
                <a href="#consultation-form">Request a consultation</a>
              </Button>
            </div>
          </section>
        </div>

        <footer className="bg-black py-7 text-white/65">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-xs sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>© {new Date().getFullYear()} Exquisite Dentistry. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy-policy/" className="hover:text-[#d7c49a]">Privacy Policy</Link>
              <button type="button" className="hover:text-[#d7c49a]" onClick={openAnalyticsPreferences}>
                Privacy choices
              </button>
              <Link to="/terms-of-service/" className="hover:text-[#d7c49a]">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChatGPTAdsLanding;

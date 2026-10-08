import { annotateLeadSubmission } from '@/utils/leadMeasurement';
import { useContactFormMeasurement } from '@/hooks/useContactFormMeasurement';
import { submitContactRequest } from '@/utils/submitContactRequest';

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConversionButton from '@/components/ConversionButton';
import PhoneLink from '@/components/PhoneLink';
import { trackFormSubmission } from '@/utils/googleAdsTracking';
import {
  trackContactFormFailed,
  trackContactFormValidationFailed,
  trackContactMethodClick,
} from '@/utils/vercelAnalytics';
import AnimatedHeadline from '@/components/motion/AnimatedHeadline';
import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/SectionHeading';
import OfficeStatus from '@/components/OfficeStatus';
import { OptimizedImage } from '@/components/seo';
import {
  ATTRIBUTION_FIELDS,
  getUTMAttribution,
} from '@/utils/utmTracking';
import ReviewWidget from '@/components/ReviewWidget';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import PageSEO from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { ROUTE_METADATA } from '@/constants/metadata';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import {
  PHONE_NUMBER_DISPLAY,
  EMAIL,
  STREET_ADDRESS,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  POSTAL_CODE
} from '@/constants/contact';
import OpenInMapsButton from '@/components/OpenInMapsButton';
import { PRACTICE_FACTS } from '@/data/practiceFacts';

// Social media URLs - removed X (Twitter)
const SOCIAL_URLS = {
  FACEBOOK: "https://www.facebook.com/ExquisiteDentistry/",
  INSTAGRAM: "https://www.instagram.com/exquisitedentistryla/"
};

const FORM_ENDPOINT = 'https://formspree.io/f/xkgknpkl';
const CONTACT_LABEL_CLASS = 'mb-2 text-sm font-semibold text-ink';
const CONTACT_FIELD_CLASS =
  'block h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-base text-ink placeholder:text-gray-400 shadow-[inset_0_1px_2px_rgba(23,18,10,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/15';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sanitizeOperationalUrl = (value: string) => {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`.slice(0, 240);
  } catch {
    return '';
  }
};

function appendFormspreeOpsMetadata(formData: FormData, formKey = 'contact') {
  formData.set('site', 'exquisite');
  formData.set('form_key', formKey);
  formData.set('environment', import.meta.env.MODE ?? 'production');

  const attribution = getUTMAttribution();
  formData.set('page_path', window.location.pathname);
  formData.set('referrer', sanitizeOperationalUrl(document.referrer));
  for (const field of ATTRIBUTION_FIELDS) {
    formData.set(field, attribution[field] ?? '');
  }
}

const CONTACT_PERSONA_OPTIONS = [
  { value: 'existing_patient', label: 'Existing patient' },
  { value: 'new_patient', label: 'Thinking about becoming a new patient' },
  { value: 'vendor_business', label: 'Vendor/business' }
] as const;

const EMPTY_BENEFITS_FORM = {
  name: '',
  email: '',
  phone: '',
  carrier: '',
  planName: '',
};

const BenefitsVerificationForm = () => {
  const { recordStart, recordAttempt } = useContactFormMeasurement('insurance_benefits_request');
  const [values, setValues] = useState(EMPTY_BENEFITS_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', carrier: '' });
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const carrierRef = useRef<HTMLInputElement | null>(null);
  const submissionInFlightRef = useRef(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    if (name in errors && errors[name as keyof typeof errors]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting' || submissionInFlightRef.current) return;

    if (honeypot) {
      setStatus('success');
      setFeedback('Thank you. Our team will follow up about your PPO benefits.');
      setValues(EMPTY_BENEFITS_FORM);
      setHoneypot('');
      return;
    }

    recordAttempt();
    const nextErrors = {
      name: values.name.trim() ? '' : 'Please enter your name.',
      email: !values.email.trim()
        ? 'Please enter your email address.'
        : EMAIL_PATTERN.test(values.email.trim())
          ? ''
          : 'Please enter a valid email address.',
      carrier: values.carrier.trim() ? '' : 'Please enter your insurance carrier.',
    };

    if (Object.values(nextErrors).some(Boolean)) {
      trackContactFormValidationFailed({
        form: 'insurance_benefits_request',
        fieldCount: Object.values(nextErrors).filter(Boolean).length,
        personaMissing: false, nameMissing: Boolean(nextErrors.name),
        emailMissing: !values.email.trim(), emailInvalid: Boolean(values.email.trim() && nextErrors.email),
        messageMissing: false,
      });
      setErrors(nextErrors);
      setStatus('error');
      setFeedback('Please correct the highlighted fields and try again.');
      const firstInvalid =
        (nextErrors.name && nameRef.current) ||
        (nextErrors.email && emailRef.current) ||
        (nextErrors.carrier && carrierRef.current) ||
        null;
      firstInvalid?.focus();
      return;
    }

    setErrors(nextErrors);
    submissionInFlightRef.current = true;
    setStatus('submitting');
    setFeedback('');

    try {
      const formData = new FormData();
      formData.set('request_type', 'PPO benefits verification');
      formData.set('name', values.name.trim());
      formData.set('email', values.email.trim());
      formData.set('insurance_carrier', values.carrier.trim());
      if (values.phone.trim()) formData.set('phone', values.phone.trim());
      if (values.planName.trim()) formData.set('plan_name', values.planName.trim());
      appendFormspreeOpsMetadata(formData, 'insurance_benefits');
      const measurement = annotateLeadSubmission(formData);

      await submitContactRequest(FORM_ENDPOINT, formData);

      setStatus('success');
      setFeedback('Thank you. Our team will follow up about your PPO benefits.');
      setValues(EMPTY_BENEFITS_FORM);
      setHoneypot('');
      trackFormSubmission('insurance_benefits_request', {
        ...measurement,
        hasPhone: Boolean(values.phone.trim()),
      });
    } catch (error) {
      console.error('Benefits verification request failed', error);
      setStatus('error');
      setFeedback(`We couldn't confirm your request. Please call ${PHONE_NUMBER_DISPLAY} for help.`);
      trackContactFormFailed({
        form: 'insurance_benefits_request',
        reason: 'formspree_request_failed',
      });
    } finally {
      submissionInFlightRef.current = false;
    }
  };

  const inputClassName =
    'block h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-base text-ink placeholder:text-gray-400 transition-[border-color,box-shadow] duration-300 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15';

  return (
    <form action={FORM_ENDPOINT} method="POST" noValidate onChangeCapture={recordStart} onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="benefits-bot-field">
          Do not fill this out
          <input
            id="benefits-bot-field"
            name="benefits-bot-field"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="benefits-name" className="text-sm font-semibold text-foreground">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            ref={nameRef}
            id="benefits-name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'benefits-name-error' : undefined}
            className={`${inputClassName} mt-2 ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name ? <p id="benefits-name-error" className="mt-2 text-sm text-red-600">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="benefits-email" className="text-sm font-semibold text-foreground">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            ref={emailRef}
            id="benefits-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'benefits-email-error' : undefined}
            className={`${inputClassName} mt-2 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email ? <p id="benefits-email-error" className="mt-2 text-sm text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="benefits-phone" className="text-sm font-semibold text-foreground">
            Phone (optional)
          </label>
          <input
            id="benefits-phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            autoComplete="tel"
            className={`${inputClassName} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="benefits-carrier" className="text-sm font-semibold text-foreground">
            Insurance carrier <span className="text-red-600">*</span>
          </label>
          <input
            ref={carrierRef}
            id="benefits-carrier"
            name="carrier"
            type="text"
            value={values.carrier}
            onChange={handleChange}
            placeholder="For example, Guardian or MetLife"
            autoComplete="organization"
            aria-invalid={Boolean(errors.carrier)}
            aria-describedby={errors.carrier ? 'benefits-carrier-error' : undefined}
            className={`${inputClassName} mt-2 ${errors.carrier ? 'border-red-500' : ''}`}
          />
          {errors.carrier ? <p id="benefits-carrier-error" className="mt-2 text-sm text-red-600">{errors.carrier}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="benefits-plan-name" className="text-sm font-semibold text-foreground">
            Plan name (optional)
          </label>
          <input
            id="benefits-plan-name"
            name="planName"
            type="text"
            value={values.planName}
            onChange={handleChange}
            placeholder="Use the plan name only, not your member ID"
            className={`${inputClassName} mt-2`}
          />
        </div>
      </div>

      <div className="rounded-xl border border-gold/20 bg-white p-4 text-sm leading-6 text-gray-700">
        <p className="font-semibold text-ink">Protect your privacy</p>
        <p className="mt-1">
          Do not enter a Social Security number, full member ID, date of birth, medical history,
          diagnosis, or treatment records here. This initial form only starts the conversation;
          our team can collect anything else through an appropriate follow-up.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'submitting'} className="h-12 w-full px-8 text-[15px] font-semibold sm:w-auto">
          {status === 'submitting' ? 'Sending...' : 'Request Benefits Review'}
        </Button>
        {feedback ? (
          <p
            className={`text-sm ${status === 'success' ? 'text-emerald-700' : 'text-red-600'}`}
            role={status === 'error' ? 'alert' : 'status'}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
};

const Contact = () => {
  const { recordStart, recordAttempt } = useContactFormMeasurement('contact_form');
  const meta = ROUTE_METADATA['/contact'];
  const location = useLocation();
  const [formState, setFormState] = useState({
    whichBestDescribesYou: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    whichBestDescribesYou: '',
    name: '',
    email: '',
    message: ''
  });
  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const benefitsSectionRef = useRef<HTMLElement | null>(null);
  const personaFieldsetRef = useRef<HTMLFieldSetElement | null>(null);
  const personaFirstOptionRef = useRef<HTMLInputElement | null>(null);
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const emailFieldRef = useRef<HTMLInputElement | null>(null);
  const messageFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const submissionInFlightRef = useRef(false);

  useEffect(() => {
    // Run after the app-level route scroll reset so direct hash navigation is
    // not pulled back to the top of the page.
    const scrollTimeout = setTimeout(() => {
      if (location.hash === '#benefits-verification' && benefitsSectionRef.current) {
        benefitsSectionRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }

      if (location.hash === '#contact-form' && formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      // No hash: the app-level route reset already started us at the top. A
      // delayed scrollTo(0, 0) here yanked visitors who began scrolling early.
    }, 120);

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [location.hash]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));

    const errorKey = name as keyof typeof fieldErrors;
    if (fieldErrors[errorKey]) {
      setFieldErrors((prev) => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleHoneypotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoneypot(event.target.value);
  };

  const centerElementInViewport = (element: HTMLElement) => {
    if (typeof window === 'undefined') return;
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const elementHeight = rect.height || element.offsetHeight || 0;
    const targetPosition = rect.top + window.scrollY - viewportHeight / 2 + elementHeight / 2;
    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === 'submitting' || submissionInFlightRef.current) return;

    setFeedback('');

    // If honeypot is filled, silently succeed
    if (honeypot) {
      setFormStatus('success');
      setFeedback('Thanks for reaching out! We will respond shortly.');
      setFormState({ whichBestDescribesYou: '', name: '', email: '', phone: '', message: '' });
      setHoneypot('');
      setFieldErrors({ whichBestDescribesYou: '', name: '', email: '', message: '' });
      return;
    }

    recordAttempt();
    const trimmedPersona = formState.whichBestDescribesYou.trim();
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    const nextErrors = {
      whichBestDescribesYou: '',
      name: '',
      email: '',
      message: ''
    };

    const isPersonaValid = CONTACT_PERSONA_OPTIONS.some((option) => option.label === trimmedPersona);
    if (!isPersonaValid) {
      nextErrors.whichBestDescribesYou = 'Please select one option.';
    }

    if (!trimmedName) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!trimmedEmail) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address (example: name@domain.com).';
    }

    if (!trimmedMessage) {
      nextErrors.message = 'Please enter a message.';
    }

    if (Object.values(nextErrors).some(Boolean)) {
      setFieldErrors(nextErrors);
      setFormStatus('error');
      setFeedback('Please correct the highlighted fields and try again.');

      const focusableElement =
        (nextErrors.whichBestDescribesYou && personaFirstOptionRef.current) ||
        (nextErrors.name && nameFieldRef.current) ||
        (nextErrors.email && emailFieldRef.current) ||
        (nextErrors.message && messageFieldRef.current) ||
        null;

      const scrollTarget =
        (nextErrors.whichBestDescribesYou && personaFieldsetRef.current) ||
        focusableElement ||
        formSectionRef.current;

      if (scrollTarget) {
        centerElementInViewport(scrollTarget);
      }

      if (focusableElement) {
        focusableElement.focus();
      }

      trackContactFormValidationFailed({
        form: 'contact_form',
        fieldCount: Object.values(nextErrors).filter(Boolean).length,
        personaMissing: Boolean(nextErrors.whichBestDescribesYou),
        nameMissing: Boolean(nextErrors.name),
        emailMissing: nextErrors.email === 'Please enter your email address.',
        emailInvalid: nextErrors.email === 'Please enter a valid email address (example: name@domain.com).',
        messageMissing: Boolean(nextErrors.message),
      });

      return;
    }

    setFieldErrors(nextErrors);
    submissionInFlightRef.current = true;
    setFormStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('whichBestDescribesYou', trimmedPersona);
      formData.append('name', trimmedName);
      formData.append('email', trimmedEmail);
      formData.append('message', trimmedMessage);
      const trimmedPhone = formState.phone.trim();
      if (trimmedPhone) {
        formData.append('phone', trimmedPhone);
      }
      appendFormspreeOpsMetadata(formData);
      const measurement = annotateLeadSubmission(formData, trimmedPersona === 'Thinking about becoming a new patient');

      await submitContactRequest(FORM_ENDPOINT, formData);

      setFormStatus('success');
      setFeedback('Thanks for reaching out! We will respond shortly.');
      setFormState({ whichBestDescribesYou: '', name: '', email: '', phone: '', message: '' });
      setHoneypot('');
      setFieldErrors({ whichBestDescribesYou: '', name: '', email: '', message: '' });
      trackFormSubmission('contact_form', {
        ...measurement,
        whichBestDescribesYou: trimmedPersona,
        hasPhone: Boolean(trimmedPhone),
      });
    } catch (error) {
      console.error('Contact form submission failed', error);
      setFormStatus('error');
      setFeedback(`We couldn't confirm your request. Please call ${PHONE_NUMBER_DISPLAY} for help.`);
      trackContactFormFailed({
        form: 'contact_form',
        reason: 'formspree_request_failed',
      });
    } finally {
      submissionInFlightRef.current = false;
    }
  };

  return (
    <>
      <MasterStructuredData 
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': getCanonicalUrl('/contact#page'),
          name: 'Contact Exquisite Dentistry | Schedule Your Consultation Today',
          description: `Contact Dr. Alexie Aguil and the team at Exquisite Dentistry. Schedule your consultation for cosmetic dentistry in Los Angeles. Call ${PHONE_NUMBER_DISPLAY}.`,
          url: getCanonicalUrl('/contact'),
          isPartOf: {
            '@id': 'https://exquisitedentistryla.com/#website'
          },
          about: {
            '@id': 'https://exquisitedentistryla.com/#business'
          },
          mainEntity: {
            '@id': 'https://exquisitedentistryla.com/#business'
          }
        }]}
      />
      <PageSEO 
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/contact"
        ogImage={meta.ogImage}
      />

      <div className="min-h-screen overflow-hidden bg-ivory">
        {/* Compact header: who to reach and whether the office is open, then straight to the details. */}
        <section className="relative isolate overflow-hidden bg-black text-white">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <OptimizedImage
              src="/lovable-uploads/exquisite-black-gold-hero.png"
              alt=""
              priority
              className="h-full w-full object-cover object-[70%_center] opacity-80"
              sizes="100vw"
            />
            <span className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.7)_45%,rgba(0,0,0,0.35)_100%)]" />
            <span className="hero-lights" />
          </div>
          <div className="section-container pb-20 pt-8 sm:pb-24 md:pb-36 md:pt-16 lg:pb-40 lg:pt-20">
            <p className="hero-rise eyebrow eyebrow--light" style={{ '--d': '60ms' } as React.CSSProperties}>
              Reach out
            </p>
            <h1 className="hero-title mt-4 text-[clamp(2.4rem,9vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.025em] md:mt-5">
              <AnimatedHeadline>
                <>Contact <span className="text-gold">Us</span></>
              </AnimatedHeadline>
            </h1>
            <p
              className="hero-rise mt-4 max-w-xl text-[15px] leading-7 text-white/80 md:mt-6 md:text-lg md:leading-8"
              style={{ '--d': '420ms' } as React.CSSProperties}
            >
              We&apos;re here to answer your questions and help you schedule your appointment with Dr. Alexie Aguil.
            </p>
            <div
              className="hero-rise mt-5 hidden gap-3 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 md:mt-8"
              style={{ '--d': '560ms' } as React.CSSProperties}
            >
              <PhoneLink
                phoneNumber={PHONE_NUMBER_DISPLAY}
                analyticsSource="contact_hero_phone"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 bg-white/[0.06] px-5 py-3 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/55 hover:bg-white/[0.14]"
              >
                <Phone className="h-4 w-4 text-champagne" aria-hidden="true" />
                Call {PHONE_NUMBER_DISPLAY}
              </PhoneLink>
              <OfficeStatus className="min-h-6" />
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-12 pb-16 sm:-mt-14 md:-mt-24 md:pb-24 lg:-mt-28">
          <div className="section-container">
            <Reveal
              variant="up"
              className="grid overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-[0_40px_90px_-50px_rgba(23,18,10,0.55)] lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]"
            >
              {/* Contact Details */}
              <div className="border-b border-gold/15 bg-ivory/70 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <h2 className="eyebrow">Contact Information</h2>

                <dl className="mt-4 divide-y divide-gold/15 md:grid md:grid-cols-2 md:gap-x-10 md:divide-y-0 lg:mt-6 lg:block lg:divide-y">
                  <div className="flex items-start gap-4 py-3 sm:py-4 first:pt-0">
                    <dt className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-white text-gold sm:h-10 sm:w-10">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Phone</span>
                    </dt>
                    <dd className="min-w-0">
                      <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} className="min-h-6 text-lg font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-gold-dark">
                        {PHONE_NUMBER_DISPLAY}
                      </PhoneLink>
                      <p className="text-sm text-gray-600">Front desk, during office hours</p>
                    </dd>
                  </div>

                  <div className="flex items-start gap-4 py-3 sm:py-4">
                    <dt className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-white text-gold sm:h-10 sm:w-10">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Email</span>
                    </dt>
                    <dd className="min-w-0 pt-1.5 sm:pt-2">
                      <a
                        href={`mailto:${EMAIL}`}
                        className="group inline-flex min-h-6 max-w-full items-center text-[15px] font-medium text-ink transition-colors hover:text-gold-dark [overflow-wrap:anywhere]"
                      >
                        <span className="link-sweep">{EMAIL}</span>
                      </a>
                    </dd>
                  </div>

                  <div className="flex items-start gap-4 py-3 sm:py-4">
                    <dt className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-white text-gold sm:h-10 sm:w-10">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Address</span>
                    </dt>
                    <dd className="min-w-0 pt-1.5 sm:pt-2">
                      <a
                        href="https://maps.app.goo.gl/uZPw5AKARk8HuNh9A"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackContactMethodClick({
                          method: 'directions',
                          source: 'contact_page_card',
                          destination: 'https://maps.app.goo.gl/uZPw5AKARk8HuNh9A',
                        })}
                        className="inline-block text-[15px] leading-6 text-ink transition-colors hover:text-gold-dark"
                      >
                        <span className="font-medium">{STREET_ADDRESS}</span><br />
                        {ADDRESS_LOCALITY}, {ADDRESS_REGION} {POSTAL_CODE}
                      </a>
                      <div className="mt-3">
                        <OpenInMapsButton source="contact_page" />
                      </div>
                    </dd>
                  </div>

                  <div className="flex items-start gap-4 py-3 sm:py-4 last:pb-0">
                    <dt className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-white text-gold sm:h-10 sm:w-10">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Hours</span>
                    </dt>
                    <dd className="min-w-0 pt-1.5 sm:pt-2 text-[15px] leading-6 text-ink">
                      <p><span className="font-medium">Mon–Thu</span> · 8AM–6PM</p>
                      <p className="text-gray-600">Fri–Sun · Closed</p>
                      <OfficeStatus tone="light" className="mt-1.5" />
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 hidden border-t border-gold/15 pt-6 lg:block">
                  <h3 className="text-sm font-semibold text-ink">Follow Us</h3>
                  <div className="mt-4 flex gap-3">
                    <a href={SOCIAL_URLS.INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Follow Exquisite Dentistry on Instagram (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-white text-gold-dark transition-colors hover:border-gold hover:bg-gold hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href={SOCIAL_URLS.FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Follow Exquisite Dentistry on Facebook (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-white text-gold-dark transition-colors hover:border-gold hover:bg-gold hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Contact Form */}
              <div ref={formSectionRef} className="scroll-mt-24 p-5 sm:p-8 lg:p-12" id="contact-form">
                <h2 className="text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-3xl">Send Us a Message</h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">
                  Have a question about treatment options, financing, or scheduling? Share a few details below and our team will follow up via email.
                </p>
                <span aria-hidden="true" className="mt-6 block h-px w-full bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
                <form
                  action={FORM_ENDPOINT}
                  method="POST"
                  noValidate
                  onChangeCapture={recordStart}
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-6"
                >
                  <div className="hidden">
                    <label htmlFor="bot-field">
                      Don't fill this out if you&apos;re human:
                      <input
                        id="bot-field"
                        name="bot-field"
                        value={honeypot}
                        onChange={handleHoneypotChange}
                      />
                    </label>
                  </div>

                  <fieldset
                    ref={personaFieldsetRef}
                    aria-invalid={Boolean(fieldErrors.whichBestDescribesYou)}
                    aria-describedby={fieldErrors.whichBestDescribesYou ? 'which-best-describes-you-error' : undefined}
                    className="flex flex-col text-left"
                  >
                    <legend className="mb-2 text-sm font-semibold text-ink">
                      Which best describes you? <span className="text-red-600">*</span>
                    </legend>
                    <div role="radiogroup" className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                      {CONTACT_PERSONA_OPTIONS.map((option, index) => {
                        const optionId = `which-best-describes-you-${option.value}`;
                        const isSelected = formState.whichBestDescribesYou === option.label;

                        return (
                          <div key={option.value} className="relative">
                            <input
                              id={optionId}
                              name="whichBestDescribesYou"
                              type="radio"
                              value={option.label}
                              checked={isSelected}
                              onChange={handleChange}
                              required
                              ref={index === 0 ? personaFirstOptionRef : undefined}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={optionId}
                              className={`flex h-full min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-medium leading-5 text-ink transition-[border-color,box-shadow,background-color] duration-300 peer-focus-visible:outline-none peer-focus-visible:ring-4 ${
                                fieldErrors.whichBestDescribesYou
                                  ? 'border-red-600 peer-focus-visible:ring-red-600/15'
                                  : 'border-black/10 hover:border-gold/50 peer-focus-visible:border-gold peer-focus-visible:ring-gold/15'
                              } ${isSelected ? '!border-gold bg-gold/[0.06] shadow-[0_10px_30px_-20px_rgba(23,18,10,0.5)]' : ''}`}
                            >
                              <span className="min-w-0">{option.label}</span>
                              <span
                                aria-hidden="true"
                                className={`flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full border transition-colors ${
                                  isSelected ? 'border-gold' : 'border-gray-300'
                                }`}
                              >
                                <span className={`h-2 w-2 rounded-full bg-gold transition-transform duration-300 ${isSelected ? 'scale-100' : 'scale-0'}`} />
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    {fieldErrors.whichBestDescribesYou && (
                      <p id="which-best-describes-you-error" className="mt-2 text-sm text-red-700">
                        {fieldErrors.whichBestDescribesYou}
                      </p>
                    )}
                  </fieldset>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="flex flex-col text-left">
                      <label htmlFor="name" className={CONTACT_LABEL_CLASS}>
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="Full name"
                        autoComplete="name"
                        ref={nameFieldRef}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                        className={CONTACT_FIELD_CLASS}
                      />
                      {fieldErrors.name && (
                        <p id="name-error" className="mt-2 text-sm text-red-700">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col text-left">
                      <label htmlFor="email" className={CONTACT_LABEL_CLASS}>
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                        ref={emailFieldRef}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        className={CONTACT_FIELD_CLASS}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-2 text-sm text-red-700">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col text-left md:col-span-2">
                      <label htmlFor="phone" className={CONTACT_LABEL_CLASS}>
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="(323) 555-0123"
                        autoComplete="tel"
                        className={CONTACT_FIELD_CLASS}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <label htmlFor="message" className={CONTACT_LABEL_CLASS}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      ref={messageFieldRef}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className={`${CONTACT_FIELD_CLASS} h-auto min-h-[8.5rem] resize-none py-3`}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-2 text-sm text-red-700">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 border-t border-gold/10 pt-6 lg:flex-row lg:items-center lg:gap-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={formStatus === 'submitting'}
                      className="group h-12 w-full shrink-0 px-8 text-[15px] font-semibold lg:w-auto"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                      <ArrowRight className="transition-transform duration-300 motion-reduce:transform-none group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                    {feedback && (
                      <div
                        className={`text-sm leading-6 ${formStatus === 'success' ? 'text-emerald-700' : formStatus === 'error' ? 'text-red-700' : 'text-gray-500'}`}
                        aria-live="polite"
                      >
                        <p>{feedback}</p>
                        {formStatus === 'error' && (
                          <p className="mt-1 text-sm text-gray-600">
                            If this fails, please call the office or email us at{' '}
                            <a
                              href={`mailto:${EMAIL}`}
                              className="text-secondary underline underline-offset-4 hover:no-underline"
                            >
                              {EMAIL}
                            </a>
                            .
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          ref={benefitsSectionRef}
          id="benefits-verification"
          aria-labelledby="benefits-verification-heading"
          className="scroll-mt-24 border-y border-gold/15 bg-white py-16 md:py-24"
        >
          <div className="section-container">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14">
              <Reveal variant="up">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                  <ShieldCheck size={22} aria-hidden="true" />
                </div>
                <p className="eyebrow mt-6">
                  PPO Benefits Verification
                </p>
                <h2
                  id="benefits-verification-heading"
                  className="mt-4 text-[clamp(1.85rem,4.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink"
                >
                  Start with basic plan information.
                </h2>
                <p className="mt-5 text-base leading-7 text-gray-600">
                  If you have a PPO plan, there is a strong chance we can help you use your
                  benefits. Send only the basic details below. Coverage is not guaranteed until
                  our team verifies your specific plan.
                </p>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Prefer to speak with us? Call{' '}
                  <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} className="font-semibold text-gold-dark underline underline-offset-4 hover:no-underline">
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                  .
                </p>
              </Reveal>

              <Reveal variant="up" delay={120} className="rounded-2xl border border-gold/15 bg-ivory/60 p-5 shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)] sm:p-8">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">Request a benefits review</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  We will use these details to contact you and determine the safest next step for
                  verifying benefits.
                </p>
                <BenefitsVerificationForm />
              </Reveal>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          title="Want to review payment options before we talk?"
          description="If you are planning veneers, Invisalign, whitening, implants, or a broader treatment plan, our Cherry financing page lets you explore monthly payment options before treatment planning."
          secondaryCtaText="Send Us a Message"
          secondaryCtaHref="#contact-form"
        />

        {/* Map Section */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Visit"
              title={<>Our <em>Location</em></>}
              description={PRACTICE_FACTS.parking}
            />
            <Reveal variant="wipe" className="mt-10 overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)] md:mt-14">
              <div className="aspect-[4/3] sm:aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7467390070256!2d-118.3650287!3d34.063844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b93cca04c0c3%3A0x98b9bda196f7b6bf!2s6227%20Wilshire%20Blvd%2C%20Los%20Angeles%2C%20CA%2090048!5e0!3m2!1sen!2sus!4v1653485691058!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Exquisite Dentistry Location"
                  className="block h-full w-full"
                ></iframe>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Review Widget Section */}
        <section className="border-t border-gold/10 bg-white py-16 md:py-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Patient reviews"
              title={<>What patients <em>say</em></>}
              description="Reviews from patients of Exquisite Dentistry."
            />
            <div className="mt-10 md:mt-14">
              <ReviewWidget />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-black py-20 md:py-28">
          <div className="section-container text-center">
            <SectionHeading
              tone="dark"
              eyebrow="When you are ready"
              title={<>Schedule <em>Consultation</em></>}
              description="Choose a time online, request a callback, or call the office. The team can help you plan your first visit."
            />
            <Reveal variant="up" delay={260} className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ConversionButton
                size="lg"
                className="px-8 py-3.5"
                href={SCHEDULE_CONSULTATION_PATH}
              >
                Schedule Consultation
              </ConversionButton>
              <Button asChild variant="glass" size="lg" className="h-12 px-7">
                <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} analyticsSource="contact_page_cta">
                  <Phone className="h-4 w-4 text-champagne" aria-hidden="true" />
                  Call {PHONE_NUMBER_DISPLAY}
                </PhoneLink>
              </Button>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;

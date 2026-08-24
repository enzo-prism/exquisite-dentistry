
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConversionButton from '@/components/ConversionButton';
import PhoneLink from '@/components/PhoneLink';
import { trackFormSubmission } from '@/utils/googleAdsTracking';
import {
  trackContactFormFailed,
  trackContactFormValidationFailed,
  trackContactMethodClick,
} from '@/utils/vercelAnalytics';
import VideoHero from '@/components/VideoHero';
import { getStoredUTMAttribution } from '@/utils/utmTracking';
import { checkForSectionGaps, fixBackgroundConsistency } from '@/utils/sectionAudit';
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

// Social media URLs - removed X (Twitter)
const SOCIAL_URLS = {
  FACEBOOK: "https://www.facebook.com/ExquisiteDentistry/",
  INSTAGRAM: "https://www.instagram.com/exquisitedentistryla/"
};

const FORM_ENDPOINT = 'https://formspree.io/f/xkgknpkl';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_OPS_UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function appendFormspreeOpsMetadata(formData: FormData, formKey = 'contact') {
  formData.set('site', 'exquisite');
  formData.set('form_key', formKey);
  formData.set('environment', import.meta.env.MODE ?? 'production');
  formData.set('_codex_test', 'false');

  const params = new URLSearchParams(window.location.search);
  const storedAttribution = getStoredUTMAttribution() ?? {};
  formData.set('page_path', window.location.pathname);
  formData.set('referrer', document.referrer);
  for (const field of FORMSPREE_OPS_UTM_FIELDS) {
    const currentValue = params.get(field);
    const resolvedValue = currentValue && currentValue.trim() !== ''
      ? currentValue
      : storedAttribution[field] ?? '';
    formData.set(field, resolvedValue);
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
  const [values, setValues] = useState(EMPTY_BENEFITS_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', carrier: '' });
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const carrierRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setFeedback('Thank you. Our team will follow up about your PPO benefits.');
      setValues(EMPTY_BENEFITS_FORM);
      setHoneypot('');
      return;
    }

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

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setStatus('success');
      setFeedback('Thank you. Our team will follow up about your PPO benefits.');
      setValues(EMPTY_BENEFITS_FORM);
      setHoneypot('');
      trackFormSubmission('insurance_benefits_request', {
        hasPhone: Boolean(values.phone.trim()),
      });
    } catch (error) {
      console.error('Benefits verification request failed', error);
      setStatus('error');
      setFeedback(`We couldn't send this request. Please call ${PHONE_NUMBER_DISPLAY}.`);
      trackContactFormFailed({
        form: 'insurance_benefits_request',
        reason: 'formspree_request_failed',
      });
    }
  };

  const inputClassName =
    'w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-shadow focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold';

  return (
    <form action={FORM_ENDPOINT} method="POST" noValidate onSubmit={handleSubmit} className="mt-8 space-y-6">
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

      <div className="rounded-xl border border-gold/25 bg-gold/5 p-4 text-sm leading-6 text-foreground/80">
        <p className="font-semibold text-foreground">Protect your privacy</p>
        <p className="mt-1">
          Do not enter a Social Security number, full member ID, date of birth, medical history,
          diagnosis, or treatment records here. This initial form only starts the conversation;
          our team can collect anything else through an appropriate follow-up.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
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
        return;
      }

      window.scrollTo(0, 0);
    }, 120);

    const gapCheckTimeout = setTimeout(() => {
      checkForSectionGaps();
      fixBackgroundConsistency();
    }, 500);

    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(gapCheckTimeout);
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

  const handleScrollToForm = () => {
    const targetElement = personaFieldsetRef.current || nameFieldRef.current || formSectionRef.current;
    if (!targetElement) return;

    if (typeof window === 'undefined' || typeof window.scrollTo !== 'function') {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    centerElementInViewport(targetElement);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === 'submitting') return;

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

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormStatus('success');
      setFeedback('Thanks for reaching out! We will respond shortly.');
      setFormState({ whichBestDescribesYou: '', name: '', email: '', phone: '', message: '' });
      setHoneypot('');
      setFieldErrors({ whichBestDescribesYou: '', name: '', email: '', message: '' });
      trackFormSubmission('contact_form', {
        whichBestDescribesYou: trimmedPersona,
        hasPhone: Boolean(trimmedPhone),
      });
    } catch (error) {
      console.error('Contact form submission failed', error);
      setFormStatus('error');
      setFeedback('Something went wrong. Please try again.');
      trackContactFormFailed({
        form: 'contact_form',
        reason: 'formspree_request_failed',
      });
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

      <div className="min-h-screen overflow-hidden">
        {/* Hero Section with Full Video Background */}
        <section className="relative min-h-screen bg-black overflow-hidden">
          <VideoHero
            title={<>Contact <span className="text-gold">Us</span></>}
            subtitle="We're here to answer your questions and help you schedule your appointment with Dr. Alexie Aguil."
            primaryCta={{
              text: 'Send Us a Message',
              onClick: handleScrollToForm
            }}
            height="large"
            badgeText="REACH OUT"
            scrollIndicator={false}
            className="absolute inset-0 h-full"
          />
          
          {/* Floating Contact Card - positioned to allow video background behind */}
          <div className="relative z-30 flex items-center justify-center min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="bg-white shadow-2xl rounded-sm max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Contact Details */}
                  <div className="bg-black text-white p-10 lg:p-14">
                    <h2 className="text-2xl font-semibold mb-10">Contact Information</h2>
                    
                    <div className="space-y-8">
                      <div className="flex items-start">
                        <Phone size={20} className="text-gold mt-1 mr-5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium mb-1.5">Phone</h3>
                          <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} className="text-white/80 hover:text-gold transition-colors">
                            {PHONE_NUMBER_DISPLAY}
                          </PhoneLink>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail size={20} className="text-gold mt-1 mr-5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium mb-1.5">Email</h3>
                          <p className="text-white/80">{EMAIL}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin size={20} className="text-gold mt-1 mr-5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium mb-1.5">Address</h3>
                          <a
                            href="https://maps.app.goo.gl/uZPw5AKARk8HuNh9A"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackContactMethodClick({
                              method: 'directions',
                              source: 'contact_page_card',
                              destination: 'https://maps.app.goo.gl/uZPw5AKARk8HuNh9A',
                            })}
                            className="text-white/80 hover:text-gold transition-colors inline-block"
                          >
                            {STREET_ADDRESS}<br />
                            {ADDRESS_LOCALITY}, {ADDRESS_REGION} {POSTAL_CODE}
                          </a>
                          <div className="mt-3">
                            <OpenInMapsButton
                              source="contact_page"
                              className="border-white/40 !text-white hover:!bg-white/10 hover:!text-white"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock size={20} className="text-gold mt-1 mr-5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium mb-1.5">Hours</h3>
                          <div className="text-white/80 space-y-1">
                            <p>Monday-Thursday: 8AM-6PM</p>
                            <p>Friday: Closed</p>
                            <p>Saturday: Closed</p>
                            <p>Sunday: Closed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-14 pt-8 border-t border-white/20">
                      <h3 className="font-medium mb-5">Follow Us</h3>
                      <div className="flex space-x-5">
                        <a href={SOCIAL_URLS.INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Follow Exquisite Dentistry on Instagram (opens in a new tab)" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                        <a href={SOCIAL_URLS.FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Follow Exquisite Dentistry on Facebook (opens in a new tab)" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Direct Contact Form */}
                  <div ref={formSectionRef} className="col-span-2 p-8 sm:p-10 lg:p-14" id="contact-form">
                    <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                    <p className="text-gray-600 mb-10">
                      Have a question about treatment options, financing, or scheduling? Share a few details below and our team will follow up via email.
                    </p>
                    <form
                      action={FORM_ENDPOINT}
                      method="POST"
                      noValidate
                      onSubmit={handleSubmit}
                      className="space-y-8"
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
                        <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-2">
                          Which best describes you? <span className="text-red-600">*</span>
                        </legend>
                        <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-sm border bg-white px-4 py-3 text-sm font-medium text-gray-900 transition-shadow peer-focus:outline-none peer-focus:ring-2 ${
                                    fieldErrors.whichBestDescribesYou
                                      ? 'border-red-500 peer-focus:ring-red-500'
                                      : 'border-gray-200 hover:border-gold peer-focus:ring-gold'
                                  } ${isSelected ? 'border-gold bg-gold/5 shadow-sm' : ''}`}
                                >
                                  <span className="min-w-0">{option.label}</span>
                                  <span
                                    aria-hidden="true"
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                      isSelected ? 'border-gold' : 'border-gray-300'
                                    }`}
                                  >
                                    <span className={`h-2 w-2 rounded-full bg-gold ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                  </span>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                        {fieldErrors.whichBestDescribesYou && (
                          <p id="which-best-describes-you-error" className="mt-2 text-sm text-red-600">
                            {fieldErrors.whichBestDescribesYou}
                          </p>
                        )}
                      </fieldset>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col text-left">
                          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-2">
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
                            className={`w-full bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 rounded-sm focus:outline-none focus:ring-2 transition-shadow ${
                              fieldErrors.name
                                ? 'border border-red-500 focus:ring-red-500 focus:border-red-500'
                                : 'border border-gray-200 focus:ring-gold focus:border-gold'
                            }`}
                          />
                          {fieldErrors.name && (
                            <p id="name-error" className="mt-2 text-sm text-red-600">
                              {fieldErrors.name}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col text-left">
                          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-2">
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
                            className={`w-full bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 rounded-sm focus:outline-none focus:ring-2 transition-shadow ${
                              fieldErrors.email
                                ? 'border border-red-500 focus:ring-red-500 focus:border-red-500'
                                : 'border border-gray-200 focus:ring-gold focus:border-gold'
                            }`}
                          />
                          {fieldErrors.email && (
                            <p id="email-error" className="mt-2 text-sm text-red-600">
                              {fieldErrors.email}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col text-left md:col-span-2">
                          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-2">
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
                            className="w-full border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-shadow"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col text-left">
                        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-2">
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
                          rows={6}
                          placeholder="Tell us how we can help..."
                          className={`w-full bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 rounded-sm focus:outline-none focus:ring-2 transition-shadow resize-none ${
                            fieldErrors.message
                              ? 'border border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border border-gray-200 focus:ring-gold focus:border-gold'
                          }`}
                        />
                        {fieldErrors.message && (
                          <p id="message-error" className="mt-2 text-sm text-red-600">
                            {fieldErrors.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
                        <Button
                          type="submit"
                          size="lg"
                          disabled={formStatus === 'submitting'}
                          className="w-full lg:w-auto px-10 py-6 text-base tracking-wide uppercase"
                        >
                          {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                        </Button>
                        {feedback && (
                          <div
                            className={`text-sm ${formStatus === 'success' ? 'text-emerald-600' : formStatus === 'error' ? 'text-red-600' : 'text-gray-500'}`}
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={benefitsSectionRef}
          id="benefits-verification"
          aria-labelledby="benefits-verification-heading"
          className="scroll-mt-24 border-y border-gold/20 bg-stone-50 py-16 md:py-20"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <ShieldCheck size={22} />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  PPO Benefits Verification
                </p>
                <h2
                  id="benefits-verification-heading"
                  className="mt-3 text-3xl font-semibold text-foreground md:text-4xl"
                >
                  Start with basic plan information.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  If you have a PPO plan, there is a strong chance we can help you use your
                  benefits. Send only the basic details below. Coverage is not guaranteed until
                  our team verifies your specific plan.
                </p>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  Prefer to speak with us? Call{' '}
                  <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} className="font-semibold text-secondary">
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                  .
                </p>
              </div>

              <div className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.3)] md:p-8">
                <h3 className="text-2xl font-semibold text-foreground">Request a benefits review</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  We will use these details to contact you and determine the safest next step for
                  verifying benefits.
                </p>
                <BenefitsVerificationForm />
              </div>
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
        <section className="mb-0 py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="heading-lg mb-5">Our Location</h2>
              <p className="paragraph">
                Conveniently located on Wilshire Blvd, our office is easily accessible with ample parking available.
              </p>
            </div>
            
            <div className="aspect-video bg-gray-200 rounded-sm overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7467390070256!2d-118.3650287!3d34.063844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b93cca04c0c3%3A0x98b9bda196f7b6bf!2s6227%20Wilshire%20Blvd%2C%20Los%20Angeles%2C%20CA%2090048!5e0!3m2!1sen!2sus!4v1653485691058!5m2!1sen!2sus"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Exquisite Dentistry Location"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Review Widget Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black mb-6">
                What Our Clients <span className="text-gold">Say</span>
              </h2>
              <p className="text-lg text-black-light">
                Read verified reviews from our satisfied clients
              </p>
            </div>
            <ReviewWidget />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 bg-black w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white leading-tight mb-8">
                Schedule <span className="text-gold">Consultation</span>
              </h2>
              <p className="text-xl text-white/80 mb-12 font-light">
                Schedule your consultation today and experience the Exquisite Dentistry difference.
              </p>
              <ConversionButton 
                size="lg" 
                className="px-8 py-3.5"
                href={SCHEDULE_CONSULTATION_PATH}
              >
                Schedule Consultation
              </ConversionButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;

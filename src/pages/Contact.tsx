
import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConversionButton from '@/components/ConversionButton';
import PhoneLink from '@/components/PhoneLink';
import { trackFormSubmission } from '@/utils/googleAdsTracking';
import VideoHero from '@/components/VideoHero';
import { checkForSectionGaps, fixBackgroundConsistency } from '@/utils/sectionAudit';
import ReviewWidget from '@/components/ReviewWidget';
import PageSEO from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { ROUTE_METADATA } from '@/constants/metadata';

// Social media URLs - removed X (Twitter)
const SOCIAL_URLS = {
  FACEBOOK: "https://www.facebook.com/ExquisiteDentistry/",
  INSTAGRAM: "https://www.instagram.com/exquisitedentistryla/"
};

// Scheduling URL constant
const SCHEDULING_URL = "https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";
const FORM_ENDPOINT = 'https://formspree.io/f/xkgknpkl';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const meta = ROUTE_METADATA['/contact'];
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: ''
  });
  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const nameFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const gapCheckTimeout = setTimeout(() => {
      checkForSectionGaps();
      fixBackgroundConsistency();
    }, 500);

    return () => {
      clearTimeout(gapCheckTimeout);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'email' && fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: '' }));
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
    const targetElement = nameFieldRef.current || formSectionRef.current;
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

    const trimmedEmail = formState.email.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setFieldErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address (example: name@domain.com).'
      }));
      setFormStatus('error');
      setFeedback('Please correct the highlighted fields and try again.');
      return;
    }

    setFormStatus('submitting');
    setFeedback('');

    // If honeypot is filled, silently succeed
    if (honeypot) {
      setFormStatus('success');
      setFeedback('Thanks for reaching out! We will respond shortly.');
      setFormState({ name: '', email: '', phone: '', message: '' });
      setHoneypot('');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', formState.name.trim());
      formData.append('email', trimmedEmail);
      formData.append('message', formState.message.trim());
      const trimmedPhone = formState.phone.trim();
      if (trimmedPhone) {
        formData.append('phone', trimmedPhone);
      }

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
      setFormState({ name: '', email: '', phone: '', message: '' });
      setHoneypot('');
      setFieldErrors({ email: '' });
      trackFormSubmission('contact_form');
    } catch (error) {
      console.error('Contact form submission failed', error);
      setFormStatus('error');
      setFeedback('Something went wrong. Please try again or call us at (323) 272-2388.');
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
          description: 'Contact Dr. Alexie Aguil and the team at Exquisite Dentistry. Schedule your consultation for cosmetic dentistry in Los Angeles. Call (323) 272-2388.',
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
                          <PhoneLink phoneNumber="(323) 272-2388" className="text-white/80 hover:text-gold transition-colors">
                            (323) 272-2388
                          </PhoneLink>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail size={20} className="text-gold mt-1 mr-5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium mb-1.5">Email</h3>
                          <p className="text-white/80">info@exquisitedentistryla.com</p>
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
                            className="text-white/80 hover:text-gold transition-colors inline-block"
                          >
                            6227 Wilshire Blvd<br />
                            Los Angeles, CA 90048
                          </a>
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
                        <a href={SOCIAL_URLS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                        <a href={SOCIAL_URLS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
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
                            className="w-full border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-shadow"
                          />
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
                          rows={6}
                          placeholder="Tell us how we can help..."
                          className="w-full border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-shadow resize-none"
                        />
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
                          <p
                            className={`text-sm ${formStatus === 'success' ? 'text-emerald-600' : formStatus === 'error' ? 'text-red-600' : 'text-gray-500'}`}
                            aria-live="polite"
                          >
                            {feedback}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                Book <span className="text-gold">Now</span>
              </h2>
              <p className="text-xl text-white/80 mb-12 font-light">
                Schedule your visit today and experience the Exquisite Dentistry difference.
              </p>
              <ConversionButton 
                size="lg" 
                className="px-8 py-3.5"
                href={SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Appointment
              </ConversionButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;

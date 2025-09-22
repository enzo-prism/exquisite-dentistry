
import React, { useEffect } from 'react';
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

// Social media URLs - removed X (Twitter)
const SOCIAL_URLS = {
  FACEBOOK: "https://www.facebook.com/ExquisiteDentistry/",
  INSTAGRAM: "https://www.instagram.com/exquisitedentistryla/"
};

// Scheduling URL constant
const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check and fix any section gaps
    setTimeout(() => {
      checkForSectionGaps();
      fixBackgroundConsistency();
    }, 500);

    // Load Typeform script
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.head.appendChild(script);

    // Listen for Typeform submission events
    const handleTypeformSubmit = () => {
      trackFormSubmission('contact_form');
    };

    // Add event listener for Typeform submissions
    window.addEventListener('message', (e) => {
      if (e.data.type === 'form_submit' && e.origin === 'https://form.typeform.com') {
        handleTypeformSubmit();
      }
    });

    const messageHandler = (e: MessageEvent) => {
      if (e.data.type === 'form_submit' && e.origin === 'https://form.typeform.com') {
        handleTypeformSubmit();
      }
    };
    window.addEventListener('message', messageHandler);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="//embed.typeform.com/next/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      // Remove message listener
      window.removeEventListener('message', messageHandler);
    };
  }, []);

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
        title="Schedule Appointment | Exquisite Dentistry LA"
        description="Schedule your consultation with Dr. Aguil in Los Angeles. Convenient Wilshire Blvd location, flexible hours. Call (323) 272-2388 or book online!"
        keywords="contact dentist Los Angeles, dental appointment booking, Exquisite Dentistry location, cosmetic dentist consultation, dental office Wilshire Blvd"
        path="/contact"
      />

      <div className="min-h-screen overflow-hidden">
        {/* Hero Section with Full Video Background */}
        <section className="relative min-h-screen bg-black overflow-hidden">
          <VideoHero
            title={<>Contact <span className="text-gold">Us</span></>}
            subtitle="We're here to answer your questions and help you schedule your appointment with Dr. Alexie Aguil."
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
                          <p className="text-white/80">
                            6227 Wilshire Blvd<br />
                            Los Angeles, CA 90048
                          </p>
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
                  
                  {/* Typeform Embed */}
                  <div className="col-span-2 p-10 lg:p-14">
                    <h2 className="text-2xl font-semibold mb-10">Send Us a Message</h2>
                    
                    <div className="w-full" style={{ height: '600px' }}>
                      <div data-tf-live="01JX3KQBQ1TW64FY4G46QAJ6WX" style={{ width: '100%', height: '100%' }}></div>
                    </div>
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

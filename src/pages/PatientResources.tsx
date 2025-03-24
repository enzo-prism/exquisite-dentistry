import React, { useEffect } from 'react';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

interface FAQ {
  question: string;
  answer: string;
}

const PatientResources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      {/* Hero Section with YouTube Video */}
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.PROCEDURE}
        title={<>Patient <span className="text-gold">Resources</span></>}
        subtitle="Everything you need to know before, during, and after your visit to Exquisite Dentistry."
        primaryCta={{ text: "Book an Appointment" }}
        secondaryCta={{ text: "Contact Us", href: "/contact" }}
        overlayColor="gradient"
        height="medium"
        badgeText="HELPFUL INFORMATION"
        scrollIndicator={false}
      />

      {/* Introduction Section */}
      <section className="-mt-32 relative z-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-lg mb-6">Everything You Need for Your Visit</h2>
              <div className="separator"></div>
              <p className="paragraph mb-8">
                We've compiled essential information and resources to help you prepare for your appointments and understand our procedures. If you have questions that aren't answered here, please don't hesitate to contact our office.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                {[
                  { 
                    icon: <FileText size={30} />, 
                    title: "Patient Forms", 
                    description: "Download and complete forms before your visit" 
                  },
                  { 
                    icon: <HelpCircle size={30} />, 
                    title: "FAQs", 
                    description: "Answers to commonly asked questions" 
                  },
                  { 
                    icon: <Calendar size={30} />, 
                    title: "Appointments", 
                    description: "Schedule and prepare for your visit" 
                  }
                ].map((item, index) => (
                  <div key={item.title} className="text-center p-6 glass-panel rounded-sm">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 text-gold mx-auto">
                      {item.icon}
                    </div>
                    <h3 className="heading-sm mb-2">{item.title}</h3>
                    <p className="text-black-light/80 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Forms Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <span className="inline-block text-sm text-gold font-medium">FOR NEW PATIENTS</span>
            <h2 className="heading-lg">Patient Forms</h2>
            <div className="separator-left"></div>
            <p className="paragraph">
              To make your first visit as efficient as possible, please download and complete these forms before your appointment. This allows us to focus on your dental needs rather than paperwork during your visit.
            </p>
            
            <div className="space-y-4 mt-8">
              {patientForms.map((form, index) => (
                <div key={form.name} className="border border-gray-200 rounded-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-medium text-black">{form.name}</h4>
                    <p className="text-sm text-black-light/80 mt-1">{form.description}</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <span className="inline-block text-sm text-gold font-medium">INSURANCE & PAYMENTS</span>
            <h2 className="heading-lg">Financial Information</h2>
            <div className="separator-left"></div>
            <p className="paragraph">
              We strive to make dental care accessible and affordable. Our administrative team will work with you to maximize your insurance benefits and explore payment options that suit your needs.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-sm mt-8">
              <h3 className="heading-sm mb-4">Insurance Information</h3>
              <ul className="space-y-3">
                {insuranceInfo.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-4 h-4 rounded-full bg-gold/20 flex-shrink-0 mt-1 mr-3"></span>
                    <span className="text-black-light">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="heading-sm mb-4">Payment Options</h3>
                <p className="text-black-light mb-4">
                  We accept cash, personal checks, and all major credit cards. We also offer flexible payment plans through CareCredit to help you manage larger treatment costs.
                </p>
                <Button>Learn About CareCredit</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">FAQ</span>
            <h2 className="heading-lg mb-6">Frequently Asked Questions</h2>
            <div className="separator"></div>
            <p className="paragraph">
              Find answers to common questions about our services, procedures, and policies. If you have a question that isn't addressed here, please contact our office.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-sm bg-white overflow-hidden"
                >
                  <button
                    className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    <h3 className="font-medium text-lg">{faq.question}</h3>
                    <ChevronDown 
                      size={20} 
                      className={cn(
                        "text-gold transition-transform duration-200",
                        openFaq === index ? "transform rotate-180" : ""
                      )} 
                    />
                  </button>
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openFaq === index ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <div className="p-6 pt-0 text-black-light/80">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto bg-black rounded-sm p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
            Have Additional <span className="text-gold">Questions?</span>
          </h2>
          <p className="text-lg text-white/80 mb-8 font-light">
            Our friendly team is ready to assist you with any questions or concerns you may have about your dental care.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button size="lg">Contact Us</Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Call (123) 456-7890
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientResources;

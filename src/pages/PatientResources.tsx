import React, { useEffect, useState } from 'react';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import Button from '@/components/Button';
import { FileText, HelpCircle, Calendar, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the FAQs data
const faqs: FAQ[] = [
  {
    question: "What should I expect during my first visit?",
    answer: "Your first visit will include a comprehensive examination, professional cleaning, and discussion of your oral health goals. We'll take any necessary X-rays and create a personalized treatment plan based on your needs."
  },
  {
    question: "How often should I visit for dental care?",
    answer: "Most clients benefit from professional cleanings and check-ups every six months. However, some conditions may require more frequent visits, which Dr. Aguil will discuss with you based on your specific needs."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment options through CareCredit and our in-house financing plans. Our team will work with you to find a solution that fits your budget while allowing you to receive the care you desire."
  },
  {
    question: "What if I have a dental emergency?",
    answer: "We reserve time in our schedule for dental emergencies and will do our best to see you the same day. Call our office immediately, and we'll provide instructions for care until you can be seen."
  },
  {
    question: "Do you offer sedation dentistry?",
    answer: "Yes, we offer several sedation options for enhanced comfort during procedures, including nitrous oxide (laughing gas) and oral conscious sedation. Dr. Aguil will discuss which option is best for your needs."
  }
];

interface FAQ {
  question: string;
  answer: string;
}

// Create a simplified FinancingSection component
const FinancingSection = () => {
  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div className="bg-white p-8 rounded-sm shadow-sm">
        <h3 className="text-xl font-medium mb-4">Payment Methods</h3>
        <ul className="space-y-2 text-black-light">
          <li>Cash</li>
          <li>All major credit cards</li>
        </ul>
      </div>

      {/* Care Plus Financing */}
      <div className="bg-white p-8 rounded-sm shadow-sm border border-gold/20">
        <h3 className="text-xl font-medium text-gold mb-4">Care Plus Financing</h3>
        <p className="text-black-light mb-6">
          Get the care you need with convenient monthly payments. Quick applications with instant decisions.
        </p>
        <Button>Learn More About Financing</Button>
      </div>

      {/* Personal Financing Message */}
      <div className="bg-white p-8 rounded-sm shadow-sm">
        <p className="text-black-light">
          Considering a larger treatment plan? Ask us about flexible monthly payment options designed to fit your budget.
        </p>
      </div>
    </div>
  );
};

const ClientResources = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.PROCEDURE}
        title={<>Client <span className="text-gold">Resources</span></>}
        subtitle="Everything you need to know before, during, and after your visit to Exquisite Dentistry."
        primaryCta={{ text: "Access Patient Portal", href: "#forms" }}
        overlayColor="gradient"
        height="medium"
        badgeText="HELPFUL INFORMATION"
        scrollIndicator={false}
      />

      <div className="-mt-32 relative z-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div id="forms" className="text-center mb-12">
                <h2 className="text-3xl font-medium mb-4">Patient Forms & Portal</h2>
                <p className="text-black-light/80 mb-8">
                  Access and complete all necessary forms through our secure patient portal. This allows us to focus on your dental needs rather than paperwork during your visit.
                </p>
                <Button className="gap-2">
                  Access Patient Portal 
                  <ExternalLink size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Insurance & Payment Info */}
            <div>
              <h2 className="text-3xl font-medium mb-6">Insurance & Payments</h2>
              <div className="separator-left mb-6"></div>
              <p className="text-black-light/80 mb-8">
                We strive to make dental care accessible and affordable. Our team will help maximize your insurance benefits and find payment options that work for you.
              </p>
              <FinancingSection />
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-medium mb-6">Common Questions</h2>
              <div className="separator-left mb-6"></div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-sm shadow-sm overflow-hidden"
                  >
                    <button
                      className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openFaq === index}
                    >
                      <h3 className="font-medium text-lg">{faq.question}</h3>
                      <ChevronDown 
                        className={cn(
                          "text-gold transition-transform duration-200",
                          openFaq === index ? "transform rotate-180" : ""
                        )} 
                      />
                    </button>
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-200",
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
        </div>
      </section>
    </div>
  );
};

export default ClientResources;

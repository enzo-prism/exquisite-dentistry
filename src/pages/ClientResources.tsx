import React, { useEffect, useState } from 'react';
import VideoHero from '@/components/VideoHero';
import Button from '@/components/Button';
import { FileText, HelpCircle, Calendar, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Scheduling URL constant - consistent across site
const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

// Define the FAQs data
const faqs: FAQ[] = [
  {
    question: "What can I expect during my appointment?",
    answer: "You can always expect to be treated like a VIP. Our office looks, sounds, and smells like a day spa. As soon as you come through the door, you'll be warmly greeted and offered freshly brewed coffee, water, or herbal tea. Enjoy a soft blanket, neck pillow, and noise-canceling headphones as you relax in a comfortable treatment chair. We value your time and get right to work for you. Dr. Aguil will patiently keep you informed and involved in your treatment."
  },
  {
    question: "What if I'm a new client?",
    answer: "Welcome! We're excited to see you! Please arrive 15 minutes early to complete the paperwork for your first appointment. Or, you can complete our dental forms through our secure client portal to save time."
  },
  {
    question: "Is there parking nearby?",
    answer: "Yes, there is parking on-site at 6227 Wilshire Blvd. West Hollywood, CA 90048. Please note that it's not our parking lot and does charge a cash fee. Street parking in the surrounding neighborhoods is very limited, so please read street signs carefully if you decide to park there."
  },
  {
    question: "Is Exquisite Dentistry for children & adults?",
    answer: "Exquisite Dentistry is focused on caring for the treatment and comfort of adults. Though we would be happy to recommend a pediatric dental office for your children."
  },
  {
    question: "What insurances do you accept?",
    answer: "We accept most major PPO providers. Please call our office at (323) 272-2388 to determine if we will accept your plan."
  },
  {
    question: "What types of payment do you accept?",
    answer: "We accept payment in cash and credit cards. We also offer financing options through Care Plus to help make your treatment more affordable."
  },
  {
    question: "What types of imaging are available?",
    answer: "We use digital imaging for routine x-rays and 3D imaging for more advanced diagnosis. Our iTero scanner takes digital impressions and records tooth movement over time. This advanced technology eliminates the need for traditional impression trays in many cases, making your visit more comfortable."
  },
  {
    question: "What if I can't make it to my appointment?",
    answer: "Please provide a notice within 48 hours to cancel or reschedule an appointment. Cancellations within 48 hours will be subject to a cancellation fee."
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
        title={<>Client <span className="text-gold">Resources</span></>}
        subtitle="Everything you need to know before, during, and after your visit to Exquisite Dentistry."
        primaryCta={{ text: "Access Client Portal", href: "#forms" }}
        height="medium"
        badgeText="HELPFUL INFORMATION"
        scrollIndicator={false}
      />

      <div className="-mt-32 relative z-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div id="forms" className="text-center mb-12">
                <h2 className="text-3xl font-medium mb-4">Forms & Portal</h2>
                <p className="text-black-light/80 mb-8">
                  Access and complete all necessary forms through our secure client portal. This allows us to focus on your dental needs rather than paperwork during your visit.
                </p>
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    Access Client Portal 
                    <ExternalLink size={18} />
                  </Button>
                </a>
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

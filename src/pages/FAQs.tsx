
import React, { useState, useEffect } from 'react';
import VideoHero from '@/components/VideoHero';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';

// Scheduling URL constant - consistent across site
const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQ[] = [
  {
    question: "What can I expect during my appointment?",
    answer: "You can always expect to be treated like a VIP. Our office looks, sounds, and smells like a day spa. As soon as you come through the door, you'll be warmly greeted and offered freshly brewed coffee, water, or herbal tea. Enjoy a soft blanket, neck pillow, and noise-canceling headphones as you relax in a comfortable treatment chair.\n\nWe value your time and get right to work for you. Dr. Aguil will patiently keep you informed and involved in your treatment.",
    category: "Appointments"
  },
  {
    question: "What if I'm a new client?",
    answer: "Welcome! We're excited to see you! Please arrive 15 minutes early to complete the paperwork for your first appointment. Or, you can complete our dental forms online and print or email them back to us to save time.",
    category: "New Clients"
  },
  {
    question: "Is there parking nearby?",
    answer: "Yes, there is parking on-site at 6227 Wilshire Blvd. West Hollywood, CA 90048. But it's not our parking lot, and does charge a cash fee. Street parking in the neighborhoods surrounding our office is very limited, so please read street signs carefully if you decide to park there.",
    category: "Location"
  },
  {
    question: "Is Exquisite Dentistry for children & adults?",
    answer: "Exquisite Dentistry is focused on caring for the treatment and comfort of adults. Though we would be happy to recommend a pediatric dental office for your children.",
    category: "Services"
  },
  {
    question: "What insurances do you accept?",
    answer: "We accept most major PPO providers. Please call our office at (323) 272-2388 to determine if we will accept your plan.",
    category: "Insurance & Payment"
  },
  {
    question: "What types of payment do you accept?",
    answer: "We accept payment in cash and credit cards.",
    category: "Insurance & Payment"
  },
  {
    question: "What if I can't make it to my appointment?",
    answer: "Please provide a notice within 48 hours to cancel or reschedule an appointment. Cancellations within 48 hours will be subject to a cancellation fee.",
    category: "Appointments"
  },
  {
    question: "How much will my treatment cost?",
    answer: "Our treatments are customized for your individual needs. Our doctor will determine the best course of treatment and create a personalized treatment plan to fit your budget.",
    category: "Insurance & Payment"
  }
];

const FAQs = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Dental FAQ Los Angeles | Common Questions Answered</title>
        <meta name="description" content="Get answers to frequently asked questions about cosmetic dentistry, dental procedures, insurance, and what to expect at Exquisite Dentistry in Los Angeles." />
        <meta name="keywords" content="dental FAQ, cosmetic dentistry questions, dental insurance Los Angeles, dental appointment questions, teeth whitening FAQ, veneers questions" />
        <meta property="og:title" content="Dental FAQ Los Angeles | Common Questions Answered" />
        <meta property="og:description" content="Get answers to frequently asked questions about cosmetic dentistry, procedures, insurance, and appointments at Exquisite Dentistry." />
        <meta property="og:image" content="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen page-transition-in">
        <VideoHero
          title={<>Frequently Asked <span className="text-gold">Questions</span></>}
          subtitle="Everything you need to know about your visit to Exquisite Dentistry."
          primaryCta={{ text: "Schedule a Visit", href: SCHEDULING_URL }}
          badgeText="GET ANSWERS"
          height="medium"
          scrollIndicator={false}
        />

        <section className="py-16 px-4 -mt-32 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-0"
                >
                  <button
                    className="w-full text-left py-6 flex justify-between items-start gap-4"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    <h3 className="font-medium text-lg leading-tight">{faq.question}</h3>
                    <ChevronDown 
                      className={cn(
                        "flex-shrink-0 w-5 h-5 mt-1 text-gold transition-transform duration-200",
                        openFaq === index ? "transform rotate-180" : ""
                      )} 
                    />
                  </button>
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      openFaq === index ? "max-h-[500px] pb-6" : "max-h-0"
                    )}
                  >
                    <div className="text-black-light/80 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQs;

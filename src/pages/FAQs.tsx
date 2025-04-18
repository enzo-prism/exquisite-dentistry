
import React, { useState, useEffect } from 'react';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    question: "What if I'm a new patient?",
    answer: "Welcome! We're excited to see you! Please arrive 15 minutes early to complete the paperwork for your first appointment. Or, you can complete our dental patient forms online and print or email them back to us to save time.",
    category: "New Patients"
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
    question: "Are financing options available?",
    answer: "Yes! We have financing available through Care Credit and Wells Fargo. We work within your budget to help find the best options for you.",
    category: "Insurance & Payment"
  },
  {
    question: "What types of imaging are available?",
    answer: "We use digital imaging for routine x-rays and 3D imaging for more advanced diagnosis. Our iTero scanner takes a digital impression of your mouth and records the movement of teeth over time, something that happens to everyone as we age.\n\niTero scanning also allows us to create digital impressions for crowns and bridges. This is great news for our patients because in many cases, we won't have to use traditional trays lined with a gooey material to create these impressions. This is another way our advanced technology helps to make your visit more comfortable.",
    category: "Services"
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
    <div className="min-h-screen page-transition-in">
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.PROCEDURE}
        title={<>Frequently Asked <span className="text-gold">Questions</span></>}
        subtitle="Everything you need to know about your visit to Exquisite Dentistry."
        primaryCta={{ text: "Schedule a Visit", href: "#" }}
        badgeText="GET ANSWERS"
        height="medium"
        scrollIndicator={false}
        overlayColor="gradient"
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
  );
};

export default FAQs;

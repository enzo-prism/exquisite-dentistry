
import React, { useEffect } from 'react';
import VideoHero from '@/components/VideoHero';
import { cn } from '@/lib/utils';
import PageSEO from '@/components/seo/PageSEO';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Scheduling URL constant - consistent across site
const SCHEDULING_URL = "https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQ[] = [
  {
    question: "What Can I Expect During My Appointment?",
    answer: "You can always expect to be treated like a VIP. Our office looks, sounds, and smells like a day spa. You'll be warmly greeted and offered freshly-brewed coffee, water, or herbal tea as soon as you come through the door. Enjoy a soft blanket, neck pillow, and noise-canceling headphones as you relax in a comfortable treatment chair.\n\nWe value your time and get right to work for you. Dr. Aguil will patiently keep you informed and involved in your treatment."
  },
  {
    question: "What If I'm a New Patient?",
    answer: "Welcome! We're excited to see you! Please arrive 15 minutes early to complete paperwork for your first appointment. Or, you can complete our dental patient forms online and print or email them back to us to save time."
  },
  {
    question: "Is There Parking Nearby?",
    answer: "Yes, there is parking on-site at 6227 Wilshire Blvd. West Hollywood, CA 90048. But it's not our parking lot, and does charge a cash fee. Street parking in the neighborhoods surrounding our office is very limited, so please read street signs carefully if you decide to park there."
  },
  {
    question: "Is Exquisite Dentistry for Children & Adults?",
    answer: "Exquisite Dentistry is focused on caring for the treatment and comfort of adults. Though we would be happy to recommend a pediatric dental office for your children."
  },
  {
    question: "What Insurances Do You Accept?",
    answer: "We accept most major PPO providers. Please call our office at (323) 272-2388 to determine if we will accept your plan."
  },
  {
    question: "What Types of Payment Do You Accept?",
    answer: "We accept payment in cash and credit cards."
  },
  {
    question: "Are Financing Options Available?",
    answer: "Yes! We have financing available through Care Credit and Wells Fargo. We work within your budget to help find the best options for you."
  },
  {
    question: "What Types of Imaging (X-Rays, CT Scan) are available at Exquisite Dentistry?",
    answer: "We use digital imaging for routine x-rays and 3D imaging for more advanced diagnosis. Our iTero scanner takes a digital impression of your mouth and records the movement of teeth over time, something that happens to everyone as we age.\n\niTero scanning also allows us to create digital impressions for crowns and bridges. This is great news for our patients because in many cases, we won't have to use traditional trays lined with a gooey material to create these impressions. This is another way our advanced technology helps to make your visit more comfortable."
  },
  {
    question: "What if I Can't Make it to My Appointment?",
    answer: "Please provide a notice within 48 hours to cancel or reschedule an appointment. Cancellations within 48 hours will be subject to a cancellation fee."
  },
  {
    question: "How Much Will My Treatment Cost?",
    answer: "Our treatments are customized for your individual needs. Our doctor will determine the best course of treatment and create a personalized treatment plan to fit your budget."
  }
];

const FAQs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageSEO
        title="Dental FAQ Los Angeles | Common Questions Answered"
        description="Get answers to common dental questions: veneer costs, insurance coverage, treatment time, recovery. Expert guidance from our LA dental team."
        keywords="dental FAQ, cosmetic dentistry questions, dental insurance Los Angeles, dental appointment questions, teeth whitening FAQ, veneers questions"
        path="/faqs"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />
      
      <FAQStructuredData 
        faqs={faqs.map(faq => ({ question: faq.question, answer: faq.answer }))} 
        about="Exquisite Dentistry Services and Appointments" 
      />

      <div className="min-h-screen page-transition-in">
        <VideoHero
          title={<>Your Dental Questions Answered - <span className="text-gold">Patient Care Guide</span></>}
          subtitle="Get comprehensive answers about our Los Angeles practice near Beverly Hills, treatment procedures, insurance coverage, and what to expect during your luxury dental experience."
          primaryCta={{ text: "Schedule Your First Visit", href: SCHEDULING_URL }}
          badgeText="PATIENT GUIDANCE"
          height="medium"
          scrollIndicator={false}
        />

        <section className="py-16 px-4 -mt-32 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-xl rounded-sm p-8 md:p-12">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <AccordionTrigger
                      className="py-6 hover:no-underline"
                      textClassName="text-left font-medium text-lg leading-tight text-gray-900 pr-4 transition-colors group-hover:text-gold"
                      iconClassName="text-gray-400 transition-colors group-hover:text-gold"
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-0">
                      <div className="text-black-light/80 whitespace-pre-line leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQs;

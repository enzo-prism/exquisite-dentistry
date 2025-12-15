
import React, { useEffect } from 'react';
import VideoHero from '@/components/VideoHero';
import { cn } from '@/lib/utils';
import PageSEO from '@/components/seo/PageSEO';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import { ROUTE_METADATA } from '@/constants/metadata';
import { faqs } from '@/data/faqs';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const meta = ROUTE_METADATA['/faqs'];

  return (
    <>
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/faqs"
        ogImage={meta.ogImage}
      />
      
      <FAQStructuredData 
        faqs={faqs.map(faq => ({ question: faq.question, answer: faq.answer }))} 
        about="Exquisite Dentistry Services and Appointments" 
      />

      <div className="min-h-screen page-transition-in">
        <VideoHero
          title={<>Your Dental Questions Answered - <span className="text-gold">Patient Care Guide</span></>}
          subtitle="Get comprehensive answers about our Los Angeles practice near Beverly Hills, treatment procedures, insurance coverage, and what to expect during your luxury dental experience."
          primaryCta={{ text: "Schedule Consultation", href: SCHEDULE_CONSULTATION_PATH }}
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

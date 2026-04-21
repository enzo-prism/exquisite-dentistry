
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoHero from '@/components/VideoHero';
import PageSEO from '@/components/seo/PageSEO';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import { Button } from '@/components/ui/button';
import { ROUTE_METADATA } from '@/constants/metadata';
import { faqs } from '@/data/faqs';
import { INSURANCE_HERO_HOOK, INSURANCE_PAYMENT_SUMMARY } from '@/data/insurance';
import { CONTACT_PATH, INSURANCE_PATH, SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
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
        about="Exquisite Dentistry services, insurance, and appointments" 
      />

      <div className="min-h-screen page-transition-in">
        <VideoHero
          title={<>Your Dental Questions Answered, <span className="text-gold">Patient Care Guide</span></>}
          subtitle="Get comprehensive answers about our Los Angeles practice near Beverly Hills, treatment procedures, insurance coverage, and what to expect during your luxury dental experience."
          primaryCta={{ text: "Schedule Consultation", href: SCHEDULE_CONSULTATION_PATH }}
          badgeText="PATIENT GUIDANCE"
          height="medium"
          scrollIndicator={false}
        />

        <section className="py-16 px-4 -mt-32 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-xl rounded-sm p-8 md:p-12">
              <div className="mb-8 rounded-[1.75rem] border border-gold/15 bg-gradient-to-br from-stone-50 to-white p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  Insurance & Payment
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                  {INSURANCE_HERO_HOOK}
                </h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {INSURANCE_PAYMENT_SUMMARY} If you want the quick version before reading the full
                  FAQ list, start with our insurance page or contact the team directly.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <Link to={INSURANCE_PATH}>Open Insurance Page</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={CONTACT_PATH}>Check Your Plan</Link>
                  </Button>
                </div>
              </div>

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

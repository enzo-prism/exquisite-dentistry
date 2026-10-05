import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PhoneLink from '@/components/PhoneLink';
import OfficeStatus from '@/components/OfficeStatus';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { CONSULTATION_DETAILS } from '@/data/consultation';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';

/**
 * What happens after you reach out — three steps on a gold line that draws
 * itself as the section scrolls in, closing on the two primary actions.
 */
const FirstVisitSteps: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="relative overflow-hidden bg-[#0d0c0a] py-20 text-white md:py-28" aria-labelledby="first-visit-steps-heading">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(185,162,124,0.18),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="section-container relative">
        <SectionHeading
          id="first-visit-steps-heading"
          tone="dark"
          eyebrow="Your first visit"
          title={<>What happens <em>after you reach out</em></>}
          description="Book online, request a callback, or call. Our team helps you choose the right appointment and confirms the details before you arrive."
        />

        <div ref={ref} className="relative mt-14 md:mt-20">
          {/* Connecting rule: vertical on phones, horizontal from md. */}
          <span
            className={cn(
              'absolute left-[1.375rem] top-2 h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-champagne/70 via-champagne/30 to-transparent transition-transform duration-[1600ms] ease-[cubic-bezier(0.65,0,0.35,1)] md:left-[8%] md:right-[8%] md:top-[1.375rem] md:h-px md:w-auto md:origin-left md:bg-gradient-to-r',
              'motion-reduce:scale-100 motion-reduce:transition-none',
              inView ? 'scale-100' : 'max-md:scale-y-0 md:scale-x-0',
            )}
            aria-hidden="true"
          />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {CONSULTATION_DETAILS.map((detail, index) => (
            <Reveal as="li" key={detail.title} variant="up" delay={200 + index * 220} className="relative pl-16 md:pl-0 md:text-center">
              <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-champagne/50 bg-[#0d0c0a] text-sm font-semibold text-champagne shadow-[0_0_0_6px_#0d0c0a] md:relative md:mx-auto">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold tracking-[-0.01em] md:mt-6">{detail.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70 md:mx-auto md:max-w-xs">{detail.description}</p>
            </Reveal>
          ))}
          </ol>
        </div>

        <Reveal variant="up" delay={200} className="mt-14 flex flex-col items-center gap-5 md:mt-20">
          <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild size="lg" className="group h-12 px-8 text-[15px] font-semibold">
              <Link
                to={SCHEDULE_CONSULTATION_PATH}
                onClick={() =>
                  trackConsultationIntent({
                    source: 'homepage_first_visit',
                    ctaText: 'Schedule Consultation',
                    destination: SCHEDULE_CONSULTATION_PATH,
                  })
                }
              >
                Schedule Consultation
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="h-12 px-7 text-[15px] font-semibold">
              <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} analyticsSource="homepage_first_visit" className="inline-flex items-center justify-center gap-2">
                <Phone className="text-champagne" aria-hidden="true" />
                Call {PHONE_NUMBER_DISPLAY}
              </PhoneLink>
            </Button>
          </div>
          <OfficeStatus />
          <Link to="/beverly-hills-dentist/" className="group inline-flex min-h-11 items-center text-sm text-white/60 transition-colors hover:text-white">
            <span className="link-sweep pb-0.5">Serving Beverly Hills and nearby Los Angeles neighborhoods</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default FirstVisitSteps;

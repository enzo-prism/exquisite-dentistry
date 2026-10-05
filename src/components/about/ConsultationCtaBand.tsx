import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import PhoneLink from '@/components/PhoneLink';
import OfficeStatus from '@/components/OfficeStatus';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';
import { cn } from '@/lib/utils';
import { useRegisterClosingCta } from '@/lib/closingCta';

interface ConsultationCtaBandProps {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Analytics source for both the booking link and the phone link. */
  source: string;
  ctaText?: string;
  className?: string;
  id?: string;
  /** The page's final band: the footer then skips its duplicate CTA panel. */
  closing?: boolean;
}

/**
 * Calm closing consultation block: heading on the left, booking + call on the
 * right, with the live office status. Used after gallery and review content.
 */
const ConsultationCtaBand: React.FC<ConsultationCtaBandProps> = ({
  eyebrow,
  title,
  description,
  source,
  ctaText = 'Schedule Consultation',
  className,
  id,
  closing = false,
}) => {
  useRegisterClosingCta(closing);
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section id={id} aria-labelledby={headingId} className={cn('bg-ivory py-16 md:py-24', className)}>
      <div className="section-container">
        <div className="mx-auto grid max-w-5xl gap-10 rounded-2xl border border-gold/15 bg-white p-7 shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)] sm:p-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center md:gap-12 md:p-12">
          <SectionHeading align="left" id={headingId} eyebrow={eyebrow} title={title} description={description} />

          <Reveal variant="up" delay={220} className="flex flex-col gap-3 md:border-l md:border-gold/20 md:pl-12">
            <Button asChild size="lg" className="group w-full justify-center">
              <Link
                to={SCHEDULE_CONSULTATION_PATH}
                onClick={() => trackConsultationIntent({ source, ctaText, destination: SCHEDULE_CONSULTATION_PATH })}
              >
                {ctaText}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full justify-center">
              <PhoneLink phoneNumber={PHONE_NUMBER_DISPLAY} analyticsSource={source}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {PHONE_NUMBER_DISPLAY}
              </PhoneLink>
            </Button>
            <OfficeStatus tone="light" className="mt-1 min-h-6 justify-center" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCtaBand;

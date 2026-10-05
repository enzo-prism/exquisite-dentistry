import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PhoneLink from '@/components/PhoneLink';
import OfficeStatus from '@/components/OfficeStatus';
import Reveal from '@/components/motion/Reveal';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { cn } from '@/lib/utils';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';
import { useRegisterClosingCta } from '@/lib/closingCta';

interface ConsultationBandProps {
  eyebrow?: string;
  /** Wrap accent words in <em> for the gold display serif. */
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Booking destination; defaults to the consultation page. */
  href?: string;
  ctaText?: string;
  /** Analytics source for the booking click; the call link uses `${source}_phone`. */
  source: string;
  tone?: 'dark' | 'light';
  headingLevel?: 'h2' | 'h3';
  /** Optional quiet link under the actions (e.g. Contact Us). */
  secondaryLink?: { text: string; href: string };
  /** Extra tracking for the booking click (consultation intent is always tracked). */
  onPrimaryClick?: () => void;
  /** The page's final band: the footer then skips its duplicate CTA panel. */
  closing?: boolean;
  className?: string;
}

/**
 * Consultation call-to-action band used mid-page and at the end of treatment
 * pages: one booking button, one tap-to-call link and the live office status.
 */
const ConsultationBand: React.FC<ConsultationBandProps> = ({
  eyebrow = 'Next step',
  title,
  description,
  href = SCHEDULE_CONSULTATION_PATH,
  ctaText = 'Schedule Consultation',
  source,
  tone = 'dark',
  headingLevel: Heading = 'h2',
  secondaryLink,
  onPrimaryClick,
  closing = false,
  className,
}) => {
  const dark = tone === 'dark';
  useRegisterClosingCta(closing);

  return (
    <section className={cn('py-12 md:py-16', className)}>
      <div className="section-container">
        <Reveal
          variant="up"
          className={cn(
            'relative isolate overflow-hidden rounded-[28px]',
            dark
              ? 'bg-ink text-white shadow-[0_40px_90px_-50px_rgba(12,9,4,0.8)]'
              : 'border border-gold/15 bg-ivory text-ink shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]',
          )}
        >
          {dark && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_100%_0%,hsl(39_48%_72%/0.16),transparent_65%)]"
            />
          )}
          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 md:px-14 md:py-14">
            <div className="min-w-0 max-w-2xl">
              {eyebrow && <p className={cn('eyebrow', dark && 'eyebrow--light')}>{eyebrow}</p>}
              <Heading
                className={cn(
                  'mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em] [overflow-wrap:anywhere]',
                  '[&_em]:accent-serif',
                  dark ? 'text-white [&_em]:text-champagne' : 'text-ink [&_em]:text-gold',
                )}
              >
                {title}
              </Heading>
              {description && (
                <p className={cn('mt-4 text-base leading-7 md:text-lg md:leading-8', dark ? 'text-white/75' : 'text-gray-600')}>
                  {description}
                </p>
              )}
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 sm:max-w-sm lg:w-[17rem]">
              <Button asChild size="lg" className="group h-auto min-h-12 w-full whitespace-normal py-3">
                <Link
                  to={href}
                  onClick={() => {
                    onPrimaryClick?.();
                    trackConsultationIntent({ source, ctaText, destination: href });
                  }}
                >
                  {ctaText}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <PhoneLink
                phoneNumber={PHONE_NUMBER_DISPLAY}
                analyticsSource={`${source}_phone`}
                className={cn(
                  'min-h-12 w-full justify-center gap-2 rounded-md border px-4 py-3 text-sm font-semibold transition-colors',
                  dark
                    ? 'border-white/30 bg-white/[0.06] text-white hover:border-white/55 hover:bg-white/[0.12]'
                    : 'border-gold/40 bg-white text-ink hover:border-gold hover:bg-white',
                )}
              >
                <Phone className={cn('h-4 w-4', dark ? 'text-champagne' : 'text-gold')} aria-hidden="true" />
                Call {PHONE_NUMBER_DISPLAY}
              </PhoneLink>
              {/* Fixed-height slot: the status renders after mount, so reserve its line. */}
              <div className="flex min-h-6 items-center justify-center">
                <OfficeStatus tone={dark ? 'dark' : 'light'} />
              </div>
              {secondaryLink && (
                <Link
                  to={secondaryLink.href}
                  className={cn(
                    'group inline-flex min-h-11 items-center justify-center text-sm font-semibold',
                    dark ? 'text-white/80 hover:text-white' : 'text-gold-dark hover:text-ink',
                  )}
                >
                  <span className="link-sweep pb-0.5">{secondaryLink.text}</span>
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ConsultationBand;

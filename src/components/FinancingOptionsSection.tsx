import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, CreditCard, Sparkles } from 'lucide-react';

import CherryPaymentPlansWidget from '@/components/CherryPaymentPlansWidget';
import { Button } from '@/components/ui/button';
import { PAYMENT_PLANS_PATH, SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { cn } from '@/lib/utils';
import { normalizeInternalHref } from '@/utils/normalizeInternalHref';

interface FinancingOptionsSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  disclaimer?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  showWidgetPreview?: boolean;
  className?: string;
}

const defaultHighlights = [
  {
    title: 'See monthly options',
    description: 'Review possible payment paths before or after your consultation.',
    Icon: CreditCard,
  },
  {
    title: 'Useful for bigger plans',
    description: 'Explore financing for veneers, implants, Invisalign, whitening, and smile makeovers.',
    Icon: Sparkles,
  },
  {
    title: 'Keep momentum',
    description: 'Move from financing clarity into treatment planning without losing your place.',
    Icon: CalendarClock,
  },
];

const renderAction = (href: string, label: string, variant: 'default' | 'outline') => {
  const normalizedHref = normalizeInternalHref(href);

  if (href.startsWith('/')) {
    return (
      <Button asChild size="lg" variant={variant}>
        <Link to={normalizedHref}>{label}</Link>
      </Button>
    );
  }

  return (
    <Button asChild size="lg" variant={variant}>
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {label}
      </a>
    </Button>
  );
};

const FinancingOptionsSection: React.FC<FinancingOptionsSectionProps> = ({
  eyebrow = 'Flexible Financing',
  title = 'Review payment options before you commit to treatment.',
  description = 'If you are planning veneers, Invisalign, whitening, implants, or a broader restorative plan, our Cherry financing page helps you explore monthly payment options before you book or begin treatment.',
  disclaimer = 'Payment options are provided through Cherry and remain subject to approval.',
  primaryCtaText = 'View Payment Plans',
  primaryCtaHref = PAYMENT_PLANS_PATH,
  secondaryCtaText = 'Schedule Consultation',
  secondaryCtaHref = SCHEDULE_CONSULTATION_PATH,
  showWidgetPreview = true,
  className,
}) => {
  return (
    <section className={cn('py-16 md:py-20', className)}>
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-br from-white via-stone-50 to-white shadow-[0_30px_90px_-50px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0">
            <div className="absolute left-[-8rem] top-[-8rem] h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
            <div className="absolute bottom-[-10rem] right-[-6rem] h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative grid gap-8 p-8 md:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                {eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {disclaimer}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {renderAction(primaryCtaHref, primaryCtaText, 'default')}
                {secondaryCtaText && secondaryCtaHref
                  ? renderAction(secondaryCtaHref, secondaryCtaText, 'outline')
                  : null}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {defaultHighlights.map(({ title: highlightTitle, description: highlightDescription, Icon }) => (
                <div
                  key={highlightTitle}
                  className="rounded-[1.5rem] border border-border/80 bg-white/90 p-5 shadow-[0_20px_40px_-32px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{highlightTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{highlightDescription}</p>
                </div>
              ))}
            </div>
          </div>

          {showWidgetPreview ? (
            <div className="relative border-t border-border/70 bg-white/80 px-8 py-8 md:px-10 md:py-10">
              <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
                <div className="min-w-0 max-w-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                    Live Cherry Preview
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                    Let patients see real financing options before they bounce.
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    This gives visitors a live Cherry preview while they are still deciding on
                    veneers, implants, Invisalign, whitening, or a larger treatment plan. They can
                    continue into the full financing flow or move straight into a consultation once
                    the numbers feel realistic.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {renderAction(primaryCtaHref, primaryCtaText, 'default')}
                    {secondaryCtaText && secondaryCtaHref
                      ? renderAction(secondaryCtaHref, secondaryCtaText, 'outline')
                      : null}
                  </div>
                </div>

                <div className="min-w-0">
                  <CherryPaymentPlansWidget
                    variant="preview"
                    className="border-gold/15 shadow-[0_24px_72px_-40px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="relative border-t border-border/70 bg-white/60 px-8 py-4 text-sm text-muted-foreground md:px-10">
            Patients can preview Cherry right here, continue to the full payment plans page for the
            complete financing experience, and then return to scheduling with Exquisite Dentistry.
            <ArrowRight className="ml-2 inline-flex h-4 w-4 text-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingOptionsSection;

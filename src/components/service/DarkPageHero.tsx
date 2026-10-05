import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PhoneLink from '@/components/PhoneLink';
import OfficeStatus from '@/components/OfficeStatus';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { cn } from '@/lib/utils';

interface DarkPageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryCta: { text: string; href: string; onClick?: () => void };
  /** PhoneLink analytics source for the tap-to-call action. */
  phoneSource: string;
  align?: 'left' | 'center';
  /** Rendered above the eyebrow (e.g. breadcrumbs). */
  topSlot?: React.ReactNode;
  /** Rendered under the actions (highlights, stats). */
  children?: React.ReactNode;
  className?: string;
}

const rise = (delay: number) => ({ '--d': `${delay}ms` } as React.CSSProperties);

/**
 * Static dark hero for template pages without hero video: clean ink ground,
 * a single soft champagne glow, booking + call actions in the first viewport.
 */
const DarkPageHero: React.FC<DarkPageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  phoneSource,
  align = 'left',
  topSlot,
  children,
  className,
}) => {
  const centered = align === 'center';

  return (
    <section className={cn('relative isolate overflow-hidden bg-ink text-white', className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_85%_0%,hsl(39_48%_72%/0.1),transparent_70%)]"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="section-container pb-14 pt-6 md:pb-24 md:pt-10">
        {topSlot && <div className="mb-8 md:mb-12">{topSlot}</div>}

        <div className={cn('min-w-0', centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')}>
          {eyebrow && (
            <p className={cn('hero-rise eyebrow eyebrow--light', centered && 'eyebrow--center')} style={rise(40)}>
              {eyebrow}
            </p>
          )}
          <h1
            className="hero-rise mt-5 text-[clamp(2.1rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white [overflow-wrap:anywhere]"
            style={rise(120)}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn('hero-rise mt-5 text-base leading-7 text-white/80 md:text-lg md:leading-8', centered && 'mx-auto max-w-2xl')}
              style={rise(260)}
            >
              {subtitle}
            </p>
          )}

          <div
            className={cn(
              'hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center',
              centered && 'sm:justify-center',
            )}
            style={rise(380)}
          >
            <Button asChild size="lg" className="group h-auto min-h-12 whitespace-normal py-3">
              <Link to={primaryCta.href} onClick={primaryCta.onClick}>
                {primaryCta.text}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <PhoneLink
              phoneNumber={PHONE_NUMBER_DISPLAY}
              analyticsSource={phoneSource}
              className="min-h-12 justify-center gap-2 rounded-md border border-white/30 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/[0.12]"
            >
              <Phone className="h-4 w-4 text-champagne" aria-hidden="true" />
              Call {PHONE_NUMBER_DISPLAY}
            </PhoneLink>
          </div>
          <div className={cn('hero-rise mt-4 flex min-h-6 items-center', centered && 'justify-center')} style={rise(460)}>
            <OfficeStatus />
          </div>
        </div>

        {children && (
          <div className="hero-rise mt-10 md:mt-14" style={rise(540)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default DarkPageHero;

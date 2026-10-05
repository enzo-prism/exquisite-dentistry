import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedHeadline from '@/components/motion/AnimatedHeadline';
import PhoneLink from '@/components/PhoneLink';
import OfficeStatus from '@/components/OfficeStatus';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import HeroCtaButtons from './HeroCtaButtons';
import type { VideoHeroProps } from './video-hero-types';

type HeroContentProps = Pick<
  VideoHeroProps,
  'title' | 'subtitle' | 'primaryCta' | 'secondaryCta' | 'proofLinks' | 'eyebrow' | 'phoneCta'
> & { isMobile: boolean };

const DEFAULT_PROOF_LINKS = [{ text: 'Read patient experiences', href: '/testimonials/' }];

/** Copy, actions and proof for both hero layouts, choreographed on mount. */
const HeroContent: React.FC<HeroContentProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  proofLinks,
  eyebrow,
  phoneCta,
  isMobile,
}) => {
  const links = proofLinks ?? DEFAULT_PROOF_LINKS;
  const [leadProof, ...restProof] = links;

  return (
    <div className={cn('text-white', isMobile ? 'w-full' : 'max-w-[44rem]')}>
      {eyebrow && (
        <p className="hero-rise eyebrow eyebrow--light mb-5 md:mb-7" style={{ '--d': '60ms' } as React.CSSProperties}>
          {eyebrow}
        </p>
      )}

      <h1
        className={cn(
          'hero-title font-semibold tracking-[-0.025em] [overflow-wrap:anywhere]',
          isMobile
            ? 'mb-5 text-[clamp(2.15rem,10vw,3rem)] leading-[1.04]'
            : 'mb-7 text-[clamp(2.75rem,5.4vw,5.25rem)] leading-[1.02]',
        )}
        style={isMobile ? { textShadow: '0 2px 18px rgba(0,0,0,0.45)' } : undefined}
      >
        <AnimatedHeadline>{title}</AnimatedHeadline>
      </h1>

      {subtitle && (
        <p
          className={cn(
            'hero-rise text-white/85',
            isMobile ? 'mb-7 text-[15px] leading-[1.65]' : 'mb-9 max-w-[38rem] text-lg leading-relaxed md:text-xl',
          )}
          style={{ '--d': '520ms' } as React.CSSProperties}
        >
          {subtitle}
        </p>
      )}

      <div className="hero-rise" style={{ '--d': '680ms' } as React.CSSProperties}>
        {isMobile && phoneCta ? (
          <div className="flex w-full flex-col gap-3">
            <HeroCtaButtons primaryCta={primaryCta} isMobile />
            <PhoneLink
              phoneNumber={PHONE_NUMBER_DISPLAY}
              analyticsSource="hero_phone_button"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-white/30 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.12] [overflow-wrap:anywhere]"
            >
              <Phone className="h-4 w-4 text-champagne" aria-hidden="true" />
              Call {PHONE_NUMBER_DISPLAY}
            </PhoneLink>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <HeroCtaButtons primaryCta={primaryCta} secondaryCta={secondaryCta} isMobile={isMobile} />
            {!isMobile && phoneCta && (
              <PhoneLink
                phoneNumber={PHONE_NUMBER_DISPLAY}
                analyticsSource="hero_phone_text"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-champagne" aria-hidden="true" />
                <span className="link-sweep pb-0.5">or call {PHONE_NUMBER_DISPLAY}</span>
              </PhoneLink>
            )}
          </div>
        )}
      </div>

      <div
        className={cn(
          'hero-rise flex flex-wrap items-center text-white/75',
          isMobile ? 'mt-6 gap-x-4 gap-y-1 text-[13px]' : 'mt-9 gap-x-5 gap-y-2 text-sm',
        )}
        style={{ '--d': '840ms' } as React.CSSProperties}
      >
        {leadProof && (
          <Link
            to={leadProof.href}
            className="group inline-flex min-h-8 items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <span className="flex items-center gap-0.5 text-champagne" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="link-sweep pb-0.5">{leadProof.text}</span>
          </Link>
        )}
        {restProof.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="group inline-flex min-h-8 items-center gap-2 transition-colors hover:text-white"
          >
            <span className="h-1 w-1 rounded-full bg-champagne/70" aria-hidden="true" />
            <span className="link-sweep pb-0.5">{link.text}</span>
          </Link>
        ))}
        {phoneCta && <OfficeStatus className={isMobile ? 'min-h-8 w-full' : 'min-h-8'} />}
      </div>
    </div>
  );
};

export default HeroContent;

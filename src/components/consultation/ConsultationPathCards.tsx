import React from 'react';
import { ArrowDown, ArrowRight, CalendarCheck, MessageSquareText, Phone } from 'lucide-react';
import PhoneLink from '@/components/PhoneLink';
import OfficeStatus from '@/components/OfficeStatus';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { cn } from '@/lib/utils';

/*
 * Two internal layouts share one card: a row (icon · text · arrow) for narrow
 * phones and the lg column, and a stacked tile where three fit side by side
 * (sm–md and xl+).
 */
const cardClass =
  'lift-card group relative flex h-full min-h-[5.5rem] items-center gap-4 rounded-2xl border p-4 text-left outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ' +
  'sm:flex-col sm:items-start sm:gap-5 sm:p-5 lg:flex-row lg:items-center lg:gap-4 xl:flex-col xl:items-start xl:gap-5';

const iconClass = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border';
const rowArrowClass = 'ml-auto h-4 w-4 shrink-0 transition-transform duration-500 sm:hidden lg:block xl:hidden';
const tileArrowClass = 'absolute right-5 top-5 hidden h-4 w-4 transition-transform duration-500 sm:block lg:hidden xl:block';

type CardCopyProps = { title: string; descriptionId: string; children: React.ReactNode; tone: 'dark' | 'light' };

const CardCopy: React.FC<CardCopyProps> = ({ title, descriptionId, children, tone }) => (
  <span className="min-w-0 flex-1">
    <span className={cn('block text-base font-semibold tracking-[-0.01em]', tone === 'dark' ? 'text-white' : 'text-ink')}>
      {title}
    </span>
    <span
      id={descriptionId}
      className={cn('mt-1 block text-sm leading-5', tone === 'dark' ? 'text-white/70' : 'text-gray-600')}
    >
      {children}
    </span>
  </span>
);

/** The three ways to start, as large, calm, selectable cards. */
/** On-mount entrance (not scroll-triggered) so the primary actions never wait on a reveal. */
const ConsultationPathCards: React.FC<{ className?: string }> = ({ className }) => (
  <ul className={cn('grid gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1 lg:gap-3 xl:grid-cols-3 xl:gap-4', className)}>
    <li className="hero-rise" style={{ '--d': '240ms' } as React.CSSProperties}>
      <a
        href="#book-online"
        aria-label="Book Online"
        aria-describedby="path-book-online-description"
        className={cn(cardClass, 'border-ink bg-ink text-white hover:border-gold/60')}
      >
        <span className={cn(iconClass, 'border-champagne/30 bg-white/[0.06] text-champagne')}>
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <CardCopy title="Book Online" descriptionId="path-book-online-description" tone="dark">
          Choose an appointment time in our online scheduler.
        </CardCopy>
        <ArrowDown className={cn(rowArrowClass, 'text-champagne group-hover:translate-y-0.5')} aria-hidden="true" />
        <ArrowDown className={cn(tileArrowClass, 'text-champagne group-hover:translate-y-0.5')} aria-hidden="true" />
      </a>
    </li>

    <li className="hero-rise" style={{ '--d': '320ms' } as React.CSSProperties}>
      <a
        href="#request-callback"
        aria-label="Request a callback"
        aria-describedby="path-callback-description"
        className={cn(cardClass, 'border-gold/15 bg-white hover:border-gold/45')}
      >
        <span className={cn(iconClass, 'border-gold/25 bg-ivory text-gold')}>
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
        </span>
        <CardCopy title="Request a callback" descriptionId="path-callback-description" tone="light">
          Leave your number and ask questions before you book.
        </CardCopy>
        <ArrowDown className={cn(rowArrowClass, 'text-gold group-hover:translate-y-0.5')} aria-hidden="true" />
        <ArrowDown className={cn(tileArrowClass, 'text-gold group-hover:translate-y-0.5')} aria-hidden="true" />
      </a>
    </li>

    <li className="hero-rise" style={{ '--d': '400ms' } as React.CSSProperties}>
      <PhoneLink
        phoneNumber={PHONE_NUMBER_DISPLAY}
        aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
        aria-describedby="path-call-description"
        className={cn(cardClass, 'border-gold/15 bg-white hover:border-gold/45')}
      >
        <span className={cn(iconClass, 'border-gold/25 bg-ivory text-gold')}>
          <Phone className="h-5 w-5" aria-hidden="true" />
        </span>
        <CardCopy title={`Call ${PHONE_NUMBER_DISPLAY}`} descriptionId="path-call-description" tone="light">
          <span className="block">Speak with the front desk.</span>
          <OfficeStatus tone="light" className="mt-1.5" />
        </CardCopy>
        <ArrowRight className={cn(rowArrowClass, 'text-gold group-hover:translate-x-0.5')} aria-hidden="true" />
        <ArrowRight className={cn(tileArrowClass, 'text-gold group-hover:translate-x-0.5')} aria-hidden="true" />
      </PhoneLink>
    </li>
  </ul>
);

export default ConsultationPathCards;

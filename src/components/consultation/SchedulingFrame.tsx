import React, { useEffect, useState } from 'react';
import { CalendarDays, ExternalLink } from 'lucide-react';
import PhoneLink from '@/components/PhoneLink';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { SCHEDULING_URL } from '@/constants/urls';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

type Phase = 'static' | 'loading' | 'slow' | 'ready' | 'done';

/** How long the branded loading state waits before suggesting the fallbacks more plainly. */
const SLOW_AFTER_MS = 12_000;
/** Matches the cross-fade duration below; the loader unmounts once it is invisible. */
const FADE_MS = 700;

const SKELETON_DAYS = Array.from({ length: 35 }, (_, index) => index);

/**
 * The third-party scheduler, framed in the site's own card. Until the iframe
 * fires `load`, a calm placeholder (shimmer, status line, and fallback links)
 * covers the blank frame; then the two cross-fade. Prerendered HTML (no
 * window) renders the iframe visible with no overlay, so nothing is hidden
 * without JavaScript.
 */
const SchedulingFrame: React.FC = () => {
  const [phase, setPhase] = useState<Phase>(() => (typeof window === 'undefined' ? 'static' : 'loading'));
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px 0px', threshold: 0 });

  useEffect(() => {
    if (phase !== 'loading' || !inView) return;
    const timer = window.setTimeout(() => setPhase((current) => (current === 'loading' ? 'slow' : current)), SLOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [phase, inView]);

  useEffect(() => {
    if (phase !== 'ready') return;
    const timer = window.setTimeout(() => setPhase('done'), FADE_MS + 100);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const waiting = phase === 'loading' || phase === 'slow';
  const showOverlay = waiting || phase === 'ready';

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]"
    >
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-gold/10 bg-ivory/70 px-4 py-2 sm:px-5">
        <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink">
          <CalendarDays className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <span className="hidden truncate sm:inline">Online scheduling</span>
        </span>
        <a
          href={SCHEDULING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-dark transition-colors hover:text-ink"
        >
          <span className="link-sweep pb-0.5">Open scheduling in a new tab</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="relative">
        <iframe
          title="Online scheduling"
          src={SCHEDULING_URL}
          className={cn(
            'block h-[calc(100svh-8rem)] min-h-[560px] w-full transition-opacity duration-700 ease-out motion-reduce:transition-none md:h-[900px]',
            waiting ? 'opacity-0' : 'opacity-100',
          )}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setPhase((current) => (current === 'static' || current === 'done' ? current : 'ready'))}
        />

        {showOverlay && (
          <div
            className={cn(
              'absolute inset-0 overflow-hidden bg-white transition-[opacity,visibility] duration-700 ease-out motion-reduce:transition-none',
              waiting ? 'visible opacity-100' : 'invisible opacity-0',
            )}
            aria-hidden={waiting ? undefined : true}
          >
            <style>{`
              @keyframes sched-shimmer { from { transform: translate3d(-100%,0,0); } to { transform: translate3d(100%,0,0); } }
              .sched-shimmer { position: relative; overflow: hidden; background: hsl(40 33% 95%); }
              .sched-shimmer::after { content: ''; position: absolute; inset: 0; transform: translate3d(-100%,0,0);
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent);
                animation: sched-shimmer 1.6s cubic-bezier(0.65,0,0.35,1) infinite; }
              @media (prefers-reduced-motion: reduce) { .sched-shimmer::after { animation: none; display: none; } }
            `}</style>

            <div className="flex h-full flex-col items-center justify-center gap-8 px-5 py-8 sm:gap-10 sm:px-8">
              <div role="status" className="max-w-sm text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-base font-semibold text-ink">
                  {phase === 'slow' ? 'The scheduler is taking longer than usual.' : 'Loading online scheduling…'}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  You can also{' '}
                  <a
                    href={SCHEDULING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold-dark underline underline-offset-4 hover:no-underline"
                  >
                    book in a new tab
                  </a>{' '}
                  or call{' '}
                  <PhoneLink
                    phoneNumber={PHONE_NUMBER_DISPLAY}
                    analyticsSource="schedule_booking_loader"
                    className="font-semibold text-gold-dark underline underline-offset-4 hover:no-underline"
                  >
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                  .
                </p>
              </div>

              {/* A quiet sketch of a scheduler: month header, weekday grid, time slots. */}
              <div className="w-full max-w-md" aria-hidden="true">
                <div className="flex items-center justify-between">
                  <span className="sched-shimmer block h-4 w-32 rounded-full" />
                  <span className="flex gap-2">
                    <span className="sched-shimmer block h-8 w-8 rounded-full" />
                    <span className="sched-shimmer block h-8 w-8 rounded-full" />
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-7 gap-2 sm:gap-2.5">
                  {SKELETON_DAYS.map((day) => (
                    <span key={day} className="sched-shimmer block aspect-square rounded-lg" />
                  ))}
                </div>
                <div className="mt-5 hidden grid-cols-3 gap-2.5 sm:grid">
                  {[0, 1, 2].map((slot) => (
                    <span key={slot} className="sched-shimmer block h-10 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingFrame;

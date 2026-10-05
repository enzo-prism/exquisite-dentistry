import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import PhoneLink from '@/components/PhoneLink';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { isChatGptAdsLandingPath } from '@/utils/analyticsHost';
import { trackConsultationIntent } from '@/utils/vercelAnalytics';
import { MOBILE_ACTION_BAR_HEIGHT_PX, OPEN_CONCIERGE_EVENT, setMobileActionBarEnabled, setMobileActionBarVisible } from '@/lib/mobileActionBar';

/** Pages that already lead with booking/contact actions (or have their own funnel). */
const EXCLUDED_PATHS = ['/schedule-consultation', '/contact', '/sitemap'];

const normalize = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

const isTextEntry = (element: Element | null) =>
  !!element && (element.matches('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select') || (element as HTMLElement).isContentEditable);

/**
 * Phone-only bottom bar with the two actions patients actually take: call, or
 * book. It slides up once the hero (which carries the same actions) has
 * scrolled away, steps aside while the keyboard is open, and lifts the Cherry
 * pill via `--mobile-action-bar-h` so nothing overlaps.
 */
const MobileActionBar: React.FC = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const enabled =
    isMobile && !isChatGptAdsLandingPath(pathname) && !EXCLUDED_PATHS.includes(normalize(pathname));
  const [pastHero, setPastHero] = useState(false);
  const [typing, setTyping] = useState(false);
  const visible = enabled && pastHero && !typing;
  const barRef = useRef<HTMLDivElement>(null);

  // Off-screen, the bar must leave the tab order and accessibility tree.
  useEffect(() => {
    if (barRef.current) barRef.current.inert = !visible;
  }, [visible, enabled]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = Math.min(window.innerHeight * 0.55, 460);
      setPastHero(window.scrollY > threshold);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, pathname]);

  useEffect(() => {
    if (!enabled) return;
    const onFocusIn = (event: FocusEvent) => setTyping(isTextEntry(event.target as Element));
    const onFocusOut = () => setTyping(isTextEntry(document.activeElement));
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, [enabled]);

  useEffect(() => {
    setMobileActionBarVisible(visible);
  }, [visible]);

  useEffect(() => () => setMobileActionBarVisible(false), []);

  useEffect(() => {
    setMobileActionBarEnabled(enabled);
    return () => setMobileActionBarEnabled(false);
  }, [enabled]);

  useEffect(() => {
    document.documentElement.style.setProperty('--mobile-action-bar-space', enabled ? `calc(${MOBILE_ACTION_BAR_HEIGHT_PX}px + env(safe-area-inset-bottom, 0px))` : '0px');
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="action-bar fixed inset-x-0 bottom-0 z-40 md:hidden"
      data-visible={visible}
      ref={barRef}
      aria-hidden={!visible}
      style={{ visibility: visible ? 'visible' : 'hidden', transitionProperty: 'transform, visibility', transitionDuration: visible ? '0.55s, 0s' : '0.4s, 0s', transitionDelay: visible ? '0s, 0s' : '0s, 0.4s' }}
    >
      <nav
        aria-label="Quick contact"
        className="relative border-t border-white/10 bg-[rgba(12,11,9,0.92)] px-3 pb-[calc(env(safe-area-inset-bottom,0px)+10px)] pt-2.5 shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent allow-gradient-transparency" aria-hidden="true" />
        <div className="mx-auto flex max-w-lg items-stretch gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_CONCIERGE_EVENT))}
            className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-champagne transition-colors active:bg-white/15"
            aria-label="Open concierge"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </button>
          <PhoneLink
            phoneNumber={PHONE_NUMBER_DISPLAY}
            analyticsSource="mobile_action_bar"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] text-sm font-semibold text-white transition-colors active:bg-white/15"
            aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
          >
            <Phone className="h-4 w-4 text-champagne" aria-hidden="true" />
            Call
          </PhoneLink>
          <Link
            to={SCHEDULE_CONSULTATION_PATH}
            onClick={() =>
              trackConsultationIntent({ source: 'mobile_action_bar', ctaText: 'Book consultation', destination: SCHEDULE_CONSULTATION_PATH })
            }
            className={cn(
              'group flex h-12 flex-[1.6] items-center justify-center gap-2 rounded-xl bg-gold px-3 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(185,162,124,0.8)] transition-colors active:bg-gold-dark',
            )}
          >
            <span className="min-[370px]:hidden">Book visit</span>
            <span className="hidden min-[370px]:inline">Book consultation</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-active:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileActionBar;

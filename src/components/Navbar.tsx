import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Phone, Search } from 'lucide-react';
import ImageComponent from '@/components/Image';
import PhoneLink from '@/components/PhoneLink';
import { cn } from '@/lib/utils';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { trackConsultationIntent, trackSiteSearchOpened } from '@/utils/vercelAnalytics';
import DesktopNav from '@/components/nav/DesktopNav';
import MenuGlyph from '@/components/nav/MenuGlyph';
import MobileMenu from '@/components/nav/MobileMenu';
import UtilityStrip from '@/components/nav/UtilityStrip';

const LazySiteSearch = lazy(() => import('@/components/search/SiteSearch'));

const LOGO_SRC = '/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png';

/** Scroll distance after which the bar turns to smoked glass and the strip fades. */
const SCROLLED_AT = 12;

const RING = 'focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-champagne/70';

const DESKTOP_ICON_BUTTON_CLASS = cn(
  'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-white/80 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.06] hover:text-white',
  RING,
);

const MOBILE_ICON_BUTTON_CLASS = cn(
  'inline-flex h-11 min-h-[44px] w-11 min-w-[44px] shrink-0 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10',
  RING,
);

const Navbar = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shouldMountSearch, setShouldMountSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopPanelOpen, setIsDesktopPanelOpen] = useState(false);

  const prefetchSearch = useCallback(() => {
    import('@/components/search/SiteSearch').catch(() => undefined);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setShouldMountSearch(true);
    setIsSearchOpen(true);
    trackSiteSearchOpened({ source: 'navbar' });
    closeMobileMenu();
  }, [closeMobileMenu]);

  const trackNavbarConsultation = useCallback((source: string, ctaText: string) => {
    trackConsultationIntent({
      source,
      ctaText,
      destination: SCHEDULE_CONSULTATION_PATH,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLLED_AT);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ⌘K / Ctrl+K opens search from anywhere except while typing.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTypingContext = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      if (!element) return false;

      const tag = element.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
      if (element.isContentEditable) return true;
      return element.getAttribute('role') === 'textbox';
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isTypingContext(event.target)) return;

      const key = event.key.toLowerCase();
      if (key !== 'k') return;
      if (!event.metaKey && !event.ctrlKey) return;

      event.preventDefault();
      openSearch();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearch]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Widening to the desktop layout closes the phone/tablet menu.
  useEffect(() => {
    if (!isMobileMenuOpen || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMobileMenu();
    };

    if (mediaQuery.matches) {
      closeMobileMenu();
      return;
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleDesktop);
      return () => mediaQuery.removeEventListener('change', handleDesktop);
    }

    mediaQuery.addListener(handleDesktop);
    return () => mediaQuery.removeListener(handleDesktop);
  }, [isMobileMenuOpen, closeMobileMenu]);

  const glass = scrolled || isDesktopPanelOpen;

  return (
    <>
      {/*
        Sticky with a negative top on desktop: the 36px utility strip scrolls
        away with the page while the main bar stays pinned. Nothing about the
        header's box changes on scroll, so page content never shifts (CLS 0).
      */}
      <header className="sticky top-0 z-50 w-full text-white lg:-top-9">
        {/* Background lives on its own layer so the header itself never becomes
            a backdrop-filter root (the mega menu needs to blur the page). */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            glass
              ? 'border-white/[0.08] bg-[rgba(10,9,8,0.86)] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150'
              : 'border-white/[0.06] bg-black',
          )}
        />

        <UtilityStrip hidden={scrolled} />

        {/*
          One row for every width (a single logo link keeps `header a[href="/"]` unambiguous):
          <1024px  logo · call · book · menu   (wraps, never overflows, under large text)
          ≥1024px  logo · centered navigation · search, call, book
        */}
        <div className="mx-auto flex min-h-16 w-full max-w-[1440px] flex-wrap items-center justify-between gap-x-2 gap-y-1 px-3 py-[10px] min-[360px]:px-4 sm:px-6 lg:grid lg:h-[72px] lg:min-h-0 lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:py-0 xl:gap-6 xl:px-8">
          <Link
            to="/"
            className="group inline-flex min-h-11 shrink-0 items-center justify-self-start rounded-md focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-champagne/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            <ImageComponent
              src={LOGO_SRC}
              alt="Exquisite Dentistry Logo"
              responsive
              logoType="main"
              priority
              className="block h-auto w-[112px] object-contain transition-opacity duration-300 group-hover:opacity-85 min-[360px]:w-[124px] sm:w-[136px] lg:w-[142px] xl:w-[156px] 2xl:w-[164px]"
            />
          </Link>

          <div className="hidden lg:flex lg:justify-center">
            <DesktopNav
              pathname={location.pathname}
              onBookClick={trackNavbarConsultation}
              onPanelOpenChange={setIsDesktopPanelOpen}
            />
          </div>

          <div className="hidden shrink-0 items-center justify-self-end gap-2 lg:flex">
            <button
              type="button"
              onClick={openSearch}
              onMouseEnter={prefetchSearch}
              onFocus={prefetchSearch}
              className={DESKTOP_ICON_BUTTON_CLASS}
              aria-label="Search site"
              aria-keyshortcuts="Meta+K Control+K"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>

            <PhoneLink
              phoneNumber={PHONE_NUMBER_DISPLAY}
              analyticsSource="desktop_nav_icon"
              className={DESKTOP_ICON_BUTTON_CLASS}
              aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
              title={`Call ${PHONE_NUMBER_DISPLAY}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </PhoneLink>

            <Link
              to={SCHEDULE_CONSULTATION_PATH}
              // ctaText stays 'Schedule Consultation' so existing dashboards keep one series.
              onClick={() => trackNavbarConsultation('desktop_nav_book_button', 'Schedule Consultation')}
              className={cn(
                'group ml-1 inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gold px-[18px] text-[13px] font-semibold tracking-[0.01em] text-white shadow-[0_10px_30px_-12px_rgba(166,138,92,0.7)] transition-[background-color,box-shadow] duration-300',
                'focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
              )}
            >
              Book Consultation
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="ml-auto flex max-w-full flex-wrap items-center justify-end gap-1.5 sm:gap-2 lg:hidden">
            <PhoneLink
              phoneNumber={PHONE_NUMBER_DISPLAY}
              analyticsSource="mobile_nav_icon"
              className={cn(MOBILE_ICON_BUTTON_CLASS, 'border border-white/[0.16] text-champagne hover:text-white')}
              aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
            >
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            </PhoneLink>

            <Link
              to={SCHEDULE_CONSULTATION_PATH}
              onClick={() => trackNavbarConsultation('mobile_nav_book_button', 'Book')}
              className={cn(
                'inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-gold px-[18px] text-sm font-semibold text-white',
                'focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
              )}
            >
              Book
            </Link>

            <MobileMenu
              open={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
              pathname={location.pathname}
              onSearch={openSearch}
              onSearchIntent={prefetchSearch}
              onBookClick={trackNavbarConsultation}
              trigger={
                <button
                  type="button"
                  className={MOBILE_ICON_BUTTON_CLASS}
                  aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={isMobileMenuOpen}
                >
                  <MenuGlyph open={isMobileMenuOpen} />
                </button>
              }
            />
          </div>
        </div>
      </header>

      {/* Dims the page under an open desktop panel: below the header, above floating widgets. */}
      <div
        aria-hidden="true"
        data-open={isDesktopPanelOpen}
        className="nav-scrim fixed inset-0 z-[48] hidden bg-black/45 lg:block"
      />

      {shouldMountSearch ? (
        <Suspense fallback={null}>
          <LazySiteSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
        </Suspense>
      ) : null}
    </>
  );
};

export default Navbar;

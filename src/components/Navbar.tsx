import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageComponent from '@/components/Image';
import PhoneLink from '@/components/PhoneLink';
import { cn } from '@/lib/utils';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import {
  DESKTOP_CORE_LINKS,
  DESKTOP_EXPANDED_LINKS,
  DESKTOP_MORE_LINKS,
  MOBILE_PRIMARY_LINKS,
  MOBILE_SECONDARY_LINKS,
  POPULAR_SERVICE_LINKS,
  SERVICE_SECTION_MATCHES,
  SERVICE_MENU_LINKS,
} from '@/constants/navigation';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const LazySiteSearch = lazy(() => import('@/components/search/SiteSearch'));

const DESKTOP_LINK_BASE_CLASS =
  'inline-flex h-10 items-center rounded-full px-2.5 text-[13px] font-medium transition-colors duration-200 xl:px-3 xl:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50';

const DESKTOP_ICON_BUTTON_CLASS =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/85 transition-colors duration-200 hover:bg-white/[0.11] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50';

const MOBILE_ICON_BUTTON_CLASS =
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white transition-colors duration-200 hover:bg-white/10 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50';

const MOBILE_LINK_BASE_CLASS =
  'block min-h-11 w-full rounded-xl px-3.5 py-3 text-[15px] font-medium leading-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50';

const matchesPath = (pathname: string, to: string) => pathname === to || pathname.startsWith(`${to}/`);

const Navbar = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shouldMountSearch, setShouldMountSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const isServicesSectionActive = useMemo(
    () => SERVICE_SECTION_MATCHES.some((path) => matchesPath(location.pathname, path)),
    [location.pathname],
  );
  const isDesktopMoreActive = useMemo(
    () => DESKTOP_MORE_LINKS.some((item) => matchesPath(location.pathname, item.to)),
    [location.pathname],
  );

  const prefetchSearch = useCallback(() => {
    import('@/components/search/SiteSearch').catch(() => undefined);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setShouldMountSearch(true);
    setIsSearchOpen(true);
    closeMobileMenu();
  }, [closeMobileMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileServicesOpen(false);
    }
  }, [isMobileMenuOpen]);

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

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl transition-[background-color,box-shadow] duration-300',
          scrolled ? 'bg-black shadow-[0_24px_42px_-30px_rgba(0,0,0,0.95)]' : 'bg-black',
        )}
      >
        <div className="mx-auto w-full max-w-[1380px] px-3 sm:px-5 lg:px-6">
          <div className="flex h-16 items-center gap-2 sm:h-[4.5rem] sm:gap-3">
            <Link
              to="/"
              className="group relative inline-flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-xl bg-gold/10 opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-100"
              />
              <ImageComponent
                src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png"
                alt="Exquisite Dentistry Logo"
                responsive
                logoType="main"
                priority
                className="relative h-6 w-auto max-w-[124px] object-contain transition-transform duration-200 ease-out group-hover:scale-[1.02] sm:h-7 sm:max-w-[154px] md:h-8 md:max-w-[182px] lg:h-7 lg:max-w-[148px] xl:h-8 xl:max-w-[176px] 2xl:h-9 2xl:max-w-[192px]"
                style={{ objectPosition: 'center' }}
              />
            </Link>

            <div className="ml-auto hidden min-w-0 items-center gap-1.5 lg:flex">
              <nav aria-label="Primary" className="min-w-0 items-center gap-0.5 xl:gap-1 lg:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        DESKTOP_LINK_BASE_CLASS,
                        'gap-1.5',
                        isServicesSectionActive
                          ? 'bg-white/10 text-gold'
                          : 'text-white/85 hover:bg-white/[0.07] hover:text-white',
                      )}
                      aria-label="Browse services"
                    >
                      Services
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={10}
                    className="w-[22rem] max-h-[min(70vh,34rem)] max-w-[calc(100vw-2rem)] overflow-y-auto border border-zinc-700/70 !bg-zinc-950/95 p-2.5 text-zinc-100 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md xl:w-[24rem] 2xl:w-[26rem]"
                  >
                    <div className="px-3 pb-2 pt-1">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                        Most Requested
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                        High-interest treatments patients ask about first.
                      </p>
                    </div>
                    {SERVICE_MENU_LINKS.map((item) => (
                      <DropdownMenuItem
                        key={item.to}
                        asChild
                        className="cursor-pointer rounded-xl p-0 text-white focus:bg-transparent focus:text-white data-[highlighted]:bg-transparent data-[highlighted]:text-white"
                      >
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => {
                            const isCurrent = item.to === '/services' ? isServicesSectionActive : isActive;

                            return cn(
                              'group flex w-full flex-col items-start gap-1.5 whitespace-normal rounded-xl border px-3.5 py-3 text-left transition-colors duration-150',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
                              isCurrent
                                ? 'border-gold/35 bg-gold/10 text-white'
                                : 'border-white/10 bg-white/[0.03] text-white/95 hover:border-white/25 hover:bg-white/[0.08]',
                            );
                          }}
                        >
                          <span className="text-[15px] font-semibold leading-tight text-white">
                            {item.label}
                          </span>
                          {item.description ? (
                            <span className="max-w-[34ch] text-[13px] leading-snug text-white/70 group-hover:text-white/90">
                              {item.description}
                            </span>
                          ) : null}
                        </NavLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {DESKTOP_CORE_LINKS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        DESKTOP_LINK_BASE_CLASS,
                        isActive
                          ? 'bg-white/10 text-gold'
                          : 'text-white/85 hover:bg-white/[0.07] hover:text-white',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                {DESKTOP_EXPANDED_LINKS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        DESKTOP_LINK_BASE_CLASS,
                        'hidden min-[1240px]:inline-flex',
                        isActive
                          ? 'bg-white/10 text-gold'
                          : 'text-white/85 hover:bg-white/[0.07] hover:text-white',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        DESKTOP_LINK_BASE_CLASS,
                        'gap-1 min-[1240px]:hidden',
                        isDesktopMoreActive
                          ? 'bg-white/10 text-gold'
                          : 'text-white/85 hover:bg-white/[0.07] hover:text-white',
                      )}
                      aria-label="More pages"
                    >
                      More
                      <ChevronDown size={14} aria-hidden="true" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-52 border border-white/10 bg-black/95 p-1.5 text-white shadow-xl"
                  >
                    {DESKTOP_MORE_LINKS.map((item) => (
                      <DropdownMenuItem
                        key={item.to}
                        asChild
                        className="cursor-pointer rounded-lg p-0 text-white focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                      >
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            cn(
                              'block w-full rounded-lg px-3 py-2 text-sm transition-colors',
                              isActive ? 'bg-white/10 text-gold' : 'text-white/90',
                            )
                          }
                        >
                          {item.label}
                        </NavLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>

              <div className="ml-1 flex shrink-0 items-center gap-1 lg:gap-1.5">
                <button
                  type="button"
                  onClick={openSearch}
                  onMouseEnter={prefetchSearch}
                  onFocus={prefetchSearch}
                  className={cn(
                    DESKTOP_ICON_BUTTON_CLASS,
                    'min-[1450px]:w-auto min-[1450px]:gap-2 min-[1450px]:px-3',
                  )}
                  aria-label="Search site"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden min-[1450px]:inline">Search</span>
                  <kbd className="hidden rounded bg-black/45 px-2 py-0.5 text-[10px] text-white/70 min-[1700px]:inline-flex">
                    ⌘K
                  </kbd>
                </button>

                <PhoneLink
                  phoneNumber={PHONE_NUMBER_DISPLAY}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-colors duration-200 hover:bg-gold/20 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 min-[1320px]:hidden"
                  aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </PhoneLink>

                <PhoneLink
                  phoneNumber={PHONE_NUMBER_DISPLAY}
                  className="hidden h-10 items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 text-sm font-semibold text-gold transition-colors duration-200 hover:bg-gold/20 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 min-[1320px]:inline-flex"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Call</span>
                </PhoneLink>

                <Button
                  size="sm"
                  asChild
                  className="h-10 rounded-full bg-gold px-3.5 text-sm font-semibold text-black hover:bg-gold/90 min-[1480px]:px-4"
                >
                  <Link to={SCHEDULE_CONSULTATION_PATH}>
                    <span className="min-[1480px]:hidden">Book</span>
                    <span className="hidden min-[1480px]:inline min-[1680px]:hidden">Book Now</span>
                    <span className="hidden min-[1680px]:inline">Schedule Consultation</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-1.5 lg:hidden">
              <Button
                size="sm"
                asChild
                className="hidden h-10 rounded-full bg-gold px-4 text-sm font-semibold text-black hover:bg-gold/90 sm:inline-flex"
              >
                <Link to={SCHEDULE_CONSULTATION_PATH}>Book</Link>
              </Button>

              <button
                type="button"
                onClick={openSearch}
                onMouseEnter={prefetchSearch}
                onFocus={prefetchSearch}
                className={MOBILE_ICON_BUTTON_CLASS}
                aria-label="Search site"
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </button>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className={MOBILE_ICON_BUTTON_CLASS}
                    aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isMobileMenuOpen}
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                    )}
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full max-w-none overflow-hidden border-l border-white/10 bg-zinc-950 p-0 text-white sm:w-[26rem] sm:max-w-none md:w-[30rem] [&>button]:right-4 [&>button]:top-4 [&>button]:inline-flex [&>button]:h-9 [&>button]:w-9 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/20 [&>button]:bg-black/65 [&>button]:text-white [&>button]:opacity-100"
                >
                  <div className="flex h-full flex-col bg-[radial-gradient(circle_at_88%_8%,rgba(212,175,55,0.14),transparent_42%),linear-gradient(to_bottom,rgba(24,24,27,0.98),rgba(9,9,11,0.98))]">
                    <div className="border-b border-white/10 px-5 pb-5 pt-6 sm:px-6">
                      <SheetTitle className="text-left text-base font-semibold text-white">Book Your Visit</SheetTitle>
                      <SheetDescription className="mt-1 text-left text-sm text-white/70">
                        New patients can schedule online in under a minute.
                      </SheetDescription>

                      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <Button
                          asChild
                          size="lg"
                          className="h-12 w-full rounded-full bg-gold text-sm font-semibold text-black hover:bg-gold/90"
                        >
                          <Link to={SCHEDULE_CONSULTATION_PATH} onClick={closeMobileMenu}>
                            Schedule Consultation
                          </Link>
                        </Button>

                        <PhoneLink
                          phoneNumber={PHONE_NUMBER_DISPLAY}
                          onClick={closeMobileMenu}
                          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                        >
                          <Phone className="h-4 w-4" aria-hidden="true" />
                          <span>{`Call ${PHONE_NUMBER_DISPLAY}`}</span>
                        </PhoneLink>
                      </div>
                    </div>

                    <nav
                      className="flex flex-1 flex-col items-stretch justify-start overflow-y-auto px-4 pb-6 pt-4 sm:px-5"
                      aria-label="Mobile"
                    >
                      <ul className="space-y-1.5">
                        {MOBILE_PRIMARY_LINKS.map((item) => (
                          <li key={item.to}>
                            <NavLink
                              to={item.to}
                              onClick={closeMobileMenu}
                              className={({ isActive }) => {
                                const isCurrent = item.to === '/services' ? isServicesSectionActive : isActive;

                                return cn(
                                  MOBILE_LINK_BASE_CLASS,
                                  isCurrent
                                    ? 'border border-white/15 bg-white/10 text-gold'
                                    : 'text-white/90 hover:bg-white/[0.08] hover:text-white',
                                );
                              }}
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.03] p-2.5">
                        <button
                          type="button"
                          onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                          className="flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                          aria-expanded={isMobileServicesOpen}
                          aria-controls="mobile-service-links"
                        >
                          <span>Popular Services</span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-200',
                              isMobileServicesOpen ? 'rotate-180 text-gold' : 'text-white/70',
                            )}
                            aria-hidden="true"
                          />
                        </button>

                        {isMobileServicesOpen ? (
                          <ul id="mobile-service-links" className="mt-2 space-y-1.5 pb-1">
                            {POPULAR_SERVICE_LINKS.map((item) => (
                              <li key={item.to}>
                                <NavLink
                                  to={item.to}
                                  onClick={closeMobileMenu}
                                  className={({ isActive }) =>
                                    cn(
                                      'block w-full rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
                                      isActive
                                        ? 'bg-white/10 text-gold'
                                        : 'text-white/85 hover:bg-white/10 hover:text-white',
                                    )
                                  }
                                >
                                  {item.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>

                      <div className="mt-6 border-t border-white/10 pt-4">
                        <p className="px-3.5 text-[11px] uppercase tracking-[0.18em] text-white/45">
                          More Resources
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {MOBILE_SECONDARY_LINKS.map((item) => (
                            <li key={item.to}>
                              <NavLink
                                to={item.to}
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                  cn(
                                    'block w-full rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
                                    isActive
                                      ? 'bg-white/[0.08] text-gold'
                                      : 'text-white/75 hover:bg-white/[0.07] hover:text-white',
                                  )
                                }
                              >
                                {item.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {shouldMountSearch ? (
        <Suspense fallback={null}>
          <LazySiteSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
        </Suspense>
      ) : null}
    </>
  );
};

export default Navbar;

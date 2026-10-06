import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, ChevronDown, Phone, Search } from 'lucide-react';
import ImageComponent from '@/components/Image';
import OfficeStatus from '@/components/OfficeStatus';
import OpenInMapsButton from '@/components/OpenInMapsButton';
import PhoneLink from '@/components/PhoneLink';
import { cn } from '@/lib/utils';
import { ADDRESS, PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import {
  ALL_SERVICES_LINK,
  MOBILE_PRIMARY_LINKS,
  MOBILE_SECONDARY_LINKS,
  SERVICE_GROUPS,
  isServicesPath,
} from '@/constants/navigation';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { OFFICE_HOURS_SHORT } from '@/utils/officeHours';
import MenuGlyph from './MenuGlyph';

const LOGO_SRC = '/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png';

const FOCUS_RING = 'focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-champagne/70';

const PRIMARY_ROW_CLASS = cn(
  'block w-full py-3.5 text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-200 sm:text-2xl',
  'rounded-lg',
  FOCUS_RING,
);

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
  trigger: React.ReactNode;
  onSearch: () => void;
  onSearchIntent: () => void;
  onBookClick: (source: string, ctaText: string) => void;
}

const stagger = (index: number) => ({ '--i': index }) as React.CSSProperties;

/**
 * The phone/tablet menu: a full-screen sheet on phones, a right-hand panel on
 * tablets. Radix Dialog provides the focus trap, Escape, scroll lock and
 * focus return; it renders at z-110 so it covers the Cherry pill (z-45), the reading-progress hairline (z-60) and the consent banner (z-100) — Radix makes everything outside the dialog non-interactive, so nothing may sit on top of it.
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onOpenChange,
  pathname,
  trigger,
  onSearch,
  onSearchIntent,
  onBookClick,
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [glyphOpen, setGlyphOpen] = useState(false);
  const skipFocusReturn = useRef(false);
  const servicesActive = isServicesPath(pathname);

  useEffect(() => {
    if (!open) {
      setServicesOpen(false);
      setGlyphOpen(false);
      return;
    }
    // Let the close glyph start as a hamburger, then fold into an X.
    const frame = window.requestAnimationFrame(() => setGlyphOpen(true));
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const close = () => onOpenChange(false);

  const handleSearch = () => {
    // Search opens its own dialog; don't let this one pull focus back to the trigger.
    skipFocusReturn.current = true;
    onSearch();
  };

  let order = 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="nav-overlay fixed inset-0 z-[110] bg-black/60 backdrop-blur-[3px]" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            if (skipFocusReturn.current) {
              event.preventDefault();
              skipFocusReturn.current = false;
            }
          }}
          className={cn(
            'nav-sheet fixed inset-0 z-[110] flex flex-col overflow-hidden bg-[#0b0a09] text-white outline-none',
            'sm:left-auto sm:w-[28rem] sm:max-w-full sm:border-l sm:border-white/10 sm:shadow-[-40px_0_80px_-40px_rgba(0,0,0,0.9)]',
            'pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] sm:pl-0',
          )}
        >
          {/* Soft champagne light in the corner, painted (no blur layers). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_100%_0%,rgba(214,186,140,0.12),transparent_60%)]"
          />

          {/* Top bar mirrors the site header so the hamburger folds into this X in place. */}
          <div className="relative flex min-h-16 shrink-0 items-center justify-between gap-3 px-3 pt-[env(safe-area-inset-top)] min-[360px]:px-4 sm:px-6">
            <Dialog.Title className="sr-only">Site menu</Dialog.Title>
            <Link
              to="/"
              onClick={close}
              className={cn('inline-flex min-h-11 items-center rounded-md sm:hidden', FOCUS_RING)}
            >
              <ImageComponent
                src={LOGO_SRC}
                alt="Exquisite Dentistry home"
                logoType="main"
                className="block h-auto w-[112px] object-contain min-[360px]:w-[124px]"
              />
            </Link>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne/80 sm:inline">
              Menu
            </span>
            <Dialog.Close
              className={cn(
                'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10',
                FOCUS_RING,
              )}
              aria-label="Close navigation menu"
            >
              <MenuGlyph open={glyphOpen} />
            </Dialog.Close>
          </div>

          <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 min-[360px]:px-5 sm:px-6">
            <button
              type="button"
              onClick={handleSearch}
              onPointerEnter={onSearchIntent}
              onFocus={onSearchIntent}
              aria-label="Search site"
              className={cn(
                'nav-stagger mt-1 flex min-h-12 w-full items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-4 text-left text-[15px] text-white/55 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white/80',
                FOCUS_RING,
              )}
              style={stagger(order++)}
            >
              <Search className="h-[18px] w-[18px] shrink-0 text-champagne/90" aria-hidden="true" />
              <span className="min-w-0 truncate">Search treatments and pages</span>
            </button>

            <nav aria-label="Mobile" className="mt-4 flex flex-col items-stretch justify-start">
              <ul className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
                <li className="nav-stagger" style={stagger(order++)}>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((value) => !value)}
                    aria-expanded={servicesOpen}
                    aria-controls="mobile-service-links"
                    className={cn(
                      PRIMARY_ROW_CLASS,
                      'flex items-center justify-between gap-3 text-left',
                      servicesActive ? 'text-champagne' : 'text-white',
                    )}
                  >
                    <span>Services</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                        servicesOpen ? 'rotate-180 bg-white/10' : '',
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {servicesOpen ? (
                    <div id="mobile-service-links" className="pb-5 pt-1">
                      <NavLink
                        to={ALL_SERVICES_LINK.to}
                        onClick={close}
                        className={({ isActive }) =>
                          cn(
                            'nav-expand-item group flex min-h-11 items-center gap-2 rounded-lg text-[15px] font-semibold',
                            isActive ? 'text-champagne' : 'text-white',
                            FOCUS_RING,
                          )
                        }
                        style={stagger(0)}
                      >
                        {ALL_SERVICES_LINK.label}
                        <ArrowRight className="h-4 w-4 text-champagne/80" aria-hidden="true" />
                      </NavLink>
                      <div className="mt-2 grid gap-x-6 gap-y-4 min-[480px]:grid-cols-2 sm:grid-cols-1">
                        {SERVICE_GROUPS.map((group, groupIndex) => (
                          <div key={group.id}>
                            <p
                              className="nav-expand-item flex items-center gap-2.5 pt-2 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-champagne/80"
                              style={stagger(1 + groupIndex * 5)}
                            >
                              <span aria-hidden="true" className="h-px w-4 bg-champagne/50" />
                              {group.title}
                            </p>
                            <ul className="mt-1">
                              {group.items.map((item, itemIndex) => (
                                <li
                                  key={item.to}
                                  className="nav-expand-item"
                                  style={stagger(2 + groupIndex * 5 + itemIndex)}
                                >
                                  <NavLink
                                    to={item.to}
                                    onClick={close}
                                    className={({ isActive }) =>
                                      cn(
                                        'flex min-h-11 items-center rounded-lg text-[15px] transition-colors duration-200',
                                        isActive ? 'font-semibold text-champagne' : 'text-white/80 hover:text-white',
                                        FOCUS_RING,
                                      )
                                    }
                                  >
                                    {item.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>

                {MOBILE_PRIMARY_LINKS.map((item) => (
                  <li key={item.to} className="nav-stagger" style={stagger(order++)}>
                    <NavLink
                      to={item.to}
                      onClick={close}
                      className={({ isActive }) =>
                        cn(PRIMARY_ROW_CLASS, isActive ? 'text-champagne' : 'text-white hover:text-champagne')
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <ul className="nav-stagger mt-4 grid grid-cols-2 gap-x-4" style={stagger(order++)}>
                {MOBILE_SECONDARY_LINKS.map((item) => (
                  <li key={item.to} className="min-w-0">
                    <NavLink
                      to={item.to}
                      onClick={close}
                      className={({ isActive }) =>
                        cn(
                          'flex min-h-11 items-center rounded-lg text-[14px] font-medium leading-snug transition-colors duration-200',
                          isActive ? 'text-champagne' : 'text-white/60 hover:text-white',
                          FOCUS_RING,
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="nav-stagger mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              style={stagger(order++)}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne/80">Visit</p>
              <p className="mt-2 text-[15px] leading-snug text-white/85">{ADDRESS}</p>
              <p className="mt-1 text-[13px] text-white/55">Near Beverly Hills · {OFFICE_HOURS_SHORT}</p>
              <p className="mt-1 text-[13px] tabular-nums text-white/55">{PHONE_NUMBER_DISPLAY}</p>
              <OpenInMapsButton
                source="mobile_menu"
                className="mt-3 min-h-11 rounded-full border-white/20 px-4 !text-white hover:!bg-white/10 hover:!text-white"
              />
            </div>
          </div>

          {/* Pinned booking actions: always in reach, whatever the scroll. */}
          <div className="relative shrink-0 border-t border-white/10 bg-[#0e0d0c]/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3.5 min-[360px]:px-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 [@media(max-height:480px)]:hidden">
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-white">Book Your Visit</p>
              <OfficeStatus className="text-[12px]" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 [@media(max-height:480px)]:mt-0">
              <Link
                to={SCHEDULE_CONSULTATION_PATH}
                onClick={() => {
                  onBookClick('mobile_menu_schedule_button', 'Schedule Consultation');
                  close();
                }}
                className={cn(
                  'group inline-flex min-h-12 min-w-0 flex-[1_1_10rem] items-center justify-center gap-2 whitespace-normal rounded-full bg-gold px-4 py-3 text-center text-[14px] font-semibold text-white [overflow-wrap:anywhere] min-[360px]:px-5 min-[360px]:text-[15px]',
                  'focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                )}
              >
                Schedule Consultation
                <ArrowRight
                  className="hidden h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none min-[360px]:block"
                  aria-hidden="true"
                />
              </Link>
              <PhoneLink
                phoneNumber={PHONE_NUMBER_DISPLAY}
                analyticsSource="mobile_menu"
                onClick={close}
                aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
                className={cn(
                  'min-h-12 min-w-12 flex-[0_0_auto] justify-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/[0.1] min-[360px]:px-5',
                  FOCUS_RING,
                )}
              >
                <Phone className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                <span className="hidden min-[360px]:inline">Call</span>
              </PhoneLink>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MobileMenu;

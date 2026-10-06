import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DESKTOP_MORE_GROUPS,
  DESKTOP_PRIMARY_LINKS,
  isMorePath,
  isServicesPath,
  matchesPath,
} from '@/constants/navigation';
import ServicesMegaPanel from './ServicesMegaPanel';

type PanelId = 'services' | 'more';

/** useLayoutEffect on the client, useEffect under the prerender's renderToString (which warns on layout effects). */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const HOVER_OPEN_DELAY = 140;
const HOVER_CLOSE_DELAY = 240;
/** A click this soon after a hover-open keeps the panel open instead of toggling it shut. */
const HOVER_CLICK_GRACE = 600;

const ITEM_CLASS =
  'relative inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-[13px] font-medium tracking-[0.01em] transition-colors duration-200 xl:px-3.5 xl:text-[13.5px] 2xl:px-4 focus-visible:!outline-none focus-visible:ring-1 focus-visible:ring-champagne/70';

const itemTone = (highlighted: boolean) => (highlighted ? 'text-white' : 'text-white/70 hover:text-white');

interface DesktopNavProps {
  pathname: string;
  onBookClick: (source: string, ctaText: string) => void;
  /** Lets the header render the page scrim outside its own stacking context. */
  onPanelOpenChange?: (open: boolean) => void;
}

/**
 * Centered desktop navigation: Services (mega menu) · links · More, with a
 * gold hairline that glides to whichever item is hovered, focused or current.
 * Disclosure pattern (button + aria-expanded/controls), not role="menu".
 */
const DesktopNav: React.FC<DesktopNavProps> = ({ pathname, onBookClick, onPanelOpenChange }) => {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const triggerRefs = useRef(new Map<PanelId, HTMLButtonElement>());
  const openTimer = useRef<number>();
  const closeTimer = useRef<number>();
  const hoverOpenedAt = useRef(0);
  /** Set while a pointer press is inside the nav, so a blur to <body> it causes isn't treated as leaving. */
  const pointerInside = useRef(false);

  const [openPanel, setOpenPanel] = useState<PanelId | null>(null);
  const openPanelRef = useRef<PanelId | null>(null);
  openPanelRef.current = openPanel;
  const [mounted, setMounted] = useState<Record<PanelId, boolean>>({ services: false, more: false });
  const [pointerId, setPointerId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);

  const servicesActive = isServicesPath(pathname);
  const moreActive = isMorePath(pathname);
  const activeId = servicesActive
    ? 'services'
    : moreActive
      ? 'more'
      : DESKTOP_PRIMARY_LINKS.find((item) => matchesPath(pathname, item.to))?.to ?? null;

  const clearTimers = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  const open = useCallback((id: PanelId) => {
    setMounted((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
    setOpenPanel(id);
  }, []);

  const close = useCallback(
    (returnFocus = false) => {
      clearTimers();
      const current = openPanelRef.current;
      if (current && returnFocus) triggerRefs.current.get(current)?.focus();
      setOpenPanel(null);
    },
    [clearTimers],
  );

  const scheduleOpen = useCallback(
    (id: PanelId) => {
      clearTimers();
      // Warm the panel (and its image) as soon as intent shows.
      setMounted((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
      openTimer.current = window.setTimeout(
        () => {
          hoverOpenedAt.current = Date.now();
          open(id);
        },
        openPanel ? 0 : HOVER_OPEN_DELAY,
      );
    },
    [clearTimers, open, openPanel],
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpenPanel(null), HOVER_CLOSE_DELAY);
  }, [clearTimers]);

  const handleTriggerClick = (id: PanelId) => {
    clearTimers();
    if (openPanel === id) {
      if (Date.now() - hoverOpenedAt.current < HOVER_CLICK_GRACE) return;
      setOpenPanel(null);
      return;
    }
    hoverOpenedAt.current = 0;
    open(id);
  };

  const focusFirstInPanel = (id: PanelId) => {
    window.requestAnimationFrame(() => {
      const panel = document.getElementById(`nav-panel-${id}`);
      panel?.querySelector<HTMLElement>('a[href], button')?.focus();
    });
  };

  const handleTriggerKeyDown = (id: PanelId) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      open(id);
      focusFirstInPanel(id);
    }
  };

  // Escape closes and returns focus; arrow keys move between links inside a panel.
  const handleNavKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape' && openPanel) {
      event.preventDefault();
      close(true);
      return;
    }
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && openPanel) {
      const panel = document.getElementById(`nav-panel-${openPanel}`);
      if (!panel || !panel.contains(event.target as Node)) return;
      const links = Array.from(panel.querySelectorAll<HTMLElement>('a[href]'));
      const index = links.indexOf(event.target as HTMLElement);
      if (index === -1) return;
      event.preventDefault();
      const next = event.key === 'ArrowDown' ? index + 1 : index - 1;
      if (next < 0) triggerRefs.current.get(openPanel)?.focus();
      else links[Math.min(next, links.length - 1)]?.focus();
    }
  };

  // Close when focus leaves the navigation entirely.
  const handleNavBlur = (event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && navRef.current?.contains(next)) return;
    // Pressing a non-focusable spot inside an open panel (photo, heading, padding)
    // moves focus to <body>; that is not leaving the navigation.
    if (!next && pointerInside.current) return;
    setFocusId(null);
    if (openPanel) setOpenPanel(null);
  };

  // Outside pointer closes.
  useEffect(() => {
    if (!openPanel) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current?.contains(event.target as Node)) return;
      close();
    };
    // Escape still closes after a press on a blank spot moved focus out to <body>
    // (the nav's own handler covers focus inside it and marks the event handled).
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      close(true);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openPanel, close]);

  // Navigation closes any open panel.
  useEffect(() => {
    close();
    setPointerId(null);
  }, [pathname, close]);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    onPanelOpenChange?.(openPanel !== null);
  }, [openPanel, onPanelOpenChange]);

  // ---- Gliding hairline -------------------------------------------------------
  const indicatorTarget = pointerId ?? focusId ?? openPanel ?? activeId;
  const indicatorShown = useRef(false);

  const placeIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    const item = indicatorTarget ? itemRefs.current.get(indicatorTarget) : undefined;
    const container = indicator.offsetParent as HTMLElement | null;
    const label = item?.querySelector<HTMLElement>('[data-nav-label]');
    if (!item || !container || !label) {
      indicator.style.opacity = '0';
      indicatorShown.current = false;
      return;
    }
    const base = container.getBoundingClientRect();
    const rect = label.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const x = rect.left - base.left;
    const y = itemRect.bottom - base.top - 7;
    const transform = `translate3d(${x}px, ${y}px, 0) scaleX(${rect.width / 100})`;
    if (!indicatorShown.current) {
      // Appear in place rather than flying in from the last spot.
      indicator.style.transition = 'none';
      indicator.style.transform = transform;
      void indicator.offsetWidth;
      indicator.style.transition = '';
    } else {
      indicator.style.transform = transform;
    }
    indicator.style.opacity = '1';
    indicatorShown.current = true;
  }, [indicatorTarget]);

  useIsomorphicLayoutEffect(() => {
    placeIndicator();
  }, [placeIndicator]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => placeIndicator());
    observer.observe(nav);
    // The centred header grid can move the nav without resizing it.
    window.addEventListener('resize', placeIndicator);
    document.fonts?.ready.then(() => placeIndicator()).catch(() => undefined);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', placeIndicator);
    };
  }, [placeIndicator]);

  const registerItem = (id: string) => (node: HTMLElement | null) => {
    if (node) itemRefs.current.set(id, node);
    else itemRefs.current.delete(id);
  };

  const registerTrigger = (id: PanelId) => (node: HTMLButtonElement | null) => {
    registerItem(id)(node);
    if (node) triggerRefs.current.set(id, node);
    else triggerRefs.current.delete(id);
  };

  const pointerHandlers = (id: string, panel?: PanelId) => ({
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      setPointerId(id);
      if (panel) scheduleOpen(panel);
      else if (openPanel) scheduleClose();
    },
    onPointerLeave: (event: React.PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      if (panel) scheduleClose();
    },
    onFocus: () => setFocusId(id),
  });

  const panelPointerHandlers = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType === 'mouse') clearTimers();
    },
    onPointerLeave: (event: React.PointerEvent) => {
      if (event.pointerType === 'mouse') scheduleClose();
    },
  };

  return (
      <nav
        ref={navRef}
        aria-label="Primary"
        className="flex min-w-0 items-center justify-center"
        onKeyDown={handleNavKeyDown}
        onBlur={handleNavBlur}
        onPointerDownCapture={() => {
          pointerInside.current = true;
          window.setTimeout(() => {
            pointerInside.current = false;
          }, 0);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setPointerId(null);
        }}
      >
        <ul className="flex items-center xl:gap-1">
          <li>
            <button
              ref={registerTrigger('services')}
              type="button"
              aria-label="Browse services"
              aria-expanded={openPanel === 'services'}
              aria-controls="nav-panel-services"
              onClick={() => handleTriggerClick('services')}
              onKeyDown={handleTriggerKeyDown('services')}
              {...pointerHandlers('services', 'services')}
              className={cn(ITEM_CLASS, itemTone(servicesActive || openPanel === 'services'))}
            >
              <span data-nav-label>Services</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 opacity-70 transition-transform duration-300 motion-reduce:transition-none',
                  openPanel === 'services' && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id="nav-panel-services"
              data-open={openPanel === 'services'}
              className="nav-panel absolute inset-x-0 top-full max-h-[calc(100vh-108px)] overflow-y-auto overscroll-contain border-b border-t border-white/[0.07] bg-[rgba(10,9,8,0.965)] shadow-[0_48px_96px_-48px_rgba(0,0,0,0.95)] backdrop-blur-2xl backdrop-saturate-150"
              {...panelPointerHandlers}
            >
              {mounted.services ? (
                <ServicesMegaPanel pathname={pathname} onBookClick={onBookClick} />
              ) : null}
            </div>
          </li>

          {DESKTOP_PRIMARY_LINKS.map((item) => (
            <li key={item.to}>
              <NavLink
                ref={registerItem(item.to)}
                to={item.to}
                {...pointerHandlers(item.to)}
                className={({ isActive }) => cn(ITEM_CLASS, itemTone(isActive))}
              >
                <span data-nav-label>{item.label}</span>
              </NavLink>
            </li>
          ))}

          <li className="relative">
            <button
              ref={registerTrigger('more')}
              type="button"
              aria-label="More pages"
              aria-expanded={openPanel === 'more'}
              aria-controls="nav-panel-more"
              onClick={() => handleTriggerClick('more')}
              onKeyDown={handleTriggerKeyDown('more')}
              {...pointerHandlers('more', 'more')}
              className={cn(ITEM_CLASS, itemTone(moreActive || openPanel === 'more'))}
            >
              <span data-nav-label>More</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 opacity-70 transition-transform duration-300 motion-reduce:transition-none',
                  openPanel === 'more' && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id="nav-panel-more"
              data-open={openPanel === 'more'}
              className="nav-panel absolute -right-3 top-[calc(100%+16px)] w-[30rem] rounded-2xl border border-white/10 bg-[rgba(12,11,10,0.96)] shadow-[0_40px_80px_-32px_rgba(0,0,0,0.95)] backdrop-blur-2xl backdrop-saturate-150"
              {...panelPointerHandlers}
            >
              {/* Invisible bridge so the pointer can travel from the trigger to the panel. */}
              <span aria-hidden="true" className="absolute inset-x-0 -top-4 h-4" />
              {mounted.more ? (
                <div className="grid grid-cols-2 gap-x-2 p-3">
                  {DESKTOP_MORE_GROUPS.map((group, groupIndex) => (
                    <div role="group" key={group.id} aria-labelledby={`nav-more-${group.id}`} className="min-w-0">
                      <p
                        id={`nav-more-${group.id}`}
                        className="nav-panel-item px-3 pb-1.5 pt-2 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-champagne/80"
                        style={{ '--i': groupIndex * 5 } as React.CSSProperties}
                      >
                        {group.title}
                      </p>
                      <ul>
                        {group.items.map((item, index) => (
                          <li
                            key={item.to}
                            className="nav-panel-item"
                            style={{ '--i': groupIndex * 5 + index + 1 } as React.CSSProperties}
                          >
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                cn(
                                  'group flex min-h-10 items-center justify-between gap-2 rounded-xl px-3 text-[14px] font-medium transition-colors duration-200 focus-visible:!outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-champagne/70',
                                  isActive
                                    ? 'bg-white/[0.07] text-champagne'
                                    : 'text-white/80 hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.06] focus-visible:text-white',
                                )
                              }
                            >
                              <span className="min-w-0">{item.label}</span>
                              <ArrowRight
                                className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-60 group-focus-visible:translate-x-0 group-focus-visible:opacity-60 motion-reduce:transition-none"
                                aria-hidden="true"
                              />
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        </ul>

        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="nav-indicator pointer-events-none absolute left-0 top-0 block h-px w-[100px] bg-[linear-gradient(90deg,transparent,hsl(39_48%_72%)_18%,hsl(39_48%_72%)_82%,transparent)] opacity-0"
        />
      </nav>
  );
};

export default DesktopNav;

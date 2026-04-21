import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  CherryWidgetContext,
  type CherryWidgetStatus,
  type CherryWidgetContextValue,
} from '@/components/cherry-widget-context';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  CHERRY_WIDGET_CONTAINER_ID,
  CHERRY_WIDGET_FONT_HREF,
  CHERRY_WIDGET_FONT_LINK_ID,
  CHERRY_WIDGET_MOUNT_ID,
  CHERRY_WIDGET_SCRIPT_ID,
  CHERRY_WIDGET_SCRIPT_SRC,
  CHERRY_WIDGET_SUPPORT_CONTAINER_IDS,
  createCherryWidgetConfig,
} from '@/constants/cherry';

const CHERRY_WIDGET_HIDE_TRANSITION = 'opacity 180ms ease, visibility 180ms ease' as const;
const CHERRY_WIDGET_Z_INDEX = '45' as const;
const CHERRY_WIDGET_COMPACT_BREAKPOINT = 640;
const CHERRY_WIDGET_COLLAPSED_BREAKPOINT = 480;

const setImportantStyle = (target: HTMLElement, property: string, value: string) => {
  target.style.setProperty(property, value, 'important');
};

const ensureFontLink = () => {
  if (document.getElementById(CHERRY_WIDGET_FONT_LINK_ID)) return;

  const link = document.createElement('link');
  link.id = CHERRY_WIDGET_FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = CHERRY_WIDGET_FONT_HREF;
  document.head.appendChild(link);
};

const resetWidgetContainers = () => {
  [CHERRY_WIDGET_CONTAINER_ID, ...CHERRY_WIDGET_SUPPORT_CONTAINER_IDS].forEach((containerId) => {
    document.getElementById(containerId)?.replaceChildren();
  });

  document.querySelectorAll(`[id="${CHERRY_WIDGET_MOUNT_ID}"]`).forEach((node) => node.remove());
};

const resetCherryRuntime = () => {
  resetWidgetContainers();
  document.getElementById(CHERRY_WIDGET_SCRIPT_ID)?.remove();
  window._hw = undefined;
  window._hw_widgets = [];
  window._hw_shared_layout = null;
  window._hw_global_config = undefined;
  window._hw_floating_config = undefined;
  window.__cherryWidgetInitQueued = false;
  window['loaded-_hw'] = false;
};

const applyFloatingWidgetStyles = (isMobile: boolean) => {
  const mounts = Array.from(
    document.querySelectorAll<HTMLElement>(`[id="${CHERRY_WIDGET_MOUNT_ID}"]`),
  );
  const viewportWidth = window.innerWidth;
  const isCompactLayout = viewportWidth <= CHERRY_WIDGET_COMPACT_BREAKPOINT;
  const isCollapsedLayout = viewportWidth <= CHERRY_WIDGET_COLLAPSED_BREAKPOINT;

  mounts.slice(0, -1).forEach((mount) => mount.remove());

  const rightOffset = isMobile ? '16px' : '24px';
  const bottomOffset = isMobile ? 'calc(env(safe-area-inset-bottom, 0px) + 16px)' : '24px';
  const floatingButtonMaxWidth = isCollapsedLayout
    ? 'calc(100vw - 32px)'
    : isCompactLayout
      ? 'min(280px, calc(100vw - 32px))'
      : 'min(320px, calc(100vw - 48px))';

  const styleTargets = [
    ...mounts.slice(-1),
    ...Array.from(
      document.querySelectorAll<HTMLElement>('[class*="floatingEstimator-floatingContainer"]'),
    ),
  ];

  styleTargets.forEach((target) => {
    setImportantStyle(target, 'position', 'fixed');
    setImportantStyle(target, 'left', 'auto');
    setImportantStyle(target, 'right', rightOffset);
    setImportantStyle(target, 'top', 'auto');
    setImportantStyle(target, 'bottom', bottomOffset);
    setImportantStyle(target, 'inset', `auto ${rightOffset} ${bottomOffset} auto`);
    setImportantStyle(target, 'z-index', CHERRY_WIDGET_Z_INDEX);
    setImportantStyle(target, 'visibility', 'visible');
    setImportantStyle(target, 'opacity', '1');
    setImportantStyle(target, 'pointer-events', 'auto');
    setImportantStyle(target, 'margin', '0');
    setImportantStyle(target, 'transform', 'translate3d(0, 0, 0)');
    setImportantStyle(target, 'transition', CHERRY_WIDGET_HIDE_TRANSITION);
    setImportantStyle(target, 'overflow', 'visible');
    setImportantStyle(target, 'max-width', isMobile ? 'calc(100vw - 32px)' : 'max-content');
  });

  const queryUnique = (selector: string) =>
    Array.from(new Set(Array.from(document.querySelectorAll<HTMLElement>(selector))));

  const floatingButtons = queryUnique(
    `[id="${CHERRY_WIDGET_MOUNT_ID}"] [class*="floatingEstimator-floatingButton"], [class*="floatingEstimator-floatingContainer"] [class*="floatingEstimator-floatingButton"]`,
  );
  const buttonContents = queryUnique(
    `[id="${CHERRY_WIDGET_MOUNT_ID}"] [class*="floatingEstimator-buttonContent-"], [class*="floatingEstimator-floatingContainer"] [class*="floatingEstimator-buttonContent-"]`,
  );
  const iconContainers = queryUnique(
    `[id="${CHERRY_WIDGET_MOUNT_ID}"] [class*="floatingEstimator-iconContainer-"], [class*="floatingEstimator-floatingContainer"] [class*="floatingEstimator-iconContainer-"]`,
  );
  const textContainers = queryUnique(
    `[id="${CHERRY_WIDGET_MOUNT_ID}"] [class*="floatingEstimator-buttonTextContainer-"], [class*="floatingEstimator-floatingContainer"] [class*="floatingEstimator-buttonTextContainer-"]`,
  );
  const titleElements = queryUnique(
    `[id="${CHERRY_WIDGET_MOUNT_ID}"] [class*="floatingEstimator-buttonText-"], [class*="floatingEstimator-floatingContainer"] [class*="floatingEstimator-buttonText-"]`,
  );
  const subtextElements = queryUnique(
    `[id="${CHERRY_WIDGET_MOUNT_ID}"] [class*="floatingEstimator-buttonSubtext-"], [class*="floatingEstimator-floatingContainer"] [class*="floatingEstimator-buttonSubtext-"]`,
  );
  const desktopValueProps = queryUnique(
    `[id="${CHERRY_WIDGET_MOUNT_ID}"] [class*="floatingEstimator-desktopValueProps-"], [class*="floatingEstimator-floatingContainer"] [class*="floatingEstimator-desktopValueProps-"]`,
  );
  const mobileValueProps = queryUnique(
    `[id="${CHERRY_WIDGET_MOUNT_ID}"] [class*="floatingEstimator-mobileValueProp-"], [class*="floatingEstimator-floatingContainer"] [class*="floatingEstimator-mobileValueProp-"]`,
  );

  floatingButtons.forEach((target) => {
    setImportantStyle(target, 'width', 'auto');
    setImportantStyle(target, 'max-width', floatingButtonMaxWidth);
    setImportantStyle(target, 'min-width', '0');
    setImportantStyle(target, 'overflow', 'hidden');
  });

  buttonContents.forEach((target) => {
    setImportantStyle(target, 'display', 'flex');
    setImportantStyle(target, 'align-items', 'center');
    setImportantStyle(target, 'flex-wrap', 'nowrap');
    setImportantStyle(target, 'min-width', '0');
    setImportantStyle(target, 'max-width', '100%');
  });

  iconContainers.forEach((target) => {
    setImportantStyle(target, 'flex', '0 0 auto');
  });

  textContainers.forEach((target) => {
    setImportantStyle(target, 'display', 'flex');
    setImportantStyle(target, 'flex-direction', 'column');
    setImportantStyle(target, 'flex', '1 1 auto');
    setImportantStyle(target, 'min-width', '0');
    setImportantStyle(target, 'max-width', '100%');
    setImportantStyle(target, 'overflow', 'hidden');
  });

  titleElements.forEach((target) => {
    setImportantStyle(target, 'display', 'block');
    setImportantStyle(target, 'min-width', '0');
    setImportantStyle(target, 'max-width', '100%');
    setImportantStyle(target, 'overflow', 'hidden');
    setImportantStyle(target, 'white-space', 'nowrap');
    setImportantStyle(target, 'text-overflow', 'ellipsis');
  });

  subtextElements.forEach((target) => {
    setImportantStyle(target, 'min-width', '0');
    setImportantStyle(target, 'max-width', '100%');
    setImportantStyle(target, 'overflow', 'hidden');
    setImportantStyle(target, 'white-space', 'nowrap');
    setImportantStyle(target, 'text-overflow', 'ellipsis');
    setImportantStyle(target, 'display', isCollapsedLayout ? 'none' : 'block');
  });

  desktopValueProps.forEach((target) => {
    setImportantStyle(target, 'min-width', '0');
    setImportantStyle(target, 'max-width', '100%');
    setImportantStyle(target, 'overflow', 'hidden');
    setImportantStyle(target, 'white-space', 'nowrap');
    setImportantStyle(target, 'text-overflow', 'ellipsis');
    setImportantStyle(target, 'display', isCompactLayout ? 'none' : 'inline');
  });

  mobileValueProps.forEach((target) => {
    setImportantStyle(target, 'min-width', '0');
    setImportantStyle(target, 'max-width', '100%');
    setImportantStyle(target, 'overflow', 'hidden');
    setImportantStyle(target, 'white-space', 'nowrap');
    setImportantStyle(target, 'text-overflow', 'ellipsis');
    setImportantStyle(target, 'display', isCompactLayout && !isCollapsedLayout ? 'inline' : 'none');
  });
};

const createCherryQueue = () => {
  const cherryQueue = ((...args: unknown[]) => {
    cherryQueue.q = cherryQueue.q || [];
    cherryQueue.q.push(args);
  }) as NonNullable<typeof window._hw>;

  cherryQueue.q = cherryQueue.q || [];

  return cherryQueue;
};

export const CherryWidgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();
  const [status, setStatus] = useState<CherryWidgetStatus>('idle');
  const [activeWidgetIds, setActiveWidgetIds] = useState<Set<string>>(() => new Set());
  const teardownTimerRef = useRef<number | null>(null);
  const syncFrameRef = useRef<number | null>(null);
  const isMobileRef = useRef(isMobile);

  const hasActiveWidgets = activeWidgetIds.size > 0;

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  const registerWidget = useCallback((id: string) => {
    setActiveWidgetIds((currentIds) => {
      if (currentIds.has(id)) return currentIds;

      const nextIds = new Set(currentIds);
      nextIds.add(id);
      return nextIds;
    });
  }, []);

  const unregisterWidget = useCallback((id: string) => {
    setActiveWidgetIds((currentIds) => {
      if (!currentIds.has(id)) return currentIds;

      const nextIds = new Set(currentIds);
      nextIds.delete(id);
      return nextIds;
    });
  }, []);

  const syncFloatingWidgetStyles = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (syncFrameRef.current !== null) {
      window.cancelAnimationFrame(syncFrameRef.current);
    }

    syncFrameRef.current = window.requestAnimationFrame(() => {
      applyFloatingWidgetStyles(isMobileRef.current);
      syncFrameRef.current = null;
    });
  }, []);

  const renderWidget = useCallback(() => {
    resetWidgetContainers();
    window._hw?.(CHERRY_WIDGET_CONTAINER_ID);

    window.setTimeout(() => {
      syncFloatingWidgetStyles();
      setStatus('ready');
    }, 150);
  }, [syncFloatingWidgetStyles]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!hasActiveWidgets) {
      if (teardownTimerRef.current !== null) {
        window.clearTimeout(teardownTimerRef.current);
      }

      teardownTimerRef.current = window.setTimeout(() => {
        resetCherryRuntime();
        setStatus('idle');
      }, 250);

      return () => {
        if (teardownTimerRef.current !== null) {
          window.clearTimeout(teardownTimerRef.current);
          teardownTimerRef.current = null;
        }
      };
    }

    if (teardownTimerRef.current !== null) {
      window.clearTimeout(teardownTimerRef.current);
      teardownTimerRef.current = null;
    }

    ensureFontLink();
    setStatus((currentStatus) => (currentStatus === 'ready' ? currentStatus : 'loading'));

    let script = document.getElementById(CHERRY_WIDGET_SCRIPT_ID) as HTMLScriptElement | null;
    const hasLiveMount = Boolean(document.querySelector(`[id="${CHERRY_WIDGET_MOUNT_ID}"]`));
    const shouldBootstrapRuntime =
      !window['loaded-_hw'] || !window.__cherryWidgetInitQueued || !hasLiveMount;

    const handleLoad = () => {
      window['loaded-_hw'] = true;
      script?.setAttribute('data-loaded', 'true');
      renderWidget();
    };

    const handleError = () => {
      setStatus('error');
    };

    if (shouldBootstrapRuntime) {
      resetCherryRuntime();
      window._hw = createCherryQueue();
      window._hw('init', createCherryWidgetConfig(), [CHERRY_WIDGET_CONTAINER_ID]);
      window.__cherryWidgetInitQueued = true;
      script = null;
    }

    if (!script) {
      script = document.createElement('script');
      script.id = CHERRY_WIDGET_SCRIPT_ID;
      script.src = CHERRY_WIDGET_SCRIPT_SRC;
      script.async = true;
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
      document.head.appendChild(script);
    } else if (!shouldBootstrapRuntime && (script.getAttribute('data-loaded') === 'true' || window['loaded-_hw'])) {
      renderWidget();
    } else {
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
    }

    return () => {
      script?.removeEventListener('load', handleLoad);
      script?.removeEventListener('error', handleError);
    };
  }, [activeWidgetIds, hasActiveWidgets, renderWidget]);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasActiveWidgets || status === 'error') return;

    const observer = new MutationObserver(() => {
      syncFloatingWidgetStyles();
    });

    const handleViewportChange = () => {
      syncFloatingWidgetStyles();
    };

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', handleViewportChange, { passive: true });
    window.addEventListener('orientationchange', handleViewportChange, { passive: true });
    window.addEventListener('scroll', handleViewportChange, { passive: true });

    syncFloatingWidgetStyles();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange);

      if (syncFrameRef.current !== null) {
        window.cancelAnimationFrame(syncFrameRef.current);
        syncFrameRef.current = null;
      }
    };
  }, [hasActiveWidgets, status, syncFloatingWidgetStyles]);

  useEffect(() => {
    return () => {
      if (typeof window === 'undefined') return;

      if (teardownTimerRef.current !== null) {
        window.clearTimeout(teardownTimerRef.current);
      }

      if (syncFrameRef.current !== null) {
        window.cancelAnimationFrame(syncFrameRef.current);
      }

      resetCherryRuntime();
    };
  }, []);

  const contextValue = useMemo<CherryWidgetContextValue>(
    () => ({
      registerWidget,
      unregisterWidget,
      status,
    }),
    [registerWidget, status, unregisterWidget],
  );

  return (
    <CherryWidgetContext.Provider value={contextValue}>
      {children}
      <div
        id={CHERRY_WIDGET_CONTAINER_ID}
        className="pointer-events-none fixed bottom-0 right-0 z-[45] h-0 w-0 overflow-visible"
        aria-hidden="true"
      />
    </CherryWidgetContext.Provider>
  );
};

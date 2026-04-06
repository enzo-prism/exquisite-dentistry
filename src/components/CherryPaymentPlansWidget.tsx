import React, { useEffect, useRef, useState } from 'react';

import PhoneLink from '@/components/PhoneLink';
import {
  CHERRY_WIDGET_FONT_HREF,
  CHERRY_WIDGET_FONT_LINK_ID,
  CHERRY_WIDGET_SCRIPT_ID,
  CHERRY_WIDGET_SCRIPT_SRC,
  CHERRY_WIDGET_SUPPORT_CONTAINER_IDS,
  createCherryWidgetConfig,
} from '@/constants/cherry';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { cn } from '@/lib/utils';

type WidgetStatus = 'loading' | 'ready' | 'error';
type CherryPaymentPlansWidgetVariant = 'full' | 'preview';
const CHERRY_WIDGET_CONTAINER_IDS = [
  'all',
  'hero',
  'calculator',
  'howitworks',
  'faq',
  ...CHERRY_WIDGET_SUPPORT_CONTAINER_IDS,
] as const;

const resetWidgetContainers = () => {
  CHERRY_WIDGET_CONTAINER_IDS.forEach((containerId) => {
    document.getElementById(containerId)?.replaceChildren();
  });
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

interface CherryPaymentPlansWidgetProps {
  className?: string;
  variant?: CherryPaymentPlansWidgetVariant;
}

const CherryPaymentPlansWidget: React.FC<CherryPaymentPlansWidgetProps> = ({
  className,
  variant = 'full',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(() =>
    typeof window !== 'undefined' ? Boolean(window['loaded-_hw']) : false,
  );
  const [status, setStatus] = useState<WidgetStatus>(() =>
    typeof window !== 'undefined' && window['loaded-_hw'] ? 'ready' : 'loading',
  );
  const isPreview = variant === 'preview';
  const renderTargetId = isPreview ? 'hero' : 'all';

  useEffect(() => {
    if (shouldLoad || typeof window === 'undefined' || !mountRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(mountRef.current);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || typeof window === 'undefined') return;

    const renderKeys = [renderTargetId];
    const renderWidget = () => {
      if (window._hw_shared_layout && !document.body.contains(window._hw_shared_layout)) {
        window._hw_shared_layout = null;
      }

      resetWidgetContainers();

      window._hw?.(renderTargetId);
      window.setTimeout(() => setStatus('ready'), 150);
    };

    const ensureFontLink = () => {
      if (document.getElementById(CHERRY_WIDGET_FONT_LINK_ID)) return;

      const link = document.createElement('link');
      link.id = CHERRY_WIDGET_FONT_LINK_ID;
      link.rel = 'stylesheet';
      link.href = CHERRY_WIDGET_FONT_HREF;
      document.head.appendChild(link);
    };

    ensureFontLink();

    const activeWidgets = window._hw_widgets?.filter((widgetKey) => widgetKey !== 'floatingEstimator') ?? [];
    const shouldReinitialize =
      !window['loaded-_hw'] ||
      activeWidgets.length !== 1 ||
      activeWidgets[0] !== renderTargetId;

    if (shouldReinitialize) {
      resetCherryRuntime();
    }

    if (window['loaded-_hw'] && !shouldReinitialize) {
      renderWidget();
      return;
    }

    if (!window._hw || !window._hw.q) {
      const cherryQueue = ((...args: unknown[]) => {
        cherryQueue.q = cherryQueue.q || [];
        cherryQueue.q.push(args);
      }) as NonNullable<typeof window._hw>;

      cherryQueue.q = cherryQueue.q || [];
      window._hw = cherryQueue;
    }

    if (!window.__cherryWidgetInitQueued) {
      // Cherry uses a shared singleton across the mounted sections, so we queue init once
      // and reset the runtime whenever a different widget target is needed in the SPA.
      window._hw('init', createCherryWidgetConfig(), renderKeys);
      window.__cherryWidgetInitQueued = true;
    }

    let script = document.getElementById(CHERRY_WIDGET_SCRIPT_ID) as HTMLScriptElement | null;
    const handleLoad = () => {
      window['loaded-_hw'] = true;
      renderWidget();
      script?.setAttribute('data-loaded', 'true');
    };
    const handleError = () => setStatus('error');

    if (!script) {
      script = document.createElement('script');
      script.id = CHERRY_WIDGET_SCRIPT_ID;
      script.src = CHERRY_WIDGET_SCRIPT_SRC;
      script.async = true;
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
      document.head.appendChild(script);
    } else if (script.getAttribute('data-loaded') === 'true') {
      renderWidget();
    } else {
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
    }

    return () => {
      window._hw_shared_layout = null;
      script?.removeEventListener('load', handleLoad);
      script?.removeEventListener('error', handleError);
    };
  }, [renderTargetId, shouldLoad]);

  return (
    <div
      ref={mountRef}
      className={cn(
        'relative w-full min-w-0 overflow-hidden rounded-[2rem] border border-gold/20 bg-white shadow-[0_28px_80px_-42px_rgba(0,0,0,0.45)]',
        isPreview && 'mx-auto max-w-[38rem]',
        className,
      )}
    >
      {status === 'loading' ? (
        <div className="border-b border-border bg-stone-50 px-6 py-4 text-sm text-muted-foreground">
          Loading Cherry financing options...
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="border-b border-red-200 bg-red-50 px-6 py-4 text-sm text-red-900">
          We couldn&apos;t load the Cherry financing widget right now. Please refresh the page
          or call{' '}
          <PhoneLink
            phoneNumber={PHONE_NUMBER_DISPLAY}
            className="font-semibold underline underline-offset-4"
          >
            {PHONE_NUMBER_DISPLAY}
          </PhoneLink>
          .
        </div>
      ) : null}

      <div
        className={cn(
          'relative w-full min-w-0 bg-white',
          isPreview ? 'max-h-[34rem] overflow-hidden' : 'overflow-visible',
        )}
      >
        {CHERRY_WIDGET_SUPPORT_CONTAINER_IDS.map((containerId) => (
          <div key={containerId} id={containerId} className="hidden" aria-hidden="true" />
        ))}
        <div
          id="all"
          className={cn('w-full bg-white', isPreview ? 'hidden' : 'min-h-[980px]')}
          aria-live="polite"
        />
        <div
          id="hero"
          className={cn('w-full bg-white', isPreview ? 'min-h-[34rem]' : 'hidden')}
          aria-hidden={!isPreview}
          aria-live="polite"
        />
        <div id="calculator" className="hidden" aria-hidden="true" />
        <div id="howitworks" className="hidden" aria-hidden="true" />
        <div id="faq" className="hidden" aria-hidden="true" />

        {isPreview ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/95 to-transparent" />
        ) : null}
      </div>
    </div>
  );
};

export default CherryPaymentPlansWidget;

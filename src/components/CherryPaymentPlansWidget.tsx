import React, { useEffect, useRef, useState } from 'react';
import { CalendarClock, CircleCheckBig, CreditCard, Sparkles } from 'lucide-react';

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

const previewHighlights = [
  {
    title: 'Review monthly-payment scenarios',
    description:
      'Open the full Cherry page when you want to explore what financing could look like for your treatment plan.',
    Icon: CreditCard,
  },
  {
    title: 'Useful before or after your consultation',
    description:
      'Some patients want clarity before they book. Others prefer to look once they know the treatment amount.',
    Icon: CalendarClock,
  },
  {
    title: 'A planning tool, not a commitment',
    description:
      'You can use financing to understand your options, then decide whether you want to schedule, ask questions, or wait.',
    Icon: Sparkles,
  },
];

const CherryPaymentPlansPreviewCard: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'w-full rounded-[2rem] border border-gold/20 bg-white shadow-[0_28px_80px_-42px_rgba(0,0,0,0.28)]',
      className,
    )}
  >
    <div className="border-b border-gold/10 bg-gradient-to-r from-stone-50 via-white to-stone-50 px-6 py-5 sm:px-7">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
        Cherry Financing
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
        A simpler way to explore payment options.
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        Use the full Cherry page to review financing when cost is part of your decision. It is
        there to help you plan, not pressure you into taking the next step before you are ready.
      </p>
    </div>

    <div className="p-6 sm:p-7">
      <div className="grid gap-3">
        {previewHighlights.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="rounded-[1.35rem] border border-border/80 bg-stone-50/70 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-gold/15 bg-gold/5 p-4">
        <div className="flex items-start gap-3">
          <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm leading-6 text-foreground/85">
            If you are unsure whether it makes more sense to review financing first or book first,
            our team can help you choose the better starting point.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CherryPaymentPlansLiveWidget: React.FC<{ className?: string }> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(() =>
    typeof window !== 'undefined' ? Boolean(window['loaded-_hw']) : false,
  );
  const [status, setStatus] = useState<WidgetStatus>(() =>
    typeof window !== 'undefined' && window['loaded-_hw'] ? 'ready' : 'loading',
  );
  const renderTargetId = 'all';

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
          'relative w-full min-w-0 overflow-visible bg-white',
        )}
      >
        {CHERRY_WIDGET_SUPPORT_CONTAINER_IDS.map((containerId) => (
          <div key={containerId} id={containerId} className="hidden" aria-hidden="true" />
        ))}
        <div
          id="all"
          className="min-h-[980px] w-full bg-white"
          aria-live="polite"
        />
        <div id="hero" className="hidden" aria-hidden="true" aria-live="polite" />
        <div id="calculator" className="hidden" aria-hidden="true" />
        <div id="howitworks" className="hidden" aria-hidden="true" />
        <div id="faq" className="hidden" aria-hidden="true" />
      </div>
    </div>
  );
};

const CherryPaymentPlansWidget: React.FC<CherryPaymentPlansWidgetProps> = ({
  className,
  variant = 'full',
}) => {
  if (variant === 'preview') {
    return <CherryPaymentPlansPreviewCard className={className} />;
  }

  return <CherryPaymentPlansLiveWidget className={className} />;
};

export default CherryPaymentPlansWidget;

import React, { useEffect, useRef, useState } from 'react';
import {
  CalendarClock,
  CircleCheckBig,
  CreditCard,
  MousePointerClick,
} from 'lucide-react';

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

type WidgetStatus = 'idle' | 'loading' | 'ready' | 'error';
type CherryPaymentPlansWidgetVariant = 'full' | 'preview';

const CHERRY_WIDGET_CONTAINER_ID = 'floatingEstimator' as const;
const CHERRY_WIDGET_CONTAINER_IDS = [
  CHERRY_WIDGET_CONTAINER_ID,
  ...CHERRY_WIDGET_SUPPORT_CONTAINER_IDS,
] as const;

const previewHighlights = [
  {
    title: 'Use it before you book if cost affects your timing',
    description:
      'If you want budget clarity before committing to a consultation, Cherry can help you check possible monthly payments.',
    Icon: CreditCard,
  },
  {
    title: 'Use it after you talk with us if you prefer treatment guidance first',
    description:
      'Some patients want to understand the treatment plan first, then use Cherry once they have a clearer amount in mind.',
    Icon: CalendarClock,
  },
];

const fullSteps = [
  'Read this page first so you know whether financing is even relevant for you.',
  'When you are ready, use the Cherry button in the lower-right corner to explore payment options.',
  'If you want help choosing an amount to check or what to do next, call our team and we will walk you through it.',
];

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

const useCherryFloatingEstimator = (eager: boolean) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(() =>
    typeof window !== 'undefined' ? eager || Boolean(window['loaded-_hw']) : eager,
  );
  const [status, setStatus] = useState<WidgetStatus>(() => {
    if (typeof window === 'undefined') return eager ? 'loading' : 'idle';
    if (window['loaded-_hw']) return 'ready';
    return eager ? 'loading' : 'idle';
  });

  useEffect(() => {
    if (eager || shouldLoad || typeof window === 'undefined' || !mountRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '280px 0px' },
    );

    observer.observe(mountRef.current);

    return () => observer.disconnect();
  }, [eager, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || typeof window === 'undefined') return;

    setStatus((currentStatus) => (currentStatus === 'ready' ? currentStatus : 'loading'));

    const renderKeys = [CHERRY_WIDGET_CONTAINER_ID];
    const renderWidget = () => {
      resetWidgetContainers();
      window._hw?.(CHERRY_WIDGET_CONTAINER_ID);
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

    const activeWidgets = window._hw_widgets ?? [];
    const shouldReinitialize =
      !window['loaded-_hw'] ||
      activeWidgets.length !== 1 ||
      activeWidgets[0] !== CHERRY_WIDGET_CONTAINER_ID;

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
      script?.removeEventListener('load', handleLoad);
      script?.removeEventListener('error', handleError);
    };
  }, [shouldLoad]);

  useEffect(() => {
    return () => {
      if (typeof window === 'undefined') return;
      resetCherryRuntime();
    };
  }, []);

  return { mountRef, status };
};

interface CherryWidgetAnchorProps {
  mountRef: React.RefObject<HTMLDivElement>;
  status: WidgetStatus;
}

const CherryWidgetAnchor: React.FC<CherryWidgetAnchorProps> = ({ mountRef, status }) => (
  <div ref={mountRef} className="relative">
    {status === 'error' ? (
      <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-900">
        Cherry did not load correctly. Please refresh the page or call{' '}
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
      id={CHERRY_WIDGET_CONTAINER_ID}
      className="pointer-events-none h-0 w-0 overflow-visible"
      aria-hidden="true"
    />
  </div>
);

const CherryPaymentPlansPreviewCard: React.FC<{ className?: string }> = ({ className }) => {
  const { mountRef, status } = useCherryFloatingEstimator(true);

  return (
    <div
      className={cn(
        'w-full rounded-[1.75rem] border border-gold/20 bg-white p-6 shadow-[0_20px_48px_-36px_rgba(0,0,0,0.24)]',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
        Cherry Financing
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
        Financing is available if you want to check the numbers.
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Instead of dropping a full widget into the page, we keep this simple. When Cherry is
        useful, use the financing button that appears in the lower-right corner.
      </p>

      <div className="mt-5 space-y-3">
        {previewHighlights.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="rounded-[1.25rem] border border-border/70 bg-stone-50/75 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-gold/15 bg-gold/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
          What to look for
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <MousePointerClick size={16} />
          Cherry financing button
        </div>
        <p className="mt-3 text-sm leading-6 text-foreground/80">
          It appears in the lower-right corner on this page so you can open Cherry only if and
          when you want to.
        </p>
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-border bg-white p-4">
        <div className="flex items-start gap-3">
          <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm leading-6 text-foreground/85">
            If you would rather talk with the office first, call{' '}
            <PhoneLink
              phoneNumber={PHONE_NUMBER_DISPLAY}
              className="font-semibold text-secondary underline underline-offset-4 hover:no-underline"
            >
              {PHONE_NUMBER_DISPLAY}
            </PhoneLink>
            .
          </p>
        </div>
      </div>

      {status === 'loading' ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Turning on Cherry financing for this page...
        </p>
      ) : null}

      <CherryWidgetAnchor mountRef={mountRef} status={status} />
    </div>
  );
};

const CherryPaymentPlansFloatingCard: React.FC<{ className?: string }> = ({ className }) => {
  const { mountRef, status } = useCherryFloatingEstimator(true);

  return (
    <div
      className={cn(
        'w-full rounded-[2rem] border border-gold/20 bg-white p-7 shadow-[0_24px_72px_-40px_rgba(0,0,0,0.26)] sm:p-8',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
        Cherry Financing Is Active On This Page
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
        Use the Cherry button in the lower-right corner when you want to explore payments.
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        This keeps the page easier to read. Learn what financing is for first, then open Cherry
        only when you want to estimate monthly options.
      </p>

      <div className="mt-6 space-y-3">
        {fullSteps.map((step) => (
          <div
            key={step}
            className="flex items-start gap-3 rounded-[1.2rem] border border-border/75 bg-stone-50/75 px-4 py-3"
          >
            <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-sm leading-6 text-foreground/85">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.4rem] border border-gold/15 bg-gold/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
          Cherry Button
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <MousePointerClick size={16} />
          Open Cherry financing
        </div>
        <p className="mt-3 text-sm leading-6 text-foreground/80">
          If nothing appears after a moment, refresh the page. If you want help first, call{' '}
          <PhoneLink
            phoneNumber={PHONE_NUMBER_DISPLAY}
            className="font-semibold text-secondary underline underline-offset-4 hover:no-underline"
          >
            {PHONE_NUMBER_DISPLAY}
          </PhoneLink>
          .
        </p>
      </div>

      {status === 'loading' ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Turning on Cherry financing for this page...
        </p>
      ) : null}

      <CherryWidgetAnchor mountRef={mountRef} status={status} />
    </div>
  );
};

interface CherryPaymentPlansWidgetProps {
  className?: string;
  variant?: CherryPaymentPlansWidgetVariant;
}

const CherryPaymentPlansWidget: React.FC<CherryPaymentPlansWidgetProps> = ({
  className,
  variant = 'full',
}) => {
  if (variant === 'preview') {
    return <CherryPaymentPlansPreviewCard className={className} />;
  }

  return <CherryPaymentPlansFloatingCard className={className} />;
};

export default CherryPaymentPlansWidget;

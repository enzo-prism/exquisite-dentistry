import { useContext, useEffect, useRef } from 'react';

import {
  CherryWidgetContext,
  type CherryWidgetStatus,
} from '@/components/cherry-widget-context';

interface UseCherryWidgetRegistrationOptions {
  enabled: boolean;
}

export const useCherryWidgetRegistration = ({
  enabled,
}: UseCherryWidgetRegistrationOptions): { status: CherryWidgetStatus } => {
  const context = useContext(CherryWidgetContext);

  if (!context) {
    throw new Error('useCherryWidgetRegistration must be used within CherryWidgetProvider');
  }

  const { registerWidget, unregisterWidget, status } = context;
  const widgetIdRef = useRef(`cherry-widget-${Math.random().toString(36).slice(2, 11)}`);

  useEffect(() => {
    if (!enabled) return;

    const widgetId = widgetIdRef.current;
    registerWidget(widgetId);

    return () => {
      unregisterWidget(widgetId);
    };
  }, [enabled, registerWidget, unregisterWidget]);

  return { status };
};

export const useCherryWidgetStatus = (): CherryWidgetStatus => {
  const context = useContext(CherryWidgetContext);

  if (!context) {
    throw new Error('useCherryWidgetStatus must be used within CherryWidgetProvider');
  }

  return context.status;
};

import { createContext } from 'react';

export type CherryWidgetStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface CherryWidgetContextValue {
  registerWidget: (id: string) => void;
  unregisterWidget: (id: string) => void;
  status: CherryWidgetStatus;
  /** True when a page-level Cherry widget is mounted (the floating pill may be visible). */
  hasActiveWidgets: boolean;
}

export const CherryWidgetContext = createContext<CherryWidgetContextValue | null>(null);

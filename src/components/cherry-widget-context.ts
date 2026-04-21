import { createContext } from 'react';

export type CherryWidgetStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface CherryWidgetContextValue {
  registerWidget: (id: string) => void;
  unregisterWidget: (id: string) => void;
  status: CherryWidgetStatus;
}

export const CherryWidgetContext = createContext<CherryWidgetContextValue | null>(null);

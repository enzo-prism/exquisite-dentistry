import { useSyncExternalStore } from 'react';

/**
 * Tiny shared store for the mobile action bar's visibility. Bottom-anchored
 * vendor UI (the Cherry pill) reads the CSS variable `--mobile-action-bar-h`.
 */
let visible = false;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const MOBILE_ACTION_BAR_HEIGHT_PX = 68;

export const setMobileActionBarVisible = (next: boolean) => {
  if (next === visible) return;
  visible = next;
  document.documentElement.style.setProperty('--mobile-action-bar-h', next ? `${MOBILE_ACTION_BAR_HEIGHT_PX}px` : '0px');
  listeners.forEach((listener) => listener());
};

export const useMobileActionBarVisible = () => useSyncExternalStore(subscribe, () => visible, () => false);

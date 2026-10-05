import { useSyncExternalStore } from 'react';

/**
 * Tiny shared store for the mobile action bar's visibility, so the floating
 * Concierge (and anything else anchored to the bottom edge) can step aside
 * while the bar is up. Bottom-anchored vendor UI (Cherry) reads the CSS
 * variable `--mobile-action-bar-h` instead.
 */
let visible = false;
let enabled = false;
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

/** True on routes/viewports where the bar exists at all (visible or tucked away). */
export const setMobileActionBarEnabled = (next: boolean) => {
  if (next === enabled) return;
  enabled = next;
  listeners.forEach((listener) => listener());
};

export const useMobileActionBarVisible = () => useSyncExternalStore(subscribe, () => visible, () => false);
export const useMobileActionBarEnabled = () => useSyncExternalStore(subscribe, () => enabled, () => false);

export const OPEN_CONCIERGE_EVENT = 'exquisite:open-concierge';

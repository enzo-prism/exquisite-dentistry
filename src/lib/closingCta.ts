import { useEffect, useSyncExternalStore } from 'react';

/**
 * Pages that end on their own consultation band register it here so the
 * footer can skip its (otherwise back-to-back) "Plan your visit" panel.
 */
let count = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export const useRegisterClosingCta = (active = true) => {
  useEffect(() => {
    if (!active) return;
    count += 1;
    emit();
    return () => {
      count -= 1;
      emit();
    };
  }, [active]);
};

export const useHasClosingCta = () =>
  useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => count > 0,
    () => false,
  );

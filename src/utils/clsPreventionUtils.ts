// CLS Prevention Utilities
// This module provides utilities to prevent Cumulative Layout Shift (CLS)
import React from 'react';

export interface CLSPreventionOptions {
  minHeight?: string;
  aspectRatio?: string;
  containIntrinsicSize?: string;
  reserveSpace?: boolean;
}

/**
 * Creates style object for preventing layout shifts
 */
export function createCLSPreventionStyles(options: CLSPreventionOptions) {
  const styles: React.CSSProperties = {
    contain: 'layout',
  };

  if (options.minHeight) {
    styles.minHeight = options.minHeight;
  }

  if (options.aspectRatio) {
    styles.aspectRatio = options.aspectRatio;
  }

  if (options.containIntrinsicSize) {
    styles.containIntrinsicSize = options.containIntrinsicSize;
  }

  return styles;
}

/**
 * Higher-order component for wrapping components with CLS prevention
 */
export function withCLSPrevention<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  preventionOptions: CLSPreventionOptions
): React.ComponentType<T> {
  return function CLSPreventedComponent(props: T) {
    const styles = createCLSPreventionStyles(preventionOptions);
    
    return React.createElement(
      'div',
      { style: styles },
      React.createElement(Component, props)
    );
  };
}

/**
 * Creates a skeleton placeholder with exact dimensions
 */
export function createSkeletonPlaceholder(
  width: number | string,
  height: number | string,
  className?: string
): JSX.Element {
  return React.createElement('div', {
    className: `animate-pulse bg-gray-200 rounded ${className || ''}`,
    style: {
      width,
      height,
      contain: 'layout' as const,
      containIntrinsicSize: `${width} ${height}`,
    }
  });
}

/**
 * Observer for monitoring layout shifts
 */
export function createLayoutShiftObserver(callback: (entries: PerformanceEntry[]) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return null;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      callback(list.getEntries());
    });

    observer.observe({ type: 'layout-shift', buffered: true });
    return observer;
  } catch (error) {
    console.warn('Failed to create layout shift observer:', error);
    return null;
  }
}

/**
 * Calculate CLS score from layout shift entries
 */
export function calculateCLSScore(entries: PerformanceEntry[]): number {
  let clsScore = 0;
  let sessionWindow = 0;
  let sessionGap = 0;

  entries.forEach((entry: any) => {
    // Only count layout shifts without recent user input
    if (!entry.hadRecentInput) {
      if (sessionGap > 1000 || sessionWindow > 5000) {
        // Start new session window
        sessionWindow = 0;
        sessionGap = 0;
      }

      sessionWindow += entry.value;
      sessionGap = entry.startTime;
      clsScore = Math.max(clsScore, sessionWindow);
    }
  });

  return clsScore;
}
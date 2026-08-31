export {};

declare global {
  interface Navigator {
    connection?: {
      effectiveType?: string;
    };
  }

  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __EXQUISITE_ANALYTICS_TEST_HOST__?: string;
    gtagSendEvent?: (url?: string, target?: string, source?: string) => boolean;
    oaiq?: ((...args: unknown[]) => void) & {
      q?: unknown[][];
    };
    __exquisiteOpenAIAdsConsent?: boolean;
    __exquisiteOpenAIAdsInitializedPixelIds?: string[];
    _hw?: ((method: string, ...args: unknown[]) => void) & {
      q?: unknown[][];
    };
    _hw_shared_layout?: HTMLElement | null;
    _hw_widgets?: string[];
    _hw_global_config?: Record<string, unknown>;
    _hw_floating_config?: Record<string, unknown>;
    ['loaded-_hw']?: boolean;
    __cherryWidgetInitQueued?: boolean;
    __metaTracker?: Map<string, string[]>;
    runUIAudit?: typeof import('../utils/uiAudit').runUIAudit;
    logAuditResults?: typeof import('../utils/uiAudit').logAuditResults;
    checkForSectionGaps?: typeof import('../utils/sectionAudit').checkForSectionGaps;
    fixBackgroundConsistency?: typeof import('../utils/sectionAudit').fixBackgroundConsistency;
    balanceSectionPadding?: typeof import('../utils/sectionAudit').balanceSectionPadding;
  }
}

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
    gtagSendEvent?: (url?: string) => boolean;
    hj?: (...args: unknown[]) => void;
    _hw?: ((method: string, ...args: unknown[]) => void) & {
      q?: unknown[][];
    };
    _hjSettings?: Record<string, unknown>;
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

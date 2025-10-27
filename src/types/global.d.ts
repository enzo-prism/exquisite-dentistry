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
    _hjSettings?: Record<string, unknown>;
    __metaTracker?: Map<string, string[]>;
    runUIAudit?: typeof import('../utils/uiAudit').runUIAudit;
    logAuditResults?: typeof import('../utils/uiAudit').logAuditResults;
    checkForSectionGaps?: typeof import('../utils/sectionAudit').checkForSectionGaps;
    fixBackgroundConsistency?: typeof import('../utils/sectionAudit').fixBackgroundConsistency;
    balanceSectionPadding?: typeof import('../utils/sectionAudit').balanceSectionPadding;
  }
}

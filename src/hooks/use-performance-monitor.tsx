import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PerformanceMemory = {
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
};

type PerformanceWithMemory = Performance & {
  memory?: PerformanceMemory;
};

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

type ExtendedNavigator = Navigator & {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
  hardwareConcurrency?: number;
};

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  isLowEnd: boolean;
  connectionSpeed: "slow" | "fast" | "unknown";
}

const DEFAULT_METRICS: PerformanceMetrics = {
  fps: 60,
  memoryUsage: 0,
  isLowEnd: false,
  connectionSpeed: "unknown",
};

const getMemoryUsage = () => {
  if (typeof performance === "undefined") {
    return 0;
  }

  const performanceWithMemory = performance as PerformanceWithMemory;
  const memory = performanceWithMemory.memory;

  if (!memory || memory.jsHeapSizeLimit <= 0) {
    return 0;
  }

  return memory.usedJSHeapSize / memory.jsHeapSizeLimit;
};

const getConnectionSpeed = (
  navigatorLike: ExtendedNavigator,
): PerformanceMetrics["connectionSpeed"] => {
  const effectiveType = navigatorLike.connection?.effectiveType;

  if (effectiveType === "slow-2g" || effectiveType === "2g") {
    return "slow";
  }

  if (effectiveType === "3g" || effectiveType === "4g") {
    return "fast";
  }

  return "unknown";
};

const getIsLowEnd = (
  navigatorLike: ExtendedNavigator,
  connectionSpeed: PerformanceMetrics["connectionSpeed"],
  memoryUsage: number,
) => {
  const deviceMemory = navigatorLike.deviceMemory;
  const cores = navigatorLike.hardwareConcurrency;
  const saveDataEnabled = navigatorLike.connection?.saveData === true;

  if (saveDataEnabled || connectionSpeed === "slow") {
    return true;
  }

  if (typeof deviceMemory === "number" && deviceMemory <= 4) {
    return true;
  }

  if (typeof cores === "number" && cores <= 4) {
    return true;
  }

  return memoryUsage >= 0.7;
};

const getMetricsSnapshot = (): PerformanceMetrics => {
  if (typeof navigator === "undefined") {
    return DEFAULT_METRICS;
  }

  const navigatorLike = navigator as ExtendedNavigator;
  const memoryUsage = getMemoryUsage();
  const connectionSpeed = getConnectionSpeed(navigatorLike);

  return {
    fps: 60,
    memoryUsage,
    connectionSpeed,
    isLowEnd: getIsLowEnd(navigatorLike, connectionSpeed, memoryUsage),
  };
};

const prefersReducedMotion = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(getMetricsSnapshot);

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    const navigatorLike = navigator as ExtendedNavigator;
    const connection = navigatorLike.connection;

    const syncMetrics = () => {
      setMetrics((current) => {
        const next = getMetricsSnapshot();

        if (
          current.fps === next.fps &&
          current.memoryUsage === next.memoryUsage &&
          current.isLowEnd === next.isLowEnd &&
          current.connectionSpeed === next.connectionSpeed
        ) {
          return current;
        }

        return next;
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncMetrics();
      }
    };

    syncMetrics();

    connection?.addEventListener?.("change", syncMetrics);
    window.addEventListener("pageshow", syncMetrics);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      connection?.removeEventListener?.("change", syncMetrics);
      window.removeEventListener("pageshow", syncMetrics);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const optimizedSettings = useMemo(() => {
    const reduceAnimations =
      prefersReducedMotion() || metrics.isLowEnd || metrics.connectionSpeed === "slow";

    return {
      enableHeavyAnimations: !reduceAnimations,
      enableParallax: !reduceAnimations,
      enableComplexTransitions: !reduceAnimations,
      reduceAnimations,
      maxConcurrentAnimations: metrics.isLowEnd ? 2 : 6,
    };
  }, [metrics.connectionSpeed, metrics.isLowEnd]);

  return {
    metrics,
    optimizedSettings,
  };
};

type PerformanceMonitorContextValue = ReturnType<typeof usePerformanceMonitor>;

const PerformanceMonitorContext = createContext<PerformanceMonitorContextValue | null>(null);

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const value = usePerformanceMonitor();

  return (
    <PerformanceMonitorContext.Provider value={value}>
      {children}
    </PerformanceMonitorContext.Provider>
  );
};

export const usePerformanceSettings = () => {
  const context = useContext(PerformanceMonitorContext);

  if (!context) {
    throw new Error("usePerformanceSettings must be used within PerformanceProvider");
  }

  return context;
};

export const useSmartAnimations = () => {
  const { optimizedSettings } = usePerformanceSettings();

  const getAnimationClass = (defaultClass: string, heavyClass?: string) => {
    if (!optimizedSettings.enableHeavyAnimations && heavyClass) {
      return defaultClass;
    }

    return heavyClass || defaultClass;
  };

  const shouldAnimate = (priority: "low" | "medium" | "high" = "medium") => {
    if (optimizedSettings.reduceAnimations && priority === "low") return false;
    if (!optimizedSettings.enableComplexTransitions && priority === "medium") return false;
    return true;
  };

  return {
    getAnimationClass,
    shouldAnimate,
    settings: optimizedSettings,
  };
};

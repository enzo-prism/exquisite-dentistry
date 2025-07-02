import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Initialize Sentry for error monitoring and performance tracking
export const initSentry = () => {
  // Skip Sentry initialization in development if no DSN is provided
  if (import.meta.env.MODE === "development" && !import.meta.env.VITE_SENTRY_DSN) {
    console.log("Sentry: Skipping initialization in development mode without DSN");
    return;
  }
  
  try {
    Sentry.init({
      // For development, we'll use a test DSN - replace with actual DSN for production
      dsn: import.meta.env.VITE_SENTRY_DSN || undefined,
      
      // Development vs Production configuration
      environment: import.meta.env.MODE || "development",
      
      // Performance monitoring
      integrations: [
        new BrowserTracing({
          // Basic configuration without router instrumentation for now
        }),
      ],
    
    // Performance Monitoring
    tracesSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0,
    
    // Session Replay for debugging
    replaysSessionSampleRate: import.meta.env.MODE === "production" ? 0.01 : 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Release information
    release: import.meta.env.VITE_APP_VERSION || "1.0.0",
    
    // Additional options
    beforeSend(event, hint) {
      // Filter out development-only errors in production
      if (import.meta.env.MODE === "development") {
        console.log("Sentry Event:", event, hint);
      }
      
      // Don't send events that are likely user errors
      if (event.exception) {
        const error = hint.originalException;
        if (error instanceof Error) {
          // Filter out network errors that might be user-related
          if (error.message.includes("Network Error") || 
              error.message.includes("fetch")) {
            return null;
          }
        }
      }
      
      return event;
    },
    
    // Custom tags for better categorization
    initialScope: {
      tags: {
        component: "dentistry-website",
        section: "unknown"
      },
      user: {
        id: "anonymous"
      }
    }
    });
    
    console.log("Sentry initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Sentry:", error);
  }
};

// Custom breadcrumb helpers
export const addBreadcrumb = (message: string, category: string, level: Sentry.SeverityLevel = "info") => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
};

// Component rendering breadcrumbs
export const trackComponentRender = (componentName: string, props?: any) => {
  addBreadcrumb(
    `Component ${componentName} rendered`,
    "component",
    "debug"
  );
  
  // Add component-specific context
  Sentry.setTag("current_component", componentName);
  
  if (props && Object.keys(props).length > 0) {
    Sentry.setContext("component_props", props);
  }
};

// Page navigation tracking
export const trackPageView = (pathname: string, search?: string) => {
  addBreadcrumb(
    `Navigated to ${pathname}${search || ""}`,
    "navigation",
    "info"
  );
  
  Sentry.setTag("current_page", pathname);
  Sentry.setContext("page_context", {
    pathname,
    search,
    timestamp: new Date().toISOString()
  });
};

// Content loading tracking
export const trackContentLoad = (contentType: string, success: boolean, error?: Error) => {
  const message = `Content load ${success ? "succeeded" : "failed"}: ${contentType}`;
  const level = success ? "info" : "error";
  
  addBreadcrumb(message, "content", level);
  
  if (!success && error) {
    Sentry.captureException(error, {
      tags: {
        content_type: contentType,
        loading_error: true
      }
    });
  }
};

// Image loading tracking
export const trackImageLoad = (src: string, success: boolean, error?: Error) => {
  trackContentLoad(`image: ${src}`, success, error);
};

// Custom error capture with context
export const captureErrorWithContext = (error: Error, context: Record<string, any>) => {
  Sentry.withScope((scope) => {
    scope.setContext("error_context", context);
    scope.setLevel("error");
    Sentry.captureException(error);
  });
};

export default Sentry;
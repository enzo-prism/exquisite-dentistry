
// Optimized Sentry import - only import what we need
import { init, captureException, withScope, setTag, addBreadcrumb as sentryAddBreadcrumb } from "@sentry/react";
import { browserTracingIntegration } from "@sentry/react";

// Initialize Sentry for essential error monitoring only
export const initSentry = () => {
  // Skip Sentry initialization in development if no DSN is provided
  if (import.meta.env.MODE === "development" && !import.meta.env.VITE_SENTRY_DSN) {
    console.log("Sentry: Skipping initialization in development mode without DSN");
    return;
  }
  
  try {
    init({
      // For development, we'll use a test DSN - replace with actual DSN for production
      dsn: import.meta.env.VITE_SENTRY_DSN || undefined,
      
      // Development vs Production configuration
      environment: import.meta.env.MODE || "development",
      
      // Minimal integrations for performance
      integrations: import.meta.env.MODE === "production" ? [
        browserTracingIntegration()
      ] : [],
    
      // Reduced performance monitoring for better bundle size
      tracesSampleRate: import.meta.env.MODE === "production" ? 0.05 : 0,
      
      // Release information
      release: import.meta.env.VITE_APP_VERSION || "1.0.0",
      
      // Minimal options
      beforeSend(event, hint) {
        // Don't send events that are likely user errors
        if (event.exception) {
          const error = hint.originalException;
          if (error instanceof Error) {
            // Filter out network errors that might be user-related
            if (error.message.includes("Network Error") || 
                error.message.includes("fetch") ||
                error.message.includes("Importing a module script failed")) {
              return null;
            }
          }
        }
        
        return event;
      },
      
      // Minimal initial scope
      initialScope: {
        tags: {
          component: "dentistry-website"
        }
      }
    });
    
    console.log("Sentry initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Sentry:", error);
    // Don't throw error to prevent app crash
  }
};

// Simplified error capture for critical errors only
export const captureErrorWithContext = (error: Error, context?: Record<string, any>) => {
  try {
    if (import.meta.env.MODE === "production") {
      withScope((scope) => {
        if (context) {
          scope.setContext("error_context", context);
        }
        captureException(error);
      });
    } else {
      console.error("Error captured:", error, context);
    }
  } catch (err) {
    console.error("Failed to capture error:", err);
  }
};

// Simple page tracking for production only
export const trackPageView = (pathname: string) => {
  try {
    if (import.meta.env.MODE === "production") {
      setTag("current_page", pathname);
    }
  } catch (error) {
    // Fail silently
  }
};

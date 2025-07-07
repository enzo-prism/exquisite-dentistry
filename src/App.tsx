import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense, Component, ErrorInfo, ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorFallback from "@/components/ErrorFallback";

// Lazy load all routes for code splitting
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ClientExperience = lazy(() => import("@/pages/ClientExperience"));
const Wedding = lazy(() => import("@/pages/Wedding"));
const Graduation = lazy(() => import("@/pages/Graduation"));
const FAQs = lazy(() => import("@/pages/FAQs"));
const SmileGallery = lazy(() => import("@/pages/SmileGallery"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const HipaaCompliance = lazy(() => import("@/pages/HipaaCompliance"));
const Blog = lazy(() => import("@/pages/Blog"));
const ZoomWhitening = lazy(() => import("@/pages/ZoomWhiteningSimple"));
const DiagnosticTest = lazy(() => import("@/pages/DiagnosticTest"));
const PorcelainVeneers = lazy(() => import("@/pages/PorcelainVeneersSimple"));

// Add the new blog import
const BlogPost = lazy(() => import("@/components/blog/BlogPost"));

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Try to send error to Sentry if available
    try {
      import('@/lib/sentry').then(({ captureErrorWithContext }) => {
        captureErrorWithContext(error, {
          errorInfo,
          componentStack: errorInfo.componentStack,
          errorBoundary: true,
          timestamp: new Date().toISOString()
        });
      }).catch(() => {
        // Sentry not available, just log
        console.error('Sentry not available for error reporting');
      });
    } catch (sentryError) {
      console.error('Failed to report error to Sentry:', sentryError);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">Error: {this.state.error?.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// RouteAudit component
const RouteAudit = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Current route:', location.pathname);
    
    // Track page view in Sentry (if available)
    try {
      import('@/lib/sentry').then(({ trackPageView }) => {
        trackPageView(location.pathname, location.search);
      }).catch(() => {
        // Sentry not available, continue without tracking
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
    
    const timer = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        import('@/utils/uiAudit').then(({ logAuditResults }) => {
          console.group(`UI Audit for route: ${location.pathname}`);
          logAuditResults();
          console.groupEnd();
        }).catch(err => {
          console.error('Failed to load UI audit:', err);
        });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return null;
};

import PageLoader from '@/components/ui/page-loader';

// Updated loading fallback component
const PageLoaderComponent = () => {
  console.log('PageLoader rendering');
  return <PageLoader variant="minimal" message="Loading..." />;
};

const AppRoutes = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('AppRoutes rendering, pathname:', location.pathname);
  }, [location.pathname]);
  
  return (
    <>
      <ScrollToTop />
      <RouteAudit />
      <Navbar />
      <main className="flex-grow">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Suspense fallback={<PageLoaderComponent />}>
              <Index />
            </Suspense>} />
            <Route path="/about" element={<Suspense fallback={<PageLoaderComponent />}>
              <About />
            </Suspense>} />
            {/* Only keep fallback for non-trailing slash version that Netlify won't catch */}
            <Route path="/about-us/about-dr-alexie-aguil" element={<Navigate to="/about" replace />} />
            <Route path="/about-us" element={<Navigate to="/about" replace />} />
            <Route path="/services" element={<Suspense fallback={<PageLoaderComponent />}>
              <Services />
            </Suspense>} />
            <Route path="/services/general-dentistry/" element={<Navigate to="/services" replace />} />
            <Route path="/client-experience" element={<Suspense fallback={<PageLoaderComponent />}>
              <ClientExperience />
            </Suspense>} />
            <Route path="/testimonials" element={<Suspense fallback={<PageLoaderComponent />}>
              <Testimonials />
            </Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<PageLoaderComponent />}>
              <Contact />
            </Suspense>} />
            <Route path="/wedding" element={<Suspense fallback={<PageLoaderComponent />}>
              <Wedding />
            </Suspense>} />
            <Route path="/graduation" element={<Suspense fallback={<PageLoaderComponent />}>
              <Graduation />
            </Suspense>} />
            <Route path="/faqs" element={<Suspense fallback={<PageLoaderComponent />}>
              <FAQs />
            </Suspense>} />
            <Route path="/faq" element={<Navigate to="/faqs" replace />} />
            <Route path="/smile-gallery" element={<Suspense fallback={<PageLoaderComponent />}>
              <SmileGallery />
            </Suspense>} />
            
            {/* Blog routes */}
            <Route path="/blog" element={<Suspense fallback={<PageLoaderComponent />}>
              <Blog />
            </Suspense>} />
            
            {/* Dynamic blog post route */}
            <Route path="/blog/:slug" element={<Suspense fallback={<PageLoaderComponent />}>
              <BlogPost />
            </Suspense>} />
            
            {/* Only keep React Router redirects for URLs without trailing slashes that Netlify won't catch */}
            <Route path="/choosing-veneers-for-the-front-4-teeth" element={<Navigate to="/blog/choosing-veneers-for-the-front-4-teeth" replace />} />
            <Route path="/choosing-veneers-for-just-one-tooth" element={<Navigate to="/blog/single-tooth-veneers-perfect-solutions" replace />} />
            
            <Route path="/privacy-policy" element={<Suspense fallback={<PageLoaderComponent />}>
              <PrivacyPolicy />
            </Suspense>} />
            <Route path="/terms-of-service" element={<Suspense fallback={<PageLoaderComponent />}>
              <TermsOfService />
            </Suspense>} />
            <Route path="/hipaa-compliance" element={<Suspense fallback={<PageLoaderComponent />}>
              <HipaaCompliance />
            </Suspense>} />
            
            {/* Service specific pages */}
            <Route path="/services/zoom-whitening" element={
              <ErrorBoundary>
                <Suspense fallback={<PageLoaderComponent />}>
                  <ZoomWhitening />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/services/zoom-whitening/" element={<Navigate to="/services/zoom-whitening" replace />} />
            
            <Route path="/services/porcelain-veneers" element={
              <ErrorBoundary>
                <Suspense fallback={<PageLoaderComponent />}>
                  <PorcelainVeneers />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/services/porcelain-veneers/" element={<Navigate to="/services/porcelain-veneers" replace />} />
            
            {/* Diagnostic test page for troubleshooting */}
            <Route path="/diagnostic-test" element={<Suspense fallback={<PageLoaderComponent />}>
              <DiagnosticTest />
            </Suspense>} />
            
            {/* Old website redirects based on top pages */}
            <Route path="/top-4-netflix-shows-to-explore-from-the-dentists-chair/" element={<Navigate to="/client-experience" replace />} />
            <Route path="/5-ways-to-improve-oral-care-while-youre-at-work/" element={<Navigate to="/faqs" replace />} />
            <Route path="/long-will-take-fix-crooked-teeth/" element={<Navigate to="/services" replace />} />
            <Route path="/finding-the-best-cosmetic-dentist-in-the-usa-the-world/" element={<Navigate to="/about" replace />} />
            <Route path="/choosing-veneers-for-the-four-front-teeth/" element={<Navigate to="/services" replace />} />
            <Route path="/the-shapes-and-styles-of-dental-veneers/" element={<Navigate to="/services" replace />} />
            <Route path="/the-cost-of-dental-veneers-in-los-angeles/" element={<Navigate to="/services" replace />} />
            <Route path="/high-end-dentistry/" element={<Navigate to="/about" replace />} />
            <Route path="/services/teeth-cleaning/" element={<Navigate to="/services" replace />} />
            <Route path="/need-dentist-visiting-los-angeles/" element={<Navigate to="/contact" replace />} />
            <Route path="/cosmetic-dentist-venice-ca/" element={<Navigate to="/contact" replace />} />
            
            {/* Additional redirects from the screenshot */}
            <Route path="/contact/utm_source=google&utm_medium=organic&utm_campaign=gmb_listing" element={<Navigate to="/contact" replace />} />
            <Route path="/are-veneers-covered-by-insurance/" element={<Navigate to="/faqs" replace />} />
            <Route path="/restoration-and-maintenance-for-dental-veneers/" element={<Navigate to="/services" replace />} />
            
            {/* Catch-all for any other old routes */}
            <Route path="*" element={<Suspense fallback={<PageLoaderComponent />}>
              <NotFound />
            </Suspense>} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  useEffect(() => {
    console.log('App component mounted');
    
    // Initialize Sentry after React is ready
    setTimeout(() => {
      import('@/lib/sentry').then(({ initSentry, trackComponentRender }) => {
        initSentry();
        trackComponentRender('App');
      }).catch(error => {
        console.error('Failed to initialize Sentry:', error);
      });
    }, 500);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <AppRoutes />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;

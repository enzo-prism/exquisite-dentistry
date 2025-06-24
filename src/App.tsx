import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

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
const SingleToothVeneersBlog = lazy(() => import("@/pages/SingleToothVeneersBlog"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const RouteAudit = () => {
  const location = useLocation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        import('@/utils/uiAudit').then(({ logAuditResults }) => {
          console.group(`UI Audit for route: ${location.pathname}`);
          logAuditResults();
          console.groupEnd();
        });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return null;
};

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-pulse">
      <div className="w-12 h-12 bg-gold/20 rounded-full"></div>
    </div>
  </div>
);

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <RouteAudit />
    <Navbar />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Suspense fallback={<PageLoader />}>
          <Index />
        </Suspense>} />
        <Route path="/about" element={<Suspense fallback={<PageLoader />}>
          <About />
        </Suspense>} />
        <Route path="/about-us/about-dr-alexie-aguil/" element={<Navigate to="/about" replace />} />
        <Route path="/about-us" element={<Navigate to="/about" replace />} />
        <Route path="/services" element={<Suspense fallback={<PageLoader />}>
          <Services />
        </Suspense>} />
        <Route path="/services/general-dentistry/" element={<Navigate to="/services" replace />} />
        <Route path="/client-experience" element={<Suspense fallback={<PageLoader />}>
          <ClientExperience />
        </Suspense>} />
        <Route path="/testimonials" element={<Suspense fallback={<PageLoader />}>
          <Testimonials />
        </Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}>
          <Contact />
        </Suspense>} />
        <Route path="/wedding" element={<Suspense fallback={<PageLoader />}>
          <Wedding />
        </Suspense>} />
        <Route path="/graduation" element={<Suspense fallback={<PageLoader />}>
          <Graduation />
        </Suspense>} />
        <Route path="/faqs" element={<Suspense fallback={<PageLoader />}>
          <FAQs />
        </Suspense>} />
        <Route path="/faq" element={<Navigate to="/faqs" replace />} />
        <Route path="/smile-gallery" element={<Suspense fallback={<PageLoader />}>
          <SmileGallery />
        </Suspense>} />
        <Route path="/blog" element={<Suspense fallback={<PageLoader />}>
          <Blog />
        </Suspense>} />
        <Route path="/blog/single-tooth-veneers-perfect-solutions" element={<Suspense fallback={<PageLoader />}>
          <SingleToothVeneersBlog />
        </Suspense>} />
        <Route path="/privacy-policy" element={<Suspense fallback={<PageLoader />}>
          <PrivacyPolicy />
        </Suspense>} />
        <Route path="/terms-of-service" element={<Suspense fallback={<PageLoader />}>
          <TermsOfService />
        </Suspense>} />
        <Route path="/hipaa-compliance" element={<Suspense fallback={<PageLoader />}>
          <HipaaCompliance />
        </Suspense>} />
        
        {/* Old website redirects based on top pages */}
        <Route path="/choosing-veneers-for-the-front-4-teeth/" element={<Navigate to="/services" replace />} />
        <Route path="/choosing-veneers-for-just-one-tooth/" element={<Navigate to="/services" replace />} />
        <Route path="/top-4-netflix-shows-to-explore-from-the-dentists-chair/" element={<Navigate to="/client-experience" replace />} />
        <Route path="/can-damaged-teeth-repair-themselves-naturally/" element={<Navigate to="/faqs" replace />} />
        <Route path="/services/zoom-whitening/" element={<Navigate to="/services" replace />} />
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
        <Route path="*" element={<Suspense fallback={<PageLoader />}>
          <NotFound />
        </Suspense>} />
      </Routes>
    </main>
    <Footer />
  </>
);

const App = () => {
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

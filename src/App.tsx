
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ClientExperience from "@/pages/ClientExperience";
import Wedding from "@/pages/Wedding";
import Graduation from "@/pages/Graduation";
import FAQs from "@/pages/FAQs";
import SmileGallery from "@/pages/SmileGallery";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import HipaaCompliance from "@/pages/HipaaCompliance";

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

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <RouteAudit />
    <Navbar />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-us/about-dr-alexie-aguil/" element={<Navigate to="/about" replace />} />
        <Route path="/about-us" element={<Navigate to="/about" replace />} />
        <Route path="/services" element={<Services />} />
        <Route path="/client-experience" element={<ClientExperience />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/graduation" element={<Graduation />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/faq" element={<Navigate to="/faqs" replace />} />
        <Route path="/smile-gallery" element={<SmileGallery />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/hipaa-compliance" element={<HipaaCompliance />} />
        
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
        <Route path="*" element={<NotFound />} />
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

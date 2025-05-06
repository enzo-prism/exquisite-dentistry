
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ClientResources from "@/pages/ClientResources";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ClientExperience from "@/pages/ClientExperience";
import Wedding from "@/pages/Wedding";
import Graduation from "@/pages/Graduation";
import FAQs from "@/pages/FAQs";
import SmileGallery from "@/pages/SmileGallery";

const queryClient = new QueryClient();

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
    <RouteAudit />
    <Navbar />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/client-resources" element={<ClientResources />} />
        <Route path="/client-experience" element={<ClientExperience />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/graduation" element={<Graduation />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/smile-gallery" element={<SmileGallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </>
);

const App = () => (
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

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import PatientResources from "@/pages/PatientResources";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import PatientExperience from "@/pages/PatientExperience";
import Wedding from "@/pages/Wedding";
import Graduation from "@/pages/Graduation";

const queryClient = new QueryClient();

// Internal component to run audit on route changes
const RouteAudit = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Wait for the page to fully render before running the audit
    const timer = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        // Only import in development mode to avoid bundling in production
        import('@/utils/uiAudit').then(({ logAuditResults }) => {
          console.group(`UI Audit for route: ${location.pathname}`);
          logAuditResults();
          console.groupEnd();
        });
      }
    }, 500); // Short delay to ensure components are rendered
    
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
        <Route path="/patient-resources" element={<PatientResources />} />
        <Route path="/patient-experience" element={<PatientExperience />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/graduation" element={<Graduation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

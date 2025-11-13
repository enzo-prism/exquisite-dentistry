import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useSectionFix } from "@/hooks/use-section-fix";
import { setupErrorReduction } from "@/utils/errorReduction";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LegacyRedirectHandler from "@/components/LegacyRedirectHandler";

// Lazy load all routes for code splitting
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Tour = lazy(() => import("@/pages/Tour"));
const Services = lazy(() => import("@/pages/Services"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Contact = lazy(() => import("@/pages/Contact"));
const ClientExperience = lazy(() => import("@/pages/ClientExperience"));
const Wedding = lazy(() => import("@/pages/Wedding"));
const Graduation = lazy(() => import("@/pages/Graduation"));
const FAQs = lazy(() => import("@/pages/FAQs"));
const SmileGallery = lazy(() => import("@/pages/SmileGallery"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const HipaaCompliance = lazy(() => import("@/pages/HipaaCompliance"));
const Blog = lazy(() => import("@/pages/Blog"));
const Veneers = lazy(() => import("@/pages/Veneers"));
const ZoomWhitening = lazy(() => import("@/pages/ZoomWhitening"));
const Invisalign = lazy(() => import("@/pages/Invisalign"));
const VeneersLosAngeles = lazy(() => import("@/pages/VeneersLosAngeles"));
const TeethWhitening = lazy(() => import("@/pages/TeethWhitening"));
const DentalImplants = lazy(() => import("@/pages/DentalImplants"));
const DentalBridge = lazy(() => import("@/pages/DentalBridge"));
const DentalCrowns = lazy(() => import("@/pages/DentalCrowns"));
const CosmeticDentistry = lazy(() => import("@/pages/CosmeticDentistry"));
const EmergencyDentist = lazy(() => import("@/pages/EmergencyDentist"));
const IteroScanner = lazy(() => import("@/pages/IteroScanner"));
const TransformationStories = lazy(() => import("@/pages/TransformationStories"));
const TransformationStoryPage = lazy(() => import("@/pages/TransformationStoryPage"));
const ShareYourStory = lazy(() => import("@/pages/ShareYourStory"));
const TeethCleaning = lazy(() => import("@/pages/TeethCleaning"));
const RootCanal = lazy(() => import("@/pages/RootCanal"));
const PainFreeDentistry = lazy(() => import("@/pages/PainFreeDentistry"));
const OralCancerScreening = lazy(() => import("@/pages/OralCancerScreening"));
const BeverlyHillsDentist = lazy(() => import("@/pages/BeverlyHillsDentist"));
const WestHollywoodDentist = lazy(() => import("@/pages/WestHollywoodDentist"));
const CulverCityDentist = lazy(() => import("@/pages/CulverCityDentist"));
const WestLADentist = lazy(() => import("@/pages/WestLADentist"));
const BelAirDentist = lazy(() => import("@/pages/BelAirDentist"));
const Zip90048Dentist = lazy(() => import("@/pages/Zip90048Dentist"));
const MelroseDentist = lazy(() => import("@/pages/MelroseDentist"));
const WestwoodDentist = lazy(() => import("@/pages/WestwoodDentist"));
const StaticSitemap = lazy(() => import("@/components/StaticSitemap"));
const BlogPostContainer = lazy(() => import("@/components/blog/BlogPostContainer"));
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

import PageLoader from '@/components/ui/page-loader';
import PageTransition from '@/components/ui/page-transition';
import ScrollProgress from '@/components/ScrollProgress';

const PageLoaderComponent = () => {
  return <PageLoader variant="minimal" message="Loading..." />;
};

const AppRoutes = () => {
  const location = useLocation();
  const isSitemapPage = location.pathname === '/sitemap';
  
  // Fix section gaps and background consistency
  useSectionFix(300);

  // Set proper content type for XML sitemap route
  useEffect(() => {
    if (location.pathname === '/sitemap.xml') {
      // This is a hint for the browser, actual content-type is handled by server config
      document.title = 'XML Sitemap';
    }
  }, [location.pathname]);

  return (
    <>
      <LegacyRedirectHandler />
      {!isSitemapPage && <ScrollProgress />}
      {!isSitemapPage && <ScrollToTop />}
      {!isSitemapPage && <Navbar />}
      <main className="flex-grow">
        {!isSitemapPage ? (
          <PageTransition>
            <Routes>
              <Route path="/" element={<Suspense fallback={<PageLoaderComponent />}>
                <Index />
              </Suspense>} />
              <Route path="/about" element={<Suspense fallback={<PageLoaderComponent />}>
                <About />
              </Suspense>} />
              <Route path="/tour" element={<Suspense fallback={<PageLoaderComponent />}>
                <Tour />
              </Suspense>} />
              <Route path="/services" element={<Suspense fallback={<PageLoaderComponent />}>
                <Services />
              </Suspense>} />
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
              <Route path="/smile-gallery" element={<Suspense fallback={<PageLoaderComponent />}>
                <SmileGallery />
              </Suspense>} />
              
              <Route path="/blog" element={<Suspense fallback={<PageLoaderComponent />}>
                <Blog />
              </Suspense>} />
              <Route path="/blog/:slug" element={<Suspense fallback={<PageLoaderComponent />}>
                <BlogPostContainer />
              </Suspense>} />
              
              <Route path="/privacy-policy" element={<Suspense fallback={<PageLoaderComponent />}>
                <PrivacyPolicy />
              </Suspense>} />
              <Route path="/terms-of-service" element={<Suspense fallback={<PageLoaderComponent />}>
                <TermsOfService />
              </Suspense>} />
              <Route path="/hipaa-compliance" element={<Suspense fallback={<PageLoaderComponent />}>
                <HipaaCompliance />
              </Suspense>} />
              
              <Route path="/veneers" element={<Suspense fallback={<PageLoaderComponent />}>
                <Veneers />
              </Suspense>} />
              <Route path="/veneers-los-angeles" element={<Suspense fallback={<PageLoaderComponent />}>
                <VeneersLosAngeles />
              </Suspense>} />
              <Route path="/zoom-whitening" element={<Suspense fallback={<PageLoaderComponent />}>
                <ZoomWhitening />
              </Suspense>} />
              <Route path="/invisalign" element={<Suspense fallback={<PageLoaderComponent />}>
                <Invisalign />
              </Suspense>} />
              <Route path="/itero-scanner" element={<Suspense fallback={<PageLoaderComponent />}>
                <IteroScanner />
              </Suspense>} />
              <Route path="/teeth-whitening" element={<Suspense fallback={<PageLoaderComponent />}>
                <TeethWhitening />
              </Suspense>} />
              <Route path="/teeth-cleaning" element={<Suspense fallback={<PageLoaderComponent />}>
                <TeethCleaning />
              </Suspense>} />
              <Route path="/dental-implants" element={<Suspense fallback={<PageLoaderComponent />}>
                <DentalImplants />
              </Suspense>} />
              <Route path="/dental-bridge" element={<Suspense fallback={<PageLoaderComponent />}>
                <DentalBridge />
              </Suspense>} />
              <Route path="/dental-crowns" element={<Suspense fallback={<PageLoaderComponent />}>
                <DentalCrowns />
              </Suspense>} />
              <Route path="/cosmetic-dentistry" element={<Suspense fallback={<PageLoaderComponent />}>
                <CosmeticDentistry />
              </Suspense>} />
              <Route path="/emergency-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <EmergencyDentist />
              </Suspense>} />
              <Route path="/root-canal" element={<Suspense fallback={<PageLoaderComponent />}>
                <RootCanal />
              </Suspense>} />
              <Route path="/pain-free-dentistry" element={<Suspense fallback={<PageLoaderComponent />}>
                <PainFreeDentistry />
              </Suspense>} />
              <Route path="/oral-cancer-screening" element={<Suspense fallback={<PageLoaderComponent />}>
                <OralCancerScreening />
              </Suspense>} />
              
              <Route path="/transformation-stories" element={<Suspense fallback={<PageLoaderComponent />}>
                <TransformationStories />
              </Suspense>} />
              <Route path="/transformation-stories/:slug" element={<Suspense fallback={<PageLoaderComponent />}>
                <TransformationStoryPage />
              </Suspense>} />
              <Route path="/share-your-story" element={<Suspense fallback={<PageLoaderComponent />}>
                <ShareYourStory />
              </Suspense>} />
              <Route path="/west-hollywood-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <WestHollywoodDentist />
              </Suspense>} />
              <Route path="/beverly-hills-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <BeverlyHillsDentist />
              </Suspense>} />
              <Route path="/culver-city-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <CulverCityDentist />
              </Suspense>} />
              <Route path="/west-la-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <WestLADentist />
              </Suspense>} />
              <Route path="/bel-air-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <BelAirDentist />
              </Suspense>} />
              <Route path="/90048-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <Zip90048Dentist />
              </Suspense>} />
              <Route path="/melrose-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <MelroseDentist />
              </Suspense>} />
              <Route path="/westwood-dentist" element={<Suspense fallback={<PageLoaderComponent />}>
                <WestwoodDentist />
              </Suspense>} />
            </Routes>
          </PageTransition>
        ) : (
          <Routes>
            <Route path="/sitemap" element={<Suspense fallback={<PageLoaderComponent />}>
              <StaticSitemap />
          </Suspense>} />
          </Routes>
        )}
      </main>
      {!isSitemapPage && <Footer />}
    </>
  );
};

const App = () => {
  // Initialize error reduction on app start
  React.useEffect(() => {
    setupErrorReduction();
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

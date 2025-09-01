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
const TransformationStories = lazy(() => import("@/pages/TransformationStories"));
const TransformationStoryPage = lazy(() => import("@/pages/TransformationStoryPage"));
const ShareYourStory = lazy(() => import("@/pages/ShareYourStory"));
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
import { generateXmlSitemap } from '@/utils/sitemapGenerator';

const PageLoaderComponent = () => {
  return <PageLoader variant="minimal" message="Loading..." />;
};

// XML Sitemap component for serving XML content
const XmlSitemap = () => {
  const xmlContent = generateXmlSitemap();

  return (
    <pre
      style={{ 
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        border: 'none',
        margin: 0,
        fontSize: '12px',
        lineHeight: '1.4'
      }}
      dangerouslySetInnerHTML={{ __html: xmlContent }}
    />
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isSitemapPage = location.pathname === '/sitemap' || location.pathname === '/sitemap.xml';
  
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
              <Route path="/zoom-whitening" element={<Suspense fallback={<PageLoaderComponent />}>
                <ZoomWhitening />
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
            </Routes>
          </PageTransition>
        ) : (
          <Routes>
            <Route path="/sitemap" element={<Suspense fallback={<PageLoaderComponent />}>
              <StaticSitemap />
            </Suspense>} />
            <Route path="/sitemap.xml" element={<XmlSitemap />} />
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

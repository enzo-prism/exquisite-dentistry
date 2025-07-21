
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
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
const BlogPost = lazy(() => import("@/components/blog/BlogPost"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Sitemap = lazy(() => import("@/pages/Sitemap"));

import PageLoader from '@/components/ui/page-loader';
import PageTransition from '@/components/ui/page-transition';
import ScrollProgress from '@/components/ScrollProgress';

const PageLoaderComponent = () => {
  return <PageLoader variant="minimal" message="Loading..." />;
};

// XML Sitemap component for serving XML content
const XmlSitemap = () => {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://exquisitedentistryla.com/</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/about</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/services</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/client-experience</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/testimonials</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/contact</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/wedding</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/graduation</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/faqs</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/smile-gallery</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/privacy-policy</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/terms-of-service</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/hipaa-compliance</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/blog</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/veneers</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://exquisitedentistryla.com/zoom-whitening</loc>
    <lastmod>2025-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  // Note: Content type cannot be set in React component
  
  return (
    <div
      dangerouslySetInnerHTML={{ __html: xmlContent }}
      style={{ 
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        padding: '20px',
        backgroundColor: '#f5f5f5'
      }}
    />
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isSitemapPage = location.pathname === '/sitemap' || location.pathname === '/sitemap.xml';

  return (
    <>
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
                <BlogPost />
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
            </Routes>
          </PageTransition>
        ) : (
          <Routes>
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/sitemap.xml" element={<XmlSitemap />} />
          </Routes>
        )}
      </main>
      {!isSitemapPage && <Footer />}
    </>
  );
};

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

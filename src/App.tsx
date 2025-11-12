import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useSectionFix } from "@/hooks/use-section-fix";
import { setupErrorReduction } from "@/utils/errorReduction";
import useRoutePrefetch from "@/hooks/use-route-prefetch";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LegacyRedirectHandler from "@/components/LegacyRedirectHandler";
import RouteSkeleton from "@/components/skeletons/RouteSkeleton";
import PageTransition from '@/components/ui/page-transition';
import ScrollProgress from '@/components/ScrollProgress';
import Index from '@/pages/Index';

// Lazy load subsequent routes for code splitting
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
const CosmeticDentistry = lazy(() => import("@/pages/CosmeticDentistry"));
const EmergencyDentist = lazy(() => import("@/pages/EmergencyDentist"));
const IteroScanner = lazy(() => import("@/pages/IteroScanner"));
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

const withRouteSkeleton = (
  Component: React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>,
  props: React.ComponentProps<typeof RouteSkeleton>
) => (
  <Suspense fallback={<RouteSkeleton {...props} />}>
    <Component />
  </Suspense>
);

const AppRoutes = () => {
  const location = useLocation();
  const isSitemapPage = location.pathname === '/sitemap';
  useRoutePrefetch();
  
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
              <Route path="/" element={<Index />} />
              <Route
                path="/about"
                element={withRouteSkeleton(About, {
                  title: 'About Exquisite Dentistry',
                  description: 'Meet Dr. Aguil and explore our Beverly Hills studio.',
                  variant: 'article'
                })}
              />
              <Route
                path="/tour"
                element={withRouteSkeleton(Tour, {
                  title: 'Office Gallery',
                  description: 'Step inside our private suites and finishing studio.',
                  variant: 'gallery'
                })}
              />
              <Route
                path="/services"
                element={withRouteSkeleton(Services, {
                  title: 'Cosmetic & restorative dentistry services',
                  description: 'Full-smile makeovers, Invisalign, whitening, and more.'
                })}
              />
              <Route
                path="/client-experience"
                element={withRouteSkeleton(ClientExperience, {
                  title: 'Client Experience',
                  description: 'See how we pair five-star hospitality with dentistry.'
                })}
              />
              <Route
                path="/testimonials"
                element={withRouteSkeleton(Testimonials, {
                  title: 'Client Testimonials',
                  description: 'Real stories from our Beverly Hills patients.',
                  variant: 'article'
                })}
              />
              <Route
                path="/contact"
                element={withRouteSkeleton(Contact, {
                  title: 'Contact Exquisite Dentistry',
                  description: 'Call, text, or schedule your private consultation.',
                  showCTA: false,
                  variant: 'article'
                })}
              />
              <Route
                path="/wedding"
                element={withRouteSkeleton(Wedding, {
                  title: 'Wedding Smile Plan',
                  description: 'Timeline-driven cosmetic plans for events.'
                })}
              />
              <Route
                path="/graduation"
                element={withRouteSkeleton(Graduation, {
                  title: 'Graduation Smile Plan',
                  description: 'Seasonal cosmetic packages for grads.'
                })}
              />
              <Route
                path="/faqs"
                element={withRouteSkeleton(FAQs, {
                  title: 'FAQs',
                  description: 'Answers to smile planning, financing, and care questions.',
                  variant: 'article'
                })}
              />
              <Route
                path="/smile-gallery"
                element={withRouteSkeleton(SmileGallery, {
                  title: 'Smile Gallery',
                  description: 'Before-and-after transformations.',
                  variant: 'gallery'
                })}
              />
              
              <Route
                path="/blog"
                element={withRouteSkeleton(Blog, {
                  title: 'Exquisite Dentistry Blog',
                  description: 'Guides on veneers, whitening, and smile maintenance.',
                  variant: 'article'
                })}
              />
              <Route
                path="/blog/:slug"
                element={withRouteSkeleton(BlogPostContainer, {
                  title: 'Loading article',
                  description: 'Preparing detailed insights.',
                  variant: 'article'
                })}
              />
              
              <Route
                path="/privacy-policy"
                element={withRouteSkeleton(PrivacyPolicy, {
                  title: 'Privacy Policy',
                  description: 'How we secure patient information.',
                  showCTA: false,
                  variant: 'article'
                })}
              />
              <Route
                path="/terms-of-service"
                element={withRouteSkeleton(TermsOfService, {
                  title: 'Terms of Service',
                  description: 'Understand the terms for using our site.',
                  showCTA: false,
                  variant: 'article'
                })}
              />
              <Route
                path="/hipaa-compliance"
                element={withRouteSkeleton(HipaaCompliance, {
                  title: 'HIPAA Compliance',
                  description: 'Our safeguards for healthcare data.',
                  showCTA: false,
                  variant: 'article'
                })}
              />
              
              <Route
                path="/veneers"
                element={withRouteSkeleton(Veneers, {
                  title: 'Porcelain Veneers',
                  description: 'Custom treatment plans for camera-ready smiles.'
                })}
              />
              <Route
                path="/veneers-los-angeles"
                element={withRouteSkeleton(VeneersLosAngeles, {
                  title: 'LA Veneers Studio',
                  description: 'Tailored veneer experiences for Angelenos.'
                })}
              />
              <Route
                path="/zoom-whitening"
                element={withRouteSkeleton(ZoomWhitening, {
                  title: 'Zoom Whitening',
                  description: 'Accelerated whitening protocols.'
                })}
              />
              <Route
                path="/invisalign"
                element={withRouteSkeleton(Invisalign, {
                  title: 'Invisalign',
                  description: 'Discreet aligner therapy with concierge visits.'
                })}
              />
              <Route
                path="/itero-scanner"
                element={withRouteSkeleton(IteroScanner, {
                  title: 'iTero Scanner',
                  description: 'Precision scans for aligners and veneers.',
                  showCTA: false
                })}
              />
              <Route
                path="/teeth-whitening"
                element={withRouteSkeleton(TeethWhitening, {
                  title: 'Teeth Whitening',
                  description: 'At-home and in-studio whitening plans.'
                })}
              />
              <Route
                path="/dental-implants"
                element={withRouteSkeleton(DentalImplants, {
                  title: 'Dental Implants',
                  description: 'Smile restorations that feel natural.'
                })}
              />
              <Route
                path="/cosmetic-dentistry"
                element={withRouteSkeleton(CosmeticDentistry, {
                  title: 'Cosmetic Dentistry',
                  description: 'Layered treatments for total-smile glow-ups.'
                })}
              />
              <Route
                path="/emergency-dentist"
                element={withRouteSkeleton(EmergencyDentist, {
                  title: 'Emergency Dentist',
                  description: 'Same-day support for urgent smile concerns.'
                })}
              />
              
              <Route
                path="/transformation-stories"
                element={withRouteSkeleton(TransformationStories, {
                  title: 'Transformation Stories',
                  description: 'Behind-the-scenes of our favorite glow-ups.',
                  variant: 'gallery'
                })}
              />
              <Route
                path="/transformation-stories/:slug"
                element={withRouteSkeleton(TransformationStoryPage, {
                  title: 'Transformation Story',
                  description: 'Previewing the featured journey.',
                  variant: 'article'
                })}
              />
              <Route
                path="/share-your-story"
                element={withRouteSkeleton(ShareYourStory, {
                  title: 'Share Your Story',
                  description: 'Tell us about your goals before visiting.',
                  variant: 'article'
                })}
              />
            </Routes>
          </PageTransition>
        ) : (
          <Routes>
            <Route
              path="/sitemap"
              element={withRouteSkeleton(StaticSitemap, {
                title: 'Sitemap',
                description: 'Indexing all public-facing pages.',
                showCTA: false,
                variant: 'article'
              })}
            />
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

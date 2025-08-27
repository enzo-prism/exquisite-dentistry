import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateSitemapData } from '@/utils/sitemapGenerator';
import { CANONICAL_URLS } from '@/hooks/use-canonical';

const StaticSitemap = () => {
  const sitemapData = generateSitemapData();
  
  // Group URLs by category for better organization
  const groupedUrls = {
    main: sitemapData.filter(url => 
      ['/', '/about', '/services', '/contact'].some(path => url.loc.endsWith(path))
    ),
    treatments: sitemapData.filter(url => 
      ['/veneers', '/zoom-whitening'].some(path => url.loc.endsWith(path))
    ),
    experience: sitemapData.filter(url => 
      ['/smile-gallery', '/testimonials', '/client-experience', '/transformation-stories'].some(path => url.loc.endsWith(path))
    ),
    special: sitemapData.filter(url => 
      ['/wedding', '/graduation'].some(path => url.loc.endsWith(path))
    ),
    resources: sitemapData.filter(url => 
      ['/blog', '/faqs'].some(path => url.loc.endsWith(path))
    ),
    blog: sitemapData.filter(url => url.loc.includes('/blog/') && !url.loc.endsWith('/blog')),
    legal: sitemapData.filter(url => 
      ['/privacy-policy', '/terms-of-service', '/hipaa-compliance'].some(path => url.loc.endsWith(path))
    )
  };

  return (
    <>
      <Helmet>
        <title>Site Map | Exquisite Dentistry</title>
        
        
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Site Map
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Navigate our complete website with this comprehensive site map. Find all our dental services, patient resources, and important information.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Pages */}
              <section className="bg-card p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gold mb-4 flex items-center">
                  🏠 Main Pages
                </h2>
                <ul className="space-y-2">
                  {groupedUrls.main.map((url) => (
                    <li key={url.loc}>
                      <Link 
                        to={url.loc.replace('https://exquisitedentistryla.com', '')}
                        className="text-primary hover:text-gold transition-colors duration-200 flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {getPageTitle(url.loc)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Priority: {url.priority}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Treatments */}
              <section className="bg-card p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gold mb-4 flex items-center">
                  ✨ Treatments
                </h2>
                <ul className="space-y-2">
                  {groupedUrls.treatments.map((url) => (
                    <li key={url.loc}>
                      <Link 
                        to={url.loc.replace('https://exquisitedentistryla.com', '')}
                        className="text-primary hover:text-gold transition-colors duration-200 flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {getPageTitle(url.loc)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Priority: {url.priority}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Patient Experience */}
              <section className="bg-card p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gold mb-4 flex items-center">
                  💎 Patient Experience
                </h2>
                <ul className="space-y-2">
                  {groupedUrls.experience.map((url) => (
                    <li key={url.loc}>
                      <Link 
                        to={url.loc.replace('https://exquisitedentistryla.com', '')}
                        className="text-primary hover:text-gold transition-colors duration-200 flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {getPageTitle(url.loc)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Priority: {url.priority}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Special Events */}
              <section className="bg-card p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gold mb-4 flex items-center">
                  🎉 Special Events
                </h2>
                <ul className="space-y-2">
                  {groupedUrls.special.map((url) => (
                    <li key={url.loc}>
                      <Link 
                        to={url.loc.replace('https://exquisitedentistryla.com', '')}
                        className="text-primary hover:text-gold transition-colors duration-200 flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {getPageTitle(url.loc)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Priority: {url.priority}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Resources */}
              <section className="bg-card p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gold mb-4 flex items-center">
                  📚 Resources
                </h2>
                <ul className="space-y-2">
                  {groupedUrls.resources.map((url) => (
                    <li key={url.loc}>
                      <Link 
                        to={url.loc.replace('https://exquisitedentistryla.com', '')}
                        className="text-primary hover:text-gold transition-colors duration-200 flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {getPageTitle(url.loc)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Priority: {url.priority}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Legal */}
              <section className="bg-card p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gold mb-4 flex items-center">
                  ⚖️ Legal & Compliance
                </h2>
                <ul className="space-y-2">
                  {groupedUrls.legal.map((url) => (
                    <li key={url.loc}>
                      <Link 
                        to={url.loc.replace('https://exquisitedentistryla.com', '')}
                        className="text-primary hover:text-gold transition-colors duration-200 flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {getPageTitle(url.loc)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Priority: {url.priority}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Blog Posts */}
            {groupedUrls.blog.length > 0 && (
              <section className="bg-card p-6 rounded-lg shadow-sm border mb-8">
                <h2 className="text-2xl font-semibold text-gold mb-6 flex items-center">
                  📝 Blog Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedUrls.blog.map((url) => (
                    <Link 
                      key={url.loc}
                      to={url.loc.replace('https://exquisitedentistryla.com', '')}
                      className="p-4 border rounded-lg hover:border-gold transition-colors duration-200 group"
                    >
                      <h3 className="font-medium text-primary group-hover:text-gold transition-colors">
                        {getBlogTitle(url.loc)}
                      </h3>
                      <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                        <span>Updated: {new Date(url.lastmod).toLocaleDateString()}</span>
                        <span>Priority: {url.priority}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Resources */}
            <section className="bg-gradient-to-r from-gold/10 to-primary/10 p-6 rounded-lg border">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Additional Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="/sitemap.xml" 
                  className="flex items-center p-3 bg-card rounded border hover:border-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-gold mr-2">🗺️</span>
                  <span>XML Sitemap</span>
                </a>
                <a 
                  href="/robots.txt" 
                  className="flex items-center p-3 bg-card rounded border hover:border-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-gold mr-2">🤖</span>
                  <span>Robots.txt</span>
                </a>
                <Link 
                  to="/contact" 
                  className="flex items-center p-3 bg-card rounded border hover:border-gold transition-colors"
                >
                  <span className="text-gold mr-2">📞</span>
                  <span>Contact Us</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get user-friendly page titles
const getPageTitle = (url: string): string => {
  const path = url.replace('https://exquisitedentistryla.com', '');
  const titleMap: Record<string, string> = {
    '/': 'Home',
    '/about': 'About Dr. Aguil',
    '/services': 'Our Services',
    '/contact': 'Contact Us',
    '/veneers': 'Porcelain Veneers',
    '/zoom-whitening': 'Zoom Whitening',
    '/smile-gallery': 'Smile Gallery',
    '/testimonials': 'Testimonials',
    '/client-experience': 'Client Experience',
    '/transformation-stories': 'Transformation Stories',
    '/blog': 'Blog',
    '/faqs': 'FAQs',
    '/wedding': 'Wedding Smiles',
    '/graduation': 'Graduation Ready',
    '/privacy-policy': 'Privacy Policy',
    '/terms-of-service': 'Terms of Service',
    '/hipaa-compliance': 'HIPAA Compliance'
  };
  return titleMap[path] || path;
};

// Helper function to get blog post titles
const getBlogTitle = (url: string): string => {
  const slug = url.split('/blog/')[1];
  if (!slug) return 'Blog Post';
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default StaticSitemap;
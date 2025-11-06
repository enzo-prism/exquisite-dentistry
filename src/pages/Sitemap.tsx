
import React from 'react';
import { generateSitemapData } from '@/utils/sitemapGenerator';
import PageSEO from '@/components/seo/PageSEO';

const Sitemap = () => {
  const sitemapData = generateSitemapData();
  
  // Group URLs by category for better organization
  const groupedUrls = {
    main: sitemapData.filter(url => 
      ['/', '/about', '/services', '/contact'].some(path => url.loc.endsWith(path))
    ),
    services: sitemapData.filter(url => 
      [
        '/veneers',
        '/veneers-los-angeles',
        '/zoom-whitening',
        '/teeth-whitening',
        '/invisalign',
        '/dental-implants',
        '/cosmetic-dentistry',
        '/emergency-dentist'
      ].some(path => url.loc.endsWith(path))
    ),
    experience: sitemapData.filter(url => 
      ['/client-experience', '/testimonials', '/smile-gallery', '/faqs'].some(path => url.loc.endsWith(path))
    ),
    special: sitemapData.filter(url => 
      ['/wedding', '/graduation'].some(path => url.loc.endsWith(path))
    ),
    blog: sitemapData.filter(url => 
      url.loc.includes('/blog')
    ),
    legal: sitemapData.filter(url => 
      ['/privacy-policy', '/terms-of-service', '/hipaa-compliance'].some(path => url.loc.endsWith(path))
    )
  };

  return (
    <>
      <PageSEO
        title="Website Directory & Sitemap | Exquisite Dentistry LA"
        description="Browse every page on Exquisite Dentistry’s website including cosmetic services, patient resources, legal policies, and blog content."
        path="/sitemap"
        keywords="Exquisite Dentistry sitemap, dental website directory, Los Angeles dentist site map"
      />
      <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1rem',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#000' }}>
        Sitemap - Exquisite Dentistry
      </h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Complete directory of all {sitemapData.length} pages on our website
        </p>
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Main Pages</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {groupedUrls.main.map(url => (
            <li key={url.loc} style={{ marginBottom: '0.5rem' }}>
              <a href={url.loc.replace('https://exquisitedentistryla.com', '')} 
                 style={{ color: '#0066cc', textDecoration: 'none' }}>
                {getPageTitle(url.loc)}
              </a>
              <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                - Priority: {url.priority} | Updated: {url.lastmod}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Dental Services</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {groupedUrls.services.map(url => (
            <li key={url.loc} style={{ marginBottom: '0.5rem' }}>
              <a href={url.loc.replace('https://exquisitedentistryla.com', '')} 
                 style={{ color: '#0066cc', textDecoration: 'none' }}>
                {getPageTitle(url.loc)}
              </a>
              <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                - Priority: {url.priority}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Patient Experience</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {groupedUrls.experience.map(url => (
            <li key={url.loc} style={{ marginBottom: '0.5rem' }}>
              <a href={url.loc.replace('https://exquisitedentistryla.com', '')} 
                 style={{ color: '#0066cc', textDecoration: 'none' }}>
                {getPageTitle(url.loc)}
              </a>
              <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                - Priority: {url.priority}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Special Occasions</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {groupedUrls.special.map(url => (
            <li key={url.loc} style={{ marginBottom: '0.5rem' }}>
              <a href={url.loc.replace('https://exquisitedentistryla.com', '')} 
                 style={{ color: '#0066cc', textDecoration: 'none' }}>
                {getPageTitle(url.loc)}
              </a>
              <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                - Priority: {url.priority}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>
          Blog & Information ({groupedUrls.blog.length} articles)
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {groupedUrls.blog.map(url => (
            <li key={url.loc} style={{ marginBottom: '0.5rem' }}>
              <a href={url.loc.replace('https://exquisitedentistryla.com', '')} 
                 style={{ color: '#0066cc', textDecoration: 'none' }}>
                {getBlogTitle(url.loc)}
              </a>
              <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                - Priority: {url.priority} | Updated: {url.lastmod}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Legal & Compliance</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {groupedUrls.legal.map(url => (
            <li key={url.loc} style={{ marginBottom: '0.5rem' }}>
              <a href={url.loc.replace('https://exquisitedentistryla.com', '')} 
                 style={{ color: '#0066cc', textDecoration: 'none' }}>
                {getPageTitle(url.loc)}
              </a>
              <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                - Priority: {url.priority}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #ddd' }}>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Last updated: {new Date().toLocaleDateString()} | Total pages: {sitemapData.length}
        </p>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Exquisite Dentistry - 6227 Wilshire Blvd, Los Angeles, CA 90048 - (323) 272-2388
        </p>
        <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '1rem' }}>
          <a href="/sitemap.xml" style={{ color: '#0066cc' }}>View XML Sitemap</a>
        </p>
      </footer>
    </div>
    </>
  );
};

// Helper functions for cleaner titles
const getPageTitle = (url: string): string => {
  const path = url.replace('https://exquisitedentistryla.com', '');
  const titleMap: Record<string, string> = {
    '/': 'Home',
    '/about': 'About Dr. Aguil',
    '/services': 'Our Services',
    '/contact': 'Contact Us',
    '/veneers': 'Porcelain Veneers',
    '/veneers-los-angeles': 'Veneers Los Angeles',
    '/zoom-whitening': 'Zoom Whitening',
    '/teeth-whitening': 'Teeth Whitening',
    '/invisalign': 'Invisalign',
    '/dental-implants': 'Dental Implants',
    '/cosmetic-dentistry': 'Cosmetic Dentistry',
    '/emergency-dentist': 'Emergency Dentist',
    '/testimonials': 'Patient Testimonials',
    '/client-experience': 'Client Experience',
    '/smile-gallery': 'Smile Gallery',
    '/faqs': 'Frequently Asked Questions',
    '/wedding': 'Wedding Smiles',
    '/graduation': 'Graduation Ready',
    '/privacy-policy': 'Privacy Policy',
    '/terms-of-service': 'Terms of Service',
    '/hipaa-compliance': 'HIPAA Compliance',
    '/blog': 'Blog & Articles'
  };
  return titleMap[path] || path;
};

const getBlogTitle = (url: string): string => {
  const slug = url.split('/').pop() || '';
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export default Sitemap;

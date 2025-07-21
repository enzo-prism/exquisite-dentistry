
import React from 'react';

const Sitemap = () => {
  return (
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
          Complete directory of all pages on our website
        </p>
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Main Pages</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Main landing page</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/about" style={{ color: '#0066cc', textDecoration: 'none' }}>About Dr. Aguil</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Meet our dentist</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/services" style={{ color: '#0066cc', textDecoration: 'none' }}>Our Services</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Complete dental services</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/contact" style={{ color: '#0066cc', textDecoration: 'none' }}>Contact Us</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Get in touch</span>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Dental Services</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/veneers" style={{ color: '#0066cc', textDecoration: 'none' }}>Veneers</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Porcelain veneers</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/zoom-whitening" style={{ color: '#0066cc', textDecoration: 'none' }}>Zoom Whitening</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Professional teeth whitening</span>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Special Occasions</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/wedding" style={{ color: '#0066cc', textDecoration: 'none' }}>Wedding Smiles</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Perfect smile for your big day</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/graduation" style={{ color: '#0066cc', textDecoration: 'none' }}>Graduation Ready</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Graduation smile preparation</span>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Patient Resources</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/client-experience" style={{ color: '#0066cc', textDecoration: 'none' }}>Client Experience</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- What to expect</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/testimonials" style={{ color: '#0066cc', textDecoration: 'none' }}>Testimonials</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Patient reviews</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/smile-gallery" style={{ color: '#0066cc', textDecoration: 'none' }}>Smile Gallery</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Before and after photos</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/faqs" style={{ color: '#0066cc', textDecoration: 'none' }}>FAQs</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Frequently asked questions</span>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Blog & Information</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/blog" style={{ color: '#0066cc', textDecoration: 'none' }}>Blog</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Dental tips and news</span>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>Legal & Compliance</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/privacy-policy" style={{ color: '#0066cc', textDecoration: 'none' }}>Privacy Policy</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- How we protect your data</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/terms-of-service" style={{ color: '#0066cc', textDecoration: 'none' }}>Terms of Service</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Service terms and conditions</span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/hipaa-compliance" style={{ color: '#0066cc', textDecoration: 'none' }}>HIPAA Compliance</a>
            <span style={{ color: '#666', marginLeft: '0.5rem' }}>- Medical privacy compliance</span>
          </li>
        </ul>
      </section>

      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #ddd' }}>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Exquisite Dentistry - 6227 Wilshire Blvd, Los Angeles, CA 90048 - (323) 272-2388
        </p>
      </footer>
    </div>
  );
};

export default Sitemap;

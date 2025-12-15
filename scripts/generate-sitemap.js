#!/usr/bin/env node

/**
 * Sitemap Generation Script
 * Generates a fresh XML sitemap using the existing sitemap utility
 * Runs during build process to ensure dynamic content inclusion
 */

import fs from 'fs';
import path from 'path';
import { generateXmlSitemap } from '../src/utils/sitemapGenerator.ts';

const generateSitemap = () => {
  try {
    console.log('🗺️  Generating sitemap...');
    
    // Generate the XML sitemap content
    const sitemapXml = generateXmlSitemap();
    
    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write sitemap to public directory
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

    // Also write sitemap to dist so Netlify deploys the canonical version.
    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf8');
    
    // Count URLs for reporting
    const urlCount = (sitemapXml.match(/<url>/g) || []).length;
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📍 Location: /public/sitemap.xml`);
    console.log(`📍 Location: /dist/sitemap.xml`);
    console.log(`🔢 URLs included: ${urlCount}`);
    console.log(`🚀 Ready for deployment and GSC submission`);
    
  } catch (error) {
    console.error('❌ Sitemap generation failed:', error);
    process.exit(1);
  }
};

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  generateSitemap();
}

export default generateSitemap;

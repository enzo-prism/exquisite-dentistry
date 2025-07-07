#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');
const BASE_URL = 'https://exquisitedentistryla.com';

/**
 * Expected canonical URLs for each page
 */
const EXPECTED_CANONICALS = {
  'Index.tsx': 'https://exquisitedentistryla.com/',
  'About.tsx': 'https://exquisitedentistryla.com/about/',
  'Services.tsx': 'https://exquisitedentistryla.com/services/',
  'Contact.tsx': 'https://exquisitedentistryla.com/contact/',
  'Blog.tsx': 'https://exquisitedentistryla.com/blog/',
  'Testimonials.tsx': 'https://exquisitedentistryla.com/testimonials/',
  'SmileGallery.tsx': 'https://exquisitedentistryla.com/smile-gallery/',
  'FAQs.tsx': 'https://exquisitedentistryla.com/faqs/',
  'Wedding.tsx': 'https://exquisitedentistryla.com/wedding/',
  'Graduation.tsx': 'https://exquisitedentistryla.com/graduation/',
  'Veneers.tsx': 'https://exquisitedentistryla.com/veneers/',
  'ZoomWhitening.tsx': 'https://exquisitedentistryla.com/zoom-whitening/',
  'ClientExperience.tsx': 'https://exquisitedentistryla.com/client-experience/',
  'PrivacyPolicy.tsx': 'https://exquisitedentistryla.com/privacy-policy/',
  'TermsOfService.tsx': 'https://exquisitedentistryla.com/terms-of-service/',
  'HipaaCompliance.tsx': 'https://exquisitedentistryla.com/hipaa-compliance/',
  'NotFound.tsx': 'https://exquisitedentistryla.com/404/',
};

/**
 * Extract canonical URL from a React component file
 */
function extractCanonicalFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/;
    const match = content.match(canonicalRegex);
    return match ? match[1] : null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Validate canonical URL format
 */
function validateCanonicalFormat(url) {
  const issues = [];
  
  if (!url) {
    issues.push('No canonical tag found');
    return issues;
  }
  
  try {
    const parsed = new URL(url);
    
    // Check protocol
    if (parsed.protocol !== 'https:') {
      issues.push(`Should use HTTPS, found: ${parsed.protocol}`);
    }
    
    // Check domain
    if (!parsed.hostname.includes('exquisitedentistryla.com')) {
      issues.push(`Unexpected domain: ${parsed.hostname}`);
    }
    
    // Check for www
    if (parsed.hostname.startsWith('www.')) {
      issues.push('Should not include www subdomain');
    }
    
    // Check for query parameters
    if (parsed.search) {
      issues.push(`Should not include query parameters: ${parsed.search}`);
    }
    
    // Check for fragments
    if (parsed.hash) {
      issues.push(`Should not include fragments: ${parsed.hash}`);
    }
    
    // Check trailing slash consistency
    if (parsed.pathname !== '/' && !parsed.pathname.endsWith('/')) {
      issues.push('Consider adding trailing slash for consistency');
    }
    
  } catch (error) {
    issues.push(`Invalid URL format: ${error.message}`);
  }
  
  return issues;
}

/**
 * Main validation function
 */
function validateCanonicals() {
  console.log('🔍 Validating Canonical Tags\n');
  
  const files = fs.readdirSync(PAGES_DIR).filter(file => file.endsWith('.tsx'));
  const results = [];
  
  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    const canonical = extractCanonicalFromFile(filePath);
    const expected = EXPECTED_CANONICALS[file];
    const issues = validateCanonicalFormat(canonical);
    
    const result = {
      file,
      canonical,
      expected,
      issues,
      isCorrect: canonical === expected && issues.length === 0
    };
    
    results.push(result);
    
    // Print result
    const status = result.isCorrect ? '✅' : '❌';
    console.log(`${status} ${file}`);
    
    if (canonical) {
      console.log(`   Current:  ${canonical}`);
    } else {
      console.log(`   Current:  ❌ NO CANONICAL TAG`);
    }
    
    if (expected) {
      console.log(`   Expected: ${expected}`);
    }
    
    if (issues.length > 0) {
      console.log(`   Issues:`);
      issues.forEach(issue => console.log(`     - ${issue}`));
    }
    
    console.log('');
  }
  
  // Summary
  const totalFiles = results.length;
  const correctFiles = results.filter(r => r.isCorrect).length;
  const filesWithCanonicals = results.filter(r => r.canonical).length;
  
  console.log('📊 Summary:');
  console.log(`   Total pages: ${totalFiles}`);
  console.log(`   Pages with canonicals: ${filesWithCanonicals}/${totalFiles}`);
  console.log(`   Correctly implemented: ${correctFiles}/${totalFiles}`);
  
  if (correctFiles < totalFiles) {
    console.log('\n🚨 Issues found! Please review and fix the canonical tags above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All canonical tags are properly implemented!');
  }
}

// Run validation
validateCanonicals(); 
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * Build-time image validation script
 * Scans all source files for image references and validates they exist
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SRC_DIR = path.join(process.cwd(), 'src');

// Get all available images in public directory
function getAvailableImages() {
  const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'svg'];
  const images = new Set();
  
  imageExtensions.forEach(ext => {
    const pattern = path.join(PUBLIC_DIR, '**', `*.${ext}`);
    const files = glob.sync(pattern);
    files.forEach(file => {
      const relativePath = file.replace(PUBLIC_DIR, '').replace(/\\/g, '/');
      images.add(relativePath);
    });
  });
  
  return images;
}

// Extract image references from source files
function extractImageReferences() {
  const references = new Set();
  const sourceFiles = glob.sync(path.join(SRC_DIR, '**', '*.{tsx,ts,jsx,js}'));
  
  sourceFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    
    // Match various image reference patterns
    const patterns = [
      /src="([^"]+\.(png|jpg|jpeg|webp|avif|svg))"/g,
      /src=\{["']([^"']+\.(png|jpg|jpeg|webp|avif|svg))["']\}/g,
      /thumbnailUrl="([^"]+\.(png|jpg|jpeg|webp|avif|svg))"/g,
      /['"`]([^'"`]*\/lovable-uploads\/[^'"`]*\.(png|jpg|jpeg|webp|avif|svg))['"`]/g,
      /['"`]([^'"`]*\/optimized\/[^'"`]*\.(png|jpg|jpeg|webp|avif|svg))['"`]/g,
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const imagePath = match[1];
        // Skip dynamic template strings (cannot be validated statically)
        if (imagePath.includes('${')) continue;
        if (imagePath.startsWith('/')) {
          references.add(imagePath);
        }
      }
    });
  });
  
  return references;
}

// Suggest alternative images
function suggestAlternative(missingPath, availableImages) {
  const baseName = path.basename(missingPath, path.extname(missingPath));
  const directory = path.dirname(missingPath);
  
  // Look for same name with different extension
  for (const available of availableImages) {
    const availableBaseName = path.basename(available, path.extname(available));
    const availableDir = path.dirname(available);
    
    if (availableBaseName === baseName && availableDir === directory) {
      return available;
    }
  }
  
  // Look for similar names in same directory
  for (const available of availableImages) {
    if (available.startsWith(directory) && available.includes(baseName.slice(0, 10))) {
      return available;
    }
  }
  
  return null;
}

// Main validation function
function validateImages() {
  console.log('🔍 Validating image references...\n');
  
  const availableImages = getAvailableImages();
  const referencedImages = extractImageReferences();
  
  console.log(`📊 Found ${availableImages.size} available images`);
  console.log(`📊 Found ${referencedImages.size} referenced images\n`);
  
  const missingImages = [];
  const validImages = [];
  
  for (const imagePath of referencedImages) {
    if (availableImages.has(imagePath)) {
      validImages.push(imagePath);
    } else {
      const suggestion = suggestAlternative(imagePath, availableImages);
      missingImages.push({ path: imagePath, suggestion });
    }
  }
  
  // Report results
  if (validImages.length > 0) {
    console.log('✅ Valid image references:');
    validImages.forEach(img => console.log(`   ${img}`));
    console.log('');
  }
  
  if (missingImages.length > 0) {
    console.log('❌ Missing image references:');
    missingImages.forEach(({ path, suggestion }) => {
      console.log(`   ${path}`);
      if (suggestion) {
        console.log(`     💡 Suggestion: ${suggestion}`);
      }
    });
    console.log('');
  }
  
  // Generate image registry
  generateImageRegistry(availableImages);
  
  return missingImages.length === 0;
}

// Generate the compact manifest of /optimized/ responsive variants that ships
// to the client (imageOptimization.ts). Maps each optimized base path to the
// size suffixes that exist on disk, e.g. "/optimized/foo": ["sm","md","lg"].
function generateImageRegistry(availableImages) {
  const variantPattern = /^\/optimized\/(.+)-(sm|md|lg|xl)$/;
  const variants = {};

  for (const imagePath of availableImages) {
    const withoutExtension = imagePath.replace(/\.[^.]+$/, '');
    const match = withoutExtension.match(variantPattern);
    if (!match) continue;

    const base = `/optimized/${match[1]}`;
    if (!variants[base]) variants[base] = new Set();
    variants[base].add(match[2]);
  }

  const manifest = Object.fromEntries(
    Object.entries(variants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([base, suffixes]) => [base, Array.from(suffixes).sort()])
  );

  const manifestPath = path.join(SRC_DIR, 'utils', 'optimizedImageManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest));
  console.log(`📋 Generated optimized-image manifest (${Object.keys(manifest).length} bases): ${manifestPath}`);
}

// Run validation
const isValid = validateImages();

if (!isValid) {
  console.log('🚨 Image validation failed! Please fix missing image references.');
  process.exit(1);
} else {
  console.log('✅ All image references are valid!');
}

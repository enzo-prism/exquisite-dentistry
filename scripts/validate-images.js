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
  const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
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
      /src="([^"]+\.(png|jpg|jpeg|webp|svg))"/g,
      /src=\{["']([^"']+\.(png|jpg|jpeg|webp|svg))["']\}/g,
      /thumbnailUrl="([^"]+\.(png|jpg|jpeg|webp|svg))"/g,
      /['"`]([^'"`]*\/lovable-uploads\/[^'"`]*\.(png|jpg|jpeg|webp|svg))['"`]/g,
      /['"`]([^'"`]*\/optimized\/[^'"`]*\.(png|jpg|jpeg|webp|svg))['"`]/g,
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const imagePath = match[1];
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

// Generate image asset registry
function generateImageRegistry(availableImages) {
  const registry = {
    images: {},
    lastUpdated: new Date().toISOString()
  };
  
  // Group images by base name and create format options
  const imageGroups = new Map();
  
  for (const imagePath of availableImages) {
    const basename = path.basename(imagePath, path.extname(imagePath));
    const extension = path.extname(imagePath).slice(1);
    const directory = path.dirname(imagePath);
    
    const key = `${directory}/${basename}`;
    
    if (!imageGroups.has(key)) {
      imageGroups.set(key, {
        directory,
        basename,
        formats: new Set(),
        paths: {}
      });
    }
    
    const group = imageGroups.get(key);
    group.formats.add(extension);
    group.paths[extension] = imagePath;
  }
  
  // Convert to registry format
  for (const [key, group] of imageGroups) {
    const hasWebP = group.formats.has('webp');
    const hasPng = group.formats.has('png');
    const hasJpg = group.formats.has('jpg') || group.formats.has('jpeg');
    
    registry.images[key] = {
      formats: Array.from(group.formats),
      paths: group.paths,
      preferred: hasWebP ? group.paths.webp : (hasPng ? group.paths.png : group.paths.jpg || group.paths.jpeg),
      fallback: hasPng ? group.paths.png : (hasJpg ? (group.paths.jpg || group.paths.jpeg) : null)
    };
  }
  
  // Write registry file
  const registryPath = path.join(SRC_DIR, 'utils', 'imageRegistry.json');
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  console.log(`📋 Generated image registry: ${registryPath}`);
}

// Run validation
const isValid = validateImages();

if (!isValid) {
  console.log('🚨 Image validation failed! Please fix missing image references.');
  process.exit(1);
} else {
  console.log('✅ All image references are valid!');
}
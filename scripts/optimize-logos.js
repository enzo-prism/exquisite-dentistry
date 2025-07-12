import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const LOGOS_DIR = 'public/lovable-uploads';
const OUTPUT_DIR = 'public/optimized/logos';

// Logo files that need optimization
const LOGO_FILES = [
  {
    filename: 'fd45d438-10a2-4bde-9162-a38816b28958.png',
    sizes: [
      { width: 200, height: 37, suffix: 'desktop' }, // For desktop navbar and footer
      { width: 120, height: 22, suffix: 'mobile' }   // For mobile navbar
    ]
  },
  {
    filename: '9e823f53-f866-40f9-a3e2-78373640ee8f.png',
    sizes: [
      { width: 240, height: 48, suffix: 'desktop-2x' }, // For high DPI screens
      { width: 120, height: 24, suffix: 'mobile' }      // For mobile
    ]
  }
];

// Create output directory if it doesn't exist
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeLogos() {
  for (const logo of LOGO_FILES) {
    const inputPath = join(LOGOS_DIR, logo.filename);
    
    if (!existsSync(inputPath)) {
      console.log(`Skipping ${logo.filename} - file not found`);
      continue;
    }
    
    console.log(`Processing ${logo.filename}...`);
    
    try {
      const image = sharp(inputPath);
      
      // Generate optimized versions at exact sizes
      for (const size of logo.sizes) {
        // PNG version
        const pngOutputPath = join(OUTPUT_DIR, `${logo.filename.replace('.png', '')}-${size.suffix}.png`);
        await image
          .resize(size.width, size.height, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .png({ quality: 95, compressionLevel: 9 })
          .toFile(pngOutputPath);
        
        console.log(`  Created ${size.suffix} PNG: ${size.width}x${size.height}`);
        
        // WebP version (prioritized)
        const webpOutputPath = join(OUTPUT_DIR, `${logo.filename.replace('.png', '')}-${size.suffix}.webp`);
        await image
          .resize(size.width, size.height, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ 
            quality: 95,
            effort: 6,
            smartSubsample: true
          })
          .toFile(webpOutputPath);
        
        console.log(`  ✨ Created ${size.suffix} WebP: ${size.width}x${size.height}`);
      }
    } catch (error) {
      console.error(`Error processing ${logo.filename}:`, error);
    }
  }
}

optimizeLogos().then(() => {
  console.log('Logo optimization complete!');
}).catch(console.error);
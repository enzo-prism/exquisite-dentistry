import sharp from 'sharp';
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, basename, extname } from 'path';

const IMAGES_DIR = 'public/lovable-uploads';
const OUTPUT_DIR = 'public/optimized';
const SIZES = [
  { width: 320, suffix: 'sm' },
  { width: 640, suffix: 'md' },
  { width: 1024, suffix: 'lg' },
  { width: 1920, suffix: 'xl' }
];

// Create output directory if it doesn't exist
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(imagePath) {
  const filename = basename(imagePath, extname(imagePath));
  const stats = statSync(imagePath);
  const fileSizeMB = stats.size / (1024 * 1024);
  
  console.log(`Processing ${filename} (${fileSizeMB.toFixed(2)}MB)...`);
  
  // Skip if file is already small
  if (fileSizeMB < 0.1) {
    console.log(`  Skipping ${filename} - already optimized`);
    return;
  }
  
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Generate WebP versions at different sizes
    for (const size of SIZES) {
      // Skip if the original is smaller than the target size
      if (metadata.width < size.width) continue;
      
      const outputPath = join(OUTPUT_DIR, `${filename}-${size.suffix}.webp`);
      
      await image
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      const outputStats = statSync(outputPath);
      const outputSizeMB = outputStats.size / (1024 * 1024);
      console.log(`  Created ${size.suffix} version: ${outputSizeMB.toFixed(2)}MB`);
    }
    
    // Also create an optimized original-size WebP
    const originalWebpPath = join(OUTPUT_DIR, `${filename}-original.webp`);
    await image
      .webp({ quality: 90 })
      .toFile(originalWebpPath);
    
    const originalWebpStats = statSync(originalWebpPath);
    const originalWebpSizeMB = originalWebpStats.size / (1024 * 1024);
    console.log(`  Created original WebP: ${originalWebpSizeMB.toFixed(2)}MB`);
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function processAllImages() {
  const files = readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));
  
  console.log(`Found ${imageFiles.length} images to optimize\n`);
  
  for (const file of imageFiles) {
    await optimizeImage(join(IMAGES_DIR, file));
    console.log('');
  }
  
  console.log('Image optimization complete!');
}

processAllImages().catch(console.error); 
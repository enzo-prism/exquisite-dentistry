import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const IMAGES_DIR = 'public/lovable-uploads';
const SIZES = [320, 640, 1024, 1920];

// Create WebP versions of all PNG/JPEG images
async function convertToWebP() {
  console.log('🔄 Starting WebP conversion...');
  
  if (!existsSync(IMAGES_DIR)) {
    console.log(`❌ Directory ${IMAGES_DIR} not found`);
    return;
  }

  const files = readdirSync(IMAGES_DIR).filter(file => {
    const ext = extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });

  console.log(`📁 Found ${files.length} images to convert`);

  for (const file of files) {
    const inputPath = join(IMAGES_DIR, file);
    const baseName = file.replace(/\.(png|jpg|jpeg)$/i, '');
    const webpPath = join(IMAGES_DIR, `${baseName}.webp`);

    try {
      // Skip if WebP already exists and is newer
      if (existsSync(webpPath)) {
        const originalStat = statSync(inputPath);
        const webpStat = statSync(webpPath);
        if (webpStat.mtime > originalStat.mtime) {
          console.log(`⏭️  Skipping ${file} - WebP is up to date`);
          continue;
        }
      }

      console.log(`🖼️  Converting ${file}...`);
      
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Create main WebP version
      await image
        .webp({ 
          quality: 85,
          effort: 6 // Higher effort for better compression
        })
        .toFile(webpPath);
      
      console.log(`✅ Created ${baseName}.webp`);
      
      // Create responsive versions for larger images
      if (metadata.width && metadata.width > 640) {
        for (const size of SIZES) {
          if (size < metadata.width) {
            const responsiveWebpPath = join(IMAGES_DIR, `${baseName}-${size}w.webp`);
            
            await image
              .resize(size, null, {
                withoutEnlargement: true,
                fastShrinkOnLoad: false
              })
              .webp({ 
                quality: size <= 640 ? 80 : 85,
                effort: 6
              })
              .toFile(responsiveWebpPath);
            
            console.log(`  📐 Created ${baseName}-${size}w.webp`);
          }
        }
      }
      
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }
  
  console.log('🎉 WebP conversion complete!');
  
  // Generate conversion report
  const webpFiles = readdirSync(IMAGES_DIR).filter(file => file.endsWith('.webp'));
  console.log(`📊 Total WebP files: ${webpFiles.length}`);
}

// Run conversion
convertToWebP().catch(console.error);
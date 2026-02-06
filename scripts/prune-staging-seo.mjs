import fs from 'fs';
import path from 'path';

const isStagingBuild =
  process.env.VITE_APP_ENV === 'staging' ||
  process.env.VERCEL_GIT_COMMIT_REF === 'staging' ||
  process.env.VERCEL_GIT_BRANCH === 'staging';

if (!isStagingBuild) {
  process.exit(0);
}

const distDir = path.join(process.cwd(), 'dist');
const targets = ['robots.txt', 'sitemap.xml'].map((file) => path.join(distDir, file));

let removed = 0;
for (const target of targets) {
  if (fs.existsSync(target)) {
    fs.unlinkSync(target);
    removed += 1;
    console.log(`🧹 Removed ${path.relative(process.cwd(), target)}`);
  }
}

if (removed === 0) {
  console.log('🧪 Staging build detected. No SEO files to remove.');
}

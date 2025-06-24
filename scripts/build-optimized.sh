#!/bin/bash

echo "Starting optimized build process..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Install Sharp for image optimization
if ! npm list sharp >/dev/null 2>&1; then
  echo "Installing Sharp for image optimization..."
  npm install --save-dev sharp
fi

# Create optimized directory
mkdir -p public/optimized

# Run image optimization
echo "Optimizing images..."
node scripts/optimize-images.js

# Build the application with production optimizations
echo "Building application..."
npm run build

# Create a _headers file for Netlify (if not using netlify.toml)
cat > dist/_headers << EOF
/*
  Cache-Control: public, max-age=3600
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/lovable-uploads/*
  Cache-Control: public, max-age=31536000, immutable

/optimized/*
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable
EOF

echo "Build complete! Deploy the 'dist' folder to your hosting provider." 
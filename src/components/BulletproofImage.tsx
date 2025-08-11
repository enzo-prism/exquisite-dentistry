import React from 'react';

interface BulletproofImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const BulletproofImage: React.FC<BulletproofImageProps> = ({ 
  src, 
  alt, 
  className = "",
  fallbackSrc = '/lovable-uploads/graduation%20smile.webp'
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.src !== fallbackSrc) {
      img.src = fallbackSrc;
    } else {
      // If fallback also fails, show placeholder
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent && !parent.querySelector('.fallback-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = `fallback-placeholder ${className} bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center`;
        placeholder.innerHTML = `
          <div class="text-center p-4">
            <div class="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <p class="text-primary/70 text-sm">Beautiful Smile Preview</p>
          </div>
        `;
        parent.appendChild(placeholder);
      }
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={handleError}
      loading="eager"
    />
  );
};

export default BulletproofImage;

import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VimeoFacadeProps {
  videoId: string;
  title?: string;
  thumbnailUrl?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  background?: boolean;
  controls?: boolean;
  onReady?: () => void;
}

const VimeoFacade: React.FC<VimeoFacadeProps> = ({
  videoId,
  title = 'Video',
  thumbnailUrl,
  className,
  autoplay = true,
  muted = true,
  loop = true,
  background = true,
  controls = false,
  onReady,
}) => {
  const [isLoaded, setIsLoaded] = useState(background); // Background videos load immediately, others lazy load
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  
  // Handle iframe load event
  useEffect(() => {
    if (!isLoaded || !iframeRef.current) return;
    
    const iframe = iframeRef.current;
    
    const handleLoad = () => {
      onReady?.();
    };
    
    iframe.addEventListener('load', handleLoad);
    
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [isLoaded, onReady]);
  
  const handleClick = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };
  
  // Build Vimeo URL with parameters
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?` + 
    `badge=0&autopause=0&autoplay=${autoplay ? 1 : 0}&muted=${muted ? 1 : 0}` +
    `&controls=${controls ? 1 : 0}&title=0&byline=0&portrait=0` +
    `&background=${background ? 1 : 0}&loop=${loop ? 1 : 0}&responsive=1` +
    `&player_id=0&app_id=58479&quality=auto`;
  
  if (isLoaded) {
    return (
      <div 
        className={cn("relative w-full h-full", className)}
        style={background ? { 
          contain: 'layout'
        } : { 
          aspectRatio: '16/9',
          contain: 'layout',
          containIntrinsicSize: '100% 56.25%'
        }}
      >
        <iframe
          ref={iframeRef}
          src={vimeoUrl}
          style={background ? {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          } : {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          title={title}
          loading="lazy"
        />
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        "relative w-full h-full cursor-pointer group overflow-hidden",
        className
      )}
      style={{ 
        aspectRatio: '16/9',
        contain: 'layout',
        containIntrinsicSize: '100% 56.25%'
      }}
      onClick={handleClick}
    >
      {/* Beautiful Gradient Thumbnail */}
      <div className="absolute inset-0 w-full h-full">
        {/* Primary gradient layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, hsl(var(--gold-light) / 0.4) 0%, transparent 70%),
              radial-gradient(ellipse at 80% 70%, hsl(var(--gold) / 0.3) 0%, transparent 60%),
              linear-gradient(135deg, hsl(var(--gold-dark)) 0%, hsl(215 25% 27%) 50%, hsl(220 39% 11%) 100%)
            `
          }}
        />
        
        {/* Secondary depth layer */}
        <div 
          className="absolute inset-0 w-full h-full opacity-80"
          style={{
            background: `
              radial-gradient(circle at 30% 80%, hsl(var(--gold) / 0.2) 0%, transparent 50%),
              linear-gradient(45deg, transparent 30%, hsl(var(--gold-light) / 0.1) 50%, transparent 70%)
            `
          }}
        />
        
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-transparent via-black/10 to-black/20" />
      </div>
      
      {/* Play button overlay (only for non-background videos) */}
      {!background && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="bg-gold/90 text-white rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VimeoFacade;

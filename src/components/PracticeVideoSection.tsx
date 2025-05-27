import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

const PracticeVideoSection: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Load Vimeo Player API
    if (!window.Vimeo) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = initializePlayer;
      document.head.appendChild(script);
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const initializePlayer = () => {
    if (iframeRef.current && window.Vimeo) {
      playerRef.current = new window.Vimeo.Player(iframeRef.current);
    }
  };

  const toggleMute = async () => {
    if (playerRef.current) {
      try {
        if (isMuted) {
          await playerRef.current.setVolume(1);
        } else {
          await playerRef.current.setVolume(0);
        }
        setIsMuted(!isMuted);
      } catch (error) {
        console.log('Error toggling mute:', error);
        // Fallback: just update the state
        setIsMuted(!isMuted);
      }
    } else {
      // Fallback: just update the state
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm text-gold font-medium mb-3">OUR PRACTICE</span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Experience <span className="text-gold">Excellence</span>
          </h2>
          <div className="separator mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Discover what makes Exquisite Dentistry unique through our commitment to personalized care and exceptional results
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-sm border border-gray-100 overflow-hidden relative">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                ref={iframeRef}
                src="https://player.vimeo.com/video/1076433847?badge=0&autopause=0&autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0&background=0&player_id=0&app_id=58479&loop=1"
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%'
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title="Exquisite Dentistry Practice Video"
                loading="eager"
              />
            </div>
            
            {/* Unmute Button */}
            <div className="absolute bottom-4 right-4 z-10">
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleMute}
                className="bg-black/70 hover:bg-black/80 text-white border-none"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeVideoSection;

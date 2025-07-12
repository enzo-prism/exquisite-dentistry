
import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import OptimizedImage from '@/components/OptimizedImage';

interface VideoModalProps {
  youtubeId: string;
  isOpen: boolean;
  onClose: () => void;
  thumbnailUrl?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ youtubeId, isOpen, onClose, thumbnailUrl }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Initialize Vimeo player when modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Wait for Vimeo API to load
    const loadVimeoPlayer = () => {
      if (!window.Vimeo) {
        setTimeout(loadVimeoPlayer, 200);
        return;
      }

      const iframe = document.querySelector('.vimeo-player') as HTMLIFrameElement;
      if (!iframe) return;

      const player = new window.Vimeo.Player(iframe);
      setPlayer(player);

      player.on('play', () => setIsPlaying(true));
      player.on('pause', () => setIsPlaying(false));
      player.on('loaded', () => setIsLoaded(true));
      
      // Update progress
      player.on('timeupdate', (data: { percent: number }) => {
        setProgress(Math.round(data.percent * 100));
      });

      // Check initial mute state
      player.getMuted().then((muted: boolean) => {
        setIsMuted(muted);
      });
    };

    // Load Vimeo API if not already loaded
    if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = loadVimeoPlayer;
      document.body.appendChild(script);
    } else {
      loadVimeoPlayer();
    }

    return () => {
      if (player) {
        player.unload();
      }
    };
  }, [isOpen, youtubeId]);

  // Handle play/pause
  const togglePlay = () => {
    if (!player) return;
    
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (!player) return;
    
    if (isMuted) {
      player.setMuted(false);
      setIsMuted(false);
    } else {
      player.setMuted(true);
      setIsMuted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in gpu-accelerated">
      <div 
        ref={modalRef} 
        className="relative w-full max-w-4xl rounded-lg bg-black overflow-hidden shadow-2xl hardware-optimized"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-white/20 smooth-animation"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        
        <div className="relative aspect-video w-full">
          {!isLoaded && thumbnailUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <OptimizedImage
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
          
          {!isLoaded && !thumbnailUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <iframe 
            className="vimeo-player absolute inset-0 h-full w-full bg-black gpu-layer"
            src={`https://player.vimeo.com/video/${youtubeId}?autoplay=1&background=0&controls=0&autopause=0&player_id=0&app_id=58479&dnt=1&transparent=0`}
            title="Video player"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 composite-layer">
          <div className="mb-2">
            <Progress value={progress} className="h-1 bg-gray-700">
              <div className="h-full bg-gold" style={{width: `${progress}%`}} />
            </Progress>
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={togglePlay}
              className="flex items-center justify-center rounded-full bg-gold/90 hover:bg-gold p-2 text-white smooth-animation"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button
              onClick={toggleMute}
              className="flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 p-2 text-white smooth-animation"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

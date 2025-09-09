import { useEffect, useRef, useState, useCallback } from 'react';

interface VimeoPlayerOptions {
  videoId: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  background?: boolean;
}

interface VimeoPlayerData {
  percent: number;
  seconds: number;
  duration: number;
}

interface VimeoPlayerState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isLoaded: boolean;
}

export const useVimeoPlayer = (options: VimeoPlayerOptions | null) => {
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const initializationTimeoutRef = useRef<NodeJS.Timeout>();
  
  const [state, setState] = useState<VimeoPlayerState>({
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    volume: 1,
    isMuted: options?.muted || false,
    isLoaded: false,
  });

  // Load Vimeo Player API
  useEffect(() => {
    if (typeof window === 'undefined' || !options) return;

    const loadVimeoAPI = () => {
      if (window.Vimeo) {
        schedulePlayerInitialization();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = schedulePlayerInitialization;
      script.onerror = () => console.warn('Failed to load Vimeo Player API');
      document.head.appendChild(script);
    };

    const schedulePlayerInitialization = () => {
      // Clear any existing timeout
      if (initializationTimeoutRef.current) {
        clearTimeout(initializationTimeoutRef.current);
      }
      
      // Wait for iframe to be ready
      initializationTimeoutRef.current = setTimeout(() => {
        initializePlayer();
      }, 500);
    };

    const initializePlayer = () => {
      if (!iframeRef.current || !window.Vimeo || playerRef.current) return;

      try {
        playerRef.current = new window.Vimeo.Player(iframeRef.current);
        
        // Set up event listeners
        playerRef.current.on('loaded', () => {
          setState(prev => ({ ...prev, isLoaded: true }));
          updatePlayerState();
        });

        playerRef.current.on('play', () => {
          setState(prev => ({ ...prev, isPlaying: true }));
        });

        playerRef.current.on('pause', () => {
          setState(prev => ({ ...prev, isPlaying: false }));
        });

        playerRef.current.on('timeupdate', (data: VimeoPlayerData) => {
          setState(prev => ({
            ...prev,
            currentTime: data.seconds,
            duration: data.duration,
          }));
        });

        playerRef.current.on('volumechange', (data: { volume: number }) => {
          setState(prev => ({
            ...prev,
            volume: data.volume,
            isMuted: data.volume === 0,
          }));
        });
      } catch (error) {
        console.warn('Failed to initialize Vimeo player:', error);
      }
    };

    const updatePlayerState = async () => {
      if (!playerRef.current) return;

      try {
        const [duration, volume, muted] = await Promise.all([
          playerRef.current.getDuration(),
          playerRef.current.getVolume(),
          playerRef.current.getMuted(),
        ]);

        setState(prev => ({
          ...prev,
          duration,
          volume,
          isMuted: muted,
        }));
      } catch (error) {
        console.warn('Error updating player state:', error);
      }
    };

    loadVimeoAPI();

    return () => {
      if (initializationTimeoutRef.current) {
        clearTimeout(initializationTimeoutRef.current);
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy?.();
        } catch (error) {
          console.warn('Error destroying Vimeo player:', error);
        }
        playerRef.current = null;
      }
    };
  }, [options?.videoId]);

  const play = useCallback(async () => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.play();
    } catch (error) {
      console.warn('Error playing video:', error);
    }
  }, []);

  const pause = useCallback(async () => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.pause();
    } catch (error) {
      console.warn('Error pausing video:', error);
    }
  }, []);

  const seekTo = useCallback(async (time: number) => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.setCurrentTime(time);
    } catch (error) {
      console.warn('Error seeking video:', error);
    }
  }, []);

  const setVolume = useCallback(async (volume: number) => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.setVolume(volume);
    } catch (error) {
      console.warn('Error setting volume:', error);
    }
  }, []);

  const toggleMute = useCallback(async () => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.setMuted(!state.isMuted);
    } catch (error) {
      console.warn('Error toggling mute:', error);
    }
  }, [state.isMuted]);

  const toggleFullscreen = useCallback(async () => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.requestFullscreen();
    } catch (error) {
      console.warn('Error requesting fullscreen:', error);
    }
  }, []);

  return {
    iframeRef,
    state,
    controls: {
      play,
      pause,
      seekTo,
      setVolume,
      toggleMute,
      toggleFullscreen,
    },
  };
};
// Video Player API utilities for iframe communication
export interface VideoPlayerMessage {
  type: 'play' | 'pause' | 'mute' | 'unmute' | 'setVolume';
  value?: number;
}

export interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

export class VideoPlayerAPI {
  private iframe: HTMLIFrameElement | null = null;
  private platform: 'vimeo' | 'youtube';
  private messageQueue: VideoPlayerMessage[] = [];
  private isReady = false;
  private shouldAutoPlay = false;
  private onReadyCallback?: () => void;
  private onPlayChange?: (playing: boolean) => void;
  private onMuteChange?: (muted: boolean) => void;
  private onEnded?: () => void;
  private removeMessageListener?: () => void;

  constructor(platform: 'vimeo' | 'youtube') {
    this.platform = platform;
  }

  setIframe(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
    this.isReady = false;
    this.messageQueue = [];
    
    // Remove previous listener if exists
    if (this.removeMessageListener) {
      this.removeMessageListener();
    }
    
    this.removeMessageListener = this.setupMessageListener();
  }

  setShouldAutoPlay(shouldAutoPlay: boolean) {
    this.shouldAutoPlay = shouldAutoPlay;
  }

  setOnReady(callback: () => void) {
    this.onReadyCallback = callback;
  }

  setOnPlayChange(callback: (playing: boolean) => void) {
    this.onPlayChange = callback;
  }

  setOnMuteChange(callback: (muted: boolean) => void) {
    this.onMuteChange = callback;
  }

  setOnEnded(callback: () => void) {
    this.onEnded = callback;
  }

  private setupMessageListener() {
    if (!this.iframe) return;

    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from trusted video platforms and from the correct iframe
      const allowedOrigins = [
        'https://player.vimeo.com',
        'https://www.youtube.com'
      ];
      
      if (!allowedOrigins.some(origin => event.origin === origin)) return;
      
      // Verify the message comes from our iframe
      if (event.source !== this.iframe?.contentWindow) return;

      let eventData: any;
      try {
        // Parse event data (some platforms send strings, others send objects)
        eventData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch {
        // If parsing fails, try using raw data
        eventData = event.data;
      }

      // Handle ready state for different platforms
      if (this.platform === 'vimeo' && eventData?.event === 'ready') {
        console.log('Vimeo player ready');
        this.isReady = true;
        this.processMessageQueue();
        this.onReadyCallback?.();
        if (this.shouldAutoPlay) {
          console.log('Auto-playing Vimeo video');
          this.play();
        }
      } else if (this.platform === 'youtube' && eventData?.event === 'onReady') {
        console.log('YouTube player ready');
        this.isReady = true;
        this.processMessageQueue();
        this.onReadyCallback?.();
        if (this.shouldAutoPlay) {
          console.log('Auto-playing YouTube video');
          this.play();
        }
      }
      
      // Handle playback state changes for Vimeo
      if (this.platform === 'vimeo') {
        if (eventData?.event === 'play') {
          this.onPlayChange?.(true);
        } else if (eventData?.event === 'pause') {
          this.onPlayChange?.(false);
        } else if (eventData?.event === 'ended') {
          this.onPlayChange?.(false);
          this.onEnded?.();
        } else if (eventData?.event === 'volumechange') {
          // Vimeo sends volume as 0-1, 0 is muted
          const isMuted = eventData?.data?.volume === 0;
          this.onMuteChange?.(isMuted);
        }
      }
      
      // Handle playback state changes for YouTube
      if (this.platform === 'youtube' && eventData?.event === 'onStateChange') {
        const state = eventData?.data;
        if (state === 1) { // Playing
          this.onPlayChange?.(true);
        } else if (state === 2) { // Paused
          this.onPlayChange?.(false);
        } else if (state === 0) { // Ended
          this.onPlayChange?.(false);
          this.onEnded?.();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Cleanup function
    return () => window.removeEventListener('message', handleMessage);
  }

  private setupAPIEventListeners() {
    if (!this.iframe?.contentWindow) return;

    if (this.platform === 'vimeo') {
      // Subscribe to Vimeo events using direct postMessage
      this.iframe.contentWindow.postMessage(JSON.stringify({ method: 'addEventListener', value: 'play' }), '*');
      this.iframe.contentWindow.postMessage(JSON.stringify({ method: 'addEventListener', value: 'pause' }), '*');
      this.iframe.contentWindow.postMessage(JSON.stringify({ method: 'addEventListener', value: 'ended' }), '*');
      this.iframe.contentWindow.postMessage(JSON.stringify({ method: 'addEventListener', value: 'volumechange' }), '*');
    } else if (this.platform === 'youtube') {
      // YouTube API handshake using direct postMessage
      this.iframe.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*');
      this.iframe.contentWindow.postMessage(JSON.stringify({ 
        event: 'command', 
        func: 'addEventListener', 
        args: ['onStateChange'] 
      }), '*');
    }
  }

  private processMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendMessage(message);
      }
    }
  }

  private sendMessage(message: VideoPlayerMessage) {
    if (!this.iframe?.contentWindow) return;

    if (!this.isReady) {
      this.messageQueue.push(message);
      return;
    }

    let postMessageData: any;

    if (this.platform === 'vimeo') {
      switch (message.type) {
        case 'play':
          postMessageData = { method: 'play' };
          break;
        case 'pause':
          postMessageData = { method: 'pause' };
          break;
        case 'mute':
          postMessageData = { method: 'setVolume', value: 0 };
          break;
        case 'unmute':
          postMessageData = { method: 'setVolume', value: 1 };
          break;
        case 'setVolume':
          postMessageData = { method: 'setVolume', value: message.value || 0.5 };
          break;
      }
    } else if (this.platform === 'youtube') {
      switch (message.type) {
        case 'play':
          postMessageData = { event: 'command', func: 'playVideo' };
          break;
        case 'pause':
          postMessageData = { event: 'command', func: 'pauseVideo' };
          break;
        case 'mute':
          postMessageData = { event: 'command', func: 'mute' };
          break;
        case 'unmute':
          postMessageData = { event: 'command', func: 'unMute' };
          break;
        case 'setVolume':
          postMessageData = { event: 'command', func: 'setVolume', args: [message.value || 50] };
          break;
      }
    }

    if (postMessageData) {
      // Use proper target origin for security
      const targetOrigin = this.platform === 'vimeo' 
        ? 'https://player.vimeo.com' 
        : 'https://www.youtube.com';
      this.iframe.contentWindow.postMessage(JSON.stringify(postMessageData), targetOrigin);
    }
  }

  play() {
    this.sendMessage({ type: 'play' });
  }

  pause() {
    this.sendMessage({ type: 'pause' });
  }

  mute() {
    this.sendMessage({ type: 'mute' });
  }

  unmute() {
    this.sendMessage({ type: 'unmute' });
  }

  setVolume(volume: number) {
    this.sendMessage({ type: 'setVolume', value: volume });
  }

  destroy() {
    if (this.removeMessageListener) {
      this.removeMessageListener();
      this.removeMessageListener = undefined;
    }
    this.iframe = null;
    this.isReady = false;
    this.messageQueue = [];
    this.onReadyCallback = undefined;
    this.onPlayChange = undefined;
    this.onMuteChange = undefined;
    this.onEnded = undefined;
  }
}

// Utility to check if device is mobile
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
}

// Utility to create embed URL with dynamic autoplay support
export function createEmbedUrl(
  platform: 'vimeo' | 'youtube',
  videoId: string,
  options: {
    autoplay?: boolean;
    muted?: boolean;
    enableJSAPI?: boolean;
  } = {}
): string {
  const {
    autoplay = false,
    muted = true,
    enableJSAPI = true
  } = options;

  const baseParams = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    muted: muted ? '1' : '0',
    controls: '0',
    title: '0',
    byline: '0',
    portrait: '0',
    playsinline: '1',
  });

  if (platform === 'vimeo') {
    // Remove background=1 to fix audio issues and allow proper controls
    baseParams.append('transparent', '0');
    baseParams.append('autopause', '0');
    baseParams.append('responsive', '1');
    if (enableJSAPI) {
      baseParams.append('api', '1');
    }
    return `https://player.vimeo.com/video/${videoId}?${baseParams.toString()}`;
  } else {
    baseParams.append('rel', '0');
    baseParams.append('modestbranding', '1');
    baseParams.append('showinfo', '0');
    baseParams.append('iv_load_policy', '3');
    baseParams.append('cc_load_policy', '0');
    if (enableJSAPI) {
      baseParams.append('enablejsapi', '1');
      baseParams.append('origin', window.location.origin);
    }
    return `https://www.youtube.com/embed/${videoId}?${baseParams.toString()}`;
  }
}
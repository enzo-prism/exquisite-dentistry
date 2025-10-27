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
    // Proactively set up API event listeners/handshake
    this.setupAPIEventListeners();
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
    if (!this.iframe || typeof window === 'undefined') return;

    const parseEventData = (raw: unknown): Record<string, unknown> | null => {
      if (typeof raw === 'string') {
        try {
          const parsed = JSON.parse(raw);
          if (typeof parsed === 'object' && parsed !== null) {
            return parsed as Record<string, unknown>;
          }
        } catch {
          return null;
        }
        return null;
      }

      if (typeof raw === 'object' && raw !== null) {
        return raw as Record<string, unknown>;
      }

      return null;
    };

    const getString = (source: Record<string, unknown>, key: string): string | undefined => {
      const value = source[key];
      return typeof value === 'string' ? value : undefined;
    };

    const getNumber = (source: Record<string, unknown>, key: string): number | undefined => {
      const value = source[key];
      return typeof value === 'number' ? value : undefined;
    };

    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = [
        'https://player.vimeo.com',
        'https://www.youtube.com',
        'https://www.youtube-nocookie.com'
      ];

      if (!allowedOrigins.includes(event.origin)) {
        return;
      }

      if (event.source !== this.iframe?.contentWindow) {
        return;
      }

      let eventData = parseEventData(event.data);
      if (!eventData && typeof event.data === 'string') {
        eventData = { event: event.data };
      }

      if (!eventData) {
        return;
      }

      const eventType = getString(eventData, 'event');
      const payload = eventData['data'];
      const payloadObject =
        typeof payload === 'object' && payload !== null ? (payload as Record<string, unknown>) : undefined;
      const volumeFromPayload = payloadObject ? getNumber(payloadObject, 'volume') : undefined;
      const directVolume = getNumber(eventData, 'volume');
      const resolvedVolume = volumeFromPayload ?? directVolume;
      const youtubeState = typeof payload === 'number' ? payload : undefined;

      if (this.platform === 'vimeo' && eventType === 'ready') {
        console.log('Vimeo player ready');
        this.isReady = true;
        this.setupAPIEventListeners();
        this.processMessageQueue();
        this.onReadyCallback?.();
        if (this.shouldAutoPlay) {
          console.log('Auto-playing Vimeo video');
          this.play();
        }
      } else if (this.platform === 'youtube' && eventType === 'onReady') {
        console.log('YouTube player ready');
        this.isReady = true;
        this.setupAPIEventListeners();
        this.processMessageQueue();
        this.onReadyCallback?.();
        if (this.shouldAutoPlay) {
          console.log('Auto-playing YouTube video');
          this.play();
        }
      }

      if (this.platform === 'vimeo') {
        if (eventType === 'play') {
          this.onPlayChange?.(true);
        } else if (eventType === 'pause') {
          this.onPlayChange?.(false);
        } else if (eventType === 'ended' || eventType === 'finish') {
          this.onPlayChange?.(false);
          this.onEnded?.();
        } else if (eventType === 'volumechange' || eventType === 'volume') {
          this.onMuteChange?.(resolvedVolume === 0);
        }
      }

      if (this.platform === 'youtube' && eventType === 'onStateChange') {
        if (youtubeState === 1) {
          this.onPlayChange?.(true);
        } else if (youtubeState === 2) {
          this.onPlayChange?.(false);
        } else if (youtubeState === 0) {
          this.onPlayChange?.(false);
          this.onEnded?.();
        }
      }
    };

    window.addEventListener('message', handleMessage);

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

    let postMessageData: Record<string, unknown> | undefined;

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
          postMessageData = { method: 'setVolume', value: message.value ?? 0.5 };
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
          postMessageData = { event: 'command', func: 'setVolume', args: [message.value ?? 50] };
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
  if (typeof navigator === 'undefined') {
    return false;
  }

  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1)
  );
}

// Utility to create embed URL with dynamic autoplay support
export function createEmbedUrl(
  platform: 'vimeo' | 'youtube',
  videoId: string,
  options: {
    autoplay?: boolean;
    muted?: boolean;
    enableJSAPI?: boolean;
    loop?: boolean;
  } = {}
): string {
  const {
    autoplay = false,
    muted = true,
    enableJSAPI = true,
    loop = false
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
    baseParams.append('outro', '0'); // Hide end screen overlay ("More from..." videos)
    baseParams.append('loop', loop ? '1' : '0'); // Enable auto-looping to prevent end screen
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
      if (typeof window !== 'undefined') {
        baseParams.append('origin', window.location.origin);
      }
    }
    return `https://www.youtube.com/embed/${videoId}?${baseParams.toString()}`;
  }
}

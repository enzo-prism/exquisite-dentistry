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

  constructor(platform: 'vimeo' | 'youtube') {
    this.platform = platform;
  }

  setIframe(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
    this.setupMessageListener();
  }

  setShouldAutoPlay(shouldAutoPlay: boolean) {
    this.shouldAutoPlay = shouldAutoPlay;
  }

  setOnReady(callback: () => void) {
    this.onReadyCallback = callback;
  }

  private setupMessageListener() {
    if (!this.iframe) return;

    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from trusted video platforms
      const allowedOrigins = [
        'https://player.vimeo.com',
        'https://www.youtube.com'
      ];
      
      if (!allowedOrigins.some(origin => event.origin === origin)) return;

      // Handle ready state for different platforms
      if (this.platform === 'vimeo' && event.data?.event === 'ready') {
        this.isReady = true;
        this.processMessageQueue();
        this.onReadyCallback?.();
        if (this.shouldAutoPlay) {
          this.play();
        }
      } else if (this.platform === 'youtube' && event.data?.event === 'onReady') {
        this.isReady = true;
        this.processMessageQueue();
        this.onReadyCallback?.();
        if (this.shouldAutoPlay) {
          this.play();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Cleanup function
    return () => window.removeEventListener('message', handleMessage);
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
      this.iframe.contentWindow.postMessage(JSON.stringify(postMessageData), '*');
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
    this.iframe = null;
    this.isReady = false;
    this.messageQueue = [];
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
    baseParams.append('background', '1');
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
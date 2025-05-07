
interface VimeoPlayerData {
  percent: number;
  seconds: number;
  duration: number;
}

interface VimeoPlayer {
  on: (event: string, callback: (data?: any) => void) => void;
  off: (event: string, callback: (data?: any) => void) => void;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  unload: () => Promise<void>;
  setMuted: (muted: boolean) => Promise<void>;
  getMuted: () => Promise<boolean>;
  setVolume: (volume: number) => Promise<void>;
  getVolume: () => Promise<number>;
  getDuration: () => Promise<number>;
  getCurrentTime: () => Promise<number>;
  setCurrentTime: (time: number) => Promise<number>;
}

interface VimeoConstructor {
  Player: new (element: string | HTMLIFrameElement, options?: any) => VimeoPlayer;
}

declare global {
  interface Window {
    Vimeo?: VimeoConstructor;
  }
}

export {};

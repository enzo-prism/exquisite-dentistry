
import { ReactNode } from 'react';

export interface VideoHeroProps {
  videoSrc?: string;
  posterSrc?: string;
  youtubeId?: string;
  streamableUrl?: string;
  vimeoId?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  overlayColor?: 'dark' | 'light' | 'gradient' | 'none';
  className?: string;
  contentClassName?: string;
  height?: 'full' | 'large' | 'medium' | 'auto';
  badgeText?: string;
  alignment?: 'center' | 'left';
  scrollIndicator?: boolean;
  aspectRatio?: number;
}


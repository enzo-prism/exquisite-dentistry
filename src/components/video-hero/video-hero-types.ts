
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
    target?: string;
    rel?: string;
    className?: string;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
    target?: string;
    rel?: string;
  };
  overlayColor?: 'dark' | 'light' | 'gradient' | 'none';
  className?: string;
  contentClassName?: string;
  height?: 'small' | 'medium' | 'large' | 'full' | 'auto';
  badgeText?: string;
  /** Small uppercase line above the title (e.g. location). */
  eyebrow?: string;
  /** Adds a tap-to-call action (full-width button on mobile, text link on desktop) and the live office status. */
  phoneCta?: boolean;
  proofLinks?: Array<{
    text: string;
    href: string;
  }>;
  alignment?: 'center' | 'left';
  scrollIndicator?: boolean;
  aspectRatio?: number;
  useGradient?: boolean;
  disableVideo?: boolean;
  preferStaticOnMobile?: boolean;
}

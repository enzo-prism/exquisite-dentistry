import React from 'react';
import { Link } from 'react-router-dom';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { cn } from '@/lib/utils';

interface LinkItem {
  title: string;
  href: string;
  description: string;
  category: 'service' | 'blog' | 'experience' | 'consultation' | 'gallery' | 'special';
  priority?: number;
  seasonal?: boolean;
}

interface InternalLinkingWidgetProps {
  currentPage?: string;
  context?: 'veneer' | 'cost' | 'experience' | 'general' | 'orthodontics' | 'implants' | 'whitening' | 'wedding' | 'graduation' | 'consultation' | 'invisalign' | 'oral-health';
  variant?: 'compact' | 'expanded' | 'sidebar';
  className?: string;
  title?: string;
}

const normalizeInternalHref = (href: string): string => {
  if (!href) return href;
  if (href.startsWith('#')) return href;
  if (/^(https?:)?\/\//i.test(href)) return href;
  if (/^(mailto|tel):/i.test(href)) return href;
  if (!href.startsWith('/')) return href;

  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? href;
  const suffix = match?.[2] ?? '';

  if (pathname === '/' || pathname.endsWith('/')) return href;
  if (/\/[^/]+\.[^/]+$/.test(pathname)) return href;

  return `${pathname}/${suffix}`;
};

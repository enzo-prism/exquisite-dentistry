import React from 'react';
import { cn } from '@/lib/utils';

/** Two hairlines that fold into an X. Purely decorative — the button carries the label. */
const MenuGlyph: React.FC<{ open: boolean; className?: string }> = ({ open, className }) => (
  <span aria-hidden="true" className={cn('relative block h-[14px] w-5', className)}>
    <span
      className="nav-glyph-line absolute left-0 top-[2px] block h-[1.5px] w-full rounded-full bg-current"
      style={{ transform: open ? 'translate3d(0, 4.25px, 0) rotate(45deg)' : 'none' }}
    />
    <span
      className="nav-glyph-line absolute bottom-[2px] left-0 block h-[1.5px] w-full rounded-full bg-current"
      style={{ transform: open ? 'translate3d(0, -4.25px, 0) rotate(-45deg)' : 'none' }}
    />
  </span>
);

export default MenuGlyph;

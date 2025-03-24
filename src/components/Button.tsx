
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'black' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2',
          {
            'bg-gold hover:bg-gold-dark text-white': variant === 'gold',
            'bg-black hover:bg-black-light text-white': variant === 'black',
            'bg-transparent border border-gold text-gold hover:bg-gold/5': variant === 'outline',
            'bg-transparent text-black-light hover:text-black hover:bg-black/5': variant === 'ghost',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-6 py-3': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

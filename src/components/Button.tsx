
import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gold hover:bg-gold/90 text-white",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-black",
        ghost: "bg-transparent hover:bg-gray-100 text-black",
        gold: "bg-gold hover:bg-gold/90 text-white",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-sm",
        sm: "h-9 px-3 rounded-sm text-sm",
        lg: "h-12 px-8 rounded-sm text-lg",
      },
      fullWidth: {
        true: "w-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false
    }
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "gold";
  size?: "default" | "sm" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ 
  variant = "default", 
  size = "default", 
  fullWidth = false,
  children, 
  className,
  ...props 
}: ButtonProps) => {
  return (
    <ShadcnButton 
      className={cn(
        buttonVariants({ variant, size, fullWidth, className })
      )}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;

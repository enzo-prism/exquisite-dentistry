
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cta-glow bg-primary !text-white shadow-md hover:bg-primary/90 hover:!text-white motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.01] hover:shadow-xl",
        black: "cta-glow bg-black !text-white shadow-md hover:bg-black/90 hover:!text-white motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.01] hover:shadow-xl",
        outline: "border border-primary bg-transparent text-primary hover:bg-primary hover:!text-white",
        link: "text-primary underline-offset-4 hover:underline link-variant",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        secondary: "cta-glow bg-secondary !text-white shadow-md hover:bg-secondary/80 hover:!text-white motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.01] hover:shadow-xl",
        destructive: "cta-glow bg-destructive !text-white shadow-md hover:bg-destructive/90 hover:!text-white motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.01] hover:shadow-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-foreground text-white t-button hover:bg-foreground/90',
        secondary:
          'bg-background text-foreground t-button border border-border hover:bg-control-hover',
        ghost:
          'bg-transparent text-foreground t-button hover:bg-control-hover',
        icon:
          'bg-background text-foreground border border-border hover:bg-control-hover',
      },
      size: {
        editorial: 'h-8 px-3 py-1',
        icon: 'h-8 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'editorial',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }

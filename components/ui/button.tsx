import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-mono font-bold tracking-wide transition-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-3 transform duration-75",
  {
    variants: {
      variant: {
        default:
          "neubrutalist-button bg-card border-current text-card-foreground hover:text-primary-foreground hover:bg-primary",
        destructive:
          "neubrutalist-button bg-destructive border-current text-white",
        outline:
          "border-current bg-background shadow-none hover:bg-accent hover:text-accent-foreground",
        secondary:
          "neubrutalist-button bg-secondary border-current text-secondary-foreground hover:text-primary-foreground hover:bg-primary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
        brutalist:
          "neubrutalist-border bg-card text-card-foreground hover:transform hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_currentColor]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 gap-1.5",
        lg: "h-14 px-10 py-4",
        icon: "h-12 w-12 p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

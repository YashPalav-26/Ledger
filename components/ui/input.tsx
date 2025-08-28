import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "neubrutalist-input font-mono font-bold placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-12 w-full min-w-0 bg-background text-base px-4 py-3 transition-none outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:border-primary focus:border-primary",
        "aria-invalid:border-destructive/60 invalid:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
}

export { Input }

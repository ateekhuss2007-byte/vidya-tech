import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-[#007AFF] cursor-pointer select-none group",
  {
    variants: {
      variant: {
        default:
          "bg-[#007AFF] text-white font-semibold hover:bg-[#0062CC] active:bg-[#0051A8] shadow-sm shadow-[#007AFF]/25 border border-[#007AFF]",
        primary:
          "bg-[#007AFF] text-white font-semibold hover:bg-[#0062CC] active:bg-[#0051A8] shadow-sm shadow-[#007AFF]/25 border border-[#007AFF]",
        secondary:
          "bg-white/90 dark:bg-[#2C2C2E]/90 backdrop-blur-md border border-[#AAAAAA]/30 text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF]/50 hover:text-[#007AFF] dark:hover:text-[#007AFF] hover:-translate-y-0.5 active:translate-y-0 shadow-xs",
        glass:
          "bg-white/70 dark:bg-[#2C2C2E]/70 backdrop-blur-md border border-[#AAAAAA]/25 text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF]/40 hover:-translate-y-0.5 active:translate-y-0 shadow-xs",
        accent:
          "bg-[#007AFF] text-white font-semibold hover:bg-[#0062CC] active:bg-[#0051A8] shadow-sm shadow-[#007AFF]/25 border border-[#007AFF]",
        orange:
          "bg-[#007AFF] text-white font-semibold hover:bg-[#0062CC] active:bg-[#0051A8] shadow-sm shadow-[#007AFF]/25 border border-[#007AFF]",
        apple:
          "bg-[#007AFF] text-white font-semibold hover:bg-[#0062CC] active:bg-[#0051A8] shadow-sm shadow-[#007AFF]/25 border border-[#007AFF]",
        premium:
          "bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] text-white font-bold hover:opacity-90 shadow-sm shadow-[#007AFF]/30 border border-[#007AFF]",
        dark:
          "bg-[#1D1D1F] text-[#F5F5F7] hover:bg-[#2C2C2E] active:bg-[#121214] shadow-sm border border-[#AAAAAA]/30 hover:border-[#007AFF]/40",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
        outline:
          "border border-[#AAAAAA]/40 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF] hover:text-[#007AFF]",
        ghost:
          "hover:bg-[#007AFF]/10 text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#007AFF] dark:hover:text-[#007AFF]",
        link:
          "text-[#007AFF] underline-offset-4 hover:underline",
        ai:
          "bg-[#1D1D1F] text-[#007AFF] hover:border-[#007AFF] shadow-sm border border-[#007AFF]/40 font-mono text-xs"
      },
      size: {
        default: "h-9 px-4 py-2 text-xs sm:text-sm",
        md: "h-9 px-4 py-2 text-xs sm:text-sm",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-sm sm:text-base font-semibold",
        icon: "h-9 w-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  asChild = false, 
  icon: Icon,
  showArrow = false,
  isLoading = false,
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
      ) : null}
      {children}
      {showArrow && !isLoading && (
        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
      )}
    </Comp>
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }

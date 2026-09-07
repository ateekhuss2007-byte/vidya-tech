import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F59B] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-[#00F59B] cursor-pointer select-none group",
  {
    variants: {
      variant: {
        default:
          "bg-[#00F59B] text-[#050709] font-semibold hover:bg-[#2EE59D] active:bg-[#00D687] shadow-sm shadow-[#00F59B]/25 border border-[#00F59B]",
        primary:
          "bg-[#00F59B] text-[#050709] font-semibold hover:bg-[#2EE59D] active:bg-[#00D687] shadow-sm shadow-[#00F59B]/25 border border-[#00F59B]",
        secondary:
          "bg-white/80 dark:bg-[#161B22]/80 backdrop-blur-md border border-neutral-200 dark:border-[#30363D] text-[#07090D] dark:text-[#F0F6FC] hover:bg-white dark:hover:bg-[#161B22] hover:border-[#00F59B]/50 hover:text-[#00F59B] dark:hover:text-[#00F59B] hover:-translate-y-0.5 active:translate-y-0 shadow-xs",
        glass:
          "bg-white/60 dark:bg-[#161B22]/60 backdrop-blur-md border border-white/60 dark:border-white/10 text-[#07090D] dark:text-[#F0F6FC] hover:bg-white/90 dark:hover:bg-[#161B22]/90 hover:border-[#00F59B]/40 hover:-translate-y-0.5 active:translate-y-0 shadow-xs",
        accent:
          "bg-[#F59E0B] text-[#050709] font-semibold hover:bg-[#D97706] active:bg-[#B45309] shadow-sm shadow-[#F59E0B]/20 border border-[#F59E0B]",
        premium:
          "bg-gradient-to-r from-[#00F59B] to-[#34D399] text-[#050709] font-bold hover:opacity-90 shadow-sm shadow-[#00F59B]/30 border border-[#00F59B]",
        dark:
          "bg-[#0D1117] text-[#F0F6FC] hover:bg-[#161B22] active:bg-[#07090D] shadow-sm shadow-black/50 border border-[#30363D] hover:border-[#00F59B]/40",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
        outline:
          "border border-neutral-300 dark:border-[#30363D] bg-transparent hover:bg-neutral-100 dark:hover:bg-[#161B22] text-[#07090D] dark:text-[#F0F6FC] hover:border-[#00F59B]/40",
        ghost:
          "hover:bg-[#00F59B]/10 text-[#07090D] dark:text-[#F0F6FC] hover:text-[#00F59B] dark:hover:text-[#00F59B]",
        link:
          "text-[#00F59B] underline-offset-4 hover:underline",
        ai:
          "bg-gradient-to-r from-[#07090D] via-[#161B22] to-[#07090D] text-[#00F59B] hover:border-[#00F59B] shadow-sm border border-[#00F59B]/40 font-mono text-xs"
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

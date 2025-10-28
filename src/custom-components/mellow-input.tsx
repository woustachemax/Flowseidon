import { Input } from "@/components/ui/input"
import React from "react"

export const MellowInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & { error?: boolean }
>(({ className = "", error = false, ...props }, ref) => {
  const glowColor = error ? 'rgba(244,63,94,0.4)' : 'rgba(6,182,212,0.4)'

  return (
    <div className="relative group">
      <div className="absolute inset-0 rounded-md pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
            <div 
              className="absolute inset-0 blur-sm" 
              style={{ 
                background: `conic-gradient(from 0deg, transparent 0%, ${glowColor} 10%, transparent 20%, transparent 100%)` 
              }} 
            />
          </div>
        </div>
      </div>

      <Input
        ref={ref}
        {...props}
        className={`relative bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 px-4 py-3 border border-neutral-300 dark:border-neutral-800 focus-visible:ring-0 focus-visible:ring-offset-0 ${className}`}
      />

      <span className={`absolute inset-x-0 bottom-0 ${error ? 'bg-gradient-to-r from-transparent via-rose-500 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent'} h-px w-3/4 mx-auto pointer-events-none`} />
      <span className={`absolute inset-x-0 bottom-0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 ${error ? 'bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent' : 'bg-gradient-to-r from-transparent via-emerald-500 to-transparent'} h-[4px] w-full mx-auto blur-sm pointer-events-none`} />
    </div>
  )
})

MellowInput.displayName = "MellowInput"
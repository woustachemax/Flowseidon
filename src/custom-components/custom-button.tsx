"use client";

import { Button } from "@/components/ui/button";

export const MotionButton = ({
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <div className="relative group flex-1">
      <div className="absolute inset-0 rounded-md pointer-events-none overflow-visible">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
            <div 
              className="absolute inset-0 blur-md" 
              style={{ 
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(6,182,212,0.4) 10%, transparent 20%, transparent 100%)' 
              }} 
            />
          </div>
        </div>
      </div>

      <Button
        {...props}
        className={`relative w-full px-12 py-3 transition-colors
          bg-white text-neutral-800
          dark:bg-black dark:text-neutral-200
          border border-neutral-300 dark:border-neutral-800
          shadow-[0_1px_2px_rgba(0,0,0,0.05)_inset,_0_-1px_2px_rgba(0,0,0,0.05)_inset]
          dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)_inset,_0_-1px_2px_rgba(255,255,255,0.05)_inset]
          hover:bg-neutral-100 dark:hover:bg-neutral-900
          ${className}`}
      >
        {children}
      </Button>

      <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] pointer-events-none" />
    </div>
  );
};
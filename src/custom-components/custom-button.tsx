"use client";

import { Button } from "@/components/ui/button";

export const MotionButton = ({
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      {...props}
      className={`group relative px-12 py-3 transition-colors
        bg-white text-neutral-800
        dark:bg-black dark:text-neutral-200
        border border-neutral-300 dark:border-neutral-800
        shadow-[0_1px_2px_rgba(0,0,0,0.05)_inset,_0_-1px_2px_rgba(0,0,0,0.05)_inset]
        dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)_inset,_0_-1px_2px_rgba(255,255,255,0.05)_inset]
        hover:bg-neutral-100 dark:hover:bg-neutral-900
        ${className}`}
    >
      {children}

      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto" />
      <span className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent h-[4px] w-full mx-auto blur-sm" />
    </Button>
  );
};

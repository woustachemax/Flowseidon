import { Button } from "@/components/ui/button"

export const MotionButton = ({ children, ...props }: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      {...props}
      className="group relative text-neutral-500 px-12 py-3 bg-black 
      shadow-[0px_1px_2px_0px_rgba(255,255,255,0.1)_inset,_0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset]"
    >
      {children}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto" />
      <span className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-[4px] w-full mx-auto blur-sm" />
    </Button>
  )
}

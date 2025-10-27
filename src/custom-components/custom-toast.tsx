"use client";

import { Toaster, toast as sonnerToast } from "sonner";

const baseStyle =
  "group relative bg-black text-neutral-300 border rounded-2xl px-6 py-4 shadow-[0_0_12px_0_rgba(255,255,255,0.05)]";

const variants = {
  success:
    "border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-300",
  error:
    "border-rose-500/40 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.35)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] transition-all duration-300",
};

export const toast = {
  success: (message: string) =>
    sonnerToast.success(message, {
      className: `${baseStyle} ${variants.success}`,
    }),
  error: (message: string) =>
    sonnerToast.error(message, {
      className: `${baseStyle} ${variants.error}`,
    }),
  info: (message: string) =>
    sonnerToast(message, {
      className: `${baseStyle} border-neutral-700 text-neutral-400`,
    }),
};

export const ThemedToaster = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      classNames: {
        toast: baseStyle,
        title: "font-medium",
        description: "text-neutral-500",
      },
    }}
  />
);

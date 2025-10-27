"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast as sonnerToast, type ToasterProps } from "sonner";

const base =
  "group relative bg-black text-neutral-300 border rounded-2xl shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all duration-300";
const variants = {
  success:
    "border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]",
  error:
    "border-rose-500/40 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.35)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)]",
  info:
    "border-neutral-700 text-neutral-400 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]",
  warning:
    "border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.35)]",
};

export const toast = {
  success: (msg: string) =>
    sonnerToast.success(msg, { className: `${base} ${variants.success}` }),
  error: (msg: string) =>
    sonnerToast.error(msg, { className: `${base} ${variants.error}` }),
  info: (msg: string) =>
    sonnerToast(msg, { className: `${base} ${variants.info}` }),
  warning: (msg: string) =>
    sonnerToast.warning(msg, { className: `${base} ${variants.warning}` }),
};

// ✅ Global toaster component
export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: base,
          title: "font-medium",
          description: "text-neutral-500",
        },
      }}
      {...props}
    />
  );
};

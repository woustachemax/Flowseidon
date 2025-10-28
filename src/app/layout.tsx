import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import { ThemedToaster } from "@/custom-components/custom-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowseidon",
  description: "Great App 👍",
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300`}
        style={{ WebkitFontSmoothing: "antialiased" }}
      >
        <TRPCReactProvider>
          {children}
          <ThemedToaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}

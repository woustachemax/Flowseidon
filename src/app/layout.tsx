import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemedToaster } from "@/custom-components/custom-toast";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          backgroundColor: "black",
          color: "white",
          fontFamily: "var(--font-geist-sans), sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <TRPCReactProvider>
          {children}
          <ThemedToaster/>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

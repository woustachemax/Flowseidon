import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Flowseidon",
  description: "Great App 👍",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=''
      >
        <TRPCReactProvider>
        {children}
        <Toaster/>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

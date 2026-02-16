import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AIConcierge from "@/components/ai/AIConcierge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inmoply | Next-Gen Real Estate Platform",
  description: "Find your next home with AI-powered search and transparent market insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50/30 text-gray-900`}
      >
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <AIConcierge />
      </body>
    </html>
  );
}

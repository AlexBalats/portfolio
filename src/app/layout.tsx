import LocaleTransitionShell from "@/components/LocaleTransitionShell";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Balats Portfolio",
  description: "Personal portfolio built with Next.js.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <div className="radial-overlay" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
        <LocaleTransitionShell>{children}</LocaleTransitionShell>
      </body>
    </html>
  );
}

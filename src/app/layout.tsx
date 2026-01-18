import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import profile from "../../content/profile.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const metadataTitle = profile.name;
const metadataDescription = profile.tagline;

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: metadataTitle,
    description: metadataDescription,
  },
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="radial-overlay" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

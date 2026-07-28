import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roofline Partners — Premium Roofing Solutions",
  description:
    "Roofline Partners delivers premium roofing solutions for residential and commercial properties. Request a free consultation today.",
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
  openGraph: {
    title: "Roofline Partners — Premium Roofing Solutions",
    description: "Premium roofing solutions for residential and commercial properties.",
    type: "website",
    locale: "en_US",
    siteName: "Roofline Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roofline Partners — Premium Roofing Solutions",
    description: "Premium roofing solutions for residential and commercial properties.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

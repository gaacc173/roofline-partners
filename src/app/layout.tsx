import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header, Footer } from "@/components/layout";
import { site } from "@/content/site";
import { validateEnv } from "@/lib/env";
import { organizationJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { AnalyticsPageView } from "@/components/analytics/AnalyticsPageView";
import "@/app/globals.css";

const env = validateEnv();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.metadata.defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.metadata.description,
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  openGraph: {
    title: site.metadata.defaultTitle,
    description: site.metadata.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.metadata.defaultTitle,
    description: site.metadata.description,
  },
  alternates: {
    canonical: "/",
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
      <body className="min-h-full flex flex-col font-sans">
        <StructuredData data={organizationJsonLd()} />
        <StructuredData data={serviceJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-zinc-50"
        >
          Skip to main content
        </a>
        <Header />
        <AnalyticsPageView />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

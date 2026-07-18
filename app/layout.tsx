import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { getCmsContent } from "@/lib/cms";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getCmsContent();

  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`
    },
    description: site.tagline,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png"
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { site } = await getCmsContent();
  // Set in the Studio under Site settings; validated to a safe charset
  // there, re-checked here before it reaches the page.
  const gaId = site.googleAnalyticsId?.trim();
  const analyticsEnabled = Boolean(gaId && /^[A-Za-z0-9-]+$/.test(gaId));

  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={`${figtree.variable} min-h-screen antialiased`}>
        {children}
        {analyticsEnabled && <GoogleAnalytics gaId={gaId as string} />}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Figtree } from "next/font/google";
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
    description: site.tagline
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={`${figtree.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCmsContent } from "@/lib/cms";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getCmsContent();

  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={`${figtree.variable} min-h-screen antialiased`}>
        <Header navigation={content.navigation} site={content.site} />
        <main>{children}</main>
        <Footer navigation={content.navigation} site={content.site} />
      </body>
    </html>
  );
}

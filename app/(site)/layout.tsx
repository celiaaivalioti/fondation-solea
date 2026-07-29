import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCmsContent } from "@/lib/cms";

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getCmsContent("fr");

  return (
    <>
      <Header navigation={content.navigation} site={content.site} locale="fr" />
      <main>{children}</main>
      <Footer navigation={content.navigation} site={content.site} locale="fr" />
    </>
  );
}

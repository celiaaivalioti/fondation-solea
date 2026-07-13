import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCmsContent } from "@/lib/cms";

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getCmsContent();

  return (
    <>
      <Header navigation={content.navigation} site={content.site} />
      <main>{children}</main>
      <Footer navigation={content.navigation} site={content.site} />
    </>
  );
}

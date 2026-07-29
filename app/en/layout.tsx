import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCmsContent } from "@/lib/cms";

export default async function EnglishLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getCmsContent("en");

  return (
    <>
      <Header navigation={content.navigation} site={content.site} locale="en" />
      <main>{children}</main>
      <Footer navigation={content.navigation} site={content.site} locale="en" />
    </>
  );
}

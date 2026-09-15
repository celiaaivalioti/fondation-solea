import type { ReactNode } from "react";
import { getCmsContent } from "@/lib/cms";
import type { Locale } from "@/lib/locales";
import Footer from "./Footer";
import Header from "./Header";

export default async function LocalizedSiteLayout({
  children,
  locale
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const { navigation, site } = await getCmsContent(locale);

  return (
    <>
      <Header navigation={navigation} site={site} locale={locale} />
      <main>{children}</main>
      <Footer navigation={navigation} site={site} locale={locale} />
    </>
  );
}

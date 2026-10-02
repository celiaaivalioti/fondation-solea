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
  const { navigation, aboutSubmenu, site } = await getCmsContent(locale);

  return (
    <>
      <Header navigation={navigation} aboutSubmenu={aboutSubmenu} site={site} locale={locale} />
      <main>{children}</main>
      <Footer navigation={navigation} site={site} locale={locale} />
    </>
  );
}

import LocalizedSiteLayout from "@/components/LocalizedSiteLayout";

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LocalizedSiteLayout locale="fr">{children}</LocalizedSiteLayout>;
}

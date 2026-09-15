import LocalizedSiteLayout from "@/components/LocalizedSiteLayout";

export default async function EnglishLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LocalizedSiteLayout locale="en">{children}</LocalizedSiteLayout>;
}

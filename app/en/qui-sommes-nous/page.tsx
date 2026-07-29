import AboutPage, { generateAboutMetadata } from "@/app/(site)/qui-sommes-nous/page";

export const generateMetadata = () => generateAboutMetadata("en");

export default function EnglishAboutPage() {
  return <AboutPage locale="en" />;
}

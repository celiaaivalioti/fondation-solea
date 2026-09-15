import AboutPage, { generateAboutMetadata } from "@/components/pages/AboutPage";

export const generateMetadata = () => generateAboutMetadata("en");

export default function EnglishAboutPage() {
  return <AboutPage locale="en" />;
}

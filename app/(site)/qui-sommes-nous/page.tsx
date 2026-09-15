import AboutPage, { generateAboutMetadata } from "@/components/pages/AboutPage";

export const generateMetadata = () => generateAboutMetadata("fr");

export default function FrenchAboutPage() {
  return <AboutPage locale="fr" />;
}

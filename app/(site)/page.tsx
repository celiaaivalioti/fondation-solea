import HomePage, { generateHomeMetadata } from "@/components/pages/HomePage";

export const generateMetadata = () => generateHomeMetadata("fr");

export default function FrenchHomePage() {
  return <HomePage locale="fr" />;
}

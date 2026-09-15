import FaqPage, { generateFaqMetadata } from "@/components/pages/FaqPage";

export const generateMetadata = () => generateFaqMetadata("fr");

export default function FrenchFaqPage() {
  return <FaqPage locale="fr" />;
}

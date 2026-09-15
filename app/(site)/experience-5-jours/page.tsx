import RetreatPage, { generateRetreatMetadata } from "@/components/pages/RetreatPage";

export const generateMetadata = () => generateRetreatMetadata("fr");

export default function FrenchRetreatPage() {
  return <RetreatPage locale="fr" />;
}

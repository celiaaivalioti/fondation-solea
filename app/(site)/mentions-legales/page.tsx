import LegalPage, { generateLegalMetadata } from "@/components/pages/LegalPage";

export const generateMetadata = () => generateLegalMetadata("fr");

export default function FrenchLegalPage() {
  return <LegalPage locale="fr" />;
}

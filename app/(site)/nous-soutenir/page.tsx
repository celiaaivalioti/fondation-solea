import SupportPage, { generateSupportMetadata } from "@/components/pages/SupportPage";

export const generateMetadata = () => generateSupportMetadata("fr");

export default function FrenchSupportPage() {
  return <SupportPage locale="fr" />;
}

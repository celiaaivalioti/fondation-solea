import PrivacyPage, { generatePrivacyMetadata } from "@/components/pages/PrivacyPage";

export const generateMetadata = () => generatePrivacyMetadata("fr");

export default function FrenchPrivacyPage() {
  return <PrivacyPage locale="fr" />;
}

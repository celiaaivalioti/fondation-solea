import ContactPage, { generateContactMetadata } from "@/components/pages/ContactPage";

export const generateMetadata = () => generateContactMetadata("fr");

export default function FrenchContactPage() {
  return <ContactPage locale="fr" />;
}

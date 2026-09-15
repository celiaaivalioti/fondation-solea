import SeminarsPage, { generateSeminarsMetadata } from "@/components/pages/SeminarsPage";

export const generateMetadata = () => generateSeminarsMetadata("fr");

export default function FrenchSeminarsPage() {
  return <SeminarsPage locale="fr" />;
}

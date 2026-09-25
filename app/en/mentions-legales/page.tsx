import LegalPage, { generateLegalMetadata } from "@/components/pages/LegalPage";

export const generateMetadata = () => generateLegalMetadata("en");

export default function EnglishLegalPage() {
  return <LegalPage locale="en" />;
}

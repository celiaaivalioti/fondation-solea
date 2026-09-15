import PrivacyPage, { generatePrivacyMetadata } from "@/components/pages/PrivacyPage";

export const generateMetadata = () => generatePrivacyMetadata("en");

export default function EnglishPrivacyPage() {
  return <PrivacyPage locale="en" />;
}

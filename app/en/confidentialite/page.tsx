import PrivacyPage, { generatePrivacyMetadata } from "@/app/(site)/confidentialite/page";

export const generateMetadata = () => generatePrivacyMetadata("en");

export default function EnglishPrivacyPage() {
  return <PrivacyPage locale="en" />;
}

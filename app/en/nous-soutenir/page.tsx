import SupportPage, { generateSupportMetadata } from "@/components/pages/SupportPage";

export const generateMetadata = () => generateSupportMetadata("en");

export default function EnglishSupportPage() {
  return <SupportPage locale="en" />;
}

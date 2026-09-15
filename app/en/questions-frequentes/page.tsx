import FaqPage, { generateFaqMetadata } from "@/components/pages/FaqPage";

export const generateMetadata = () => generateFaqMetadata("en");

export default function EnglishFAQPage() {
  return <FaqPage locale="en" />;
}

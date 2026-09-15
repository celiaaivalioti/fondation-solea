import SeminarsPage, { generateSeminarsMetadata } from "@/components/pages/SeminarsPage";

export const generateMetadata = () => generateSeminarsMetadata("en");

export default function EnglishSeminarsPage() {
  return <SeminarsPage locale="en" />;
}

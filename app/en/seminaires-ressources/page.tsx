import SeminarsPage, { generateSeminarsMetadata } from "@/app/(site)/seminaires-ressources/page";

export const generateMetadata = () => generateSeminarsMetadata("en");

export default function EnglishSeminarsPage() {
  return <SeminarsPage locale="en" />;
}

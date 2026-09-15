import HomePage, { generateHomeMetadata } from "@/components/pages/HomePage";

export const generateMetadata = () => generateHomeMetadata("en");

export default function EnglishHome() {
  return <HomePage locale="en" />;
}

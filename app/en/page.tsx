import Home, { generateHomeMetadata } from "@/app/(site)/page";

export const generateMetadata = () => generateHomeMetadata("en");

export default function EnglishHome() {
  return <Home locale="en" />;
}

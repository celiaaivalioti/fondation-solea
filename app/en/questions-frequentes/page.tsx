import FAQPage, { generateFaqMetadata } from "@/app/(site)/questions-frequentes/page";

export const generateMetadata = () => generateFaqMetadata("en");

export default function EnglishFAQPage() {
  return <FAQPage locale="en" />;
}

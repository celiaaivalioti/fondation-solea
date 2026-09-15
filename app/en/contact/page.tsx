import ContactPage, { generateContactMetadata } from "@/components/pages/ContactPage";

export const generateMetadata = () => generateContactMetadata("en");

export default function EnglishContactPage() {
  return <ContactPage locale="en" />;
}

import ContactPage, { generateContactMetadata } from "@/app/(site)/contact/page";

export const generateMetadata = () => generateContactMetadata("en");

export default function EnglishContactPage() {
  return <ContactPage locale="en" />;
}

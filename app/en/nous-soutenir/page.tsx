import SupportPage, { generateSupportMetadata } from "@/app/(site)/nous-soutenir/page";

export const generateMetadata = () => generateSupportMetadata("en");

export default function EnglishSupportPage() {
  return <SupportPage locale="en" />;
}

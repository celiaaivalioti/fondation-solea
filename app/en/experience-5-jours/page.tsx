import RetreatPage, { generateRetreatMetadata } from "@/app/(site)/experience-5-jours/page";

export const generateMetadata = () => generateRetreatMetadata("en");

export default function EnglishRetreatPage() {
  return <RetreatPage locale="en" />;
}

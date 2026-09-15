import RetreatPage, { generateRetreatMetadata } from "@/components/pages/RetreatPage";

export const generateMetadata = () => generateRetreatMetadata("en");

export default function EnglishRetreatPage() {
  return <RetreatPage locale="en" />;
}

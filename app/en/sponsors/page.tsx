import SponsorsPage, { generateSponsorsMetadata } from "@/components/pages/SponsorsPage";

export const generateMetadata = () => generateSponsorsMetadata("en");

export default function EnglishSponsorsPage() {
  return <SponsorsPage locale="en" />;
}

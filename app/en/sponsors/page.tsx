import SponsorsPage, { generateSponsorsMetadata } from "@/app/(site)/sponsors/page";

export const generateMetadata = () => generateSponsorsMetadata("en");

export default function EnglishSponsorsPage() {
  return <SponsorsPage locale="en" />;
}

import SponsorsPage, { generateSponsorsMetadata } from "@/components/pages/SponsorsPage";

export const generateMetadata = () => generateSponsorsMetadata("fr");

export default function FrenchSponsorsPage() {
  return <SponsorsPage locale="fr" />;
}

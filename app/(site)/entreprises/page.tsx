import BusinessPage, { generateBusinessMetadata } from "@/components/pages/BusinessPage";

export const generateMetadata = () => generateBusinessMetadata("fr");

export default function Page() {
  return <BusinessPage locale="fr" />;
}

import BusinessPage, { generateBusinessMetadata } from "@/components/pages/BusinessPage";

export const generateMetadata = () => generateBusinessMetadata("en");

export default function Page() {
  return <BusinessPage locale="en" />;
}

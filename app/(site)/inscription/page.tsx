import RegistrationPage, { generateRegistrationMetadata } from "@/components/pages/RegistrationPage";

export const generateMetadata = () => generateRegistrationMetadata("fr");

export default function FrenchRegistrationPage() {
  return <RegistrationPage locale="fr" />;
}

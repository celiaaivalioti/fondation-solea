import RegistrationPage, { generateRegistrationMetadata } from "@/components/pages/RegistrationPage";

export const generateMetadata = () => generateRegistrationMetadata("en");

export default function EnglishRegistrationPage() {
  return <RegistrationPage locale="en" />;
}

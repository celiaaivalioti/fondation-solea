import RegistrationPage, { generateRegistrationMetadata } from "@/app/(site)/inscription/page";

export const generateMetadata = () => generateRegistrationMetadata("en");

export default function EnglishRegistrationPage() {
  return <RegistrationPage locale="en" />;
}

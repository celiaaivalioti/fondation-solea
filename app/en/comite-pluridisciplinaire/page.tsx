import CommitteePage, { generateCommitteeMetadata } from "@/components/pages/CommitteePage";

export const generateMetadata = () => generateCommitteeMetadata("en");

export default function EnglishCommitteePage() {
  return <CommitteePage locale="en" />;
}

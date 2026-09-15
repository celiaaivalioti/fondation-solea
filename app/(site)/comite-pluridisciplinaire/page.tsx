import CommitteePage, { generateCommitteeMetadata } from "@/components/pages/CommitteePage";

export const generateMetadata = () => generateCommitteeMetadata("fr");

export default function FrenchCommitteePage() {
  return <CommitteePage locale="fr" />;
}

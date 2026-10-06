import DonationReturnPage, { type DonationReturnParams } from "@/components/pages/DonationReturnPage";

export const metadata = { title: "Your donation", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function Page({ searchParams }: { searchParams: DonationReturnParams }) {
  return <DonationReturnPage locale="en" searchParams={searchParams} />;
}

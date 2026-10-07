import { Heart } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { formatDonationAmount } from "@/lib/donations";
import { getDonationStatus } from "@/lib/donation-status";
import { localizeHref, type Locale } from "@/lib/locales";

export type DonationReturnParams = Promise<{ session_id?: string | string[]; status?: string | string[] }>;

export default async function DonationReturnPage({ locale, searchParams }: { locale: Locale; searchParams: DonationReturnParams }) {
  const params = await searchParams;
  const result = await getDonationStatus(params.session_id, params.status === "cancelled");
  const fr = locale === "fr";
  const copy = {
    paid: {
      title: fr ? "Merci pour votre générosité." : "Thank you for your generosity.",
      text: fr ? "Votre don a bien été reçu. La Fondation Solea vous remercie chaleureusement pour votre soutien en faveur des personnes touchées par le cancer." : "Your donation has been received. Your support helps Solea offer a restorative break to people affected by cancer."
    },
    pending: {
      title: fr ? "Votre paiement est en cours." : "Your payment is being processed.",
      text: fr ? "Nous attendons la confirmation de votre paiement. Vous pouvez actualiser cette page pour consulter son état. Merci pour votre soutien." : "We are waiting for payment confirmation. You can refresh this page to check its status. Thank you for your support."
    },
    cancelled: {
      title: fr ? "Prenez le temps qu’il vous faut." : "Take the time you need.",
      text: fr ? "Vous avez quitté le paiement avant sa confirmation. Vous pouvez revenir au formulaire lorsque vous le souhaitez." : "You left checkout before confirmation. You can return to the donation form whenever you wish."
    },
    unavailable: {
      title: fr ? "Vérifions votre paiement." : "Let’s check your payment.",
      text: fr ? "Nous ne pouvons pas vérifier le paiement pour le moment. Si vous avez déjà effectué un don, consultez votre confirmation Stripe ou contactez-nous avant de réessayer." : "We cannot verify the payment right now. If you have already donated, check your Stripe confirmation or contact us before trying again."
    }
  }[result.state];
  return (
    <section className="bg-paper px-5 py-24 sm:px-8 lg:py-32" aria-labelledby="donation-return-title">
      <div className="mx-auto max-w-2xl text-center">
        <Heart aria-hidden="true" className="mx-auto h-12 w-12 text-moss" strokeWidth={1.5} />
        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-moss">{fr ? "Fondation Solea" : "Solea Foundation"}</p>
        <h1 id="donation-return-title" className="mt-4 font-display text-4xl font-light leading-tight text-bark sm:text-5xl">{copy.title}</h1>
        {result.test && (
          <p className="mt-6 rounded-xl border border-moss/20 bg-linen p-4 font-semibold text-bark">
            {fr ? "Paiement de test — aucun montant réel n’a été encaissé." : "Test payment — no real money has been collected."}
          </p>
        )}
        <p className="mt-6 text-lg leading-relaxed text-bark/75">{copy.text}</p>
        {result.state === "paid" && result.amountMinor !== undefined && (
          <p className="mt-6 text-xl font-semibold text-moss">
            {formatDonationAmount(result.amountMinor, locale)} CHF{result.monthly ? fr ? " par mois" : " per month" : ""}
          </p>
        )}
        {result.state === "paid" && result.monthly && (
          <p className="mt-4 text-bark/75">{fr ? "Pour modifier ou arrêter votre don mensuel, contactez-nous." : "To change or cancel your monthly donation, please contact us."}</p>
        )}
        {result.state === "paid" && !result.test && (
          <p className="mt-4 text-bark/75">{fr ? "Votre attestation de don vous sera envoyée par e-mail en pièce jointe PDF. Pensez à vérifier vos courriers indésirables." : "Your donation certificate will be emailed to you as a PDF attachment. Please check your spam folder."}</p>
        )}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <CTAButton href={localizeHref(result.state === "paid" ? "/" : "/nous-soutenir#donation", locale)}>
            {result.state === "paid" ? fr ? "Retour à l’accueil" : "Return home" : fr ? "Revenir au formulaire" : "Return to the donation form"}
          </CTAButton>
          <CTAButton href={localizeHref("/contact", locale)} variant="secondary">{fr ? "Nous contacter" : "Contact us"}</CTAButton>
        </div>
      </div>
    </section>
  );
}

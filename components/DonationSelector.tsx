"use client";

import { useId, useRef, useState } from "react";
import CTAButton from "@/components/CTAButton";
import { localizeHref } from "@/lib/locales";
import { Check, Users } from "lucide-react";
import type { Locale } from "@/lib/locales";
import {
  donationAmounts, formatDonationAmount, parseDonationAmount,
  type DonationFrequency, type DonorType
} from "@/lib/donations";
type SelectedAmount = number | "custom";

const amounts: Record<DonationFrequency, number[]> = {
  once: [20, 50, 100, 200, 500],
  monthly: [20, 50, 100, 200]
};

const companyAmounts = [2500, 7500, 15000, 30000];
class DonationCheckoutError extends Error {}

export default function DonationSelector({ locale, testMode = false }: { locale: Locale; testMode?: boolean }) {
  const customAmountId = useId();
  const feesId = useId();
  const [donorType, setDonorType] = useState<DonorType>("individual");
  const [frequency, setFrequency] = useState<DonationFrequency>("once");
  const [selectedAmount, setSelectedAmount] = useState<SelectedAmount>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [coverFees, setCoverFees] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const submitting = useRef(false);
  const checkoutAttempt = useRef<{ fingerprint: string; requestId: string } | null>(null);
  const isFrench = locale === "fr";

  const isCompany = donorType === "company";
  const formatAmount = (amount: number | string) => Number(amount).toLocaleString("de-CH");
  const selectDonorType = (nextType: DonorType) => {
    setDonorType(nextType);
    if (nextType === "company") setFrequency("once");
    setSelectedAmount(nextType === "company" ? 7500 : frequency === "once" ? 100 : 50);
    setCustomAmount("");
  };

  const selectFrequency = (nextFrequency: DonationFrequency) => {
    setFrequency(nextFrequency);
    setSelectedAmount(isCompany ? 7500 : nextFrequency === "once" ? 100 : 50);
    setCustomAmount("");
  };

  const chosenAmount = selectedAmount === "custom" ? customAmount : selectedAmount;
  const amountMinor = parseDonationAmount(chosenAmount);
  const validAmount = amountMinor !== null;
  const totals = amountMinor === null ? null : donationAmounts(amountMinor, coverFees);
  const buttonLabel = totals
    ? isFrench
      ? `Faire un don de ${formatDonationAmount(totals.totalMinor, locale)} CHF${frequency === "monthly" ? " par mois" : ""}`
      : `Donate CHF ${formatDonationAmount(totals.totalMinor, locale)}${frequency === "monthly" ? " per month" : ""}`
    : isFrench
      ? "Faire un don"
      : "Donate";

  const startCheckout = async () => {
    if (!validAmount || submitting.current) return;
    submitting.current = true;
    setIsSubmitting(true);
    setCheckoutError("");
    const selection = { amount: String(chosenAmount), frequency, donorType, coverFees, locale };
    const fingerprint = JSON.stringify(selection);
    try {
      if (checkoutAttempt.current?.fingerprint !== fingerprint) {
        checkoutAttempt.current = { fingerprint, requestId: crypto.randomUUID() };
      }
      const response = await fetch("/api/donations/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selection, requestId: checkoutAttempt.current!.requestId }),
        signal: AbortSignal.timeout(25_000)
      });
      const result = await response.json();
      if (!response.ok) {
        const message = response.status === 429
          ? isFrench ? "Veuillez patienter quelques minutes avant de réessayer." : "Please wait a few minutes before trying again."
          : response.status === 400
            ? isFrench ? "Choisissez un montant entre 1 et 100 000 CHF, avec deux décimales au maximum." : "Choose an amount between CHF 1 and 100,000, with at most two decimal places."
            : isFrench ? "Le paiement est momentanément indisponible. Réessayez plus tard ou contactez-nous." : "Payment is temporarily unavailable. Please try later or contact us.";
        throw new DonationCheckoutError(message);
      }
      if (typeof result.url !== "string" || new URL(result.url).origin !== "https://checkout.stripe.com") throw new Error();
      window.location.assign(result.url);
    } catch (error) {
      setCheckoutError(error instanceof DonationCheckoutError
        ? error.message
        : isFrench ? "La connexion au paiement a échoué. Veuillez réessayer." : "Could not connect to checkout. Please try again.");
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="donation"
      className="scroll-mt-24 bg-[rgb(var(--color-accent)/1)] px-5 py-16 text-bark sm:px-8 lg:py-24"
      aria-labelledby="donation-selector-title"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-brand-dark">
            {isFrench ? "Votre soutien" : "Your support"}
          </p>
          <h2
            id="donation-selector-title"
            className="mt-4 font-display text-[clamp(1.9rem,2.8vw,2.8rem)] font-light leading-[1.08] text-bark text-balance"
          >
            {isFrench ? "Votre don à la Fondation Solea" : "Your donation to the Solea Foundation"}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-bark/72">
            {isFrench
              ? "Choisissez la forme de soutien qui vous convient. Chaque contribution participe à rendre l’expérience Solea accessible gratuitement."
              : "Choose the kind of support that suits you. Every contribution helps keep the Solea experience free for participants."}
          </p>
        </div>

        {testMode && (
          <p className="mx-auto mt-6 max-w-2xl rounded-xl border border-moss/20 bg-paper/70 p-4 text-center font-semibold text-bark">
            {isFrench ? "Mode test — utilisez une carte de test Stripe. Aucun don réel ne sera encaissé." : "Test mode — use a Stripe test card. No real donation will be collected."}
          </p>
        )}

        <form onSubmit={(event) => { event.preventDefault(); void startCheckout(); }} aria-busy={isSubmitting}>
          <fieldset disabled={isSubmitting} className="min-w-0">
            <legend className="sr-only">{isFrench ? "Choisir votre don" : "Choose your donation"}</legend>
            <div role="group" aria-label={isFrench ? "Type de donateur" : "Donor type"} className="mx-auto mt-10 grid w-fit max-w-full grid-cols-2 rounded-full bg-paper/70 p-1.5">
              {(["individual", "company"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={donorType === option}
                  onClick={() => selectDonorType(option)}
                  className={`min-h-12 rounded-full px-4 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bark sm:text-xl ${donorType === option ? "bg-moss text-paper" : "text-bark/75 hover:bg-paper"}`}
                >
                  {option === "individual"
                    ? isFrench ? "Je suis un particulier" : "I am an individual"
                    : isFrench ? "Je suis une entreprise" : "I represent a company"}
                </button>
              ))}
            </div>

            {!isCompany && (
              <div role="group" aria-label={isFrench ? "Fréquence du don" : "Donation frequency"} className="mx-auto mt-4 grid w-fit max-w-full grid-cols-2 rounded-full bg-paper/70 p-1.5">
                {(["once", "monthly"] as const).map((option) => {
                  const active = frequency === option;
                  const label = option === "once"
                    ? isFrench ? "Don ponctuel" : "One-time donation"
                    : isFrench ? "Don mensuel" : "Monthly donation";

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectFrequency(option)}
                      className={`min-h-12 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-300 ease-out-soft sm:text-base ${
                        active
                          ? "bg-moss text-paper"
                          : "text-bark/75 hover:bg-paper"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {isCompany && (
              <p aria-live="polite" className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-bark/80">
                {isFrench
                    ? "Votre entreprise contribue à rendre l’expérience Solea accessible gratuitement."
                    : "Your company helps make the Solea experience freely accessible."}
              </p>
            )}

            <div role="group" aria-label={isFrench ? "Montant du don" : "Donation amount"} className="mt-10 flex flex-wrap justify-center gap-3 lg:gap-5">
              {(isCompany ? companyAmounts : amounts[frequency]).map((amount) => {
                const active = selectedAmount === amount;

                return (
                  <button
                    key={amount}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedAmount(amount)}
                    className={`flex min-h-32 w-[calc(50%-0.375rem)] flex-col items-center justify-center rounded-[1.5rem] px-4 py-7 transition-all duration-300 ease-out-soft ${isCompany ? "sm:w-[calc(50%-0.375rem)]" : "sm:w-[calc(33.333%-0.5rem)]"} lg:w-44 ${
                      active
                        ? "bg-paper text-bark shadow-soft"
                        : "bg-paper/60 text-moss hover:-translate-y-1 hover:bg-paper/80"
                    }`}
                  >
                    <span className="text-xl font-semibold sm:text-2xl">{formatAmount(amount)} CHF</span>
                    {frequency === "monthly" && (
                      <span className="mt-1 text-sm font-medium opacity-65">
                        {isFrench ? "par mois" : "per month"}
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                aria-pressed={selectedAmount === "custom"}
                onClick={() => setSelectedAmount("custom")}
                className={`flex min-h-32 w-[calc(50%-0.375rem)] items-center justify-center rounded-[1.5rem] px-4 py-7 text-2xl font-semibold transition-all duration-300 ease-out-soft ${isCompany ? "sm:w-[calc(50%-0.375rem)]" : "sm:w-[calc(33.333%-0.5rem)]"} lg:w-44 ${
                  selectedAmount === "custom"
                    ? "bg-paper text-bark shadow-soft"
                    : "bg-paper/60 text-moss hover:-translate-y-1 hover:bg-paper/80"
                }`}
              >
                {isFrench ? "Autre" : "Other"}
              </button>
            </div>

            {selectedAmount === "custom" && (
              <div className="mx-auto mt-6 max-w-sm">
                <label htmlFor={customAmountId} className="mb-2 block text-sm font-semibold text-bark/75">
                  {isCompany ? isFrench ? "Autre montant" : "Other amount" : isFrench ? "Montant de votre don" : "Your donation amount"}
                </label>
                <div className="relative">
                  <input
                    id={customAmountId}
                    type="number"
                    min="1"
                    max="100000"
                    step="0.01"
                    inputMode="decimal"
                    value={selectedAmount === "custom" ? customAmount : ""}
                    onFocus={() => setSelectedAmount("custom")}
                    onChange={(event) => { setSelectedAmount("custom"); setCustomAmount(event.target.value); }}
                    className="h-14 w-full rounded-full border border-moss/20 bg-paper px-6 pr-16 text-lg font-semibold text-bark outline-none transition focus:border-moss"
                  />
                  <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 font-semibold text-bark/55">
                    CHF
                  </span>
                </div>
                <p className="mt-2 text-sm text-bark/70">{isFrench ? "De 1 à 100 000 CHF." : "Between CHF 1 and 100,000."}</p>
              </div>
            )}

            <label htmlFor={feesId} className="mx-auto mt-9 flex max-w-[1400px] cursor-pointer items-center justify-center gap-2 text-left sm:text-center">
              <input
                id={feesId}
                type="checkbox"
                checked={coverFees}
                onChange={(event) => setCoverFees(event.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-md transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bark ${
                  coverFees ? "bg-moss" : "bg-paper/60"
                }`}
              >
                {coverFees && <Check aria-hidden="true" className="h-3.5 w-3.5 text-paper" strokeWidth={2.5} />}
              </span>
              <span className="font-medium leading-relaxed text-bark/82 sm:text-sm">
                {isFrench
                  ? "Ajouter une contribution de 2,7 % pour aider Solea à couvrir les frais de paiement."
                  : "Add a 2.7% contribution to help Solea cover payment fees."}
              </span>
            </label>

            {coverFees && totals && (
              <p className="mt-4 text-center text-sm text-bark/75" aria-live="polite">
                {isFrench ? "Don" : "Donation"} : {formatDonationAmount(totals.amountMinor, locale)} CHF
                {" + contribution : "}{formatDonationAmount(totals.contributionMinor, locale)} CHF
                {" = "}{formatDonationAmount(totals.totalMinor, locale)} CHF{frequency === "monthly" ? isFrench ? " par mois" : " per month" : ""}.
              </p>
            )}

            {frequency === "monthly" && (
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-semibold leading-relaxed text-bark/80">
                {isFrench ? "Don mensuel modifiable à tout moment, sans justification." : "Your monthly donation can be changed at any time, without explanation."}
              </p>
            )}

            {isCompany && (
              <div className="mx-auto mt-8 flex max-w-3xl items-center gap-4 rounded-2xl bg-paper/40 p-6">
                <Users aria-hidden="true" className="h-9 w-9 flex-none text-moss" strokeWidth={1.5} />
                <p className="leading-relaxed text-bark/80">
                  {isFrench
                    ? "Construisons ensemble un partenariat sur mesure, adapté à vos valeurs et à vos objectifs de responsabilité sociale."
                    : "Let’s build a tailored partnership that reflects your values and social responsibility goals."}
                </p>
              </div>
            )}

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <button
                type="submit"
                disabled={!validAmount || isSubmitting}
                className="inline-flex min-h-16 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50 bg-moss px-12 py-4 text-lg font-semibold text-paper shadow-glow transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bark sm:px-14"
              >
                {isSubmitting ? isFrench ? "Ouverture du paiement…" : "Opening checkout…" : buttonLabel}
              </button>
              {isCompany && (
                <CTAButton href={localizeHref("/contact", locale)} variant="secondary">
                  {isFrench ? "Prendre rendez-vous avec Solea" : "Arrange a meeting with Solea"}
                </CTAButton>
              )}
            </div>
          </fieldset>
          {checkoutError && <p role="alert" className="mx-auto mt-5 max-w-2xl text-center font-medium text-bark">{checkoutError}</p>}
          <p className="mt-5 text-center text-sm text-bark/65">
            {isFrench ? "Paiement sécurisé sur Stripe. Vous pourrez vérifier votre don avant de le confirmer." : "Secure payment on Stripe. You can review your donation before confirming."}
          </p>
        </form>
        <aside
          aria-labelledby="bank-transfer-title"
          className="mx-auto mt-16 max-w-3xl select-text rounded-[1.5rem] border-2 border-[rgb(var(--color-surface)/.6)] p-6 selection:bg-bark selection:text-paper sm:mt-24 sm:p-10"
        >
          <h3 id="bank-transfer-title" className="text-xl font-semibold leading-relaxed text-bark">
            {isFrench
              ? "Vous pouvez également faire votre don par virement bancaire :"
              : "You can also make your donation by bank transfer:"}
          </h3>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-bark sm:text-xl">
            {isFrench ? "N° IBAN :" : "IBAN:"}{" "}
            <span className="inline-block max-w-full break-words tabular-nums">CH26 0078 8000 0513 4556 0</span>
          </p>
          <div className="mt-6 space-y-2 leading-relaxed text-bark/80">
            <p>Fondation Solea, Rue de l&apos;Aubépine 2, 1205 Genève</p>
            <p>{isFrench ? "N° BIC/SWIFT :" : "BIC/SWIFT:"} BCGECHGGXXX</p>
            <p>Clearing/CB : 788</p>
            <p>Banque Cantonale de Genève</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { localizeHref } from "@/lib/locales";
import { Check, Users } from "lucide-react";
import type { Locale } from "@/lib/locales";

type DonorType = "individual" | "company";
type DonationFrequency = "once" | "monthly";
type SelectedAmount = number | "custom";

const amounts: Record<DonationFrequency, number[]> = {
  once: [20, 50, 100, 200, 500],
  monthly: [20, 50, 100, 200]
};

const companyAmounts = [2500, 7500, 15000, 30000];
const companyPlaces: Record<number, number> = { 2500: 5, 7500: 10, 15000: 20, 30000: 40 };

export default function DonationSelector({ locale }: { locale: Locale }) {
  const customAmountId = useId();
  const feesId = useId();
  const [donorType, setDonorType] = useState<DonorType>("individual");
  const [frequency, setFrequency] = useState<DonationFrequency>("once");
  const [selectedAmount, setSelectedAmount] = useState<SelectedAmount>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [coverFees, setCoverFees] = useState(false);
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
  const validAmount = Number.isFinite(Number(chosenAmount)) && Number(chosenAmount) >= 1;
  const buttonLabel = validAmount
    ? isFrench
      ? `Faire un don de ${formatAmount(chosenAmount)} CHF${frequency === "monthly" ? " par mois" : ""}`
      : `Donate CHF ${formatAmount(chosenAmount)}${frequency === "monthly" ? " per month" : ""}`
    : isFrench
      ? "Faire un don"
      : "Donate";

  return (
    <section
      className="bg-[rgb(var(--color-accent)/1)] px-5 py-16 text-bark sm:px-8 lg:py-24"
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

        <div role="group" aria-label={isFrench ? "Type de donateur" : "Donor type"} className="mx-auto mt-10 grid max-w-2xl grid-cols-2 rounded-full bg-paper/70 p-1.5">
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
          <div role="group" aria-label={isFrench ? "Fréquence du don" : "Donation frequency"} className="mx-auto mt-4 grid max-w-xl grid-cols-2 rounded-full bg-paper/70 p-1.5">
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
            {selectedAmount !== "custom" && companyPlaces[selectedAmount]
              ? isFrench
                ? `Votre entreprise finance ${companyPlaces[selectedAmount]} parcours d’accompagnement, pour la collectivité ou pour vos propres collaborateurs.`
                : `Your company funds ${companyPlaces[selectedAmount]} support experiences for the community or your own employees.`
              : isFrench
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
                    ? "bg-paper text-moss shadow-soft"
                    : "bg-paper/60 text-bark hover:-translate-y-1 hover:bg-paper/80"
                }`}
              >
                <span className="text-xl font-semibold sm:text-2xl">{formatAmount(amount)} CHF</span>
                {isCompany && (
                  <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-bark/65">
                    {companyPlaces[amount]} places
                  </span>
                )}
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
                ? "bg-paper text-moss shadow-soft"
                : "bg-paper/60 text-bark hover:-translate-y-1 hover:bg-paper/80"
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
              ? "Ajouter 2,7 % pour couvrir les frais bancaires et permettre à Solea de recevoir 100 % de votre don."
              : "Add 2.7% to cover banking fees and allow Solea to receive 100% of your donation."}
          </span>
        </label>

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
            type="button"
            disabled={!validAmount}
            className="inline-flex min-h-16 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50 bg-moss px-12 py-4 text-lg font-semibold text-paper shadow-glow transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bark sm:px-14"
          >
            {buttonLabel}
          </button>
          {isCompany && (
            <Link href={localizeHref("/contact", locale)} className="inline-flex min-h-16 items-center justify-center rounded-full border border-moss bg-paper px-8 py-4 text-center font-semibold text-bark transition-colors hover:bg-paper/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bark">
              {isFrench ? "Prendre rendez-vous avec Solea" : "Arrange a meeting with Solea"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

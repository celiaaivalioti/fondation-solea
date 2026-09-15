"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/lib/locales";

type DonationFrequency = "once" | "monthly";
type SelectedAmount = number | "custom";

const amounts: Record<DonationFrequency, number[]> = {
  once: [20, 50, 100, 200, 500],
  monthly: [20, 50, 100, 200]
};

export default function DonationSelector({ locale }: { locale: Locale }) {
  const customAmountId = useId();
  const feesId = useId();
  const [frequency, setFrequency] = useState<DonationFrequency>("once");
  const [selectedAmount, setSelectedAmount] = useState<SelectedAmount>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [coverFees, setCoverFees] = useState(false);
  const isFrench = locale === "fr";

  const selectFrequency = (nextFrequency: DonationFrequency) => {
    setFrequency(nextFrequency);
    setSelectedAmount(nextFrequency === "once" ? 100 : 50);
    setCustomAmount("");
  };

  const chosenAmount = selectedAmount === "custom" ? customAmount : selectedAmount;
  const buttonLabel = chosenAmount
    ? isFrench
      ? `Faire un don de ${chosenAmount} CHF${frequency === "monthly" ? " par mois" : ""}`
      : `Donate CHF ${chosenAmount}${frequency === "monthly" ? " per month" : ""}`
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

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 rounded-full bg-paper/45 p-1.5">
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
                    ? "bg-paper text-bark"
                    : "text-bark/66 hover:bg-paper/45 hover:text-bark"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 lg:gap-5">
          {amounts[frequency].map((amount) => {
            const active = selectedAmount === amount;

            return (
              <button
                key={amount}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedAmount(amount)}
                className={`flex aspect-square w-[calc(50%-0.375rem)] flex-col items-center justify-center rounded-[1.5rem] px-4 py-7 transition-all duration-300 ease-out-soft sm:w-[calc(33.333%-0.5rem)] lg:w-44 ${
                  active
                    ? "bg-paper text-moss shadow-soft"
                    : "bg-paper/60 text-bark hover:-translate-y-1 hover:bg-paper/80"
                }`}
              >
                <span className="text-2xl font-semibold sm:text-[1.7rem]">{amount} CHF</span>
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
            className={`flex aspect-square w-[calc(50%-0.375rem)] items-center justify-center rounded-[1.5rem] px-4 py-7 text-2xl font-semibold transition-all duration-300 ease-out-soft sm:w-[calc(33.333%-0.5rem)] lg:w-44 ${
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
              {isFrench ? "Montant de votre don" : "Your donation amount"}
            </label>
            <div className="relative">
              <input
                id={customAmountId}
                type="number"
                min="1"
                inputMode="decimal"
                value={customAmount}
                onChange={(event) => setCustomAmount(event.target.value)}
                className="h-14 w-full rounded-full border border-moss/20 bg-paper px-6 pr-16 text-lg font-semibold text-bark outline-none transition focus:border-moss"
              />
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 font-semibold text-bark/55">
                CHF
              </span>
            </div>
          </div>
        )}

        <label htmlFor={feesId} className="mx-auto mt-9 flex max-w-[1400px] cursor-pointer items-start justify-center gap-2 text-left sm:text-center sm:whitespace-nowrap">
          <input
            id={feesId}
            type="checkbox"
            checked={coverFees}
            onChange={(event) => setCoverFees(event.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={`mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-md transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bark ${
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

        <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-relaxed text-bark/62">
          {isFrench
            ? "Les montants proposés sont indicatifs. Vous pouvez choisir librement le montant de votre soutien."
            : "The suggested amounts are indicative. You are free to choose the amount of your support."}
        </p>

        <div className="mt-9 flex justify-center">
          <button
            type="button"
            className="inline-flex min-h-16 items-center justify-center rounded-full bg-moss px-12 py-4 text-lg font-semibold text-paper shadow-glow transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bark sm:px-14"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import DatePicker from "./DatePicker";
import { type FormStatus, submitForm } from "@/lib/submit-form";

const inputClass =
  "min-h-12 rounded-xl border border-moss/15 bg-linen/70 px-4 font-normal text-bark outline-none transition focus:bg-paper focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

const labelClass = "grid gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-bark/72";

export default function RegistrationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [inTreatment, setInTreatment] = useState("");
  const [needsAssistance, setNeedsAssistance] = useState("");

  if (status === "sent") {
    return (
      <div
        className="rounded-[1.5rem] bg-paper p-10 shadow-soft"
        role="status"
        aria-live="polite"
      >
        <div className="mb-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
            Confirmation
          </p>
        </div>
        <h2 className="font-display text-[2rem] font-light leading-tight text-bark">
          Merci pour votre inscription.
        </h2>
        <p className="mt-4 leading-[1.85] text-bark/72">
          Nous vous reviendrons dans les plus brefs délais.
        </p>
        <button
          type="button"
          onClick={() => {
            setInTreatment("");
            setNeedsAssistance("");
            setStatus("idle");
          }}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-moss/25 px-6 py-3 text-lg font-medium text-moss transition hover:border-moss hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        >
          Envoyer une nouvelle inscription
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6 rounded-[1.5rem] bg-paper p-7 shadow-soft sm:grid-cols-2 sm:p-10"
      aria-label="Formulaire d'inscription au séjour"
      onSubmit={(event) => {
        event.preventDefault();
        submitForm("inscription", event.currentTarget, setStatus);
      }}
    >
      <label className={labelClass}>
        Prénom
        <input className={inputClass} name="firstName" autoComplete="given-name" required />
      </label>
      <label className={labelClass}>
        Nom
        <input className={inputClass} name="lastName" autoComplete="family-name" required />
      </label>
      <label className={labelClass}>
        Email
        <input className={inputClass} type="email" name="email" autoComplete="email" required />
      </label>
      <label className={labelClass}>
        Téléphone
        <input className={inputClass} type="tel" name="phone" autoComplete="tel" required />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        Adresse
        <input className={inputClass} name="address" autoComplete="street-address" required />
      </label>
      <label className={labelClass}>
        Type de cancer
        <input className={inputClass} name="cancerType" required />
      </label>
      <label className={labelClass}>
        Date du diagnostic
        <DatePicker name="diagnosisDate" required />
      </label>
      <fieldset className="grid gap-3 rounded-2xl border border-moss/15 bg-linen/40 p-5 sm:col-span-2">
        <legend className="px-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-bark/72">
          Actuellement en traitement ?
        </legend>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-base font-medium text-bark/82">
            <input
              type="radio"
              name="inTreatment"
              value="oui"
              className="accent-moss"
              required
              checked={inTreatment === "oui"}
              onChange={(event) => setInTreatment(event.target.value)}
            />
            Oui
          </label>
          <label className="flex items-center gap-2 text-base font-medium text-bark/82">
            <input
              type="radio"
              name="inTreatment"
              value="non"
              className="accent-moss"
              checked={inTreatment === "non"}
              onChange={(event) => setInTreatment(event.target.value)}
            />
            Non
          </label>
        </div>
      </fieldset>
      {inTreatment === "oui" && (
        <label className={`${labelClass} sm:col-span-2`}>
          Si oui, quel type de traitement ?
          <textarea className={`${inputClass} min-h-28 py-3`} name="treatmentType" required />
        </label>
      )}
      <fieldset className="grid gap-3 rounded-2xl border border-moss/15 bg-linen/40 p-5 sm:col-span-2">
        <legend className="px-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-bark/72">
          Besoin d’assistance particulière ?
        </legend>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-base font-medium text-bark/82">
            <input
              type="radio"
              name="needsAssistance"
              value="oui"
              className="accent-moss"
              required
              checked={needsAssistance === "oui"}
              onChange={(event) => setNeedsAssistance(event.target.value)}
            />
            Oui
          </label>
          <label className="flex items-center gap-2 text-base font-medium text-bark/82">
            <input
              type="radio"
              name="needsAssistance"
              value="non"
              className="accent-moss"
              checked={needsAssistance === "non"}
              onChange={(event) => setNeedsAssistance(event.target.value)}
            />
            Non
          </label>
        </div>
      </fieldset>
      {needsAssistance === "oui" && (
        <label className={`${labelClass} sm:col-span-2`}>
          Si oui, quel type d’assistance ?
          <textarea className={`${inputClass} min-h-28 py-3`} name="assistanceType" required />
        </label>
      )}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      {status === "error" && (
        <p className="text-base leading-7 text-clay sm:col-span-2" role="alert">
          L’envoi n’a pas abouti. Merci de réessayer, ou écrivez-nous directement à{" "}
          <a href="mailto:contact@fondation-solea.ch" className="font-medium underline underline-offset-4">
            contact@fondation-solea.ch
          </a>
          .
        </p>
      )}
      <button
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-transparent bg-moss px-8 py-4 text-lg font-medium text-paper transition-all duration-300 ease-out-soft hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer l’inscription"}
      </button>
    </form>
  );
}

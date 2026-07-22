"use client";

import { useEffect, useRef, useState } from "react";
import DatePicker from "./DatePicker";
import type { RegistrationFormConfig } from "@/lib/cms-types";
import { type FormStatus, submitForm } from "@/lib/submit-form";

const inputClass =
  "min-h-12 rounded-xl border border-moss/15 bg-linen/70 px-4 font-normal text-bark outline-none transition focus:bg-paper focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

const labelClass = "grid gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-bark/72";

// Field visibility, labels and required state come from Sanity (see
// lib/form-config.ts for the defaults and catalog). The set of possible
// fields stays fixed in code; the config only toggles known fields.
export default function RegistrationForm({ config }: { config: RegistrationFormConfig }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
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
        <p className="mt-4 leading-[1.65] text-bark/72">
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
        submitForm("inscription", event.currentTarget, setStatus, openedAt.current);
      }}
    >
      {config.firstName.enabled && (
        <label className={labelClass}>
          {config.firstName.label}
          <input
            className={inputClass}
            name="firstName"
            autoComplete="given-name"
            required={config.firstName.required}
          />
        </label>
      )}
      {config.lastName.enabled && (
        <label className={labelClass}>
          {config.lastName.label}
          <input
            className={inputClass}
            name="lastName"
            autoComplete="family-name"
            required={config.lastName.required}
          />
        </label>
      )}
      {config.email.enabled && (
        <label className={labelClass}>
          {config.email.label}
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            required={config.email.required}
          />
        </label>
      )}
      {config.phone.enabled && (
        <label className={labelClass}>
          {config.phone.label}
          <input
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            required={config.phone.required}
          />
        </label>
      )}
      {config.address.enabled && (
        <label className={`${labelClass} sm:col-span-2`}>
          {config.address.label}
          <input
            className={inputClass}
            name="address"
            autoComplete="street-address"
            required={config.address.required}
          />
        </label>
      )}
      {config.cancerType.enabled && (
        <label className={labelClass}>
          {config.cancerType.label}
          <input className={inputClass} name="cancerType" required={config.cancerType.required} />
        </label>
      )}
      {config.diagnosisDate.enabled && (
        <label className={labelClass}>
          {config.diagnosisDate.label}
          <DatePicker name="diagnosisDate" required={config.diagnosisDate.required} />
        </label>
      )}
      {config.inTreatment.enabled && (
        <>
          <fieldset className="grid gap-3 rounded-2xl border border-moss/15 bg-linen/40 p-5 sm:col-span-2">
            <legend className="px-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-bark/72">
              {config.inTreatment.label}
            </legend>
            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-base font-medium text-bark/82">
                <input
                  type="radio"
                  name="inTreatment"
                  value="oui"
                  className="accent-moss"
                  required={config.inTreatment.required}
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
        </>
      )}
      {config.needsAssistance.enabled && (
        <>
          <fieldset className="grid gap-3 rounded-2xl border border-moss/15 bg-linen/40 p-5 sm:col-span-2">
            <legend className="px-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-bark/72">
              {config.needsAssistance.label}
            </legend>
            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-base font-medium text-bark/82">
                <input
                  type="radio"
                  name="needsAssistance"
                  value="oui"
                  className="accent-moss"
                  required={config.needsAssistance.required}
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
        </>
      )}
      {config.message.enabled && (
        <label className={`${labelClass} sm:col-span-2`}>
          {config.message.label}
          <textarea
            className={`${inputClass} min-h-40 py-3`}
            name="message"
            required={config.message.required}
          />
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

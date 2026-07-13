"use client";

import { useState } from "react";

const inputClass =
  "min-h-12 rounded-xl border border-moss/15 bg-linen/70 px-4 font-normal text-bark outline-none transition focus:bg-paper focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

const labelClass = "grid gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-bark/72";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="rounded-[1.5rem] bg-paper p-10 shadow-soft"
        role="status"
        aria-live="polite"
      >
        <div className="mb-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
            Message envoyé
          </p>
        </div>
        <h2 className="font-display text-[2rem] font-light leading-tight text-bark">
          Merci pour votre message.
        </h2>
        <p className="mt-4 leading-[1.85] text-bark/72">
          Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6 rounded-[1.5rem] bg-paper p-7 shadow-soft sm:grid-cols-2 sm:p-10"
      aria-label="Formulaire de contact"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
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
        <input className={inputClass} type="tel" name="phone" autoComplete="tel" />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        Votre message
        <textarea className={`${inputClass} min-h-48 py-3`} name="message" required />
      </label>
      <button
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-transparent bg-moss px-8 py-4 text-lg font-medium text-paper transition-all duration-300 ease-out-soft hover:bg-brand-dark hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay sm:col-span-2"
        type="submit"
      >
        Envoyer le message
      </button>
    </form>
  );
}

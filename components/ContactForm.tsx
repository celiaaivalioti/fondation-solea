"use client";

import { useEffect, useRef, useState } from "react";
import type { ContactFormConfig } from "@/lib/cms-types";
import { type Locale, defaultLocale } from "@/lib/locales";
import { type FormStatus, submitForm } from "@/lib/submit-form";

const inputClass =
  "min-h-12 rounded-xl border border-moss/15 bg-linen/70 px-4 font-normal text-bark outline-none transition focus:bg-paper focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

const labelClass = "grid gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-bark/72";

// Field visibility, labels and required state come from Sanity (see
// lib/form-config.ts for the defaults and catalog).
export default function ContactForm({
  config,
  locale = defaultLocale
}: {
  config: ContactFormConfig;
  locale?: Locale;
}) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const openedAt = useRef(0);
  const copy = {
    sentEyebrow: locale === "fr" ? "Message envoyé" : "Message sent",
    sentTitle: locale === "fr" ? "Merci pour votre message." : "Thank you for your message.",
    sentText:
      locale === "fr"
        ? "Nous vous répondrons dans les plus brefs délais."
        : "We will reply as soon as possible.",
    reset: locale === "fr" ? "Envoyer un nouveau message" : "Send another message",
    formLabel: locale === "fr" ? "Formulaire de contact" : "Contact form",
    error:
      locale === "fr"
        ? "L’envoi n’a pas abouti. Merci de réessayer, ou écrivez-nous directement à"
        : "The message could not be sent. Please try again, or write to us directly at",
    sending: locale === "fr" ? "Envoi en cours…" : "Sending...",
    submit: locale === "fr" ? "Envoyer le message" : "Send message"
  };

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  if (status === "sent") {
    return (
      <div
        className="rounded-[1.5rem] bg-paper p-10 shadow-soft"
        role="status"
        aria-live="polite"
      >
        <div className="mb-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-moss">
            {copy.sentEyebrow}
          </p>
        </div>
        <h2 className="font-display text-[2rem] font-light leading-tight text-bark">
          {copy.sentTitle}
        </h2>
        <p className="mt-4 leading-[1.65] text-bark/72">
          {copy.sentText}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-moss/25 px-6 py-3 text-lg font-medium text-moss transition hover:border-moss hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        >
          {copy.reset}
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6 rounded-[1.5rem] bg-paper p-7 shadow-soft sm:grid-cols-2 sm:p-10"
      aria-label={copy.formLabel}
      onSubmit={(event) => {
        event.preventDefault();
        submitForm("contact", event.currentTarget, setStatus, openedAt.current, locale);
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
      {config.message.enabled && (
        <label className={`${labelClass} sm:col-span-2`}>
          {config.message.label}
          <textarea
            className={`${inputClass} min-h-48 py-3`}
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
          {copy.error}{" "}
          <a href="mailto:contact@fondation-solea.ch" className="font-medium underline underline-offset-4">
            contact@fondation-solea.ch
          </a>
          .
        </p>
      )}
      <button
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-transparent bg-moss px-8 py-4 text-lg font-medium text-paper transition-all duration-300 ease-out-soft hover:bg-brand-dark hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}

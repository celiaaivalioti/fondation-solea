"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

const storageKey = "solea-cookie-consent";

type Consent = "accepted" | "refused";

// Renders Google Analytics only after the visitor accepts; shows the
// banner until a choice is made and remembers it in the browser.
export default function CookieConsent({ gaId }: { gaId: string }) {
  // null = not mounted yet (avoids a hydration mismatch), "pending" = no
  // stored choice.
  const [consent, setConsent] = useState<Consent | "pending" | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    setConsent(stored === "accepted" || stored === "refused" ? stored : "pending");
  }, []);

  const choose = (value: Consent) => {
    window.localStorage.setItem(storageKey, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId={gaId} />}
      {consent === "pending" && (
        <div
          role="region"
          aria-label="Consentement aux cookies"
          className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-3xl border border-moss/15 bg-paper p-6 shadow-glow sm:p-8">
            <p className="leading-[1.7] text-bark/80">
              Nous utilisons un outil de mesure d’audience (Google Analytics) pour améliorer ce
              site. Aucune autre donnée n’est collectée.{" "}
              <Link
                href="/confidentialite"
                className="font-medium text-moss underline underline-offset-4"
              >
                En savoir plus
              </Link>
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-moss px-7 py-3 text-base font-medium text-paper transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
              >
                Accepter
              </button>
              <button
                type="button"
                onClick={() => choose("refused")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-moss/30 px-7 py-3 text-base font-medium text-moss transition hover:border-moss hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
              >
                Refuser
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

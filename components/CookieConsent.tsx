"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

const storageKey = "solea-cookie-consent";
const consentEvent = "solea-consent-change";

type Consent = "accepted" | "refused";

// The stored choice is external state (localStorage), so we read it through
// useSyncExternalStore rather than a setState-in-effect. The "storage" event
// covers other tabs; the custom event covers changes within this tab.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(consentEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(consentEvent, callback);
  };
}

function getSnapshot(): Consent | "pending" {
  const stored = window.localStorage.getItem(storageKey);
  return stored === "accepted" || stored === "refused" ? stored : "pending";
}

// On the server (and the first client render) there is no stored choice to
// read; returning null keeps the banner out of the initial markup and avoids
// a hydration mismatch.
function getServerSnapshot(): Consent | "pending" | null {
  return null;
}

// Renders Google Analytics only after the visitor accepts; shows the
// banner until a choice is made and remembers it in the browser.
export default function CookieConsent({ gaId }: { gaId: string }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const choose = (value: Consent) => {
    window.localStorage.setItem(storageKey, value);
    window.dispatchEvent(new Event(consentEvent));
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
          <div className="mx-auto max-w-2xl rounded-3xl border border-moss/15 bg-paper p-6 shadow-glow sm:p-8">
            <h3 className="mb-4 font-display text-xl sm:text-2xl font-light text-bark leading-snug">
              Aidez-nous à améliorer ce site
            </h3>
            <p className="mb-2 text-sm sm:text-base leading-relaxed text-bark/75">
              Nous utilisons uniquement des cookies de mesure d’audience (Google Analytics) pour comprendre quelles pages sont utiles et améliorer l’information proposée.
            </p>
            <p className="mb-6 text-sm sm:text-base leading-relaxed text-bark/75">
              <span className="font-medium">Aucune publicité personnalisée n’est utilisée</span> et les données collectées restent <span className="font-medium">totalement anonymes</span>.{" "}
              <Link
                href="/confidentialite"
                className="font-medium text-moss underline underline-offset-4"
              >
                En savoir plus
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="order-first sm:order-none inline-flex min-h-14 sm:min-h-12 items-center justify-center rounded-full bg-moss px-8 py-3 text-base sm:text-base font-semibold text-paper transition hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay flex-1 sm:flex-initial"
              >
                Accepter
              </button>
              <button
                type="button"
                onClick={() => choose("refused")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-moss/30 px-8 py-3 text-base font-medium text-moss transition hover:border-moss hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
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

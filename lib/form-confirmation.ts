import type { Locale } from "@/lib/locales";

export function formConfirmation(kind: "contact" | "inscription", locale: Locale) {
  const french = locale === "fr";
  const contact = kind === "contact";
  const subject = french
    ? contact ? "Votre message a été reçu - Fondation Solea" : "Votre demande d’inscription a été reçue - Fondation Solea"
    : contact ? "We received your message - Solea Foundation" : "We received your application - Solea Foundation";
  // Do not echo submitted messages or registration/health details in replies.
  const text = french
    ? `Bonjour,\n\n${contact ? "Merci pour votre message. Nous l’avons bien reçu et notre équipe vous répondra dans les plus brefs délais." : "Merci pour votre demande d’inscription. Nous l’avons bien reçue et notre équipe prendra contact avec vous pour la suite. Cet e-mail confirme la réception de votre demande ; il ne constitue pas une confirmation de participation au séjour."}\n\nL’équipe de la Fondation Solea\ncontact@fondation-solea.ch\nwww.fondation-solea.ch`
    : `Hello,\n\n${contact ? "Thank you for your message. We have received it and our team will reply as soon as possible." : "Thank you for your application. We have received it and our team will contact you about the next steps. This email acknowledges receipt of your application; it does not confirm participation in a stay."}\n\nThe Solea Foundation team\ncontact@fondation-solea.ch\nwww.fondation-solea.ch`;
  return { subject, text };
}

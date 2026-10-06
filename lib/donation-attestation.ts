import type Stripe from "stripe";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb, type PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { DonationRecord } from "@/lib/donation-webhook";

export type DonationAttestation = {
  reference: string;
  name: string;
  email: string;
  address: string[];
  amountMinor: number;
  paidAt: number;
  issuedAt: number;
  test: boolean;
  locale: "fr" | "en";
};

const clean = (value: string | null | undefined) => (value ?? "").replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g, " ").replace(/\s+/g, " ").trim();
export function isDonationEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(value);
}

export function attestationFromEvent(event: Stripe.Event, record: DonationRecord): DonationAttestation {
  if (record.status !== "paid" || record.currency !== "chf" || !Number.isSafeInteger(record.amountMinor) || record.amountMinor! <= 0) {
    throw new Error("Attestation requires a positive confirmed CHF payment");
  }
  let name: string;
  let email: string;
  let address: Stripe.Address | null | undefined;
  let paidAt = record.created;
  let locale: "fr" | "en" = "fr";
  if (record.frequency === "once") {
    const session = event.data.object as Stripe.Checkout.Session;
    const donor = session.customer_details;
    name = clean(session.metadata?.donor_type === "company" ? donor?.business_name ?? donor?.name : donor?.individual_name ?? donor?.name);
    email = donor?.email ?? "";
    address = donor?.address;
    locale = session.metadata?.locale === "en" ? "en" : "fr";
  } else {
    const invoice = event.data.object as Stripe.Invoice;
    name = clean(invoice.customer_name);
    email = invoice.customer_email ?? "";
    address = invoice.customer_address;
    paidAt = invoice.status_transitions?.paid_at ?? record.created;
    locale = invoice.parent?.subscription_details?.metadata?.locale === "en" ? "en" : "fr";
  }
  if (!name || name.length > 300 || !isDonationEmail(email) || !clean(address?.line1) || !clean(address?.city) || !/^[A-Z]{2}$/.test(address?.country ?? "")) {
    throw new Error("Attestation donor details are incomplete");
  }
  const country = new Intl.DisplayNames(["fr"], { type: "region" }).of(address!.country!);
  const addressLines = [clean(address!.line1), clean(address!.line2), clean([address!.postal_code, address!.city].filter(Boolean).join(" ")), clean(address!.state), clean(country)].filter(Boolean);
  if (addressLines.some(line => line.length > 300)) throw new Error("Attestation address is too long");
  if (!Number.isSafeInteger(paidAt) || paidAt <= 0) throw new Error("Invalid payment date");
  const reference = `SOLEA-${createHash("sha256").update(`${record.livemode}:${record.resourceId}`).digest("hex").slice(0, 16).toUpperCase()}`;
  return { reference, name, email, address: addressLines, amountMinor: record.amountMinor!, paidAt, issuedAt: record.created, test: !record.livemode, locale };
}

export const attestationDate = (seconds: number) => new Intl.DateTimeFormat("fr-CH", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Zurich" }).format(new Date(seconds * 1000));
export const attestationAmount = (minor: number) => new Intl.NumberFormat("fr-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(minor / 100).replace(/[\u00a0\u202f]/g, " ");

// Text supplied by the foundation in “Attestation de dons - v3.docx”.
// The template's legal wording is reproduced, not independently certified here.
export const attestationCopy = {
  thanks: "La Fondation Solea vous remercie chaleureusement pour votre soutien en faveur des personnes touchées par le cancer. Grâce à votre soutien, nous construisons un lieu où chaque personne pourra retrouver des ressources, reprendre une place active dans son parcours de soins et envisager l'avenir avec davantage de confiance et de sérénité.",
  mission: "Merci de rendre cette mission possible.",
  foundation: "Par la présente, la Fondation Solea, reconnue d’utilité publique et exonérée des impôts fédéraux, cantonaux et communaux, ayant son siège rue de l’Aubépine 2 - 1205 Genève, représentée par Monsieur Samy Zayani, co-fondateur, certifie avoir reçu de :",
  definitive: "Le don ci-dessus est acquis à la Fondation Solea à titre définitif et ne sera en aucun cas restitué au donateur sous quelque forme que ce soit. En particulier, ce dernier ne reçoit aucune contre-prestation de la part de la Fondation Solea.",
  tax: "La présente attestation est délivrée au donateur afin de servir de justificatif dans le cadre de sa déclaration fiscale, conformément aux dispositions fiscales applicables.",
  team: "Les membres du Conseil de la Fondation Solea ainsi que toute l’équipe vous remercient chaleureusement."
};

let assetPromise: Promise<Buffer[]> | undefined;
function assets() {
  return assetPromise ??= Promise.all(["NotoSans-Regular.ttf", "NotoSans-Bold.ttf", "solea-logo.jpeg", "samy-zayani-signature.png"].map(file => readFile(path.join(process.cwd(), "assets", "donations", file)))).catch(error => { assetPromise = undefined; throw error; });
}

export async function buildDonationAttestation(data: DonationAttestation): Promise<Buffer> {
  const [regularBytes, boldBytes, logoBytes, signatureBytes] = await assets();
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const regular = await pdf.embedFont(regularBytes, { subset: true });
  const bold = await pdf.embedFont(boldBytes, { subset: true });
  const logo = await pdf.embedJpg(logoBytes);
  const signature = await pdf.embedPng(signatureBytes);
  pdf.setTitle(`${data.test ? "TEST - " : ""}Attestation de dons - ${data.reference}`);
  pdf.setAuthor("Fondation Solea");
  pdf.setCreationDate(new Date(data.issuedAt * 1000));
  pdf.setModificationDate(new Date(data.issuedAt * 1000));
  const width = 595.28, height = 841.89, left = 54, available = width - 2 * left;
  const ink = rgb(0.12, 0.16, 0.14), green = rgb(0.18, 0.35, 0.24), muted = rgb(0.42, 0.42, 0.39);
  let page = pdf.addPage([width, height]);
  let y = height - 149;
  function draw(text: string, x: number, baseline: number, size: number, font = regular, color = ink) {
    // Never silently replace a donor's characters with missing-glyph squares.
    const supported = new Set(font.getCharacterSet());
    if (Array.from(text).some(char => !supported.has(char.codePointAt(0)!))) throw new Error("Unsupported character in attestation");
    page.drawText(text, { x, y: baseline, size, font, color });
  }
  function chrome() {
    page.drawImage(logo, { x: width - left - 124, y: height - 85, width: 124, height: 124 * logo.height / logo.width });
    if (data.test) draw("TEST - AUCUNE VALEUR FISCALE", left, height - 54, 10, bold, green);
    page.drawLine({ start: { x: left, y: 63 }, end: { x: width - left, y: 63 }, thickness: 0.5, color: muted });
    ["Fondation Solea", "Rue de l'Aubépine 2", "1205 Genève"].forEach((line, i) => draw(line, left, 49 - i * 11, 8, regular, muted));
    ["contact@fondation-solea.ch", "Tel +41 79 831 41 31", "www.fondation-solea.ch"].forEach((line, i) => draw(line, width - left - regular.widthOfTextAtSize(line, 8), 49 - i * 11, 8, regular, muted));
  }
  chrome();
  function wrap(text: string, font: PDFFont, size: number) {
    const lines: string[] = [];
    let current = "";
    for (const word of text.split(" ")) {
      if (font.widthOfTextAtSize(word, size) > available) {
        if (current) { lines.push(current); current = ""; }
        for (const char of Array.from(word)) {
          if (font.widthOfTextAtSize(current + char, size) > available) { lines.push(current); current = ""; }
          current += char;
        }
      } else if (font.widthOfTextAtSize(current ? `${current} ${word}` : word, size) > available) {
        lines.push(current); current = word;
      } else current = current ? `${current} ${word}` : word;
    }
    if (current) lines.push(current);
    return lines;
  }
  function paragraph(text: string, { font = regular, size = 9.5, gap = 8 } = {}) {
    const leading = size * 1.4;
    for (const line of wrap(text, font, size)) {
      if (y < 99) { page = pdf.addPage([width, height]); chrome(); y = height - 110; }
      draw(line, left, y, size, font); y -= leading;
    }
    y -= gap;
  }
  const title = "Attestation de dons";
  draw(title, left, y, 19, bold);
  y -= 28;
  paragraph(`Référence : ${data.reference}`, { size: 8, gap: 12 });
  if (data.test) paragraph("Document de test. Aucun don réel n’a été encaissé. Cette attestation ne peut pas être utilisée comme justificatif fiscal.", { font: bold });
  paragraph(`Bonjour ${data.name},`, { font: bold });
  paragraph(attestationCopy.thanks);
  paragraph(attestationCopy.mission);
  paragraph(attestationCopy.foundation, { gap: 5 });
  paragraph(`${data.name} (ci-après « le donateur »)`, { font: bold, gap: 1 });
  data.address.forEach(line => paragraph(line, { gap: 0 }));
  y -= 10;
  paragraph(`en date du ${attestationDate(data.paidAt)} la somme de ${attestationAmount(data.amountMinor)} CHF à titre de prestations bénévoles au sens de l’article 37 de la loi sur l’imposition des personnes physiques (LIPP).`);
  paragraph(attestationCopy.definitive);
  paragraph(attestationCopy.tax);
  paragraph(attestationCopy.team);
  // Keep the issue date, signatory and electronic-document note together.
  if (y < 210) { page = pdf.addPage([width, height]); chrome(); y = height - 110; }
  paragraph(`Fait à Genève, le ${attestationDate(data.issuedAt)}`, { gap: 18 });
  // Place the supplied handwritten signature beside the three-line signatory
  // block, keeping its proportions and leaving the electronic note clear.
  const signatoryY = y;
  const signatureHeight = 52;
  page.drawImage(signature, {
    x: left + regular.widthOfTextAtSize("Fondation Solea", 9.5) + 14,
    y: signatoryY + 14 - signatureHeight,
    width: signatureHeight * signature.width / signature.height,
    height: signatureHeight
  });
  paragraph("Samy Zayani", { font: bold, gap: 0 });
  paragraph("Cofondateur", { gap: 0 });
  paragraph("Fondation Solea", { gap: 12 });
  paragraph("Document généré électroniquement", { size: 8, gap: 0 });
  const pages = pdf.getPages();
  pages.forEach((current, i) => {
    page = current;
    const label = `${i + 1} / ${pages.length}`;
    draw(label, (width - regular.widthOfTextAtSize(label, 8)) / 2, 27, 8, regular, muted);
  });
  return Buffer.from(await pdf.save());
}

import type { SectionVisibility } from "./section-visibility";
export type CmsImage = {
  url: string;
  alt: string;
  className?: string;
};

export type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "paper" | "ghost" | "paperGhost";
  newTab?: boolean;
  show?: boolean;
  visible?: boolean;
};

export type HeroContent = {
  eyebrow?: string;
  title: string;
  text: string;
  quote?: string;
  quoteAttribution?: string;
  image: CmsImage;
  primary?: Cta;
  secondary?: Cta;
  tertiary?: Cta;
};

export type NavigationItem = {
  label: string;
  href: string;
  newTab?: boolean;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  intro: string;
  quote: string;
  email: string;
  phone: string;
  address: string;
  footerTagline: string;
  showDonationCta: boolean;
  donationLabel: string;
  googleAnalyticsId?: string;
  legalLinks: NavigationItem[];
  socialLinks: Array<NavigationItem & { platform: string }>;
};

export type TextSection = {
  eyebrow?: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  quote?: string;
  cta?: Cta;
};

export type HomeContent = SectionVisibility & {
  metadataTitle: string;
  hero: HeroContent;
  manifesto: TextSection & {
    portraitImage?: CmsImage;
    portraitAlternativeText?: string;
    quoteAttribution?: string;
  };
};

export type ValueItem = {
  label: string;
  icon: string;
};

export type PrincipleItem = {
  title: string;
  text: string;
};

export type PersonCard = {
  name: string;
  role: string;
  image: CmsImage;
  quote?: string;
  paragraphs?: string[];
  id?: string;
  cta?: Cta;
};

export type AboutContent = SectionVisibility & {
  metadataTitle: string;
  hero: HeroContent;
  foundation: {
    eyebrow: string;
    visionTitle: string;
    visionText: string;
    founderLinks: NavigationItem[];
  };
  testimonials: Array<{ quote: string; attribution: string }>;
  mission: {
    eyebrow: string;
    title: string;
    intro: string;
    items: string[];
  };
  values: {
    eyebrow: string;
    title: string;
    items: ValueItem[];
  };
  principles: {
    eyebrow: string;
    title: string;
    items: PrincipleItem[];
  };
  committee: {
    eyebrow: string;
    title: string;
    intro: string;
    members: PersonCard[];
  };
  direction: {
    eyebrow: string;
    title: string;
    intro: string;
    members: PersonCard[];
  };
  founders: {
    eyebrow: string;
    title: string;
    intro: string;
    people: PersonCard[];
  };
};

export type CommitteeContent = SectionVisibility & {
  metadataTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  sectionEyebrow: string;
  sectionTitle: string;
  members: PersonCard[];
};

export type Therapy = {
  title: string;
  text?: string;
  image?: CmsImage;
};

export type ApproachPillar = {
  title: string;
  icon: string;
  text: string;
};

export type GalleryImage = CmsImage & {
  frameClass?: string;
};

export type RetreatContent = SectionVisibility & {
  metadataTitle: string;
  hero: HeroContent;
  immersive: TextSection;
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ApproachPillar[];
  };
  therapies: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Therapy[];
  };
  program: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  place: {
    eyebrow: string;
    title: string;
    intro: string;
    gallery: GalleryImage[];
    cta: Cta;
  };
};

export type RecommendedResource = {
  title: string;
  text: string;
  category?: "article" | "book" | "podcast" | "conference" | "guide";
  source?: string;
  image?: CmsImage;
  href?: string;
  fileUrl?: string;
  linkLabel?: string;
  newTab?: boolean;
  showButton?: boolean;
  recommender?: { name?: string; role?: string; image?: CmsImage };
};

export type SeminarsContent = SectionVisibility & {
  metadataTitle: string;
  hero: HeroContent;
  themes: {
    eyebrow: string;
    title: string;
    intro: string;
    items: string[];
  };
  resources?: {
    eyebrow: string;
    title: string;
    intro?: string;
    items: RecommendedResource[];
  };
};

export type SupportContent = SectionVisibility & {
  metadataTitle: string;
  hero: HeroContent;
  donation: {
    amountPlaceholder: string;
    currency: string;
    submitLabel: string;
  };
  cause: TextSection;
  help: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  testimonial: {
    quote: string;
  };
};

export type SponsorLogo = {
  visible?: boolean;
  name: string;
  image?: CmsImage | null;
  logoHeight?: number;
  href?: string;
  newTab?: boolean;
};

export type SponsorSection = {
  visible?: boolean;
  title: string;
  logos: SponsorLogo[];
};

export type SponsorsContent = SectionVisibility & {
  metadataTitle: string;
  title: string;
  intro: string;
  heroImage: CmsImage;
  sections: SponsorSection[];
  cta: Cta;
};

export type FormPageContent = SectionVisibility & {
  metadataTitle: string;
  eyebrow: string;
  title: string;
  text: string;
  primary?: Cta;
  secondary?: Cta;
};

// Per-field configuration the client can edit in Sanity: relabel, show/hide,
// and make optional/required. The set of possible fields stays defined in
// code (lib/form-config.ts) — Sanity only toggles known fields.
export type FieldConfig = {
  label: string;
  enabled: boolean;
  required: boolean;
};

export type RegistrationFieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "address"
  | "cancerType"
  | "diagnosisDate"
  | "inTreatment"
  | "needsAssistance"
  | "message";

export type ContactFieldKey = "firstName" | "lastName" | "email" | "phone" | "message";

export type RegistrationFormConfig = Record<RegistrationFieldKey, FieldConfig>;
export type ContactFormConfig = Record<ContactFieldKey, FieldConfig>;

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = SectionVisibility & {
  metadataTitle: string;
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export type BusinessButtons = {
  primary?: Cta;
  secondary?: Omit<Cta, "href"> & { href?: string };
};

export type BusinessContent = SectionVisibility & {
  metadataTitle: string;
  hero: Omit<HeroContent, "primary" | "secondary"> & BusinessButtons;
  dossierUrl?: string;
  benefits: { eyebrow: string; title: string; items: Array<{ title: string; text: string; icon: string }> };
  engagement: { eyebrow: string; title: string; items: Array<{ title: string; text: string; icon: string }> };
  projects: { eyebrow: string; title: string; items: Array<{ title: string; text: string; image: CmsImage; objective: string; status: string; impact: string }> };
  impact: { eyebrow: string; title: string; items: Array<{ value: string; text: string }> };
  closing: { eyebrow: string; title: string; text: string; image: CmsImage } & BusinessButtons;
  partners: { eyebrow: string; title?: string; intro: string; logos: SponsorLogo[] };
};

export type CmsContent = {
  site: SiteSettings;
  navigation: NavigationItem[];
  aboutSubmenu: NavigationItem[];
  home: HomeContent;
  about: AboutContent;
  committee: CommitteeContent;
  retreat: RetreatContent;
  seminars: SeminarsContent;
  support: SupportContent;
  business: BusinessContent;
  sponsors: SponsorsContent;
  registration: FormPageContent;
  contact: FormPageContent;
  privacy: PrivacyContent;
  legal: PrivacyContent;
  faq: FaqContent;
  registrationForm: RegistrationFormConfig;
  contactForm: ContactFormConfig;
};

export type PrivacyContent = SectionVisibility & {
  metadataTitle: string;
  title: string;
  intro?: string;
  sections: Array<{ title: string; text: string; visible?: boolean }>;
};

export type LocalizedCmsContent = Partial<CmsContent>;

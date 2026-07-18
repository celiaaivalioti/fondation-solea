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

export type HomeContent = {
  metadataTitle: string;
  hero: HeroContent;
  manifesto: TextSection;
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

export type AboutContent = {
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
    members: PersonCard[];
  };
  founders: {
    eyebrow: string;
    title: string;
    intro: string;
    people: PersonCard[];
  };
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

export type RetreatContent = {
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

export type SeminarsContent = {
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
    items: Array<{
      title: string;
      text: string;
      href?: string;
      newTab?: boolean;
    }>;
  };
};

export type SupportContent = {
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

export type FormPageContent = {
  metadataTitle: string;
  eyebrow: string;
  title: string;
  text: string;
  primary?: Cta;
  secondary?: Cta;
};

export type CmsContent = {
  site: SiteSettings;
  navigation: NavigationItem[];
  home: HomeContent;
  about: AboutContent;
  retreat: RetreatContent;
  seminars: SeminarsContent;
  support: SupportContent;
  registration: FormPageContent;
  contact: FormPageContent;
  privacy: PrivacyContent;
};

export type PrivacyContent = {
  metadataTitle: string;
  title: string;
  intro?: string;
  sections: Array<{ title: string; text: string }>;
};

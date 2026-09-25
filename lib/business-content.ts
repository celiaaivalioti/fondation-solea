import type { BusinessContent } from "./cms-types";

export const businessContent: BusinessContent = {
  metadataTitle: "Entreprises",
  hero: {
    eyebrow: "Entreprises",
    title: "Le cancer ne s’arrête pas à la porte de l’entreprise. Votre soutien non plus.",
    text: "En soutenant Solea, votre entreprise contribue concrètement à offrir aux personnes touchées par le cancer un espace pour souffler, se reconnecter et avancer.",
    image: { url: "/images/sponsors/hero-swiss-lakeside-meadow.webp", alt: "Paysage lacustre suisse entouré de montagnes" }
  },
  contactLabel: "Échanger avec nous",
  dossierLabel: "Télécharger notre dossier partenariat",
  benefits: {
    eyebrow: "Pourquoi s’engager ?",
    title: "Un engagement porteur de sens, pour vos équipes et la société",
    items: [
      { title: "Un impact concret", text: "Vous contribuez directement à améliorer la qualité de vie des personnes touchées par le cancer.", icon: "heart" },
      { title: "Un engagement fédérateur", text: "Vous mobilisez vos équipes autour d’un projet porteur de sens.", icon: "users" },
      { title: "Une démarche alignée", text: "Vous renforcez votre stratégie RSE et votre impact social en Suisse.", icon: "leaf" },
      { title: "Un partenaire de confiance", text: "Vous soutenez une fondation suisse avec une gouvernance solide et un comité médical reconnu.", icon: "handshake" }
    ]
  },
  engagement: {
    eyebrow: "Comment soutenir Solea ?",
    title: "Plusieurs formes d’engagement, adaptées à votre entreprise",
    items: [
      { title: "Soutien financier", text: "Financer un projet, un séjour ou contribuer au fonctionnement de la Fondation.", icon: "coins" },
      { title: "Mobilisation des équipes", text: "Organiser des campagnes internes, des événements ou du bénévolat de compétences.", icon: "users" },
      { title: "Mise à disposition de compétences", text: "Partager votre expertise : marketing, communication, RH, juridique…", icon: "briefcase" },
      { title: "Dons en nature", text: "Mettre à disposition des biens, des services ou des lieux.", icon: "heartHandshake" }
    ]
  },
  projects: {
    eyebrow: "Nos projets prioritaires",
    title: "Des projets concrets à soutenir",
    items: [
      { title: "Le lieu et son aménagement", text: "Créer un lieu ressourçant et adapté dans le canton de Genève.", image: { url: "/images/experience-maison-jardin.png", alt: "Maison entourée d’un jardin accueillant" }, objective: "CHF 250’000", status: "En recherche de financement", impact: "Accueillir 100 personnes par an" },
      { title: "Les séjours offerts aux participants", text: "Financer les séjours de 5 jours et garantir leur gratuité.", image: { url: "/images/therapies/echanges-remission.webp", alt: "Un groupe réuni pour un moment de partage" }, objective: "CHF 200’000 / an", status: "En cours de levée de fonds", impact: "100 personnes par an et leurs proches" },
      { title: "Les séminaires et le partage de connaissances", text: "Organiser des séminaires et diffuser les bonnes pratiques pour un impact durable.", image: { url: "/images/seminar.jpg", alt: "Un cadre accueillant pour les rencontres Solea" }, objective: "CHF 50’000 / an", status: "À développer", impact: "Sensibiliser et faire évoluer les pratiques" }
    ]
  },
  impact: {
    eyebrow: "Nos objectifs d’impact",
    title: "Un impact qui va au-delà des participants",
    items: [
      { value: "100", text: "personnes accompagnées chaque année" },
      { value: "3 à 5", text: "proches impactés par participant" },
      { value: "+500", text: "personnes sensibilisées à travers nos actions" },
      { value: "Un impact durable", text: "sur la qualité de vie, le retour au travail et la cohésion des équipes" }
    ]
  },
  closing: {
    eyebrow: "Parlons-en",
    title: "Construisons ensemble un partenariat qui a du sens",
    text: "Nous serions ravis d’échanger avec vous pour explorer la forme d’engagement la plus adaptée à votre entreprise.",
    image: { url: "/images/nature2.jpg", alt: "La nature dans une lumière douce" },
    contactLabel: "Prendre rendez-vous"
  },
  partnersEyebrow: "Ils nous soutiennent déjà",
  partnersIntro: "Des partenaires engagés à nos côtés."
};

export const businessContentEn: BusinessContent = {
  ...businessContent,
  metadataTitle: "Businesses",
  hero: { ...businessContent.hero, eyebrow: "Businesses", title: "Cancer doesn’t stop at the workplace door. Neither does your support.", text: "By supporting Solea, your company helps give people affected by cancer a place to breathe, reconnect and move forward.", image: { ...businessContent.hero.image, alt: "A Swiss lakeside landscape surrounded by mountains" } },
  contactLabel: "Talk to us",
  dossierLabel: "Download our partnership brochure",
  benefits: { eyebrow: "Why get involved?", title: "A meaningful commitment for your teams and society", items: [
    { title: "A tangible impact", text: "Help improve the quality of life of people affected by cancer.", icon: "heart" },
    { title: "A shared purpose", text: "Bring your teams together around a meaningful project.", icon: "users" },
    { title: "An aligned approach", text: "Strengthen your CSR strategy and your social impact in Switzerland.", icon: "leaf" },
    { title: "A trusted partner", text: "Support a Swiss foundation with strong governance and a recognised medical committee.", icon: "handshake" }
  ] },
  engagement: { eyebrow: "How can you support Solea?", title: "Different ways to contribute, tailored to your company", items: [
    { title: "Financial support", text: "Fund a project, a stay or the Foundation’s operations.", icon: "coins" },
    { title: "Team involvement", text: "Organise internal campaigns, events or skills-based volunteering.", icon: "users" },
    { title: "Sharing expertise", text: "Contribute your skills in marketing, communications, HR or legal affairs.", icon: "briefcase" },
    { title: "In-kind donations", text: "Provide goods, services or premises.", icon: "heartHandshake" }
  ] },
  projects: { eyebrow: "Our priority projects", title: "Concrete projects to support", items: [
    { ...businessContent.projects.items[0], title: "The place and its facilities", text: "Create a restorative, welcoming place in the canton of Geneva.", status: "Seeking funding", impact: "Welcome 100 people each year", image: { ...businessContent.projects.items[0].image, alt: "A welcoming house surrounded by gardens" } },
    { ...businessContent.projects.items[1], title: "Free stays for participants", text: "Fund five-day stays and keep them free of charge.", objective: "CHF 200,000 / year", status: "Fundraising underway", impact: "100 people each year and their loved ones", image: { ...businessContent.projects.items[1].image, alt: "A group sharing time together" } },
    { ...businessContent.projects.items[2], title: "Seminars and knowledge sharing", text: "Organise seminars and share good practice for lasting impact.", objective: "CHF 50,000 / year", status: "In development", impact: "Raise awareness and improve practices", image: { ...businessContent.projects.items[2].image, alt: "A welcoming setting for Solea gatherings" } }
  ] },
  impact: { eyebrow: "Our impact goals", title: "An impact that reaches beyond participants", items: [
    { value: "100", text: "people supported each year" },
    { value: "3 to 5", text: "loved ones reached per participant" },
    { value: "+500", text: "people reached through our awareness initiatives" },
    { value: "Lasting impact", text: "on quality of life, returning to work and team cohesion" }
  ] },
  closing: { ...businessContent.closing, eyebrow: "Let’s talk", title: "Let’s build a meaningful partnership together", text: "We would be delighted to explore the kind of commitment that best suits your company.", contactLabel: "Arrange a meeting", image: { ...businessContent.closing.image, alt: "Nature in soft light" } },
  partnersEyebrow: "Already supporting us",
  partnersIntro: "Partners committed alongside us."
};

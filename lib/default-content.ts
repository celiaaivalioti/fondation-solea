import { businessContent } from "./business-content";
import type { CmsContent } from "./cms-types";
import { defaultContactForm, defaultRegistrationForm } from "./form-config";

export const defaultContent: CmsContent = {
  site: {
    name: "Solea",
    tagline: "5 jours pour redevenir acteur de sa santé.",
    intro:
      "Un lieu de recentrage, de souffle, de reconstruction, pour les personnes touchées par le cancer, regroupant thérapeutes et experts bienveillants, au cœur d’une expérience transformatrice de 5 jours.",
    quote: "« On ne traverse pas seul ce qui bouleverse toute une vie. »",
    email: "contact@solea.org",
    phone: "+33 6 00 00 00 00",
    address: "Un lieu ressource au cœur du vivant",
    footerTagline: "Construire son chemin, ensemble",
    showDonationCta: true,
    donationLabel: "Faire un don",
    legalLinks: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "#" }
    ],
    socialLinks: [
      { label: "LinkedIn", href: "#", platform: "linkedin" },
      { label: "Facebook", href: "#", platform: "facebook" },
      { label: "Instagram", href: "#", platform: "instagram" }
    ]
  },
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
    { label: "Le comité", href: "/comite-pluridisciplinaire" },
    { label: "L’expérience de 5 jours", href: "/experience-5-jours" },
    { label: "Un pôle de savoir", href: "/seminaires-ressources" },
    { label: "Entreprises", href: "/entreprises" },
    { label: "FAQ", href: "/questions-frequentes" },
    { label: "S’inscrire", href: "/inscription" },
    { label: "Contact", href: "/contact" }
  ],
  home: {
    metadataTitle: "Accueil",
    hero: {
      eyebrow: "La fondation Solea",
      title: "5 jours pour redevenir acteur de sa santé",
      text:
        "Un lieu de recentrage, de souffle, de reconstruction, pour les personnes touchées par le cancer, regroupant thérapeutes et experts bienveillants, au cœur d’une expérience transformatrice de 5 jours.",
      image: {
        url: "/images/hero-horse3.jpg",
        alt: "Personnes en méditation dans une lumière douce, illustrant un temps de pause et de ressourcement",
        className: "object-cover object-[67%_center] sm:object-[35%_center]"
      },
      primary: { label: "Découvrir Solea", href: "/qui-sommes-nous" },
      secondary: {
        label: "S’inscrire à l’expérience de 5 jours",
        href: "/inscription",
        variant: "paper"
      }
    },
    manifesto: {
      title: "Construire son chemin, ensemble",
      portraitImage: { url: "/images/board-alexandre-bodmer.png", alt: "Portrait du Dr Alexandre Bodmer" },
      portraitAlternativeText: "Portrait du Dr Alexandre Bodmer",
      quoteAttribution: "Dr Alexandre Bodmer\nPrésident du Conseil de Fondation\nMédecin oncologue FMH",
      quote:
        "“Dans le parcours d’un cancer, il existe un moment précis où tout bascule.\nPas médicalement. Humainement.\nC’est le moment où la personne se sent seule, dépossédée, réduite à un protocole”.",
      paragraphs: [
        "Les traitements existent. Les compétences médicales existent.\nMais il manque un lieu.\nHors de l’hôpital, hors de la clinique, hors du domicile… hors du temps.\nUn lieu où une personne écoutée, entourée, guidée, outillée reprend une posture active."
      ],
      cta: { label: "Découvrir Solea", href: "/qui-sommes-nous" }
    }
  },
  about: {
    metadataTitle: "Qui sommes-nous",
    hero: {
      eyebrow: "Qui sommes-nous",
      title: "Un lieu de recentrage, de souffle et de reconstruction",
      text:
        "Solea est née d’une conviction simple : les traitements médicaux sont essentiels, mais ils ne permettent pas de  répondre à la détresse émotionnelle, mentale et existentielle vécue par les patients.",
      image: {
        url: "/images/marche3.jpg",
        alt: "Paysage naturel calme traversé par une lumière douce"
      },
      primary: {
        label: "Découvrir l'expérience de 5 jours",
        href: "/experience-5-jours"
      },
      secondary: {
        label: "Les thérapies proposées",
        href: "/experience-5-jours#therapies-proposees",
        variant: "secondary"
      }
    },
    foundation: {
      eyebrow: "La Fondation",
      visionTitle: "Notre vision",
      visionText:
        "Nous sommes convaincus que le chemin de guérison est favorisé lorsque le corps, le mental et l'âme (re)trouvent équilibre et harmonie. Solea accompagne chaque personne en souffrance, en complément de son traitement médical, afin d'optimiser son chemin vers la guérison, le plus tôt possible.",
      founderLinks: [
        { label: "Marie-France Provot-Ivanov", href: "#marie-france-ivanova" },
        { label: "Samy Zayani", href: "#samy-zayani" }
      ]
    },
    mission: {
      eyebrow: "Mission",
      title: "Le bien-être du patient au centre.",
      intro: "Chaque décision prise par Solea est guidée par le bien-être du patient.",
      items: [
        "Rompre le cercle négatif le plus tôt possible",
        "Transmettre des connaissances et des outils concrets",
        "Favoriser le bien-être physique, émotionnel et mental",
        "Permettre au patient de redevenir acteur de sa santé",
        "Soulager temporairement les proches aidants"
      ]
    },
    testimonials: [
      {
        quote:
          "« Je ne souhaite à personne la maladie, mais je souhaite à tous la paix intérieure et la grâce qui peut en découler, lorsque l’opportunité de métamorphose est saisie. »",
        attribution: "Samy Zayani, co-fondateur"
      },
      {
        quote:
          "« Tout est possible, toujours, aussi sombre que puisse être votre pronostic vital. Ecoutez votre cœur, votre envie de vivre et ayez confiance en votre pouvoir de tout transformer. »",
        attribution: "Marie-France Provot-Ivanov, co-fondatrice"
      }
    ],
    values: {
      eyebrow: "Six repères simples",
      title: "Nos valeurs",
      items: [
        { label: "Entraide & Partage", icon: "heartHandshake" },
        { label: "Écoute & Bienveillance", icon: "ear" },
        { label: "Non-jugement", icon: "feather" },
        { label: "Ouverture d’esprit & Curiosité", icon: "compass" },
        { label: "Respect", icon: "rose" },
        { label: "Volonté & Détermination", icon: "mountain" }
      ]
    },
    principles: {
      eyebrow: "Ce qui nous guide",
      title: "Nos principes",
      items: [
        {
          title: "L’argent ne doit pas être un obstacle",
          text:
            "Le séjour (5 jours / 4 nuits sur place) est entièrement offert aux participants, dans un cadre verdoyant et apaisant."
        },
        {
          title: "Le savoir doit être partagé",
          text:
            "Des séminaires, sessions de partage, présentations théoriques et pratiques sont offerts afin de permettre d’acquérir rapidement des connaissances utiles."
        },
        {
          title: "L’acteur clé, c’est le patient",
          text:
            "Chaque participant est accompagné et encouragé à prendre activement sa santé en main et à tisser son réseau social pour limiter l’isolement."
        },
        {
          title: "La force du groupe",
          text:
            "Les activités collectives sont au cœur de notre approche, au service du lien et du bien-être."
        }
      ]
    },
    committee: {
      eyebrow: "Gouvernance",
      title: "Le Conseil de Fondation",
      intro:
        "Le Conseil de Fondation constitue l’organe suprême de Solea. Il est composé de cinq membres.\n\nIl assure la direction stratégique de la Fondation, définit ses orientations et fixe ses objectifs.\n\nIl prête une attention particulière à l’équilibre à court, moyen et long terme, entre les objectifs poursuivis et les moyens d’action et supervise la mise en œuvre des décisions prises.\n\nIl veille également à la bonne gestion de la Fondation et à ce que ses activités soient conformes à son but d’utilité publique, à ses principes de gouvernance et aux engagements pris envers ses partenaires et donateurs.",
      members: [
        {
          id: "alexandre-bodmer",
          name: "Dr Alexandre Bodmer",
          role: "Médecin oncologue, Président du Conseil de Fondation",
          image: {
            url: "/images/board-alexandre-bodmer.png",
            alt: "Portrait du Dr Alexandre Bodmer"
          },
          paragraphs: [
            "Fort de plus de 25 ans d’expérience en oncologie médicale, le Dr Alexandre Bodmer est une figure reconnue de la cancérologie en Suisse romande. Il exerce à l’Hôpital de La Tour et intervient comme consultant aux Hôpitaux universitaires de Genève (HUG), après avoir notamment dirigé le Centre du sein des HUG.",
            "Pionnier dans le développement d’une oncologie intégrative et engagé de longue date en faveur de la qualité de vie des patients, il défend une vision de la prise en charge qui considère la personne dans sa globalité.",
            "Son parcours s’étend également aux sphères publique et philanthropique. Maire de Cologny et membre du Conseil de fondation de la Fondation Martin Bodmer, il dispose d’une solide expérience en matière de gouvernance et de responsabilité institutionnelle.",
            "À la présidence du Conseil de Fondation de Solea, il met son expertise médicale, sa connaissance approfondie du système de santé et son expérience de la gouvernance au service d’une initiative fondée sur l’exigence, l’humanité et la complémentarité des approches."
          ]
        },
        {
          id: "marie-france-provot-ivanov",
          name: "Marie-France Provot-Ivanov",
          role: "Co-fondatrice et Vice-présidente du Conseil de Fondation",
          image: {
            url: "/images/board-marie-france-provot-ivanov.png",
            alt: "Portrait de Marie-France Provot-Ivanov"
          },
          paragraphs: [
            "Avocate de formation, Marie-France Provot-Ivanov dispose de 25 ans d’expérience juridique acquise dans les secteurs privé et public.",
            "Après avoir débuté sa carrière d’avocate en France, elle a poursuivi son parcours professionnel en Suisse, d’abord comme juriste dans le domaine bancaire puis dans le secteur public en qualité de conseillère auprès de la direction.",
            "Son parcours témoigne de sa capacité à s’adapter à des environnements variés, à gérer des enjeux complexes, à traiter des dossiers transversaux et à collaborer avec des interlocuteurs issus de secteurs très différents.",
            "Son parcours académique démontre également un intérêt de longue date pour le domaine médical, à travers des travaux consacrés à la responsabilité juridique du médecin.",
            "En tant que Vice-présidente du Conseil de fondation, elle contribue au pilotage stratégique de Solea, à son développement et veille à inscrire l’initiative dans un cadre rigoureux, pérenne et cohérent avec sa mission d’intérêt public."
          ]
        },
        {
          id: "marie-estelle-gaignard",
          name: "Dre Marie-Estelle Gaignard",
          role: "Oncologue, chercheuse et spécialiste en oncologie intégrative",
          image: {
            url: "/images/board-marie-estelle-gaignard.png",
            alt: "Portrait de la Dre Marie-Estelle Gaignard"
          },
          paragraphs: [
            "Médecin au Service d’oncologie des Hôpitaux universitaires de Genève (HUG), la Dre Marie-Estelle Gaignard s’est spécialisée dans le développement d’une approche intégrative de l’oncologie, à la croisée de la médecine conventionnelle, des approches complémentaires et de la recherche scientifique.",
            "Engagée de longue date dans le développement de la médecine intégrative en Suisse, elle a notamment participé à la co-création du réseau suisse de médecine intégrative et contribue activement à son développement.",
            "Référente en oncologie au Centre de médecine intégrative des HUG, elle mène des travaux de recherche consacrés notamment aux effets de la méditation de pleine conscience sur les mécanismes biologiques associés au cancer.",
            "Son parcours lui confère une expertise rare à l’interface entre pratique clinique, recherche et médecine intégrative.",
            "Au sein du comité médical de Solea, elle contribue à garantir une approche rigoureuse, fondée sur les connaissances scientifiques disponibles, et à assurer la pertinence et la complémentarité des approches proposées aux patients."
          ]
        },
        {
          id: "nicolas-severin-muller",
          name: "Nicolas Séverin Müller",
          role: "Trésorier",
          image: {
            url: "/images/board-nicolas-severin-muller.png",
            alt: "Portrait de Nicolas Séverin Müller"
          },
          paragraphs: [
            "Nicolas Séverin Müller possède un parcours rare à la croisée de la santé, de la finance et du pilotage institutionnel.",
            "Il a passé plus de douze ans au sein de l’État de Genève, notamment à l’Office cantonal de la statistique puis à la Direction générale de la santé, où il a travaillé sur des projets liés à la santé publique, au financement du système de santé, à l’économie de la santé, à la planification sanitaire et à la santé numérique.",
            "Il est actuellement Directeur adjoint des finances, en charge du pôle recettes aux Hôpitaux universitaires de Genève (HUG).",
            "Son expérience des institutions publiques, du système de santé suisse et genevois et des enjeux financiers lui apporte une vision particulièrement complète de la gouvernance et du pilotage.",
            "En tant que Trésorier de Solea, il veille à la rigueur financière de la Fondation et à une gestion responsable des ressources qui lui sont confiées."
          ]
        },
        {
          id: "kian-rieben",
          name: "Kian Rieben",
          role: "Délégué au développement et à l’innovation",
          image: {
            url: "/images/board-kian-rieben.png",
            alt: "Portrait de Kian Rieben"
          },
          paragraphs: [
            "Entrepreneur et spécialiste de la transformation numérique et organisationnelle, Kian Rieben a consacré une grande partie de son parcours à la création et au développement de projets innovants.",
            "Entre 2009 et 2012, il cofonde deux sociétés spécialisées dans les technologies digitales, qu’il dirige pendant plusieurs années. Il y développe une expertise reconnue dans la conception de projets numériques, l’innovation et l’accompagnement des organisations dans leur transformation.",
            "Son parcours l’a également conduit à travailler dans le secteur public, notamment au sein de l’Office cantonal des systèmes d’information (OCSIN) de l’État de Genève. Au service de l’Office Cantonal de la Santé et du Programme Santé Numérique, il a participé à l’élaboration de la stratégie cantonale du numérique en santé. Il intervient aujourd’hui comme consultant auprès des Hôpitaux universitaires de Genève (HUG), où il accompagne un projet de transformation numérique de la gestion administrative des patients.",
            "À travers son expérience entrepreneuriale, digitale et institutionnelle, Kian Rieben apporte à Solea une capacité à transformer des idées en projets concrets, à faire dialoguer des expertises diverses et à construire des solutions innovantes au service des bénéficiaires."
          ]
        }
      ]
    },
    direction: {
      eyebrow: "Une équipe engagée",
      title: "La Direction",
      intro: "La Direction donne vie aux ambitions de Solea. Elle mobilise les talents, les partenaires et les moyens nécessaires pour construire un accompagnement exigeant et profondément humain pour les personnes touchées par le cancer.",
      members: [
        {
          id: "direction-samy-zayani",
          name: "Samy Zayani",
          role: "Co-fondateur et Directeur",
          image: {
            url: "/images/founder-samy-zayani.jpeg",
            alt: "Portrait de Samy Zayani"
          },
          paragraphs: [
            "**Ingénieur diplômé de l’EPFL, Samy Zayani a construit une carrière internationale dans le développement d’entreprises et la conduite de projets complexes.** Après une première expérience aux Nations Unies, il rejoint Procter & Gamble avant d’occuper des fonctions de direction au sein d’entreprises internationales.",
            "**Membre de comités exécutifs d’entreprises comptant plus de 1'000 collaborateurs, il a dirigé des équipes internationales, contribué au développement d’organisations de grande envergure et siégé à de nombreux conseils d’administration à travers le monde.**\nIl a ainsi développé une expertise particulière dans la transformation d’une vision en projets concrets, la mobilisation de talents et de partenaires, et la construction d’organisations capables de faire grandir durablement une initiative.",
            "Il a passé sa carrière à transformer des idées en organisations, à fédérer des talents et à faire grandir des projets complexes. Il met aujourd’hui cette expérience au service de Solea, avec l’ambition de donner vie à un modèle d’accompagnement innovant, exigeant et profondément humain pour les personnes touchées par le cancer."
          ]
        },
        {
          id: "direction-claire-menetrier",
          name: "Claire Ménetrier",
          role: "Directrice adjointe, Opérations & Développement",
          image: {
            url: "",
            alt: "Portrait de Claire Ménetrier"
          },
          paragraphs: [
            "**Forte de près de 20 ans d’expérience en marketing, innovation et management**, notamment chez Procter & Gamble, Claire Ménetrier a piloté le développement de marques internationales parmi les plus emblématiques de leur catégorie, dans des environnements complexes et fortement concurrentiels.",
            "Au cours de son parcours chez P&G, elle a notamment exercé des **responsabilités internationales en marketing, innovation et développement durable**, en travaillant à la transformation de marques, de produits et d’organisations à grande échelle. Son expérience lui a appris à passer de la vision à l’action : **définir les priorités, mobiliser des équipes pluridisciplinaires et multiculturelles, fédérer des parties prenantes et conduire des projets jusqu’à leur réalisation.**",
            "Son leadership, sa capacité à créer des dynamiques collectives et sa forte culture de l’exécution sont aujourd’hui au service de Solea. En tant que Directrice adjointe, Opérations & Développement, elle contribue à transformer les ambitions de la Fondation en réalisations concrètes et à construire les moyens humains et opérationnels nécessaires à son développement dans la durée."
          ]
        }
      ]
    },
    founders: {
      eyebrow: "Deux parcours, une même conviction",
      title: "Histoire des fondateurs",
      intro:
        "Les fondateurs ont traversé la maladie et souhaitent offrir aux personnes touchées par le cancer un lieu où elles puissent être accueillies dans leur globalité humaine.",
      people: [
        {
          id: "samy-zayani",
          name: "Samy Zayani",
          role: "Co-fondateur",
          image: {
            url: "/images/founder-samy-zayani.jpeg",
            alt: "Portrait de Samy Zayani"
          },
          paragraphs: [
            "J’ai eu l’opportunité d’occuper des fonctions de direction et de gouvernance (CCO; membre de comités exécutifs) au sein d’entreprises comptant jusqu’à 1’000 employés et j’ai pu siéger à de nombreux conseils d’administration à travers le monde.",
            "De cette expérience est née une conviction forte : il est essentiel d’offrir aux personnes touchées par le cancer un lieu où elles puissent être accueillies dans leur globalité humaine.",
            "Si vous souhaitez en savoir davantage sur mon parcours, voici l’ouvrage que j’ai rédigé pour ma fille, Alice."
          ],
          quote:
            "La maladie s’est révélée être une opportunité unique de transformer ma relation à mon corps, à mes émotions et à ma spiritualité. Je ne souhaite à personne la maladie, mais je souhaite à tous la paix intérieure et la grâce qui peut en découler, lorsque l’opportunité de métamorphose est saisie. Voilà ce que je souhaite à ceux qui franchiront les portes de Solea.",
          cta: { label: "Savoir plus sur mon livre", href: "mailto:contact@solea.org", variant: "secondary" }
        },
        {
          id: "marie-france-ivanova",
          name: "Marie-France Provot-Ivanov",
          role: "Co-fondatrice",
          image: {
            url: "/images/founder-marie-france-provot-ivanov.png",
            alt: "Portrait de Marie-France Provot-Ivanov"
          },
          paragraphs: [
            "Avocate de formation, j’ai acquis une expérience en France et en Suisse. J’ai exercé tant dans le secteur public que privé, développant une vision large des enjeux juridiques.",
            "J’ai également évolué au sein d’établissements de renom (notamment secteur bancaire), où j’ai renforcé mon expertise dans des environnements exigeants.",
            "Le cancer est venu bouleverser mon existence mais aussi me transformer. Il a donné un nouveau sens à ma vie après m’avoir emmenée à la découverte de moi-même. Aujourd’hui, je souhaite à celles et ceux qui traversent la maladie de trouver leur propre chemin qui les fera renaître à la vie. Solea est là pour les guider et les accompagner sur ce chemin semé d’obstacles mais aussi d’étoiles.",
            "Si vous aimez lire, peut-être que mon livre vous apportera la force de croire que vous pouvez renverser la situation. Gardez toujours confiance en vous, l’impossible n’existe pas !"
          ],
          cta: { label: "Savoir plus sur mon livre", href: "mailto:contact@solea.org", variant: "secondary" }
        }
      ]
    }
  },
  committee: {
    metadataTitle: "Le comité pluridisciplinaire",
    eyebrow: "Une expertise médicale, scientifique et humaine",
    title: "Le comité pluridisciplinaire",
    intro:
      "Le comité pluridisciplinaire (CP), actuellement composé de cinq membres, constitue l’instance de référence de Solea pour les questions médicales et thérapeutiques liées au programme d’accompagnement.\n\nIl réunit des médecins et des professionnels disposant d’expertises complémentaires en oncologie, recherche clinique, médecine intégrative et accompagnement des patients. Sa composition vise à garantir une approche à la fois médicale, scientifique et multidisciplinaire.\n\nSon rôle consiste à participer activement à la **conception, l’évaluation et l’amélioration continue** du programme afin d’en assurer la cohérence, la qualité et la pertinence.\n\nLe CP collabore étroitement avec le Conseil de Fondation et la Direction.",
    sectionEyebrow: "Comité pluridisciplinaire",
    sectionTitle: "Un comité composé de médecins, thérapeutes et experts",
    members: [
      {
        id: "frederic-ris",
        name: "Prof. Frédéric Ris",
        role: "Chirurgien, spécialiste en chirurgie colorectale",
        image: {
          url: "/images/committee-frederic-ris.png",
          alt: "Portrait du Prof. Frédéric Ris"
        },
        quote:
          "Solea offrira aux patients un cadre unique, une écoute attentive et un accès à des connaissances essentielles.",
        paragraphs: [
          "Professeur de chirurgie aux Hôpitaux universitaires de Genève (HUG), le Prof. Frédéric Ris est spécialiste de chirurgie colorectale et de chirurgie viscérale. Directeur adjoint du Centre des cancers des HUG et co-responsable du Centre du cancer colorectal, il est reconnu pour son expertise en chirurgie colorectale mini-invasive et dans la prise en charge des cancers complexes.",
          "Également engagé dans l’innovation et la recherche en chirurgie, il a été élu en 2025 Président de la European Society of Coloproctology (ESCP), devenant le premier médecin suisse à occuper cette fonction.",
          "Il apporte à Solea une expertise chirurgicale de haut niveau et une vision résolument multidisciplinaire de la prise en charge du cancer."
        ]
      },
      {
        id: "marie-laure-amram",
        name: "Dre Marie-Laure Amram",
        role: "Médecin responsable Centre d’Oncologie Onex",
        image: {
          url: "/images/committee-marie-laure-amram.png",
          alt: "Portrait de la Dre Marie-Laure Amram"
        },
        quote:
          "En associant les avancées les plus récentes en oncologie à des thérapies complémentaires adaptées, nous favorisons un véritable processus de guérison.",
        paragraphs: [
          "Spécialiste FMH en oncologie médicale et en médecine interne générale, la Dre Marie-Laure Amram a consacré une grande partie de son parcours aux Hôpitaux universitaires de Genève (HUG), où elle a notamment été cheffe de clinique puis médecin associée. Elle exerce aujourd’hui comme consultante aux HUG et comme responsable du Centre d’Oncologie Onex.",
          "Son expertise couvre notamment les cancers digestifs, urologiques et du sein. Très impliquée dans la formation médicale et la recherche clinique, elle a notamment participé à plusieurs études de la SAKK et à la mise en place de structures spécialisées en oncologie aux HUG.",
          "Elle apporte à Solea une solide expérience clinique, académique et multidisciplinaire, ainsi qu’une attention particulière aux dimensions de la qualité de vie et de la santé sexuelle en oncologie."
        ]
      },
      {
        id: "thibaud-koessler",
        name: "Dr Thibaud Kössler",
        role: "Responsable de l’Unité des tumeurs digestives des HUG, MD/PhD",
        image: {
          url: "/images/committee-thibaud-koessler.png",
          alt: "Portrait du Dr Thibaud Kössler"
        },
        quote:
          "Je soutiens la vision de Solea, qui place l’humain au cœur des soins. Une approche intégrative, en complément des traitements médicaux, permet d’accompagner chaque patient dans sa globalité.",
        paragraphs: [
          "Médecin adjoint au Service d’oncologie des HUG et responsable du Programme des tumeurs digestives, le Dr Thibaud Kössler est spécialiste des cancers digestifs et notamment du cancer colorectal. Diplômé de l’Université de Genève, il a complété sa formation par un doctorat en sciences à l’Université de Cambridge et une spécialisation en oncologie médicale aux HUG.",
          "Très actif dans la recherche clinique, il est investigateur principal de nombreux essais et préside la task force dédiée aux tumeurs colorectales de l’European Organisation for Research and Treatment of Cancer (EORTC). Il a également été nommé au comité scientifique du Groupe Suisse de Recherche Clinique sur le Cancer.",
          "Il apporte à Solea une expertise pointue en oncologie, une culture de la médecine fondée sur les preuves et une expérience internationale de la recherche clinique."
        ]
      },
      {
        id: "laura-nasi",
        name: "Dre Laura Nasi",
        role: "Oncologue, spécialiste en oncologie intégrative et médecine corps-esprit",
        image: {
          url: "/images/committee-laura-nasi.png",
          alt: "Portrait de la Dre Laura Nasi"
        },
        quote:
          "Un environnement adapté et une équipe engagée : voilà ce qui permet de soigner une personne dans sa globalité, et non uniquement une maladie.",
        paragraphs: [
          "Médecin oncologue formée en médecine interne et en oncologie clinique, notamment au Memorial Sloan Kettering Cancer Center à New York, la Dre Laura Nasi possède plus de 15 ans d’expérience en oncologie et en recherche clinique. Son parcours l’a notamment conduite à travailler en Suisse au sein de l’International Breast Cancer Study Group et de Debiopharm, où elle a dirigé des activités de recherche et d’évaluation en oncologie.",
          "Formée également en médecine corps-esprit à Harvard, elle s’est consacrée au développement de l’oncologie intégrative, qu’elle pratique et enseigne aujourd’hui.",
          "Fondatrice de plusieurs initiatives dans ce domaine, elle apporte à Solea une expertise internationale dans l’intégration des dimensions médicales, psychologiques, comportementales et corps-esprit dans l’accompagnement des personnes touchées par le cancer."
        ]
      },
      {
        id: "olivia-braillard",
        name: "Dre Olivia Braillard",
        role: "Médecin interniste, spécialiste de l’éducation thérapeutique",
        image: {
          url: "/images/committee-olivia-braillard.png",
          alt: "Portrait de la Dre Olivia Braillard"
        },
        quote:
          "Solea incarne la rencontre entre médecines conventionnelle et complémentaire, au service d’une approche intégrative approfondie.",
        paragraphs: [
          "Médecin spécialiste en médecine interne générale, la Dre Olivia Braillard exerce depuis 2010 au Service de médecine de premier recours des HUG, où elle est aujourd’hui médecin adjointe et responsable de l’Unité de consultation ambulatoire de médecine interne générale.",
          "Son parcours s’est progressivement orienté vers une approche plus globale de la personne, notamment à travers l’éducation thérapeutique du patient (ETP) et une réflexion sur la place du vécu et du récit dans la relation de soins. Elle contribue notamment aux activités du Centre d’éducation thérapeutique du patient des HUG.",
          "Elle apporte à Solea une expertise précieuse dans l’accompagnement du patient comme acteur de sa santé, ainsi qu’une approche profondément centrée sur la personne."
        ]
      }
    ]
  },
  retreat: {
    metadataTitle: "L’expérience de 5 jours",
    hero: {
      eyebrow: "L'expérience de 5 jours",
      title: "5 jours pour changer une trajectoire humaine",
      text:
        "Notre ambition est de redonner espoir, énergie et autonomie à celles et ceux qui traversent l’épreuve de la maladie.",
      image: {
        url: "/images/seminar.jpg",
        alt: "Lieu de retraite paisible entouré de nature"
      },
      primary: {
        label: "S’inscrire à l’expérience de 5 jours",
        href: "/inscription"
      },
      secondary: { label: "Nous contacter", href: "/contact", variant: "secondary" }
    },
    immersive: {
      title: "Une expérience immersive",
      paragraphs: [
        "Nous créons une expérience immersive hors du quotidien, où les personnes en souffrance pourront retrouver de l’écoute, du soutien, des outils concrets et l’élan nécessaire pour reprendre une posture active face à leur parcours de guérison.",
        "Notre ambition est de redonner espoir, énergie et autonomie à celles et ceux qui traversent l’épreuve de la maladie.",
        "Dans un cadre naturel et apaisant, les participants pourront séjourner (5 jours / 4 nuits) et bénéficier de thérapies complémentaires, d’ateliers, de moments d’échange, de conférences, d’activités collectives et de temps de repos.",
        "L’objectif est de créer un espace où chacun peut souffler, retrouver du lien, explorer de nouvelles ressources et initier un mouvement intérieur positif."
      ]
    },
    approach: {
      eyebrow: "Notre approche",
      title: "Les quatre piliers de notre approche",
      intro: "Chaque séjour est construit autour de quatre dimensions essentielles de la personne.",
      items: [
        {
          title: "Physique",
          icon: "leaf",
          text:
            "Activité physique adaptée, yoga, Tai Chi, nutrition, soins du corps - pour retrouver une relation apaisée avec son corps."
        },
        {
          title: "Mental",
          icon: "brain",
          text:
            "Méditation, Qi Gong, sophrologie, hypnose, techniques de visualisation et de pleine conscience - pour aider à reprendre le contrôle de ses pensées et de son rapport à la maladie."
        },
        {
          title: "Émotions",
          icon: "heart",
          text:
            "Art-thérapie, équi-coaching, sonothérapie - pour exprimer, traverser et transformer ses émotions."
        },
        {
          title: "Sens / Spirituel",
          icon: "sparkles",
          text:
            "Temps de réflexion, partages de groupe, accompagnement à la quête de sens - pour retrouver une raison d’avancer."
        }
      ]
    },
    therapies: {
      eyebrow: "Thérapies",
      title: "Les thérapies proposées",
      intro:
        "Les participants pourront découvrir et expérimenter différentes approches complémentaires. Toutes les thérapies proposées à Solea sont validées par notre comité médical pluridisciplinaire. Elles sont pratiquées par des experts qualifiés, en complément - jamais en remplacement - de la médecine conventionnelle.",
      items: [
        {
          title: "Méditation et sophrologie",
          image: {
            url: "/images/therapies/meditation-sophrologie.webp",
            alt: ""
          },
          text:
            "La méditation, une thérapie de plus en plus documentée en oncologie. Des études cliniques démontrent une réduction significative de l’anxiété, de la dépression et de la fatigue, ainsi qu’une amélioration durable de la qualité de vie."
        },
        {
          title: "Hypnose et visualisation",
          image: { url: "/images/therapies/hypnose-visualisation.webp", alt: "" },
          text:
            "L’hypnose est utilisée en traitement adjuvant dans de nombreux centres oncologiques. Efficace sur la douleur, l’anxiété, la fatigue, les nausées et les bouffées de chaleur."
        },
        {
          title: "Yoga, Qi Gong et Tai Chi",
          image: { url: "/images/therapies/yoga-qi-gong-tai-chi.webp", alt: "" },
          text:
            "Des méta-analyses portant sur des centaines de patients démontrent des améliorations significatives de la fatigue, du sommeil, de la dépression et de la qualité de vie globale."
        },
        {
          title: "Nutrition, naturopathie, phytothérapie et activité physique adaptée",
          image: { url: "/images/therapies/nutrition-naturopathie.webp", alt: "" },
          text:
            "Conseils nutritionnels, plantes et compléments pour aider à réduire les effets secondaires des traitements - toujours en coordination avec l’équipe médicale."
        },
        {
          title: "Acupuncture et auriculothérapie",
          image: { url: "/images/therapies/acupuncture-auriculotherapie.webp", alt: "" },
          text:
            "Notamment reconnue pour réduire les nausées et vomissements liés à la chimiothérapie, atténuer la fatigue et soulager les douleurs neuropathiques."
        },
        {
          title: "Art-thérapie",
          image: { url: "/images/therapies/art-therapie.webp", alt: "" },
          text:
            "Reconnue par l’OMS pour limiter les effets secondaires des traitements (somnolence, nausées, essoufflement), l’art-thérapie agit également sur l’anxiété et l’image de soi."
        },
        {
          title: "Sonothérapie (bols tibétains, diapasons)",
          image: { url: "/images/therapies/sonotherapie.webp", alt: "" },
          text:
            "Des études en oncologie montrent une réduction de l’anxiété, du stress mental et de l’agitation. Maintien des capacités cognitives chez les patients sous chimiothérapie."
        },
        {
          title: "Massages et shiatsu",
          image: { url: "/images/therapies/massages-shiatsu.webp", alt: "" },
          text:
            "Des techniques corporelles douces pour soulager les tensions, améliorer la circulation et procurer un sentiment de bien-être physique immédiat."
        },
        {
          title: "Equicoaching",
          image: { url: "/images/therapies/equicoaching.webp", alt: "" },
          text:
            "Le contact avec les chevaux favorise l’expression émotionnelle, la reprise de confiance et la lutte contre la dépression - qui touche près de 50 % des patients cancéreux."
        },
        {
          title: "Échanges avec des personnes en rémission",
          image: { url: "/images/therapies/echanges-remission.webp", alt: "" }
        }
      ]
    },
    program: {
      eyebrow: "En pratique",
      title: "Le programme en pratique",
      items: [
        "Accueil personnalisé et bilan d’entrée",
        "Sessions de thérapies complémentaires individuelles et collectives",
        "Ateliers pratiques animés par des experts",
        "Séminaires théoriques : nutrition, gestion du stress, communication avec ses proches",
        "Activités en pleine nature : forêt, jardin, contact avec les animaux",
        "Temps libres et moments de silence",
        "Suivi et outils à emporter pour continuer chez soi"
      ]
    },
    place: {
      eyebrow: "Le lieu",
      title: "Un cadre exceptionnel",
      intro:
        "Solea se déroule dans une bâtisse confortable dotée de chambres lumineuses, entourée de nature et d’animaux - un espace hors du temps, à l’écart du monde médical et du quotidien.",
      gallery: [
        {
          url: "/images/experience-maison-jardin.png",
          alt: "Maison accueillante entourée d'un jardin fleuri",
          frameClass: "aspect-[2/1] sm:col-span-2"
        },
        {
          url: "/images/experience-ecuries-chevaux.png",
          alt: "Écuries en bois avec chevaux dans un enclos",
          frameClass: "aspect-[4/3] self-end"
        },
        { url: "/images/marche3.jpg", alt: "Marche en pleine nature autour du lieu" },
        {
          url: "/images/hero-horse3.jpg",
          alt: "Contact avec les chevaux sur place",
          frameClass: "aspect-[2/1] sm:col-span-2"
        }
      ],
      cta: { label: "S’inscrire à l’expérience de 5 jours", href: "/inscription" }
    }
  },
  seminars: {
    metadataTitle: "Un pôle de savoir",
    hero: {
      eyebrow: "Un pôle de savoir",
      title: "Des séminaires ouverts à tous",
      text:
        "Au-delà des séjours de 5 jours, Solea propose des séminaires réguliers, ouverts à tous les patients et leurs proches, pour faire de ce lieu un véritable pôle de savoir, de partage et de sensibilisation.",
      image: {
        url: "/images/seminaires-maison-jardin.png",
        alt: "Maison accueillante entourée d'un jardin fleuri"
      },
      primary: {
        label: "Les thérapies proposées",
        href: "/experience-5-jours#therapies-proposees"
      }
    },
    themes: {
      eyebrow: "Thématiques",
      title: "Exemple de thématiques abordées",
      intro: "Ces séminaires sont gratuits et accessibles à tous - patients, proches, soignants.",
      items: [
        "Gestion de l’annonce du diagnostic et du pronostic",
        "Comment en parler à ses proches et à son employeur",
        "Le rôle du réseau et du tissu social dans la guérison",
        "Prendre activement en main sa santé",
        "Médiation familiale et soutien aux aidants",
        "Partages d’expériences avec des personnes en rémission",
        "Interventions d’associations spécialisées (parents/enfants, etc.)"
      ]
    },
    resources: {
      eyebrow: "Pour aller plus loin",
      title: "Les ressources recommandées par notre comité",
      intro: "Notre comité pluridisciplinaire sélectionne des ressources permettant d’approfondir certains sujets abordés chez Solea. Articles, livres, podcasts, conférences ou outils pratiques : cette bibliothèque rassemble des contenus pour les personnes touchées par le cancer, leurs proches et les professionnels qui les accompagnent.",
      items: []
    }
  },
  business: businessContent,
  support: {
    metadataTitle: "Nous soutenir",
    hero: {
      eyebrow: "Nous soutenir",
      title: "Avec votre soutien, ce lieu prendra vie",
      text:
        "Solea est une fondation à but non lucratif. Le séjour de 5 jours est entièrement offert aux participants. Votre soutien est ce qui rend tout cela possible, nous vivons uniquement de dons.",
      image: {
        url: "/images/hero-horse3.jpg",
        alt: "Personne au contact d'un cheval dans un cadre naturel",
        className: "object-cover object-[65%_center]"
      }
    },
    donation: {
      amountPlaceholder: "Montant du don",
      currency: "CHF",
      submitLabel: "Envoyer"
    },
    cause: {
      eyebrow: "Votre impact",
      title: "Votre don nous aide à…",
      paragraphs: [
        "Préparer le lieu : Créer un lieu ressourçant et adapté, hors de l’hôpital et du quotidien.",
        "Organiser le programme : Mobiliser des professionnels qualifiés et préparer les séjours dans les meilleures conditions.",
        "Garantir la gratuité : Permettre aux participants de bénéficier du séjour sans que le coût soit un obstacle."
      ]
    },
    help: {
      eyebrow: "Agir",
      title: "Comment nous aider ?",
      items: [
        "Faire une donation (déductible fiscalement)",
        "Nous mettre en lien avec le responsable RSE ou philanthropie de votre entreprise",
        "Nous connecter à des mécènes, fondations ou donateurs individuels",
        "Mettre à disposition un lieu adapté à loyer modéré (voire gratuitement ; nous en prendrons grand soin)",
        "Offrir du matériel, entreprendre des travaux de rénovation",
        "Rejoindre notre équipe de bénévoles",
        "Parler de Solea autour de vous"
      ]
    },
    testimonial: {
      quote: "« Le temps que vous avez consacré à parcourir notre site est déjà un don. Merci. »"
    }
  },
  sponsors: {
    metadataTitle: "Sponsors",
    title: "Grâce à eux, Solea grandit !",
    intro:
      "La Fondation Solea est née d'une conviction profonde : accompagner les personnes confrontées au cancer dans toutes les dimensions de leur être, à travers la création d'un séjour d’accompagnement intégratif unique en Suisse romande.\n\nCette ambition ne pourrait devenir réalité sans l'engagement de celles et ceux qui ont choisi de nous faire confiance.\n\nNous exprimons notre profonde gratitude à nos partenaires, mécènes, fondations, entreprises et donateurs qui partagent notre vision et contribuent, chacun à leur manière, à faire grandir ce projet d'utilité publique.\n\nGrâce à leur soutien, nous construisons un lieu où chaque personne pourra retrouver des ressources, reprendre une place active dans son parcours de soins et envisager l'avenir avec davantage de confiance et de sérénité.\n\nMerci de rendre cette mission possible.",
    heroImage: {
      url: "/images/sponsors/hero-swiss-lakeside-meadow.webp",
      alt: "Prairie au bord d'un lac en Suisse romande dans une lumière douce",
      className: "object-cover object-[50%_center]"
    },
    sections: [
      {
        title: "Partenaires institutionnels",
        logos: []
      },
      {
        title: "Mécènes",
        logos: [
          {
            name: "Mécène fondateur",
            logoHeight: 48,
            image: {
              url: "/images/sponsors/mecene-logo-1.png",
              alt: "Logo du mécène fondateur"
            }
          }
        ]
      },
      {
        title: "Partenaires scientifiques",
        logos: []
      }
    ],
    cta: {
      label: "Contactez-nous",
      href: "/contact"
    }
  },
  registration: {
    metadataTitle: "S’inscrire à l’expérience de 5 jours",
    eyebrow: "Demande",
    title: "Une inscription simple et confidentielle",
    text:
      "Les informations transmises servent uniquement à préparer un premier contact. Aucun paiement n’est demandé: le séjour est gratuit grâce aux dons."
  },
  contact: {
    metadataTitle: "Contact",
    eyebrow: "Contact",
    title: "Nous contacter",
    text:
      "Vous souhaitez en savoir plus, soutenir le projet, proposer vos compétences ou simplement échanger ? Nous serions heureux de vous rencontrer.",
    primary: { label: "Nous appeler", href: "tel:+33600000000" },
    secondary: {
      label: "S’inscrire à l’expérience des 5 jours",
      href: "/inscription",
      variant: "secondary"
    }
  },
  legal: {
    metadataTitle: "Mentions légales",
    title: "Mentions légales",
    sections: []
  },
  privacy: {
    metadataTitle: "Politique de confidentialité",
    title: "Politique de confidentialité",
    intro:
      "La fondation Solea accorde une grande importance à la protection de vos données personnelles. Cette page décrit les données que nous collectons et l’usage que nous en faisons.",
    sections: [
      {
        title: "Responsable du traitement",
        text: "La fondation Solea est responsable du traitement des données collectées sur ce site. Pour toute question relative à vos données, écrivez-nous à contact@fondation-solea.ch."
      },
      {
        title: "Formulaires de contact et d’inscription",
        text: "Les informations transmises via nos formulaires (coordonnées et, pour l’inscription, informations relatives à votre situation) nous sont envoyées par e-mail et servent uniquement à répondre à votre demande ou à traiter votre inscription. Elles ne sont jamais vendues. Elles sont uniquement transmises aux prestataires techniques nécessaires au fonctionnement du site et au traitement de votre demande, dans le respect de la législation applicable."
      },
      {
        title: "Mesure d’audience",
        text: "Avec votre accord, nous utilisons Google Analytics pour établir des statistiques de fréquentation anonymes et améliorer le site. Vous pouvez refuser cette mesure d’audience sans aucune restriction d’accès au site."
      },
      {
        title: "Cookies",
        text: "Les seuls cookies déposés par ce site sont ceux de Google Analytics, et uniquement après votre acceptation. Votre choix est conservé dans votre navigateur et peut être modifié en effaçant les données du site."
      },
      {
        title: "Hébergement",
        text: "Ce site est hébergé en Suisse par Infomaniak Network SA (Genève)."
      },
      {
        title: "Vos droits",
        text: "Conformément à la législation applicable (nLPD, RGPD), vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Pour l’exercer, contactez-nous à contact@fondation-solea.ch."
      }
    ]
  },
  faq: {
    metadataTitle: "Questions fréquentes",
    eyebrow: "Questions fréquentes",
    title: "Vos questions, nos réponses",
    items: [
      {
        question: "Solea est-elle une institution de santé ?",
        answer: `Non.

Solea n'est pas une institution médicale et ne propose pas de traitements contre le cancer. Ceux-ci restent entièrement assurés et suivis par votre équipe médicale.

Solea intervient en complément de la médecine conventionnelle afin d'accompagner la personne dans sa globalité en soutenant son corps, son mental, en lui apprenant à gérer et transformer ses émotions et en permettant à l'individu de retrouver du sens.`
      },
      {
        question: "En quoi Solea est-elle différente des autres offres d'accompagnement ?",
        answer: `Il existe aujourd'hui de nombreuses initiatives proposant des ateliers divers, des activités ponctuelles et des groupes dont la composition évolue selon les ateliers et activités choisis.

La particularité de Solea réside dans son format immersif consistant en un séjour d'accompagnement exclusif de cinq jours, conçu comme un véritable cheminement de ressourcement, de reconnexion à soi et de transformation avec :
- Un même lieu au sein de la nature
- Un même groupe
- Un programme élaboré au plus près des attentes des participants
- Un séjour ressourçant hors du quotidien

Parce qu'une transformation ne naît pas d'un atelier, d'une consultation ou d'une activité.

Elle demande du temps, de la continuité, du lien humain et une expertise que seule Solea propose.`
      },
      {
        question: "Vais-je devoir arrêter ou modifier mes traitements ?",
        answer: `En aucun cas.

Aucune activité ou thérapie proposée par Solea ne se substitue au traitement médical ou ne conduit à interrompre un protocole thérapeutique.

Solea ne pose aucun diagnostic et ne porte aucun avis sur le suivi médical et les traitements prescrits.

Au contraire, notre démarche s'inscrit dans une approche intégrative fondée sur une collaboration avec la médecine conventionnelle.`
      },
      {
        question: "Les méthodes proposées par Solea sont-elles sérieuses ?",
        answer: `Oui.

Le programme est validé par un comité composé de médecins, d'oncologues, de thérapeutes et d'experts.

Les approches proposées sont sélectionnées selon leur niveau de preuves scientifiques lorsqu'elles existent, notamment en s'appuyant sur les recommandations internationales en oncologie intégrative (telles que les recommandations SIO/ASCO).`
      },
      {
        question: "Est-ce que Solea promet la guérison ?",
        answer: `Non, jamais.

Solea ne fait pas de fausses promesses.

En revanche, nous sommes convaincus que la qualité de la présence humaine, l'écoute, le partage d'expérience, alliés aux thérapies complémentaires et au contact avec la nature, aident à trouver la force intérieure, l'énergie positive, l'élan, la capacité d'avancer sereinement et de faire de cette maladie une force de transformation.`
      },
      {
        question: "Je suis très fatigué(e). Puis-je quand même participer ?",
        answer: `Très probablement.

La fatigue est l'un des effets les plus fréquents du cancer et de ses traitements.

Les activités sont adaptées au rythme de chacun.

Néanmoins, avant toute participation, un échange avec notre équipe permet de vérifier que le séjour est adapté à votre situation.`
      },
      {
        question: "Je ne me sens pas prêt(e) à parler de mon cancer.",
        answer: `Vous n'y serez jamais obligé.

Certaines personnes ressentent le besoin de partager leur histoire, d'autres préfèrent écouter ou simplement vivre l'expérience.

Chez Solea, chacun avance à son rythme, dans un climat d'écoute, de respect et de bienveillance.`
      },
      {
        question: "J'ai peur d'être confronté(e) à la souffrance des autres.",
        answer: `C'est une inquiétude fréquente et tout à fait légitime.

Chaque participant est accueilli avec son propre vécu, son histoire et son rythme. Les échanges sont encadrés par des professionnels afin que chacun puisse partager, s'il le souhaite, écouter et avancer dans un environnement respectueux et sécurisant, sans se sentir submergé par les émotions des autres.

Le séjour n'a pas pour objectif de rester centré sur la maladie ou la souffrance, mais de permettre à chacun de mobiliser ses ressources, de retrouver confiance et un élan, ce qui donne du sens à son parcours.

Aussi, si une personne a besoin d'exprimer sa souffrance et de se confier, elle pourra le faire en aparté avec un intervenant.`
      },
      {
        question: "Pourquoi le séjour dure-t-il cinq jours ?",
        answer: `Parce qu'un véritable changement demande du temps.

En quelques heures ou lors d'un atelier isolé, il est difficile d'intégrer de nouveaux outils ou de modifier durablement certaines habitudes. Un atelier ponctuel ou quelques heures d'accompagnement peuvent ouvrir une réflexion, mais seule une expérience immersive de plusieurs jours permet d'enclencher un changement profond.

Cinq jours permettent de créer une dynamique de groupe, de tisser des liens solides, d'expérimenter différentes approches, d'acquérir des connaissances et de repartir chez soi avec des outils concrets à appliquer dans son quotidien.`
      },
      {
        question: "Que vais-je apprendre pendant ces cinq jours ?",
        answer: `Vous découvrirez des pratiques validées ou reconnues en oncologie intégrative dans différents domaines : alimentation, activité physique adaptée, gestion du stress, méditation, hypnose médicale, psycho-oncologie, techniques de respiration, gestion des émotions, sommeil, communication avec les proches, et bien d'autres ressources.

L'objectif est de vous permettre de mieux comprendre certains aspects de votre santé et de repartir avec des connaissances et des outils directement utilisables après le séjour.

Au-delà des apprentissages, ce séjour offre également un temps pour se reconnecter à soi, retrouver de la confiance et avancer avec davantage de sérénité.`
      },
      {
        question: "Est-ce une démarche spirituelle ?",
        answer: `Solea n'est pas une démarche spirituelle au sens religieux du terme.

Aucune croyance n'est imposée.

Solea accueille chaque personne avec ses convictions, ses valeurs et son propre parcours.

Lorsque nous parlons de quête de sens ou de dimension spirituelle, nous faisons référence à cette réflexion profonde sur ce qui donne une direction à sa vie, à ce qui permet de retrouver un équilibre intérieur, un sentiment de paix ou une meilleure connexion avec soi-même.

Solea propose un espace d'ouverture et de réflexion sans imposer de voie toute tracée.

Solea accompagne chacun dans la construction de son propre chemin.`
      },
      {
        question: "Est-ce réservé aux personnes qui croient aux médecines complémentaires ?",
        answer: `Non.

Beaucoup de participants découvrent certaines approches pour la première fois.

Chacun est libre d'expérimenter, de poser des questions, de conserver ce qui lui convient et de laisser ce qui ne lui correspond pas.

Notre approche repose sur l'ouverture d'esprit, la curiosité, le non-jugement et le partage.`
      },
      {
        question: "Puis-je venir accompagné(e) de mon conjoint ou d'un proche ?",
        answer: `Le séjour est conçu pour offrir au participant un temps entièrement consacré à lui-même.

En parallèle, Solea souhaite également développer des conférences et des séminaires ouverts aux proches afin de mieux les accompagner dans leur rôle.`
      },
      {
        question: "Je suis en rémission. Est-ce encore utile ?",
        answer: `Oui.

La fin des traitements est souvent le début d'une nouvelle étape, parfois plus difficile qu'on ne l'imagine.

Retrouver confiance dans son corps, reprendre une vie professionnelle, gérer la peur de la récidive ou simplement redonner du sens à son existence sont autant de sujets que Solea aborde.`
      },
      {
        question: "Combien coûte le séjour ?",
        answer: `La participation est entièrement gratuite.

Nous souhaitons que personne ne renonce à cette expérience pour des raisons financières.

Les séjours sont rendus possibles grâce à la générosité de nos donateurs, partenaires, mécènes et bénévoles.`
      },
      {
        question: "Comment les places sont-elles attribuées ?",
        answer: `Le nombre de participants est volontairement limité afin de garantir un accompagnement de qualité.

Chaque demande, suivant sa date d'inscription, fait l'objet d'un échange avec notre équipe afin de s'assurer que l'expérience correspond aux besoins de la personne.`
      },
      {
        question: "J'ai déjà participé à un séjour Solea. Est-ce que je peux revenir ?",
        answer: `Afin de permettre au plus grand nombre de personnes touchées par le cancer de bénéficier de l'expérience Solea, la priorité est donnée aux personnes qui participent pour la première fois.

Chaque demande est néanmoins examinée avec attention en fonction des places disponibles et des circonstances particulières.

Nous sommes heureux que certains participants souhaitent prolonger leur cheminement avec Solea. Cette envie témoigne de la richesse de l'expérience vécue, et nous encourageons chacun à continuer à faire vivre les ressources découvertes pendant le séjour dans son quotidien.`
      },
      {
        question: "Je suis médecin ou professionnel de santé. Pourquoi orienter un patient vers Solea ?",
        answer: `Les traitements médicaux sont essentiels dans la prise en charge du cancer. Ils visent à traiter la maladie et à améliorer le pronostic des patients.

Cependant, au cours de leur parcours, de nombreuses personnes expriment également des besoins qui dépassent le seul champ médical : retrouver de l'énergie, mieux vivre avec les effets de la maladie et des traitements, mieux comprendre ce qui peut soutenir leur santé, reprendre confiance, rompre l'isolement ou trouver des ressources pour traverser cette période avec davantage de sérénité.

De plus en plus de patients souhaitent explorer des approches complémentaires pour prendre une place plus active dans leur parcours de santé. Solea leur offre un cadre structuré, bienveillant et sécurisé pour découvrir différentes ressources issues notamment de l'oncologie intégrative, en complément de leur suivi médical.

Solea ne se substitue jamais aux traitements ni aux recommandations de l'équipe soignante. La fondation s'inscrit dans une démarche de collaboration avec les professionnels de santé, afin d'accompagner la personne dans sa globalité : son corps, son vécu émotionnel, son quotidien et sa qualité de vie.

Orienter un patient vers Solea, c'est lui proposer un accompagnement complémentaire qui contribue à renforcer ses ressources personnelles tout au long de son parcours.`
      },
      {
        question: "Puis-je soutenir Solea même si je ne suis pas concerné par le cancer ?",
        answer: `Bien sûr.

Chaque don, chaque mise en relation, chaque compétence offerte ou chaque heure de bénévolat contribue à permettre à davantage de personnes de vivre cette expérience, gratuitement.`
      }
    ]
  },
  registrationForm: defaultRegistrationForm,
  contactForm: defaultContactForm
};

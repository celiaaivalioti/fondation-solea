import type { CmsContent } from "./cms-types";

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
      { label: "Mentions légales", href: "#" },
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
    { label: "L’expérience de 5 jours", href: "/experience-5-jours" },
    { label: "Séminaires & ressources", href: "/seminaires-ressources" },
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
      historyTitle: "Notre histoire",
      historyTextBefore: "Solea est née des expériences personnelles de",
      historyTextAfter:
        ", qui ont traversé la maladie et en ont fait une opportunité de transformation profonde.",
      founderLinks: [
        { label: "Marie-France Provot-Ivanov", href: "#marie-france-ivanova" },
        { label: "Samy Zayani", href: "#samy-zayani" }
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
        { label: "Respect", icon: "handshake" },
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
      eyebrow: "Comité pluridisciplinaire",
      title: "Un comité composé de médecins, thérapeutes et experts",
      members: [
        {
          name: "Marie-Estelle Gaignard",
          role: "Scientific Fellow in Medical Oncology, MD-PhD candidate",
          image: {
            url: "/images/committee-marie-estelle.jpeg",
            alt: "Portrait de Marie-Estelle Gaignard"
          },
          quote:
            "Solea incarne la rencontre entre médecines conventionnelle et complémentaire, au service d’une approche intégrative approfondie."
        },
        {
          name: "Marie-Laure Amram",
          role: "Médecin responsable, Centre d’Oncologie Onex",
          image: {
            url: "/images/committee-marie-laure-amram.webp",
            alt: "Portrait de Marie-Laure Amram"
          },
          quote:
            "En associant les avancées les plus récentes en oncologie à des thérapies complémentaires adaptées, nous favorisons un véritable processus de guérison."
        },
        {
          name: "Frédéric Ris",
          role: "Professeur de chirurgie, Vice-directeur du Centre du Cancer des HUG",
          image: {
            url: "/images/committee-frederic-ris.png",
            alt: "Portrait de Frédéric Ris"
          },
          quote:
            "Solea offrira aux patients un cadre unique, une écoute attentive et un accès à des connaissances essentielles."
        },
        {
          name: "M. Laura Nasi",
          role: "MD, Integrative & Lifestyle Oncology, Mind-Body Medicine",
          image: {
            url: "/images/committee-laura-nasi.png",
            alt: "Portrait de M. Laura Nasi"
          },
          quote:
            "Un environnement adapté et une équipe engagée : voilà ce qui permet de soigner une personne dans sa globalité, et non uniquement une maladie."
        },
        {
          name: "Sabra Kigouk",
          role: "Ligue genevoise contre le cancer, infirmière spécialisée et médiatrice familiale",
          image: {
            url: "/images/committee-sabra-kigouk.webp",
            alt: "Portrait de Sabra Kigouk"
          },
          quote:
            "Je me réjouis des collaborations futures entre Solea et la Ligue contre le cancer, convaincue que les patients en seront les premiers bénéficiaires."
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
            url: "/images/therapies/meditation-sophrologie.png",
            alt: ""
          },
          text:
            "La méditation, une thérapie de plus en plus documentée en oncologie. Des études cliniques démontrent une réduction significative de l’anxiété, de la dépression et de la fatigue, ainsi qu’une amélioration durable de la qualité de vie."
        },
        {
          title: "Hypnose et visualisation",
          image: { url: "/images/therapies/hypnose-visualisation.png", alt: "" },
          text:
            "L’hypnose est utilisée en traitement adjuvant dans de nombreux centres oncologiques. Efficace sur la douleur, l’anxiété, la fatigue, les nausées et les bouffées de chaleur."
        },
        {
          title: "Yoga, Qi Gong et Tai Chi",
          image: { url: "/images/therapies/yoga-qi-gong-tai-chi.png", alt: "" },
          text:
            "Des méta-analyses portant sur des centaines de patients démontrent des améliorations significatives de la fatigue, du sommeil, de la dépression et de la qualité de vie globale."
        },
        {
          title: "Nutrition, naturopathie, phytothérapie et activité physique adaptée",
          image: { url: "/images/therapies/nutrition-naturopathie.png", alt: "" },
          text:
            "Conseils nutritionnels, plantes et compléments pour aider à réduire les effets secondaires des traitements - toujours en coordination avec l’équipe médicale."
        },
        {
          title: "Acupuncture et auriculothérapie",
          image: { url: "/images/therapies/acupuncture-auriculotherapie.png", alt: "" },
          text:
            "Notamment reconnue pour réduire les nausées et vomissements liés à la chimiothérapie, atténuer la fatigue et soulager les douleurs neuropathiques."
        },
        {
          title: "Art-thérapie",
          image: { url: "/images/therapies/art-therapie.png", alt: "" },
          text:
            "Reconnue par l’OMS pour limiter les effets secondaires des traitements (somnolence, nausées, essoufflement), l’art-thérapie agit également sur l’anxiété et l’image de soi."
        },
        {
          title: "Sonothérapie (bols tibétains, diapasons)",
          image: { url: "/images/therapies/sonotherapie.png", alt: "" },
          text:
            "Des études en oncologie montrent une réduction de l’anxiété, du stress mental et de l’agitation. Maintien des capacités cognitives chez les patients sous chimiothérapie."
        },
        {
          title: "Massages et shiatsu",
          image: { url: "/images/therapies/massages-shiatsu.png", alt: "" },
          text:
            "Des techniques corporelles douces pour soulager les tensions, améliorer la circulation et procurer un sentiment de bien-être physique immédiat."
        },
        {
          title: "Equicoaching",
          image: { url: "/images/therapies/equicoaching.png", alt: "" },
          text:
            "Le contact avec les chevaux favorise l’expression émotionnelle, la reprise de confiance et la lutte contre la dépression - qui touche près de 50 % des patients cancéreux."
        },
        {
          title: "Échanges avec des personnes en rémission",
          image: { url: "/images/therapies/echanges-remission.png", alt: "" }
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
    metadataTitle: "Séminaires et ressources",
    hero: {
      eyebrow: "Séminaires & ressources",
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
      eyebrow: "Ressources",
      title: "Ressources utiles",
      intro: "Une sélection de supports pourra être publiée ici.",
      items: []
    }
  },
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
      eyebrow: "La cause",
      title: "Pourquoi donner ?",
      paragraphs: [
        "Chaque année en Suisse, pas loin de 50’000 personnes reçoivent un diagnostic de cancer. Beaucoup traversent cette épreuve seules, perdues entre les traitements, sans accès aux ressources pour reprendre le contrôle. Solea veut changer cela."
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
  }
};

import type { CmsContent } from "./cms-types";
import { defaultContent } from "./default-content";

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const defaultContentEn: CmsContent = clone(defaultContent);

defaultContentEn.site = {
  ...defaultContentEn.site,
  tagline: "Five days to become an active participant in your health again.",
  intro:
    "A place to recentre, breathe and rebuild, for people affected by cancer, bringing together caring therapists and experts at the heart of a transformative five-day experience.",
  quote: "“No one should go through what changes a whole life alone.”",
  address: "A resource place at the heart of the living world",
  footerTagline: "Building your path, together",
  donationLabel: "Donate",
  legalLinks: [
    { label: "Legal notice", href: "#" },
    { label: "Privacy", href: "/confidentialite" }
  ]
};

defaultContentEn.navigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/qui-sommes-nous" },
  { label: "The multidisciplinary committee", href: "/comite-pluridisciplinaire" },
  { label: "The five-day experience", href: "/experience-5-jours" },
  { label: "Knowledge hub", href: "/seminaires-ressources" },
  { label: "FAQ", href: "/questions-frequentes" },
  { label: "Apply", href: "/inscription" },
  { label: "Contact", href: "/contact" }
];

defaultContentEn.home = {
  ...defaultContentEn.home,
  metadataTitle: "Home",
  hero: {
    ...defaultContentEn.home.hero,
    eyebrow: "The Solea Foundation",
    title: "Five days to become an active participant in your health again",
    text:
      "A place to recentre, breathe and rebuild, for people affected by cancer, bringing together caring therapists and experts at the heart of a transformative five-day experience.",
    image: {
      ...defaultContentEn.home.hero.image,
      alt: "People meditating in soft light, evoking a time for pause and restoration"
    },
    primary: { label: "Discover Solea", href: "/qui-sommes-nous" },
    secondary: {
      label: "Apply for the five-day experience",
      href: "/inscription",
      variant: "paper"
    }
  },
  manifesto: {
    title: "Building your path, together",
    quote:
      "“In the journey through cancer, there is a precise moment when everything shifts.\nNot medically. Humanly.\nIt is the moment when a person feels alone, dispossessed, reduced to a protocol.”",
    paragraphs: [
      "Treatments exist. Medical expertise exists.\nBut a place is missing.\nOutside the hospital, outside the clinic, outside the home... outside ordinary time.\nA place where someone who is listened to, surrounded, guided and equipped can regain an active posture."
    ],
    cta: { label: "Discover Solea", href: "/qui-sommes-nous" }
  }
};

defaultContentEn.about = {
  ...defaultContentEn.about,
  metadataTitle: "About us",
  hero: {
    ...defaultContentEn.about.hero,
    eyebrow: "About us",
    title: "A place to recentre, breathe and rebuild",
    text:
      "Solea was born from a simple conviction: medical treatments are essential, but they cannot fully answer the emotional, mental and existential distress experienced by patients.",
    image: {
      ...defaultContentEn.about.hero.image,
      alt: "A calm natural landscape crossed by soft light"
    },
    primary: { label: "Discover the five-day experience", href: "/experience-5-jours" },
    secondary: {
      label: "The therapies offered",
      href: "/experience-5-jours#therapies-proposees",
      variant: "secondary"
    }
  },
  foundation: {
    ...defaultContentEn.about.foundation,
    eyebrow: "The Foundation",
    visionTitle: "Our vision",
    visionText:
      "We believe that the path toward healing is supported when body, mind and soul regain balance and harmony. Solea supports each person in difficulty, alongside their medical treatment, to help them move toward healing as early as possible.",
    founderLinks: defaultContent.about.foundation.founderLinks
  },
  mission: {
    eyebrow: "Mission",
    title: "The patient’s well-being at the centre.",
    intro: "Every decision made by Solea is guided by the patient’s well-being.",
    items: [
      "Break the negative cycle as early as possible",
      "Share knowledge and practical tools",
      "Support physical, emotional and mental well-being",
      "Help patients become active participants in their health again",
      "Temporarily relieve close caregivers"
    ]
  },
  testimonials: [
    {
      quote:
        "“I do not wish illness on anyone, but I wish everyone the inner peace and grace that can emerge when the opportunity for transformation is embraced.”",
      attribution: "Samy Zayani, co-founder"
    },
    {
      quote:
        "“Everything is possible, always, however dark your prognosis may seem. Listen to your heart, to your desire to live, and trust in your power to transform everything.”",
      attribution: "Marie-France Provot-Ivanov, co-founder"
    }
  ],
  values: {
    ...defaultContentEn.about.values,
    eyebrow: "Six simple markers",
    title: "Our values",
    items: [
      { label: "Mutual support & Sharing", icon: "heartHandshake" },
      { label: "Listening & Kindness", icon: "ear" },
      { label: "Non-judgement", icon: "feather" },
      { label: "Open-mindedness & Curiosity", icon: "compass" },
      { label: "Respect", icon: "rose" },
      { label: "Willpower & Determination", icon: "mountain" }
    ]
  },
  principles: {
    eyebrow: "What guides us",
    title: "Our principles",
    items: [
      {
        title: "Money should not be an obstacle",
        text:
          "The stay (five days / four nights on site) is fully offered to participants, in a green and peaceful setting."
      },
      {
        title: "Knowledge should be shared",
        text:
          "Seminars, sharing sessions, and theoretical and practical presentations are offered so participants can quickly acquire useful knowledge."
      },
      {
        title: "The key actor is the patient",
        text:
          "Each participant is supported and encouraged to take an active role in their health and to build social connections that limit isolation."
      },
      {
        title: "The strength of the group",
        text:
          "Collective activities are at the heart of our approach, serving connection and well-being."
      }
    ]
  },
  committee: {
    ...defaultContentEn.about.committee,
    eyebrow: "Governance",
    title: "The Foundation Board",
    intro:
      "The Foundation Board is Solea’s supreme governing body. It is composed of five members.\n\nIt provides the Foundation’s strategic direction, defines its priorities and sets its objectives.\n\nIt pays particular attention to maintaining a short-, medium- and long-term balance between the objectives pursued and the means available, and supervises the implementation of its decisions.\n\nIt also ensures the sound management of the Foundation and that its activities comply with its public-interest purpose, its governance principles and the commitments made to its partners and donors.",
    members: [
      {
        ...defaultContentEn.about.committee.members[0],
        image: { ...defaultContentEn.about.committee.members[0].image, alt: "Portrait of Dr Alexandre Bodmer" },
        role: "Oncologist, President of the Foundation Board",
        paragraphs: [
          "With more than 25 years of experience in medical oncology, Dr Alexandre Bodmer is a recognised figure in cancer care in French-speaking Switzerland. He practises at Hôpital de La Tour and serves as a consultant at Geneva University Hospitals (HUG), having previously led the HUG Breast Centre.",
          "A pioneer in the development of integrative oncology and a long-standing advocate for patients’ quality of life, he promotes a vision of care that considers the person as a whole.",
          "His experience also extends to the public and philanthropic spheres. As Mayor of Cologny and a member of the board of the Martin Bodmer Foundation, he has solid experience in governance and institutional responsibility.",
          "As President of Solea’s Foundation Board, he places his medical expertise, in-depth knowledge of the healthcare system and governance experience at the service of an initiative founded on rigour, humanity and complementary approaches."
        ]
      },
      {
        ...defaultContentEn.about.committee.members[1],
        image: { ...defaultContentEn.about.committee.members[1].image, alt: "Portrait of Marie-France Provot-Ivanov" },
        role: "Co-founder and Vice-President of the Foundation Board",
        paragraphs: [
          "A lawyer by training, Marie-France Provot-Ivanov has 25 years of legal experience in the private and public sectors.",
          "After beginning her legal career in France, she continued her professional journey in Switzerland, first as a legal counsel in banking and then in the public sector as an adviser to senior management.",
          "Her career demonstrates her ability to adapt to varied environments, manage complex issues, handle cross-functional matters and collaborate with people from very different sectors.",
          "Her academic background also reflects a long-standing interest in medicine, through work devoted to physicians’ legal liability.",
          "As Vice-President of the Foundation Board, she contributes to Solea’s strategic leadership and development, ensuring that the initiative is grounded in a rigorous, sustainable framework aligned with its public-interest mission."
        ]
      },
      {
        ...defaultContentEn.about.committee.members[2],
        image: { ...defaultContentEn.about.committee.members[2].image, alt: "Portrait of Dr Marie-Estelle Gaignard" },
        role: "Oncologist, researcher and specialist in integrative oncology",
        paragraphs: [
          "A physician in the Oncology Department at Geneva University Hospitals (HUG), Dr Marie-Estelle Gaignard specialises in developing an integrative approach to oncology at the crossroads of conventional medicine, complementary approaches and scientific research.",
          "Long involved in the development of integrative medicine in Switzerland, she helped co-create the Swiss integrative medicine network and contributes actively to its development.",
          "As the oncology lead at the HUG Centre for Integrative Medicine, she conducts research including work on the effects of mindfulness meditation on biological mechanisms associated with cancer.",
          "Her career gives her rare expertise at the interface of clinical practice, research and integrative medicine.",
          "Within Solea’s medical committee, she helps guarantee a rigorous approach grounded in available scientific knowledge and ensures the relevance and complementarity of the approaches offered to patients."
        ]
      },
      {
        ...defaultContentEn.about.committee.members[3],
        image: { ...defaultContentEn.about.committee.members[3].image, alt: "Portrait of Nicolas Séverin Müller" },
        role: "Treasurer",
        paragraphs: [
          "Nicolas Séverin Müller has an uncommon background spanning healthcare, finance and institutional management.",
          "He spent more than twelve years with the State of Geneva, notably at the Cantonal Statistical Office and then the Directorate-General for Health, working on public health, healthcare financing, health economics, healthcare planning and digital health projects.",
          "He is currently Deputy Director of Finance, responsible for revenue at Geneva University Hospitals (HUG).",
          "His experience of public institutions, the Swiss and Geneva healthcare systems and financial matters gives him an especially comprehensive view of governance and management.",
          "As Solea’s Treasurer, he ensures the Foundation’s financial rigour and the responsible management of the resources entrusted to it."
        ]
      },
      {
        ...defaultContentEn.about.committee.members[4],
        image: { ...defaultContentEn.about.committee.members[4].image, alt: "Portrait of Kian Rieben" },
        role: "Delegate for Development and Innovation",
        paragraphs: [
          "An entrepreneur and specialist in digital and organisational transformation, Kian Rieben has devoted much of his career to creating and developing innovative projects.",
          "Between 2009 and 2012, he co-founded two companies specialising in digital technologies, which he led for several years. There he developed recognised expertise in digital project design, innovation and supporting organisations through transformation.",
          "His career also led him to the public sector, notably the State of Geneva’s Cantonal Office for Information Systems. Working with the Cantonal Health Office and the Digital Health Programme, he helped develop the cantonal digital health strategy. He now consults for Geneva University Hospitals (HUG), supporting a digital transformation project for patient administration.",
          "Through his entrepreneurial, digital and institutional experience, Kian Rieben brings Solea an ability to turn ideas into concrete projects, connect diverse expertise and build innovative solutions for beneficiaries."
        ]
      }
    ]
  },
  founders: {
    ...defaultContentEn.about.founders,
    eyebrow: "Two journeys, one shared conviction",
    title: "The founders’ story",
    intro:
      "The founders have lived through illness and want to offer people affected by cancer a place where they can be welcomed in their full humanity.",
    people: defaultContentEn.about.founders.people.map((person) =>
      person.name === "Samy Zayani"
        ? {
            ...person,
            role: "Co-founder",
            image: {
              ...person.image,
              alt: "Portrait of Samy Zayani"
            },
            paragraphs: [
              "I have had the opportunity to hold executive and governance roles (CCO; member of executive committees) in companies with up to 1,000 employees, and I have served on numerous boards of directors around the world.",
              "From this experience came a strong conviction: it is essential to offer people affected by cancer a place where they can be welcomed in their full humanity.",
              "If you would like to learn more about my journey, here is the book I wrote for my daughter, Alice."
            ],
            quote:
              "Illness became a unique opportunity to transform my relationship with my body, my emotions and my spirituality. I do not wish illness on anyone, but I wish everyone the inner peace and grace that can emerge when the opportunity for transformation is embraced. This is what I wish for those who walk through Solea’s doors.",
            cta: { label: "Learn more about my book", href: "mailto:contact@solea.org", variant: "secondary" }
          }
        : {
            ...person,
            role: "Co-founder",
            image: {
              ...person.image,
              alt: "Portrait of Marie-France Provot-Ivanov"
            },
            paragraphs: [
              "Trained as a lawyer, I built experience in France and Switzerland. I have worked in both the public and private sectors, developing a broad view of legal issues.",
              "I also worked within renowned institutions, particularly in banking, where I strengthened my expertise in demanding environments.",
              "Cancer disrupted my life, but it also transformed me. It gave new meaning to my life after taking me on a journey of self-discovery. Today, I hope those going through illness can find their own path back to life. Solea is there to guide and accompany them on this path, full of obstacles but also of stars.",
              "If you enjoy reading, perhaps my book will give you the strength to believe that you can turn the situation around. Always keep faith in yourself; the impossible does not exist."
            ],
            cta: { label: "Learn more about my book", href: "mailto:contact@solea.org", variant: "secondary" }
          }
    )
  }
};

defaultContentEn.committee = {
  ...defaultContentEn.committee,
  metadataTitle: "The multidisciplinary committee",
  eyebrow: "Medical, scientific and human expertise",
  title: "The multidisciplinary committee",
  intro:
    "The Multidisciplinary Committee (MC), currently composed of five members, is Solea’s reference body for medical and therapeutic matters related to the support programme.\n\nIt brings together physicians and professionals with complementary expertise in oncology, clinical research, integrative medicine and patient support. Its composition is designed to ensure an approach that is medical, scientific and multidisciplinary.\n\nIts role is to participate actively in the **design, evaluation and continuous improvement** of the programme, ensuring its coherence, quality and relevance.\n\nThe MC works closely with the Foundation Board and the Executive Team.",
  sectionEyebrow: "Multidisciplinary committee",
  sectionTitle: "A committee of physicians, therapists and experts",
  members: [
    {
      ...defaultContentEn.committee.members[0],
      role: "Surgeon, specialist in colorectal surgery",
      image: { ...defaultContentEn.committee.members[0].image, alt: "Portrait of Prof. Frédéric Ris" },
      quote: "Solea will offer patients a unique setting, attentive listening and access to essential knowledge.",
      paragraphs: [
        "Professor of Surgery at Geneva University Hospitals (HUG), Prof. Frédéric Ris specialises in colorectal and visceral surgery. Deputy Director of the HUG Cancer Centre and co-director of the Colorectal Cancer Centre, he is recognised for his expertise in minimally invasive colorectal surgery and the treatment of complex cancers.",
        "Also committed to innovation and surgical research, he was elected President of the European Society of Coloproctology (ESCP) in 2025, becoming the first Swiss physician to hold this position.",
        "He brings Solea high-level surgical expertise and a resolutely multidisciplinary vision of cancer care."
      ]
    },
    {
      ...defaultContentEn.committee.members[1],
      role: "Medical Director, Centre d’Oncologie Onex",
      image: { ...defaultContentEn.committee.members[1].image, alt: "Portrait of Dr Marie-Laure Amram" },
      quote: "By combining the latest advances in oncology with appropriate complementary therapies, we support a genuine healing process.",
      paragraphs: [
        "A specialist in medical oncology and general internal medicine, Dr Marie-Laure Amram has spent much of her career at Geneva University Hospitals (HUG), where she served as senior resident and then associate physician. She now works as a consultant at HUG and as head of the Centre d’Oncologie Onex.",
        "Her expertise includes digestive, urological and breast cancers. Closely involved in medical education and clinical research, she has taken part in several SAKK studies and helped establish specialised oncology structures at HUG.",
        "She brings Solea solid clinical, academic and multidisciplinary experience, together with particular attention to quality of life and sexual health in oncology."
      ]
    },
    {
      ...defaultContentEn.committee.members[2],
      role: "Head of the HUG Digestive Tumours Unit, MD/PhD",
      image: { ...defaultContentEn.committee.members[2].image, alt: "Portrait of Dr Thibaud Kössler" },
      quote: "I support Solea’s vision, which places people at the heart of care. An integrative approach alongside medical treatment makes it possible to support each patient as a whole.",
      paragraphs: [
        "An attending physician in the HUG Oncology Department and head of the Digestive Tumours Programme, Dr Thibaud Kössler specialises in digestive cancers, particularly colorectal cancer. A graduate of the University of Geneva, he completed a PhD at the University of Cambridge and specialised in medical oncology at HUG.",
        "Highly active in clinical research, he is the principal investigator of numerous trials and chairs the European Organisation for Research and Treatment of Cancer (EORTC) colorectal tumour task force. He has also been appointed to the scientific committee of the Swiss Group for Clinical Cancer Research.",
        "He brings Solea advanced oncology expertise, a culture of evidence-based medicine and international experience in clinical research."
      ]
    },
    {
      ...defaultContentEn.committee.members[3],
      role: "Oncologist, specialist in integrative oncology and mind-body medicine",
      image: { ...defaultContentEn.committee.members[3].image, alt: "Portrait of Dr Laura Nasi" },
      quote: "A suitable environment and a committed team: this is what makes it possible to care for a person as a whole, not only for an illness.",
      paragraphs: [
        "An oncologist trained in internal medicine and clinical oncology, notably at Memorial Sloan Kettering Cancer Center in New York, Dr Laura Nasi has more than 15 years of experience in oncology and clinical research. Her career brought her to Switzerland to work with the International Breast Cancer Study Group and Debiopharm, where she led oncology research and evaluation activities.",
        "Also trained in mind-body medicine at Harvard, she has devoted herself to developing integrative oncology, which she now practises and teaches.",
        "As the founder of several initiatives in this field, she brings Solea international expertise in integrating the medical, psychological, behavioural and mind-body dimensions of support for people affected by cancer."
      ]
    },
    {
      ...defaultContentEn.committee.members[4],
      role: "Internist, specialist in therapeutic patient education",
      image: { ...defaultContentEn.committee.members[4].image, alt: "Portrait of Dr Olivia Braillard" },
      quote: "Solea embodies the meeting of conventional and complementary medicine, serving an in-depth integrative approach.",
      paragraphs: [
        "A specialist in general internal medicine, Dr Olivia Braillard has worked since 2010 in the HUG Primary Care Department, where she is now an attending physician and head of the General Internal Medicine Outpatient Consultation Unit.",
        "Her career has progressively moved towards a more holistic approach to the person, notably through therapeutic patient education and reflection on the place of lived experience and narrative in the care relationship. She contributes in particular to the work of the HUG Therapeutic Patient Education Centre.",
        "She brings Solea valuable expertise in supporting patients as active participants in their health, along with an approach deeply centred on the person."
      ]
    }
  ]
};

defaultContentEn.retreat = {
  ...defaultContentEn.retreat,
  metadataTitle: "The five-day experience",
  hero: {
    ...defaultContentEn.retreat.hero,
    eyebrow: "The five-day experience",
    title: "Five days to change a human trajectory",
    text:
      "Our ambition is to restore hope, energy and autonomy to those going through the ordeal of illness.",
    image: { ...defaultContentEn.retreat.hero.image, alt: "A peaceful retreat place surrounded by nature" },
    primary: { label: "Apply for the five-day experience", href: "/inscription" },
    secondary: { label: "Contact us", href: "/contact", variant: "secondary" }
  },
  immersive: {
    title: "An immersive experience",
    paragraphs: [
      "We create an immersive experience away from everyday life, where people in difficulty can find listening, support, practical tools and the momentum needed to regain an active posture in their healing journey.",
      "Our ambition is to restore hope, energy and autonomy to those going through the ordeal of illness.",
      "In a natural and peaceful setting, participants can stay for five days and four nights and benefit from complementary therapies, workshops, conversations, talks, group activities and time to rest.",
      "The aim is to create a space where each person can breathe, reconnect, explore new resources and initiate a positive inner movement."
    ]
  },
  approach: {
    eyebrow: "Our approach",
    title: "The four pillars of our approach",
    intro: "Each stay is built around four essential dimensions of the person.",
    items: [
      {
        title: "Physical",
        icon: "leaf",
        text:
          "Adapted physical activity, yoga, Tai Chi, nutrition and body care, to restore a calmer relationship with the body."
      },
      {
        title: "Mental",
        icon: "brain",
        text:
          "Meditation, Qi Gong, sophrology, hypnosis, visualization and mindfulness techniques, to help regain control over thoughts and the relationship to illness."
      },
      {
        title: "Emotions",
        icon: "heart",
        text:
          "Art therapy, equine coaching and sound therapy, to express, move through and transform emotions."
      },
      {
        title: "Meaning / Spiritual",
        icon: "sparkles",
        text:
          "Time for reflection, group sharing and support in the search for meaning, to rediscover a reason to move forward."
      }
    ]
  },
  therapies: {
    ...defaultContentEn.retreat.therapies,
    eyebrow: "Therapies",
    title: "The therapies offered",
    intro:
      "Participants can discover and experience different complementary approaches. All therapies offered at Solea are validated by our multidisciplinary medical committee. They are delivered by qualified experts, alongside, never instead of, conventional medicine.",
    items: [
      {
        ...defaultContentEn.retreat.therapies.items[0],
        title: "Meditation and sophrology",
        image: {
          ...defaultContentEn.retreat.therapies.items[0].image!,
          alt: "Meditation and sophrology practice"
        },
        text:
          "Meditation is increasingly documented in oncology. Clinical studies show significant reductions in anxiety, depression and fatigue, as well as lasting improvements in quality of life."
      },
      {
        ...defaultContentEn.retreat.therapies.items[1],
        title: "Hypnosis and visualization",
        image: {
          ...defaultContentEn.retreat.therapies.items[1].image!,
          alt: "Hypnosis and visualization session"
        },
        text:
          "Hypnosis is used as an adjunctive treatment in many oncology centres. It can help with pain, anxiety, fatigue, nausea and hot flushes."
      },
      {
        ...defaultContentEn.retreat.therapies.items[2],
        title: "Yoga, Qi Gong and Tai Chi",
        image: {
          ...defaultContentEn.retreat.therapies.items[2].image!,
          alt: "Gentle movement practice"
        },
        text:
          "Meta-analyses involving hundreds of patients show significant improvements in fatigue, sleep, depression and overall quality of life."
      },
      {
        ...defaultContentEn.retreat.therapies.items[3],
        title: "Nutrition, naturopathy, herbal medicine and adapted physical activity",
        image: {
          ...defaultContentEn.retreat.therapies.items[3].image!,
          alt: "Nutrition and naturopathy support"
        },
        text:
          "Nutrition advice, plants and supplements to help reduce treatment side effects, always in coordination with the medical team."
      },
      {
        ...defaultContentEn.retreat.therapies.items[4],
        title: "Acupuncture and auriculotherapy",
        image: {
          ...defaultContentEn.retreat.therapies.items[4].image!,
          alt: "Acupuncture and auriculotherapy care"
        },
        text:
          "Recognised in particular for reducing chemotherapy-related nausea and vomiting, easing fatigue and relieving neuropathic pain."
      },
      {
        ...defaultContentEn.retreat.therapies.items[5],
        title: "Art therapy",
        image: {
          ...defaultContentEn.retreat.therapies.items[5].image!,
          alt: "Art therapy materials"
        },
        text:
          "Recognised by the WHO for helping limit treatment side effects such as drowsiness, nausea and shortness of breath, art therapy also acts on anxiety and self-image."
      },
      {
        ...defaultContentEn.retreat.therapies.items[6],
        title: "Sound therapy (Tibetan bowls, tuning forks)",
        image: {
          ...defaultContentEn.retreat.therapies.items[6].image!,
          alt: "Sound therapy with Tibetan bowls"
        },
        text:
          "Oncology studies show reductions in anxiety, mental stress and agitation, and support for cognitive abilities in patients receiving chemotherapy."
      },
      {
        ...defaultContentEn.retreat.therapies.items[7],
        title: "Massage and shiatsu",
        image: {
          ...defaultContentEn.retreat.therapies.items[7].image!,
          alt: "Massage and shiatsu bodywork"
        },
        text:
          "Gentle body techniques to release tension, improve circulation and provide an immediate sense of physical well-being."
      },
      {
        ...defaultContentEn.retreat.therapies.items[8],
        title: "Equine coaching",
        image: {
          ...defaultContentEn.retreat.therapies.items[8].image!,
          alt: "Equine coaching with horses"
        },
        text:
          "Contact with horses supports emotional expression, renewed confidence and the fight against depression, which affects nearly 50% of cancer patients."
      },
      {
        ...defaultContentEn.retreat.therapies.items[9],
        title: "Conversations with people in remission",
        image: {
          ...defaultContentEn.retreat.therapies.items[9].image!,
          alt: "Conversation circle with people in remission"
        }
      }
    ]
  },
  program: {
    eyebrow: "In practice",
    title: "The programme in practice",
    items: [
      "Personal welcome and initial check-in",
      "Individual and group complementary therapy sessions",
      "Practical workshops led by experts",
      "Theoretical seminars: nutrition, stress management, communication with loved ones",
      "Outdoor activities: forest, garden, contact with animals",
      "Free time and moments of silence",
      "Follow-up and tools to take home"
    ]
  },
  place: {
    ...defaultContentEn.retreat.place,
    eyebrow: "The place",
    title: "An exceptional setting",
    intro:
      "Solea takes place in a comfortable house with bright rooms, surrounded by nature and animals: a space outside ordinary time, away from medical settings and everyday life.",
    gallery: defaultContentEn.retreat.place.gallery.map((photo, index) => ({
      ...photo,
      alt:
        index === 0
          ? "A welcoming house surrounded by a flower garden"
          : index === 1
            ? "Wooden stables with horses in an enclosure"
            : index === 2
              ? "A walk in nature around the place"
              : "Contact with horses on site"
    })),
    cta: { label: "Apply for the five-day experience", href: "/inscription" }
  }
};

defaultContentEn.seminars = {
  ...defaultContentEn.seminars,
  metadataTitle: "Knowledge hub",
  hero: {
    ...defaultContentEn.seminars.hero,
    eyebrow: "Knowledge hub",
    title: "Seminars open to everyone",
    text:
      "Beyond the five-day stays, Solea offers regular seminars open to all patients and their loved ones, making this place a true hub for knowledge, sharing and awareness.",
    image: { ...defaultContentEn.seminars.hero.image, alt: "A welcoming house surrounded by a flower garden" },
    primary: { label: "The therapies offered", href: "/experience-5-jours#therapies-proposees" }
  },
  themes: {
    eyebrow: "Topics",
    title: "Examples of topics covered",
    intro: "These seminars are free and open to everyone: patients, loved ones and caregivers.",
    items: [
      "Managing the announcement of a diagnosis and prognosis",
      "How to talk about it with loved ones and employers",
      "The role of networks and social fabric in healing",
      "Taking an active role in one’s health",
      "Family mediation and support for caregivers",
      "Experience-sharing with people in remission",
      "Talks by specialised associations (parents/children, etc.)"
    ]
  },
  resources: {
    eyebrow: "Resources",
    title: "Useful resources",
    intro: "A selection of materials may be published here.",
    items: []
  }
};

defaultContentEn.support = {
  ...defaultContentEn.support,
  metadataTitle: "Support us",
  hero: {
    ...defaultContentEn.support.hero,
    eyebrow: "Support us",
    title: "With your support, this place will come to life",
    text:
      "Solea is a non-profit foundation. The five-day stay is fully offered to participants. Your support is what makes all this possible; we rely entirely on donations.",
    image: { ...defaultContentEn.support.hero.image, alt: "A person in contact with a horse in a natural setting" }
  },
  donation: {
    amountPlaceholder: "Donation amount",
    currency: "CHF",
    submitLabel: "Send"
  },
  cause: {
    eyebrow: "The cause",
    title: "Why give?",
    paragraphs: [
      "Every year in Switzerland, close to 50,000 people receive a cancer diagnosis. Many go through this ordeal alone, lost among treatments and without access to the resources they need to regain control. Solea wants to change that."
    ]
  },
  help: {
    eyebrow: "Take action",
    title: "How can you help?",
    items: [
      "Make a donation (tax deductible)",
      "Connect us with the CSR or philanthropy lead in your company",
      "Introduce us to patrons, foundations or individual donors",
      "Make a suitable place available at reduced rent, or free of charge; we will take great care of it",
      "Offer equipment or renovation work",
      "Join our volunteer team",
      "Tell people around you about Solea"
    ]
  },
  testimonial: {
    quote: "“The time you have spent browsing our site is already a gift. Thank you.”"
  }
};

defaultContentEn.sponsors = {
  metadataTitle: "Sponsors",
  title: "Thanks to them, Solea is growing!",
  intro:
    "The Solea Foundation was born from a deep conviction: to support people facing cancer in every dimension of their being, through the creation of a unique integrative support stay in French-speaking Switzerland.\n\nThis ambition could not become reality without the commitment of those who have chosen to place their trust in us.\n\nWe express our deep gratitude to our partners, patrons, foundations, companies and donors who share our vision and contribute, each in their own way, to helping this public-interest project grow.\n\nThanks to their support, we are building a place where each person can reconnect with resources, regain an active role in their care journey and look to the future with greater confidence and serenity.\n\nThank you for making this mission possible.",
  heroImage: {
    url: "/images/sponsors/hero-swiss-lakeside-meadow.webp",
    alt: "Lakeside meadow in French-speaking Switzerland in soft morning light",
    className: "object-cover object-[50%_center]"
  },
  sections: [
    {
      title: "Institutional partners",
      logos: []
    },
    {
      title: "Patrons",
      logos: [
        {
          name: "Founding patron",
          logoHeight: 48,
          image: {
            url: "/images/sponsors/mecene-logo-1.png",
            alt: "Founding patron logo"
          }
        }
      ]
    },
    {
      title: "Scientific partners",
      logos: []
    }
  ],
  cta: {
    label: "Contact us",
    href: "/contact"
  }
};

defaultContentEn.registration = {
  metadataTitle: "Pre-register",
  eyebrow: "Request",
  title: "A simple and confidential pre-registration",
  text:
    "The Solea Foundation is currently in its launch phase.\n\nBy completing this form, you are expressing your interest in our future stays, and we warmly thank you for it.\n\nAt this stage, however, we are not yet able to communicate a start date. This will depend in particular on the success of the fundraising campaign and on the creation of the place that will host the Foundation’s activities.\n\nYour contact details will be kept confidential, and we will inform you personally as soon as the first sessions are open."
};

defaultContentEn.contact = {
  metadataTitle: "Contact",
  eyebrow: "Contact",
  title: "Contact us",
  text:
    "Would you like to learn more, support the project, offer your skills or simply talk with us? We would be happy to meet you.",
  primary: { label: "Call us", href: "tel:+33600000000" },
  secondary: {
    label: "Apply for the five-day experience",
    href: "/inscription",
    variant: "secondary"
  }
};

defaultContentEn.privacy = {
  metadataTitle: "Privacy policy",
  title: "Privacy policy",
  intro:
    "The Solea Foundation attaches great importance to protecting your personal data. This page describes the data we collect and how we use it.",
  sections: [
    {
      title: "Data controller",
      text: "The Solea Foundation is responsible for processing the data collected on this site. For any question about your data, write to contact@fondation-solea.ch."
    },
    {
      title: "Contact and application forms",
      text: "Information submitted through our forms (contact details and, for applications, information about your situation) is sent to us by email and used only to respond to your request or process your application. It is never sold or shared with third parties."
    },
    {
      title: "Audience measurement",
      text: "With your consent, we use Google Analytics to produce anonymous traffic statistics and improve the site. You can refuse audience measurement without any restriction of access to the site."
    },
    {
      title: "Cookies",
      text: "The only cookies placed by this site are Google Analytics cookies, and only after you accept them. Your choice is stored in your browser and can be changed by clearing the site data."
    },
    { title: "Hosting", text: "This site is hosted in Switzerland by Infomaniak Network SA (Geneva)." },
    {
      title: "Your rights",
      text: "In accordance with applicable legislation (nLPD, GDPR), you have the right to access, correct and delete your data. To exercise this right, contact contact@fondation-solea.ch."
    }
  ]
};

defaultContentEn.faq = {
  metadataTitle: "FAQ",
  eyebrow: "Frequently asked questions",
  title: "Your questions, our answers",
  items: [
    {
      question: "Is Solea a healthcare institution?",
      answer: `No.

Solea is not a medical institution and does not provide cancer treatments. These remain entirely provided and monitored by your medical team.

Solea works alongside conventional medicine to support the whole person: body, mind, emotions and sense of meaning.`
    },
    {
      question: "How is Solea different from other support programmes?",
      answer: `There are many initiatives offering workshops, occasional activities and groups whose composition changes from one activity to another.

Solea’s distinctive feature is its immersive format: an exclusive five-day support stay designed as a genuine path of restoration, reconnection and transformation, with:
- One place in nature
- One group
- A programme shaped as closely as possible around participants’ needs
- A restorative stay away from everyday life

Because transformation does not arise from a single workshop, consultation or activity.

It requires time, continuity, human connection and the expertise that Solea is designed to provide.`
    },
    {
      question: "Will I have to stop or change my treatments?",
      answer: `Absolutely not.

No activity or therapy offered by Solea replaces medical treatment or leads anyone to interrupt a therapeutic protocol.

Solea does not diagnose and does not give opinions on medical follow-up or prescribed treatments.

Our approach is integrative and based on collaboration with conventional medicine.`
    },
    {
      question: "Are the methods offered by Solea serious?",
      answer: `Yes.

The programme is validated by a committee made up of physicians, oncologists, therapists and experts.

The approaches are selected according to their level of scientific evidence where it exists, drawing in particular on international recommendations in integrative oncology, such as SIO/ASCO guidelines.`
    },
    {
      question: "Does Solea promise healing?",
      answer: `No, never.

Solea makes no false promises.

We are convinced, however, that the quality of human presence, listening and shared experience, together with complementary therapies and contact with nature, can help people find inner strength, positive energy, momentum and the ability to move forward more serenely.`
    },
    {
      question: "I am very tired. Can I still take part?",
      answer: `Very probably.

Fatigue is one of the most common effects of cancer and its treatments.

Activities are adapted to each person’s pace.

Before any participation, a conversation with our team helps confirm that the stay is suited to your situation.`
    },
    {
      question: "I do not feel ready to talk about my cancer.",
      answer: `You will never be required to.

Some people feel the need to share their story; others prefer to listen or simply live the experience.

At Solea, each person moves at their own pace, in a climate of listening, respect and kindness.`
    },
    {
      question: "I am afraid of being confronted with other people’s suffering.",
      answer: `This is a frequent and entirely legitimate concern.

Each participant is welcomed with their own experience, story and rhythm. Conversations are guided by professionals so each person can share if they wish, listen and move forward in a respectful and secure environment.

The purpose of the stay is not to remain centred on illness or suffering, but to help each person mobilise their resources, regain confidence and find momentum.

If someone needs to express their suffering privately, they will be able to do so with a member of the team.`
    },
    {
      question: "Why does the stay last five days?",
      answer: `Because real change takes time.

In a few hours, or during an isolated workshop, it is difficult to integrate new tools or sustainably change certain habits.

Five days make it possible to create group momentum, build solid connections, experience different approaches, acquire knowledge and return home with practical tools to use in daily life.`
    },
    {
      question: "What will I learn during these five days?",
      answer: `You will discover practices validated or recognised in integrative oncology across areas such as nutrition, adapted physical activity, stress management, meditation, medical hypnosis, psycho-oncology, breathing techniques, emotional regulation, sleep and communication with loved ones.

The aim is to help you better understand certain aspects of your health and leave with knowledge and tools you can use after the stay.

Beyond learning, the stay also offers time to reconnect with yourself, regain confidence and move forward with greater serenity.`
    },
    {
      question: "Is this a spiritual approach?",
      answer: `Solea is not a spiritual approach in the religious sense.

No belief is imposed.

Solea welcomes each person with their convictions, values and personal journey.

When we speak of meaning or a spiritual dimension, we refer to a deep reflection on what gives direction to life and helps restore inner balance, peace or a better connection with oneself.`
    },
    {
      question: "Is it only for people who believe in complementary medicine?",
      answer: `No.

Many participants discover some approaches for the first time.

Everyone is free to experiment, ask questions, keep what feels right and leave aside what does not.

Our approach is based on open-mindedness, curiosity, non-judgement and sharing.`
    },
    {
      question: "Can I come with my spouse or a loved one?",
      answer: `The stay is designed to offer participants time entirely devoted to themselves.

In parallel, Solea also wishes to develop conferences and seminars open to loved ones, to better support them in their role.`
    },
    {
      question: "I am in remission. Is it still useful?",
      answer: `Yes.

The end of treatment is often the beginning of a new stage, sometimes harder than expected.

Regaining confidence in the body, returning to work, managing fear of recurrence or simply finding meaning again are all topics Solea addresses.`
    },
    {
      question: "How much does the stay cost?",
      answer: `Participation is entirely free.

We want no one to give up this experience for financial reasons.

The stays are made possible by the generosity of donors, partners, patrons and volunteers.`
    },
    {
      question: "How are places allocated?",
      answer: `The number of participants is deliberately limited to guarantee high-quality support.

Each request, according to its registration date, is discussed with our team to make sure the experience corresponds to the person’s needs.`
    },
    {
      question: "I have already taken part in a Solea stay. Can I come back?",
      answer: `To allow as many people affected by cancer as possible to benefit from the Solea experience, priority is given to first-time participants.

Every request is nevertheless reviewed carefully depending on available places and individual circumstances.

We are glad when participants wish to continue their journey with Solea. This reflects the richness of the experience and encourages everyone to keep the resources discovered during the stay alive in daily life.`
    },
    {
      question: "I am a doctor or healthcare professional. Why refer a patient to Solea?",
      answer: `Medical treatments are essential in cancer care. They aim to treat the disease and improve patient prognosis.

During their journey, however, many people express needs beyond the strictly medical field: recovering energy, living better with illness and treatment effects, understanding what can support their health, regaining confidence, breaking isolation or finding resources to move through this period with more serenity.

Solea offers a structured, caring and secure setting to discover resources from integrative oncology, alongside medical follow-up.

Solea never replaces treatments or recommendations from the healthcare team. Referring a patient to Solea means offering complementary support that strengthens personal resources throughout the journey.`
    },
    {
      question: "Can I support Solea even if I am not affected by cancer?",
      answer: `Of course.

Every donation, introduction, skill offered or hour of volunteering helps more people live this experience free of charge.`
    }
  ]
};

defaultContentEn.registrationForm = {
  firstName: { label: "First name", enabled: true, required: true },
  lastName: { label: "Last name", enabled: true, required: true },
  email: { label: "Email", enabled: true, required: true },
  phone: { label: "Phone", enabled: true, required: true },
  address: { label: "Address", enabled: true, required: true },
  cancerType: { label: "Type of cancer", enabled: false, required: false },
  diagnosisDate: { label: "Diagnosis date", enabled: false, required: false },
  inTreatment: { label: "Currently receiving treatment?", enabled: false, required: false },
  needsAssistance: { label: "Need special assistance?", enabled: false, required: false },
  message: { label: "Your message", enabled: true, required: false }
};

defaultContentEn.contactForm = {
  firstName: { label: "First name", enabled: true, required: true },
  lastName: { label: "Last name", enabled: true, required: true },
  email: { label: "Email", enabled: true, required: true },
  phone: { label: "Phone", enabled: true, required: false },
  message: { label: "Your message", enabled: true, required: true }
};

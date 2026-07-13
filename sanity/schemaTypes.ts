const linkField = {
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "href", title: "URL or path", type: "string" }
  ]
};

const ctaField = {
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "href", title: "URL or path", type: "string" },
    {
      name: "variant",
      title: "Button style",
      type: "string",
      options: {
        list: ["primary", "secondary", "paper", "ghost", "paperGhost"]
      }
    }
  ]
};

const imageField = {
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    { name: "alt", title: "Alternative text", type: "string" },
    {
      name: "localUrl",
      title: "Existing local image path",
      type: "string",
      readOnly: true,
      description: "Keeps the original website image visible until a Sanity image asset is uploaded."
    },
    {
      name: "className",
      title: "Optional frontend image class",
      type: "string",
      description: "Use only for existing crop classes, for example object-cover object-[65%_center]."
    }
  ]
};

const heroField = {
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "text", title: "Text", type: "text" },
    imageField,
    { ...ctaField, name: "primary", title: "Primary button" },
    { ...ctaField, name: "secondary", title: "Secondary button" },
    { ...ctaField, name: "tertiary", title: "Tertiary button" }
  ]
};

const textSectionField = {
  name: "textSection",
  title: "Text section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "intro", title: "Intro", type: "text" },
    { name: "quote", title: "Quote", type: "text" },
    { name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text" }] },
    ctaField
  ]
};

const checklistField = {
  name: "checklistSection",
  title: "Checklist section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "intro", title: "Intro", type: "text" },
    { name: "items", title: "Items", type: "array", of: [{ type: "string" }] }
  ]
};

const personField = {
  name: "person",
  title: "Person",
  type: "object",
  fields: [
    { name: "id", title: "Anchor ID", type: "string" },
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    imageField,
    { name: "quote", title: "Quote", type: "text" },
    { name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text" }] },
    ctaField
  ]
};

const objects = [linkField, ctaField, heroField, textSectionField, checklistField, personField];

const siteSettings = {
  name: "siteSettings",
  title: "Site settings, contact details and footer",
  type: "document",
  fields: [
    { name: "name", title: "Site name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "intro", title: "Intro", type: "text" },
    { name: "quote", title: "Quote", type: "text" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "address", title: "Address", type: "string" },
    { name: "footerTagline", title: "Footer tagline", type: "string" },
    { name: "donationLabel", title: "Donation button label", type: "string" },
    { name: "legalLinks", title: "Footer legal links", type: "array", of: [{ type: "link" }] },
    {
      name: "socialLinks",
      title: "Footer social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "URL", type: "string" },
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: ["linkedin", "facebook", "instagram"] }
            }
          ]
        }
      ]
    }
  ]
};

const navigation = {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [{ name: "items", title: "Items", type: "array", of: [{ type: "link" }] }]
};

const homePage = {
  name: "homePage",
  title: "Accueil",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    heroField,
    { ...textSectionField, name: "manifesto", title: "Manifesto section" }
  ]
};

const aboutPage = {
  name: "aboutPage",
  title: "Qui sommes-nous",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    heroField,
    {
      name: "foundation",
      title: "Foundation section",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "visionTitle", title: "Vision title", type: "string" },
        { name: "visionText", title: "Vision text", type: "text" },
        { name: "historyTitle", title: "History title", type: "string" },
        { name: "historyTextBefore", title: "History text before links", type: "string" },
        { name: "historyTextAfter", title: "History text after links", type: "string" },
        { name: "founderLinks", title: "Founder links", type: "array", of: [{ type: "link" }] }
      ]
    },
    {
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text" },
            { name: "attribution", title: "Attribution", type: "string" }
          ]
        }
      ]
    },
    {
      name: "values",
      title: "Values",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        {
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ["heartHandshake", "ear", "feather", "compass", "handshake", "mountain"] }
                }
              ]
            }
          ]
        }
      ]
    },
    { ...checklistField, name: "principles", title: "Principles" },
    {
      name: "committee",
      title: "Committee",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "members", title: "Members", type: "array", of: [{ type: "person" }] }
      ]
    },
    {
      name: "founders",
      title: "Founders",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "intro", title: "Intro", type: "text" },
        { name: "people", title: "People", type: "array", of: [{ type: "person" }] }
      ]
    }
  ]
};

const retreatPage = {
  name: "retreatPage",
  title: "L'expérience de 5 jours",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    heroField,
    { ...textSectionField, name: "immersive", title: "Immersive section" },
    { ...checklistField, name: "mission", title: "Mission" },
    {
      name: "approach",
      title: "Approach pillars",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "intro", title: "Intro", type: "text" },
        {
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "text", title: "Text", type: "text" },
                { name: "icon", title: "Icon", type: "string", options: { list: ["leaf", "brain", "heart", "sparkles"] } }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "therapies",
      title: "Therapies",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "intro", title: "Intro", type: "text" },
        {
          name: "items",
          title: "Therapies",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "text", title: "Text", type: "text" },
                imageField
              ]
            }
          ]
        }
      ]
    },
    { ...checklistField, name: "program", title: "Program" },
    {
      name: "place",
      title: "Place",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "intro", title: "Intro", type: "text" },
        {
          name: "gallery",
          title: "Gallery",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                imageField,
                { name: "alt", title: "Alternative text", type: "string" },
                { name: "frameClass", title: "Existing layout class", type: "string" }
              ]
            }
          ]
        },
        ctaField
      ]
    }
  ]
};

const seminarsPage = {
  name: "seminarsPage",
  title: "Séminaires et ressources",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    heroField,
    { ...checklistField, name: "themes", title: "Themes" },
    {
      name: "resources",
      title: "Resources",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "intro", title: "Intro", type: "text" },
        {
          name: "items",
          title: "Resources",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "text", title: "Text", type: "text" },
                { name: "href", title: "URL or path", type: "string" }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const supportPage = {
  name: "supportPage",
  title: "Nous soutenir",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    heroField,
    {
      name: "donation",
      title: "Donation form",
      type: "object",
      fields: [
        { name: "amountPlaceholder", title: "Amount placeholder", type: "string" },
        { name: "currency", title: "Currency", type: "string" },
        { name: "submitLabel", title: "Submit label", type: "string" }
      ]
    },
    { ...textSectionField, name: "cause", title: "Cause" },
    { ...checklistField, name: "help", title: "How to help" },
    {
      name: "testimonial",
      title: "Closing quote",
      type: "object",
      fields: [{ name: "quote", title: "Quote", type: "text" }]
    }
  ]
};

const formPageFields = [
  { name: "metadataTitle", title: "Metadata title", type: "string" },
  { name: "eyebrow", title: "Eyebrow", type: "string" },
  { name: "title", title: "Title", type: "string" },
  { name: "text", title: "Text", type: "text" },
  { ...ctaField, name: "primary", title: "Primary button" },
  { ...ctaField, name: "secondary", title: "Secondary button" }
];

const registrationPage = {
  name: "registrationPage",
  title: "Inscription",
  type: "document",
  fields: formPageFields
};

const contactPage = {
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: formPageFields
};

export const schemaTypes = [
  ...objects,
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  retreatPage,
  seminarsPage,
  supportPage,
  registrationPage,
  contactPage
];

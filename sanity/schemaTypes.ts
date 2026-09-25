import { businessContent, businessContentEn } from "../lib/business-content";
import type { Rule } from "sanity";

// Icon choices for value/approach items. Keep in sync with lib/icons.ts,
// which maps these values to the actual icons on the website.
const iconOptions = {
  list: [
    { title: "Heart & handshake", value: "heartHandshake" },
    { title: "Ear (listening)", value: "ear" },
    { title: "Feather", value: "feather" },
    { title: "Compass", value: "compass" },
    { title: "Handshake", value: "handshake" },
    { title: "Mountain", value: "mountain" },
    { title: "Leaf", value: "leaf" },
    { title: "Brain", value: "brain" },
    { title: "Heart", value: "heart" },
    { title: "Sparkles", value: "sparkles" },
    { title: "Sun", value: "sun" },
    { title: "Sunrise", value: "sunrise" },
    { title: "Moon", value: "moon" },
    { title: "Flower", value: "flower" },
    { title: "Rose", value: "rose" },
    { title: "Sprout", value: "sprout" },
    { title: "Tree", value: "tree" },
    { title: "Waves", value: "waves" },
    { title: "Wind", value: "wind" },
    { title: "Bird", value: "bird" },
    { title: "Star", value: "star" },
    { title: "Shield", value: "shield" },
    { title: "Home", value: "home" },
    { title: "People", value: "users" },
    { title: "Smile", value: "smile" },
    { title: "Music", value: "music" },
    { title: "Open book", value: "book" },
    { title: "Anchor", value: "anchor" }
  ]
};

// Without an explicit preview, Sanity lists show objects as a raw data dump
// like "items: [{href: ..., label: ...}]".
const singletonPreview = (title: string) => ({
  preview: {
    prepare: () => ({ title })
  }
});

const newTabField = {
  name: "newTab",
  title: "Open in a new tab",
  type: "boolean",
  initialValue: false
};

const showButtonField = {
  name: "visible",
  title: "Display this button",
  type: "boolean",
  initialValue: true,
  description: "Turn this off to hide the button on the website."
};

const linkField = {
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "href", title: "URL or path", type: "string" },
    newTabField
  ],
  preview: {
    select: { title: "label", subtitle: "href" }
  }
};

const ctaField = {
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    showButtonField,
    { name: "label", title: "Label", type: "string" },
    { name: "href", title: "URL or path", type: "string" },
    newTabField,
    {
      name: "variant",
      title: "Button style",
      type: "string",
      description: "Optional — leave empty to use the default style for this section.",
      options: {
        list: ["primary", "secondary", "paper", "ghost", "paperGhost"]
      }
    }
  ],
  preview: {
    select: { title: "label", subtitle: "href" }
  }
};

// Hero buttons have their style and navigation fixed by the design (they
// must stay legible on top of photos and lead into the site), so the style
// dropdown and the new-tab switch are omitted there.
const ctaFieldWithoutVariant = {
  ...ctaField,
  fields: ctaField.fields.filter((field) => field.name !== "variant" && field.name !== "newTab")
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
      description:
        "Use approved classes, for example image-desaturate-soft, image-desaturate-strong, or object-[65%_center] image-desaturate-soft."
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
    { name: "quote", title: "Quote", type: "text" },
    { name: "quoteAttribution", title: "Quote attribution", type: "string" },
    imageField,
    { ...ctaFieldWithoutVariant, name: "primary", title: "Primary button" },
    { ...ctaFieldWithoutVariant, name: "secondary", title: "Secondary button" },
    { ...ctaFieldWithoutVariant, name: "tertiary", title: "Tertiary button" }
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
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" }
  }
};

const sponsorLogoField = {
  name: "sponsorLogo",
  title: "Sponsor logo",
  type: "object",
  fields: [
    { name: "name", title: "Name", type: "string" },
    imageField,
    {
      name: "logoHeight",
      title: "Logo height (px)",
      type: "number",
      description: "Optional. Default is 48px. Use a larger value for detailed or wide logos.",
      initialValue: 48,
      validation: (Rule: Rule) => Rule.min(24).max(180)
    },
    {
      name: "href",
      title: "Logo link",
      type: "string",
      description: "Optional. Add a URL or internal path to make this logo clickable."
    },
    {
      ...newTabField,
      title: "Open logo link in a new tab"
    }
  ],
  preview: {
    select: { title: "name", media: "image" }
  }
};

const sponsorSectionField = {
  name: "sponsorSection",
  title: "Sponsor section",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "logos",
      title: "Logos",
      type: "array",
      of: [{ type: "sponsorLogo" }],
      options: {
        modal: { type: "dialog", width: 1 }
      }
    }
  ],
  preview: {
    select: { title: "title", logos: "logos" },
    prepare: (value: { title?: string; logos?: unknown[] }) => ({
      title: value.title || "Sponsor section",
      subtitle: `${value.logos?.length ?? 0} logo${value.logos?.length === 1 ? "" : "s"}`
    })
  }
};

// One toggleable form field: relabel, show/hide, make optional/required.
// The set of fields itself is fixed in code (lib/form-config.ts); the Studio
// only edits these three attributes of each known field.
const formFieldType = {
  name: "formField",
  title: "Champ de formulaire",
  type: "object",
  options: { columns: 2 },
  fields: [
    { name: "label", title: "Libellé", type: "string" },
    { name: "enabled", title: "Afficher ce champ", type: "boolean", initialValue: true },
    { name: "required", title: "Obligatoire", type: "boolean", initialValue: true }
  ],
  preview: {
    select: { title: "label", enabled: "enabled", required: "required" },
    prepare: (value: { title?: string; enabled?: boolean; required?: boolean }) => ({
      title: value.title || "Champ",
      subtitle: `${value.enabled === false ? "Masqué" : "Affiché"}${
        value.required ? " · obligatoire" : ""
      }`
    })
  }
};

// Build a document field wrapping a formFieldType with per-field defaults that
// match lib/form-config.ts, so a freshly created document pre-fills correctly.
const formFieldEntry = (
  name: string,
  title: string,
  initial: { label: string; enabled: boolean; required: boolean }
) => ({
  name,
  title,
  type: "formField",
  initialValue: initial
});

const objects = [
  linkField,
  ctaField,
  heroField,
  textSectionField,
  checklistField,
  personField,
  sponsorLogoField,
  sponsorSectionField,
  formFieldType
];

const englishTranslationField = (fields: unknown[]) => ({
  name: "en",
  title: "English translation",
  type: "object",
  description:
    "Optional English copy for the public /en site. Empty fields fall back to the bundled English defaults.",
  fields
});

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
    {
      name: "showDonationCta",
      title: "Show donation page and buttons",
      type: "boolean",
      initialValue: true,
      description: "Turn this off to hide the donation buttons and make the Nous soutenir page unavailable."
    },
    { name: "donationLabel", title: "Donation button label", type: "string" },
    englishTranslationField([
      { name: "tagline", title: "Tagline", type: "string" },
      { name: "intro", title: "Intro", type: "text" },
      { name: "quote", title: "Quote", type: "text" },
      { name: "address", title: "Address", type: "string" },
      { name: "footerTagline", title: "Footer tagline", type: "string" },
      { name: "donationLabel", title: "Donation button label", type: "string" },
      { name: "legalLinks", title: "Footer legal links", type: "array", of: [{ type: "link" }] }
    ]),
    {
      name: "googleAnalyticsId",
      title: "Google Analytics ID",
      type: "string",
      description:
        "Measurement ID from Google Analytics, looks like G-XXXXXXXXXX. Leave empty to disable analytics.",
      validation: (rule: { custom: (fn: (value?: string) => true | string) => unknown }) =>
        rule.custom((value?: string) =>
          !value || /^[A-Za-z0-9-]+$/.test(value.trim())
            ? true
            : "Only letters, numbers and dashes are allowed (e.g. G-ABC123XYZ)."
        )
    },
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
            newTabField,
            {
              name: "platform",
              title: "Platform",
              type: "string",
              description: "Sets which icon is shown in the footer.",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "WhatsApp", value: "whatsapp" }
                ]
              }
            }
          ],
          preview: {
            select: { title: "label", subtitle: "href" }
          }
        }
      ]
    }
  ],
  ...singletonPreview("Site settings, contact details and footer")
};

const navigation = {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    { name: "items", title: "Items", type: "array", of: [{ type: "link" }] },
    englishTranslationField([{ name: "items", title: "Items", type: "array", of: [{ type: "link" }] }])
  ],
  preview: {
    select: { items: "items" },
    prepare: (value: { items?: unknown[] }) => ({
      title: "Navigation",
      subtitle: `${value.items?.length ?? 0} menu entries`
    })
  }
};

const manifestoField = {
  ...textSectionField,
  name: "manifesto",
  title: "Manifesto section",
  fields: [
    ...textSectionField.fields,
    {
      ...imageField,
      name: "portraitImage",
      title: "Portrait image",
      fields: imageField.fields.filter((field) => field.name !== "alt")
    },
    { name: "portraitAlternativeText", title: "Portrait alternative text", type: "string" },
    {
      name: "quoteAttribution",
      title: "Quote attribution",
      type: "text",
      rows: 3,
      description: "Enter the name on the first line, followed by the roles on separate lines."
    }
  ]
};

const homePage = {
  name: "homePage",
  title: "Accueil",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    heroField,
    manifestoField,
    englishTranslationField([
      { name: "metadataTitle", title: "Metadata title", type: "string" },
      heroField,
      manifestoField
    ])
  ],
  ...singletonPreview("Accueil")
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
        {
          name: "founderLinks",
          title: "Founder bio links",
          description: "Founder names that become links to their bio when they appear in the page intro text.",
          type: "array",
          of: [{ type: "link" }]
        }
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
          ],
          preview: {
            select: { title: "attribution", subtitle: "quote" }
          }
        }
      ]
    },
    { ...checklistField, name: "mission", title: "Mission" },
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
                  options: iconOptions
                }
              ],
              preview: {
                select: { title: "label", subtitle: "icon" }
              }
            }
          ]
        }
      ]
    },
    {
      name: "principles",
      title: "Principles",
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
                { name: "text", title: "Text", type: "text" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "committee",
      title: "Committee",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "intro", title: "Introduction", type: "text", rows: 9 },
        { name: "members", title: "Members", type: "array", of: [{ type: "person" }] }
      ]
    },
    {
      name: "direction",
      title: "La Direction",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "intro", title: "Introduction", type: "text", rows: 9 },
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
    },
    englishTranslationField([
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
          { name: "founderLinks", title: "Founder bio links", type: "array", of: [{ type: "link" }] }
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
      { ...checklistField, name: "mission", title: "Mission" },
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
                  { name: "icon", title: "Icon", type: "string", options: iconOptions }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "principles",
        title: "Principles",
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
                  { name: "title", title: "Title", type: "string" },
                  { name: "text", title: "Text", type: "text" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "committee",
        title: "Committee",
        type: "object",
        fields: [
          { name: "eyebrow", title: "Eyebrow", type: "string" },
          { name: "title", title: "Title", type: "string" },
          { name: "intro", title: "Introduction", type: "text", rows: 9 },
          { name: "members", title: "Members", type: "array", of: [{ type: "person" }] }
        ]
      },
      {
        name: "direction",
        title: "La Direction",
        type: "object",
        fields: [
          { name: "eyebrow", title: "Eyebrow", type: "string" },
          { name: "title", title: "Title", type: "string" },
          { name: "intro", title: "Introduction", type: "text", rows: 9 },
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
    ])
  ],
  ...singletonPreview("Qui sommes-nous")
};

const committeePageFields = [
  { name: "metadataTitle", title: "Metadata title", type: "string" },
  { name: "eyebrow", title: "Introduction eyebrow", type: "string" },
  { name: "title", title: "Introduction title", type: "string" },
  {
    name: "intro",
    title: "Introduction",
    type: "text",
    rows: 10,
    description: "Laissez une ligne vide entre les paragraphes. Entourez un passage de ** pour le mettre en gras."
  },
  { name: "sectionEyebrow", title: "Committee eyebrow", type: "string" },
  { name: "sectionTitle", title: "Committee title", type: "string" },
  {
    name: "members",
    title: "Committee members",
    type: "array",
    of: [{ type: "person" }]
  }
];

const committeePage = {
  name: "committeePage",
  title: "Le comité pluridisciplinaire",
  type: "document",
  fields: [
    ...committeePageFields,
    englishTranslationField(committeePageFields)
  ],
  ...singletonPreview("Le comité pluridisciplinaire")
};

const retreatPage = {
  name: "retreatPage",
  title: "L'expérience de 5 jours",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    heroField,
    { ...textSectionField, name: "immersive", title: "Immersive section" },
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
                { name: "icon", title: "Icon", type: "string", options: iconOptions }
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
              ],
              preview: {
                select: { title: "alt", media: "image" }
              }
            }
          ]
        },
        ctaField
      ]
    },
    englishTranslationField([
      { name: "metadataTitle", title: "Metadata title", type: "string" },
      heroField,
      { ...textSectionField, name: "immersive", title: "Immersive section" },
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
                  { name: "icon", title: "Icon", type: "string", options: iconOptions }
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
    ])
  ],
  ...singletonPreview("L'expérience de 5 jours")
};

const resourceFields = [
  { name: "title", title: "Titre", type: "string", validation: (rule: Rule) => rule.required() },
  { name: "category", title: "Type de ressource", type: "string", initialValue: "article", options: { list: [
    { title: "Article", value: "article" }, { title: "Livre", value: "book" },
    { title: "Podcast", value: "podcast" }, { title: "Conférence", value: "conference" },
    { title: "Outil pratique / guide", value: "guide" }
  ] } },
  imageField,
  { name: "source", title: "Auteur, publication, date ou épisode", type: "string" },
  { name: "text", title: "Description", type: "text" },
  { name: "href", title: "Lien vers la ressource", type: "string" },
  { name: "file", title: "Document à télécharger (optionnel)", type: "file", options: { accept: "application/pdf" } },
  { name: "linkLabel", title: "Texte du lien (optionnel)", type: "string" },
  { name: "showButton", title: "Afficher le lien", type: "boolean", initialValue: true },
  newTabField,
  { name: "recommender", title: "Recommandé par (optionnel)", type: "object", fields: [
    { name: "name", title: "Nom", type: "string" },
    { name: "role", title: "Fonction", type: "string" },
    imageField
  ] }
];

const resourcesField = {
  name: "resources", title: "Bibliothèque de ressources recommandées", type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "intro", title: "Introduction", type: "text" },
    { name: "items", title: "Ressources", type: "array", of: [{ type: "object", fields: resourceFields,
      preview: { select: { title: "title", subtitle: "category", media: "image" } }
    }] }
  ]
};

const seminarsPage = {
  name: "seminarsPage",
  title: "Un pôle de savoir",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    heroField,
    { ...checklistField, name: "themes", title: "Themes" },
    resourcesField,
    englishTranslationField([
      { name: "metadataTitle", title: "Metadata title", type: "string" },
      heroField,
      { ...checklistField, name: "themes", title: "Themes" },
      resourcesField
    ])
  ],
  ...singletonPreview("Un pôle de savoir")
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
    },
    englishTranslationField([
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
    ])
  ],
  ...singletonPreview("Nous soutenir")
};

const businessItemFields = [
  { name: "title", title: "Title", type: "string" },
  { name: "text", title: "Text", type: "text" },
  { name: "icon", title: "Icon", type: "string", options: { list: ["heart", "users", "leaf", "handshake", "coins", "briefcase", "heartHandshake"] } }
];

const businessSection = (name: string, title: string, fields: object[]) => ({
  name, title, type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "items", title: "Items", type: "array", of: [{ type: "object", fields }] }
  ]
});

const businessPageFields = [
  { name: "metadataTitle", title: "Metadata title", type: "string" },
  heroField,
  { name: "contactLabel", title: "Contact button label", type: "string" },
  { name: "dossierLabel", title: "Partnership brochure button label", type: "string" },
  { name: "dossier", title: "Dossier partenariat (PDF)", type: "file", options: { accept: "application/pdf" }, description: "Optional. The download buttons appear after a PDF is added." },
  businessSection("benefits", "Pourquoi s’engager ?", businessItemFields),
  businessSection("engagement", "Formes d’engagement", businessItemFields),
  businessSection("projects", "Projets prioritaires", [
    { name: "title", title: "Title", type: "string" },
    { name: "text", title: "Text", type: "text" },
    imageField,
    { name: "objective", title: "Objectif de financement", type: "string" },
    { name: "status", title: "Statut", type: "string" },
    { name: "impact", title: "Impact visé", type: "text" }
  ]),
  businessSection("impact", "Objectifs d’impact", [
    { name: "value", title: "Chiffre ou titre", type: "string" },
    { name: "text", title: "Description", type: "text" }
  ]),
  { name: "closing", title: "Bloc de contact", type: "object", fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "text", title: "Text", type: "text" },
    imageField,
    { name: "contactLabel", title: "Contact button label", type: "string" }
  ] },
  { name: "partnersEyebrow", title: "Titre des partenaires", type: "string", description: "Logos are managed on the Sponsors page." },
  { name: "partnersIntro", title: "Introduction des partenaires", type: "text" }
];

// Populate the new singleton with the same editable content as the public page.
function businessInitialValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item, index) => ({ ...(businessInitialValue(item) as object), _key: `item-${index}` }));
  }
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key === "url" ? "localUrl" : key,
    businessInitialValue(item)
  ]));
}

const businessPage = {
  name: "businessPage",
  title: "Entreprises",
  type: "document",
  initialValue: () => businessInitialValue({ ...businessContent, en: businessContentEn }),
  fields: [...businessPageFields, englishTranslationField(businessPageFields)],
  ...singletonPreview("Entreprises")
};

const sponsorsPageFields = [
  { name: "metadataTitle", title: "Metadata title", type: "string" },
  { name: "title", title: "Title", type: "string" },
  { name: "intro", title: "Intro", type: "text", rows: 8 },
  { ...imageField, name: "heroImage", title: "Hero image" },
  { name: "sections", title: "Sponsor sections", type: "array", of: [{ type: "sponsorSection" }] },
  { ...ctaField, name: "cta", title: "Call to action" }
];

const sponsorsPage = {
  name: "sponsorsPage",
  title: "Sponsors",
  type: "document",
  fields: [
    ...sponsorsPageFields,
    englishTranslationField(sponsorsPageFields)
  ],
  ...singletonPreview("Sponsors")
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
  fields: [...formPageFields, englishTranslationField(formPageFields)],
  ...singletonPreview("Inscription")
};

const contactPage = {
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: [...formPageFields, englishTranslationField(formPageFields)],
  ...singletonPreview("Contact")
};

const privacyPage = {
  name: "privacyPage",
  title: "Politique de confidentialité",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "intro", title: "Intro", type: "text" },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "text", title: "Text", type: "text" }
          ]
        }
      ]
    },
    englishTranslationField([
      { name: "metadataTitle", title: "Metadata title", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "intro", title: "Intro", type: "text" },
      {
        name: "sections",
        title: "Sections",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "title", title: "Title", type: "string" },
              { name: "text", title: "Text", type: "text" }
            ]
          }
        ]
      }
    ])
  ],
  ...singletonPreview("Politique de confidentialité")
};

const legalPage = {
  ...privacyPage,
  name: "legalPage",
  title: "Mentions légales",
  initialValue: {
    metadataTitle: "Mentions légales",
    title: "Mentions légales",
    sections: []
  },
  ...singletonPreview("Mentions légales")
};

const faqPage = {
  name: "faqPage",
  title: "Questions fréquentes",
  type: "document",
  fields: [
    { name: "metadataTitle", title: "Metadata title", type: "string" },
    { name: "eyebrow", title: "Surtitre", type: "string" },
    { name: "title", title: "Titre", type: "string" },
    {
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            { name: "question", title: "Question", type: "string" },
            {
              name: "answer",
              title: "Réponse",
              type: "text",
              rows: 6,
              description:
                "Laissez une ligne vide entre les paragraphes. Une ligne commençant par « - » devient une puce."
            }
          ],
          preview: {
            select: { title: "question" },
            prepare: (value: { title?: string }) => ({
              title: value.title || "Nouvelle question"
            })
          }
        }
      ]
    },
    englishTranslationField([
      { name: "metadataTitle", title: "Metadata title", type: "string" },
      { name: "eyebrow", title: "Eyebrow", type: "string" },
      { name: "title", title: "Title", type: "string" },
      {
        name: "items",
        title: "Questions",
        type: "array",
        of: [
          {
            type: "object",
            name: "faqItemEn",
            fields: [
              { name: "question", title: "Question", type: "string" },
              {
                name: "answer",
                title: "Answer",
                type: "text",
                rows: 6,
                description:
                  "Leave an empty line between paragraphs. A line beginning with “-” becomes a bullet."
              }
            ]
          }
        ]
      }
    ])
  ],
  ...singletonPreview("Questions fréquentes")
};

const registrationForm = {
  name: "registrationForm",
  title: "Formulaire d'inscription",
  type: "document",
  description:
    "Afficher/masquer, renommer et rendre obligatoires les champs du formulaire d'inscription.",
  fields: [
    formFieldEntry("firstName", "Prénom", { label: "Prénom", enabled: true, required: true }),
    formFieldEntry("lastName", "Nom", { label: "Nom", enabled: true, required: true }),
    formFieldEntry("email", "Email", { label: "Email", enabled: true, required: true }),
    formFieldEntry("phone", "Téléphone", { label: "Téléphone", enabled: true, required: true }),
    formFieldEntry("address", "Adresse", { label: "Adresse", enabled: true, required: true }),
    formFieldEntry("cancerType", "Type de cancer", {
      label: "Type de cancer",
      enabled: false,
      required: false
    }),
    formFieldEntry("diagnosisDate", "Date du diagnostic", {
      label: "Date du diagnostic",
      enabled: false,
      required: false
    }),
    formFieldEntry("inTreatment", "Actuellement en traitement ?", {
      label: "Actuellement en traitement ?",
      enabled: false,
      required: false
    }),
    formFieldEntry("needsAssistance", "Besoin d'assistance particulière ?", {
      label: "Besoin d'assistance particulière ?",
      enabled: false,
      required: false
    }),
    formFieldEntry("message", "Votre message", {
      label: "Votre message",
      enabled: true,
      required: false
    }),
    englishTranslationField([
      formFieldEntry("firstName", "First name", { label: "First name", enabled: true, required: true }),
      formFieldEntry("lastName", "Last name", { label: "Last name", enabled: true, required: true }),
      formFieldEntry("email", "Email", { label: "Email", enabled: true, required: true }),
      formFieldEntry("phone", "Phone", { label: "Phone", enabled: true, required: true }),
      formFieldEntry("address", "Address", { label: "Address", enabled: true, required: true }),
      formFieldEntry("cancerType", "Type of cancer", {
        label: "Type of cancer",
        enabled: false,
        required: false
      }),
      formFieldEntry("diagnosisDate", "Diagnosis date", {
        label: "Diagnosis date",
        enabled: false,
        required: false
      }),
      formFieldEntry("inTreatment", "Currently receiving treatment?", {
        label: "Currently receiving treatment?",
        enabled: false,
        required: false
      }),
      formFieldEntry("needsAssistance", "Need special assistance?", {
        label: "Need special assistance?",
        enabled: false,
        required: false
      }),
      formFieldEntry("message", "Your message", {
        label: "Your message",
        enabled: true,
        required: false
      })
    ])
  ],
  ...singletonPreview("Formulaire d'inscription")
};

const contactForm = {
  name: "contactForm",
  title: "Formulaire de contact",
  type: "document",
  description:
    "Afficher/masquer, renommer et rendre obligatoires les champs du formulaire de contact.",
  fields: [
    formFieldEntry("firstName", "Prénom", { label: "Prénom", enabled: true, required: true }),
    formFieldEntry("lastName", "Nom", { label: "Nom", enabled: true, required: true }),
    formFieldEntry("email", "Email", { label: "Email", enabled: true, required: true }),
    formFieldEntry("phone", "Téléphone", { label: "Téléphone", enabled: true, required: false }),
    formFieldEntry("message", "Votre message", {
      label: "Votre message",
      enabled: true,
      required: true
    }),
    englishTranslationField([
      formFieldEntry("firstName", "First name", { label: "First name", enabled: true, required: true }),
      formFieldEntry("lastName", "Last name", { label: "Last name", enabled: true, required: true }),
      formFieldEntry("email", "Email", { label: "Email", enabled: true, required: true }),
      formFieldEntry("phone", "Phone", { label: "Phone", enabled: true, required: false }),
      formFieldEntry("message", "Your message", {
        label: "Your message",
        enabled: true,
        required: true
      })
    ])
  ],
  ...singletonPreview("Formulaire de contact")
};

export const schemaTypes = [
  ...objects,
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  committeePage,
  retreatPage,
  seminarsPage,
  supportPage,
  sponsorsPage,
  businessPage,
  registrationPage,
  contactPage,
  privacyPage,
  legalPage,
  faqPage,
  registrationForm,
  contactForm
];

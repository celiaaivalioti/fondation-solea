import type {
  ContactFieldKey,
  ContactFormConfig,
  FieldConfig,
  RegistrationFieldKey,
  RegistrationFormConfig
} from "./cms-types";
import type { Locale } from "./locales";

// The authoritative catalog of form fields lives here in code, not in Sanity.
// Sanity can only relabel, show/hide, or toggle "required" on these known
// fields — it can never introduce a new field. This keeps the email endpoint
// constrained to a fixed whitelist even though the content is editable.

// Order in which fields render / appear in the notification email.
export const registrationFieldOrder: RegistrationFieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "cancerType",
  "diagnosisDate",
  "inTreatment",
  "needsAssistance",
  "message"
];

export const contactFieldOrder: ContactFieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "message"
];

// Radio questions that reveal a free-text follow-up when answered "oui". The
// follow-up follows its parent's visibility and keeps a fixed label.
export const registrationSubFields: Partial<
  Record<RegistrationFieldKey, { key: string; label: Record<Locale, string> }>
> = {
  inTreatment: { key: "treatmentType", label: { fr: "Type de traitement", en: "Type of treatment" } },
  needsAssistance: { key: "assistanceType", label: { fr: "Type d'assistance", en: "Type of assistance" } }
};

// Defaults mirror the current live form: the health questions start hidden
// and optional; the client re-enables them from the Studio when ready.
export const defaultRegistrationForm: RegistrationFormConfig = {
  firstName: { label: "Prénom", enabled: true, required: true },
  lastName: { label: "Nom", enabled: true, required: true },
  email: { label: "Email", enabled: true, required: true },
  phone: { label: "Téléphone", enabled: true, required: true },
  address: { label: "Adresse", enabled: true, required: true },
  cancerType: { label: "Type de cancer", enabled: false, required: false },
  diagnosisDate: { label: "Date du diagnostic", enabled: false, required: false },
  inTreatment: { label: "Actuellement en traitement ?", enabled: false, required: false },
  needsAssistance: {
    label: "Besoin d'assistance particulière ?",
    enabled: false,
    required: false
  },
  message: { label: "Votre message", enabled: true, required: false }
};

export const defaultContactForm: ContactFormConfig = {
  firstName: { label: "Prénom", enabled: true, required: true },
  lastName: { label: "Nom", enabled: true, required: true },
  email: { label: "Email", enabled: true, required: true },
  phone: { label: "Téléphone", enabled: true, required: false },
  message: { label: "Votre message", enabled: true, required: true }
};

type BuiltFields = { fields: [string, string][]; required: string[] };

// Turn an editable config into the concrete list of (name, label) pairs and
// required names the email endpoint enforces. Only enabled fields are kept,
// and conditional follow-ups are appended after their enabled parent.
function withEnabledFallback<T extends Record<string, FieldConfig>>(config: T, fallback: T): T {
  const resolved = { ...config };

  for (const key of Object.keys(fallback)) {
    const typedKey = key as keyof T;
    resolved[typedKey] = {
      ...fallback[typedKey],
      ...config[typedKey],
      enabled: config[typedKey]?.enabled ?? fallback[typedKey].enabled,
      required: config[typedKey]?.required ?? fallback[typedKey].required
    };
  }

  return resolved;
}

export function buildRegistrationFields(
  config: RegistrationFormConfig,
  locale: Locale = "fr"
): BuiltFields {
  const fields: [string, string][] = [];
  const required: string[] = [];
  const resolvedConfig = withEnabledFallback(config, defaultRegistrationForm);

  for (const key of registrationFieldOrder) {
    const field = resolvedConfig[key];
    if (!field?.enabled) {
      continue;
    }

    fields.push([key, field.label]);
    if (field.required) {
      required.push(key);
    }

    const sub = registrationSubFields[key];
    if (sub) {
      // The follow-up is optional server-side: it only exists when the user
      // answered "oui", which the client already enforces.
      fields.push([sub.key, sub.label[locale]]);
    }
  }

  return { fields, required };
}

export function buildContactFields(config: ContactFormConfig): BuiltFields {
  const fields: [string, string][] = [];
  const required: string[] = [];
  const resolvedConfig = withEnabledFallback(config, defaultContactForm);

  for (const key of contactFieldOrder) {
    const field = resolvedConfig[key];
    if (!field?.enabled) {
      continue;
    }

    fields.push([key, field.label]);
    if (field.required) {
      required.push(key);
    }
  }

  return { fields, required };
}

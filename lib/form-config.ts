import type {
  ContactFieldKey,
  ContactFormConfig,
  RegistrationFieldKey,
  RegistrationFormConfig
} from "./cms-types";

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
  "needsAssistance"
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
  Record<RegistrationFieldKey, { key: string; label: string }>
> = {
  inTreatment: { key: "treatmentType", label: "Type de traitement" },
  needsAssistance: { key: "assistanceType", label: "Type d'assistance" }
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
  }
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
export function buildRegistrationFields(config: RegistrationFormConfig): BuiltFields {
  const fields: [string, string][] = [];
  const required: string[] = [];

  for (const key of registrationFieldOrder) {
    const field = config[key];
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
      fields.push([sub.key, sub.label]);
    }
  }

  return { fields, required };
}

export function buildContactFields(config: ContactFormConfig): BuiltFields {
  const fields: [string, string][] = [];
  const required: string[] = [];

  for (const key of contactFieldOrder) {
    const field = config[key];
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

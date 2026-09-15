const MAX_BODY_BYTES = 64 * 1024;
const MAX_FIELD_LENGTHS: Record<string, number> = {
  firstName: 120,
  lastName: 120,
  email: 254,
  phone: 40,
  address: 500,
  cancerType: 300,
  diagnosisDate: 20,
  inTreatment: 3,
  treatmentType: 1500,
  needsAssistance: 3,
  assistanceType: 1500,
  message: 5000
};

export class FormRequestError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

export function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function readLimitedJson(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    throw new FormRequestError("unsupported content type", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new FormRequestError("request too large", 413);
  }

  if (!request.body) {
    throw new FormRequestError("invalid request", 400);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new FormRequestError("request too large", 413);
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder().decode(body));
  } catch {
    throw new FormRequestError("invalid request", 400);
  }
}

export function hasAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
    const host = forwardedHost || request.headers.get("host") || new URL(request.url).host;
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
    const protocol = forwardedProtocol ? `${forwardedProtocol}:` : new URL(request.url).protocol;

    return originUrl.host === host && originUrl.protocol === protocol;
  } catch {
    return false;
  }
}

export function getClientIp(request: Request): string {
  const candidate =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    "unknown";

  return candidate.trim().slice(0, 64);
}

export function normalizeFormValue(name: string, value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();
  if (!normalized) {
    return undefined;
  }

  const maxLength = MAX_FIELD_LENGTHS[name] ?? 500;
  if (normalized.length > maxLength || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(normalized)) {
    throw new FormRequestError("invalid fields", 400);
  }

  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw new FormRequestError("invalid fields", 400);
  }

  if (name === "phone" && !/^\+?[\d\s()./-]{6,40}$/.test(normalized)) {
    throw new FormRequestError("invalid fields", 400);
  }

  if ((name === "inTreatment" || name === "needsAssistance") && !["oui", "non"].includes(normalized)) {
    throw new FormRequestError("invalid fields", 400);
  }

  return normalized;
}

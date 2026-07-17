export type FormStatus = "idle" | "sending" | "sent" | "error";

// Serializes the form and posts it to the forms API; drives the caller's
// status through sending -> sent/error. openedAt (ms epoch from when the
// form was first shown) feeds the server's minimum-fill-time bot check.
export async function submitForm(
  kind: "contact" | "inscription",
  form: HTMLFormElement,
  setStatus: (status: FormStatus) => void,
  openedAt: number
) {
  setStatus("sending");

  const data = new FormData(form);
  const values: Record<string, string> = {};
  data.forEach((value, name) => {
    if (typeof value === "string" && name !== "website") {
      values[name] = value;
    }
  });

  try {
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind,
        values,
        website: String(data.get("website") ?? ""),
        elapsedMs: Date.now() - openedAt
      })
    });

    setStatus(response.ok ? "sent" : "error");
  } catch {
    setStatus("error");
  }
}

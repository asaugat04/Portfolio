type Options = Omit<RequestInit, "body"> & { body?: unknown; timeout?: number };
export async function apiFetch<T>(
  url: string,
  { body, timeout = 15000, ...options }: Options = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (body !== undefined && !(body instanceof FormData))
    headers.set("Content-Type", "application/json");
  const response = await fetch(url, {
    ...options,
    credentials: "same-origin",
    headers,
    body:
      body instanceof FormData
        ? body
        : body === undefined
          ? undefined
          : JSON.stringify(body),
    signal: options.signal ?? AbortSignal.timeout(timeout),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(payload?.error ?? "Request failed. Please try again.");
  return payload as T;
}

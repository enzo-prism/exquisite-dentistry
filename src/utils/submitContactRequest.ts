export const CONTACT_REQUEST_TIMEOUT_MS = 12_000;

/** A timeout is an unknown delivery outcome. Never retry an intake POST automatically. */
export const submitContactRequest = async (endpoint: string, body: FormData) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONTACT_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('Contact request was not accepted');
  } finally {
    clearTimeout(timeout);
  }
};

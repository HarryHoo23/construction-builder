import "server-only";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const DEVELOPMENT_SECRET_KEY =
  "1x0000000000000000000000000000000AA";

type TurnstileResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken({
  token,
  remoteIp,
}: {
  token: string;
  remoteIp?: string;
}) {
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY ??
    (process.env.NODE_ENV === "development"
      ? DEVELOPMENT_SECRET_KEY
      : undefined);

  if (!secretKey || !token || token.length > 2048) {
    return { success: false, configurationError: !secretKey };
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: remoteIp,
        idempotency_key: crypto.randomUUID(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) return { success: false, configurationError: false };

    const result = (await response.json()) as TurnstileResponse;
    const actionMatches = !result.action || result.action === "contact";

    return {
      success: result.success && actionMatches,
      configurationError: false,
    };
  } catch {
    return { success: false, configurationError: false };
  }
}

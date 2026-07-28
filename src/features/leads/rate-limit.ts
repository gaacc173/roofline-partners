interface RateLimitEntry {
  count: number;
  expiresAt: number;
}

/**
 * A process-local development safety net. Production must be protected by
 * Vercel Firewall/Cloudflare or a shared rate-limit provider because serverless
 * instances do not share in-memory state.
 */
const entries = new Map<string, RateLimitEntry>();
const WINDOW_MS = 15 * 60 * 1_000;
const MAX_SUBMISSIONS = 5;

export function isRateLimited(identifier: string, now = Date.now()): boolean {
  const current = entries.get(identifier);
  if (!current || current.expiresAt <= now) {
    entries.set(identifier, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_SUBMISSIONS;
}

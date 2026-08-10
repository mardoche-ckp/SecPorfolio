import 'server-only'

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiter (per-IP, fixed window).
// For a single-instance portfolio this is sufficient defense against abuse.
// ---------------------------------------------------------------------------
type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  bucket.count += 1
  return { ok: true, retryAfter: 0 }
}

// Periodically drop stale buckets to avoid unbounded growth.
if (typeof globalThis !== 'undefined') {
  const g = globalThis as unknown as { __rlCleanup?: boolean }
  if (!g.__rlCleanup) {
    g.__rlCleanup = true
    setInterval(
      () => {
        const now = Date.now()
        for (const [key, bucket] of buckets) {
          if (now > bucket.resetAt) buckets.delete(key)
        }
      },
      10 * 60 * 1000,
    ).unref?.()
  }
}

// ---------------------------------------------------------------------------
// Client IP extraction from trusted proxy headers.
// ---------------------------------------------------------------------------
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return headers.get('x-real-ip')?.trim() || 'unknown'
}

// ---------------------------------------------------------------------------
// Validation & sanitization.
// ---------------------------------------------------------------------------
// RFC-5322-ish, intentionally conservative. Caps length to avoid ReDoS.
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/

export function isValidEmail(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length <= 254 &&
    EMAIL_RE.test(value.trim())
  )
}

/** Strip control chars and CR/LF to prevent header/content injection. */
export function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength)
}

/** Escape HTML so user content is safe inside email templates. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

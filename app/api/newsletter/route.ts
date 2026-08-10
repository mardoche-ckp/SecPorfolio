import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  escapeHtml,
  getClientIp,
  isValidEmail,
  rateLimit,
} from '@/lib/security'

export const runtime = 'nodejs'

const OWNER_EMAIL = 'ckpmado@gmail.com'
const FROM_EMAIL = 'Portfolio <onboarding@resend.dev>'

export async function POST(request: Request) {
  const ip = getClientIp(request.headers)

  // OWASP: throttle abusive clients.
  const limit = rateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 60_000 })
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  // OWASP: only accept the content type we expect.
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 415 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const data = (body ?? {}) as Record<string, unknown>

  // Honeypot: real users never fill this hidden field.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    // Pretend success so bots get no signal.
    return NextResponse.json({ ok: true })
  }

  const email = typeof data.email === 'string' ? data.email.trim() : ''
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('[v0] RESEND_API_KEY is not set — cannot send newsletter email')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  const safeEmail = escapeHtml(email)

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: 'New newsletter subscription',
      html: `<h2>New newsletter subscriber</h2>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>IP:</strong> ${escapeHtml(ip)}</p>
             <p><strong>Date:</strong> ${new Date().toISOString()}</p>`,
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.log('[v0] Newsletter send failed:', (error as Error).message)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ error: 'method_not_allowed' }, { status: 405 })
}

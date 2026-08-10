'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setError(t.newsletter.errorEmail)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
        return
      }

      const data = await res.json().catch(() => ({}))
      setStatus('error')
      if (res.status === 429) setError(t.newsletter.errorRate)
      else if (data.error === 'invalid_email') setError(t.newsletter.errorEmail)
      else setError(t.newsletter.errorGeneric)
    } catch {
      setStatus('error')
      setError(t.newsletter.errorGeneric)
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal animation="zoom-in">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/70 p-8 text-center sm:p-12">
            <div
              className="absolute -right-16 -top-16 size-56 rounded-full bg-gradient-primary opacity-20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="mx-auto mb-5 inline-flex rounded-2xl bg-primary/15 p-4 text-primary">
                <Mail className="size-7" />
              </div>
              <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
                {t.newsletter.title}{' '}
                <span className="text-gradient-primary">
                  {t.newsletter.titleHighlight}
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
                {t.newsletter.subtitle}
              </p>

              {status === 'success' ? (
                <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-primary/15 px-6 py-3 text-sm font-medium text-primary">
                  <CheckCircle2 className="size-5" />
                  {t.newsletter.success}
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                  noValidate
                >
                  {/* Honeypot — visually hidden, ignored by humans */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <label htmlFor="newsletter-email" className="sr-only">
                    {t.newsletter.placeholder}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    placeholder={t.newsletter.placeholder}
                    className="w-full rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground hover:opacity-90"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {t.newsletter.sending}
                      </>
                    ) : (
                      t.newsletter.button
                    )}
                  </Button>
                </form>
              )}

              {status === 'error' && (
                <p className="mt-3 text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <p className="mt-4 text-xs text-muted-foreground">
                {t.newsletter.privacy}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

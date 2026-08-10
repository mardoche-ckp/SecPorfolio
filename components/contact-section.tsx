'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactSection() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
      if (status === 'error') setStatus('idle')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
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

  const info = [
    { icon: Mail, label: 'Email', value: 'ckpmado@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+229 01 47 99 85 25' },
    { icon: MapPin, label: 'Location', value: t.contact.location },
  ]

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal animation="fade-up" className="text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            {t.contact.title}{' '}
            <span className="text-gradient-primary">
              {t.contact.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t.contact.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <Reveal animation="fade-right" className="lg:col-span-2">
            <h3 className="font-heading text-xl font-bold">
              {t.contact.infoTitle}
            </h3>
            <div className="mt-6 space-y-4">
              {info.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal animation="fade-left" className="lg:col-span-3">
            {status === 'success' ? (
              <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-card/60 p-8 text-center">
                <CheckCircle2 className="size-12 text-primary" />
                <p className="mt-4 font-medium">{t.contact.success}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8"
                noValidate
              >
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t.contact.name}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={form.name}
                      onChange={update('name')}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {t.contact.email}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={update('email')}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {t.contact.message}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>

                {status === 'error' && (
                  <p className="mt-3 text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-5 w-full rounded-full bg-gradient-primary font-semibold text-primary-foreground hover:opacity-90 sm:w-auto sm:px-8"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.send}
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

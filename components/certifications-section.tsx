'use client'

import { Award } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

export function CertificationsSection() {
  const { t } = useLanguage()

  return (
    <section id="certifications" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal animation="fade-up" className="text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            {t.certifications.title}{' '}
            <span className="text-gradient-primary">
              {t.certifications.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t.certifications.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.certifications.items.map((cert, i) => (
            <Reveal key={cert.title} animation="zoom-in" delay={i * 120}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
                <div className="relative inline-flex w-fit rounded-xl bg-primary/15 p-3 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Award className="size-6" />
                </div>
                <h3 className="relative mt-5 font-heading text-base font-bold leading-snug text-balance">
                  {cert.title}
                </h3>
                <p className="relative mt-1.5 text-xs font-semibold text-primary">
                  {cert.issuer}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {cert.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

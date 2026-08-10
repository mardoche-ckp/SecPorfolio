'use client'

import { Quote } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section id="testimonials" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal animation="fade-up" className="text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            {t.testimonials.title}{' '}
            <span className="text-gradient-primary">
              {t.testimonials.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t.testimonials.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <Reveal key={item.name} animation="blur-in" delay={i * 130}>
              <figure className="h-full rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50">
                <Quote className="size-8 text-primary/50" />
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-heading font-bold">{item.name}</div>
                  <div className="text-xs text-primary">{item.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import {
  ArrowRight,
  Bug,
  Code2,
  MessageSquare,
  Network,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

const icons = [ShieldCheck, Bug, Network, Code2, MessageSquare, Terminal]

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal animation="fade-up" className="text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            {t.services.title}{' '}
            <span className="text-gradient-primary">
              {t.services.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t.services.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={item.title} animation="fade-up" delay={i * 90}>
                <article className="group h-full rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-card">
                  <div className="mb-5 inline-flex rounded-xl bg-primary/15 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal
          animation="zoom-in"
          delay={120}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className={buttonVariants({
              size: 'lg',
              className:
                'rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground hover:opacity-90',
            })}
          >
            {t.services.viewAll}
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#contact"
            className={buttonVariants({
              size: 'lg',
              variant: 'outline',
              className:
                'rounded-full border-border bg-transparent px-6 font-semibold hover:border-primary hover:text-primary',
            })}
          >
            {t.services.getInTouch}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

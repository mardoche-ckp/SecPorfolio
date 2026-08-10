'use client'

import Image from 'next/image'
import { Cpu, Network, Terminal, Wrench } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

export function AboutSection() {
  const { t } = useLanguage()

  const images = [
    { src: '/images/work-1.png', badge: t.about.badges.professional },
    { src: '/images/work-2.png', badge: t.about.badges.creative },
    { src: '/images/work-3.png', badge: t.about.badges.developer },
    { src: '/images/work-4.png', badge: t.about.badges.designer },
  ]

  const columns = [
    { icon: Terminal, title: t.about.columns.languages, list: t.about.languagesList },
    { icon: Cpu, title: t.about.columns.systems, list: t.about.systemsList },
    { icon: Network, title: t.about.columns.network, list: t.about.networkList },
    { icon: Wrench, title: t.about.columns.tools, list: t.about.toolsList },
  ]

  return (
    <section id="about" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal animation="fade-right">
          <div className="relative grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <div
                key={img.src}
                className={`relative aspect-square overflow-hidden rounded-2xl border-2 border-primary/60 ${
                  i % 2 === 1 ? 'mt-6' : ''
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.badge}
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute left-2 top-2 rounded-md bg-gradient-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  {img.badge}
                </span>
              </div>
            ))}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-primary px-4 py-3 text-center shadow-lg animate-[float-slow_4s_ease-in-out_infinite]">
              <div className="font-heading text-sm font-bold text-primary-foreground text-balance">
                {t.about.experience}
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal animation="fade-left">
            <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
              {t.about.title}{' '}
              <span className="text-gradient-primary">
                {t.about.titleHighlight}
              </span>
            </h2>
          </Reveal>
          <Reveal animation="fade-left" delay={100}>
            <p className="mt-3 font-heading font-semibold text-primary">
              {t.about.role}
            </p>
          </Reveal>
          <Reveal animation="fade-left" delay={180}>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.about.description}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {columns.map((col, i) => {
              const Icon = col.icon
              return (
                <Reveal key={col.title} animation="fade-up" delay={i * 100}>
                  <div className="flex items-center gap-2 text-primary">
                    <Icon className="size-4" />
                    <h3 className="font-heading text-sm font-bold text-foreground">
                      {col.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {col.list}
                  </p>
                </Reveal>
              )
            })}
          </div>

          <Reveal animation="fade-up" delay={200}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className={buttonVariants({
                  className:
                    'rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground hover:opacity-90',
                })}
              >
                {t.about.viewPortfolio}
              </a>
              <a
                href="#contact"
                className={buttonVariants({
                  variant: 'outline',
                  className:
                    'rounded-full border-border bg-transparent px-6 font-semibold hover:border-primary hover:text-primary',
                })}
              >
                {t.about.contactMe}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

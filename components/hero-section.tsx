'use client'

import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

export function HeroSection() {
  const { t } = useLanguage()

  const stats = [
    { value: '10+', label: t.hero.stats.projects },
    { value: '2+', label: t.hero.stats.years },
    { value: '4+', label: t.hero.stats.certs },
  ]

  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <Reveal animation="fade-right">
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">
              {t.hero.greeting}{' '}
              <span className="text-gradient-primary">{t.hero.name}</span>{' '}
              <span className="inline-block animate-[wave_1.8s_ease-in-out_infinite] origin-[70%_70%]">
                {'\u{1F44B}'}
              </span>
            </h1>
          </Reveal>

          <Reveal animation="fade-right" delay={120}>
            <p className="mt-4 font-heading text-base font-semibold text-primary sm:text-lg">
              {t.hero.role}
            </p>
          </Reveal>

          <Reveal animation="fade-right" delay={220}>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.hero.description}
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={340}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className={buttonVariants({
                  size: 'lg',
                  className:
                    'rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground hover:opacity-90',
                })}
              >
                {t.hero.contact}
                <ArrowRight className="size-4" />
              </a>
              <a
                href="/CV_Madoche_CAKPO.pdf"
                download
                className={buttonVariants({
                  size: 'lg',
                  variant: 'outline',
                  className:
                    'rounded-full border-border bg-transparent px-6 font-semibold hover:border-primary hover:text-primary',
                })}
              >
                <Download className="size-4" />
                {t.hero.downloadCv}
              </a>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={460}>
            <div className="mt-10 flex gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl font-extrabold text-primary sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal animation="zoom-in" delay={200} className="flex justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 scale-110 bg-gradient-primary blur-2xl opacity-40"
              style={{
                borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
              }}
              aria-hidden="true"
            />
            <div
              className="relative size-72 overflow-hidden bg-gradient-primary sm:size-80 md:size-96 animate-[blobMorph_12s_ease-in-out_infinite]"
              style={{
                borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
              }}
            >
              <Image
                src="/images/avatar1.webp"
                alt="Portrait of Madoche CAKPO"
                fill
                priority
                sizes="(max-width: 768px) 20rem, 24rem"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

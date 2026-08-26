'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

export function ProjectsSection() {
  const { t } = useLanguage()
  const images = ['/images/work-1.webp', '/images/work-3.webp', '/images/work-4.webp']

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal animation="fade-up" className="text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            {t.projects.title}{' '}
            <span className="text-gradient-primary">
              {t.projects.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t.projects.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.projects.items.map((project, i) => (
            <Reveal key={project.title} animation="fade-up" delay={i * 120}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={images[i % images.length]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-balance">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { GraduationCap } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

const skillBars = [
  { name: 'System Security', level: 85 },
  { name: 'Networking', level: 80 },
  { name: 'Python / Scripting', level: 88 },
  { name: 'Pentesting Tools', level: 72 },
  { name: 'Web Development', level: 78 },
]

export function SkillsSection() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal animation="fade-up" className="text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            {t.skills.title}{' '}
            <span className="text-gradient-primary">
              {t.skills.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t.skills.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal animation="fade-right">
            <h3 className="font-heading text-xl font-bold">
              {t.skills.technical}
            </h3>
            <div className="mt-6 space-y-5">
              {skillBars.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </Reveal>

          <Reveal animation="fade-left">
            <h3 className="font-heading text-xl font-bold">
              {t.skills.education}
            </h3>
            <div className="mt-6 space-y-4">
              {t.skills.educationItems.map((item, i) => (
                <Reveal
                  key={item.title}
                  animation="fade-up"
                  delay={i * 120}
                  className="relative rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 inline-flex rounded-lg bg-primary/15 p-2.5 text-primary">
                      <GraduationCap className="size-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary">
                        {item.period}
                      </span>
                      <h4 className="mt-1 font-heading font-bold text-balance">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.place}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function SkillBar({
  skill,
  index,
}: {
  skill: { name: string; level: number }
  index: number
}) {
  return (
    <Reveal animation="fade-up" delay={index * 90}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-primary transition-[width] duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </Reveal>
  )
}

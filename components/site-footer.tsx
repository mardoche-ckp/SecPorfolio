'use client'

import { Globe, Link2, Mail } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="font-heading text-lg font-bold">
            Sec<span className="text-primary">Portfolio</span>
          </div>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            {t.footer.built}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:ckpmado@gmail.com"
            aria-label="Email"
            className="inline-flex rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Mail className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/madoche-cakpo-910995337"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Link2 className="size-4" />
          </a>
          <a
            href="https://github.com/mardoche-ckp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            className="inline-flex rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Globe className="size-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
        &copy; {year} Madoche CAKPO. {t.footer.rights}
      </div>
    </footer>
  )
}

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { type Language, translations, type Translation } from '@/lib/i18n'

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr')

  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? (window.localStorage.getItem('lang') as Language | null)
        : null
    if (stored === 'fr' || stored === 'en') {
      setLangState(stored)
    }
  }, [])

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lang', next)
      document.documentElement.lang = next
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'fr' ? 'en' : 'fr')
  }, [lang, setLang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggleLang, t: translations[lang] }),
    [lang, setLang, toggleLang],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

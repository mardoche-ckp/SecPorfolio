import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const SITE_URL = 'https://madochecakpo.me'
const SITE_NAME = 'Madoche CAKPO — Portfolio Cybersécurité'
const SITE_DESCRIPTION =
  "Portfolio de Madoche CAKPO, étudiant en cybersécurité (ESGIS Bénin) : sécurisation de systèmes, tests d'intrusion, administration réseau et développement d'applications sécurisées."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: '%s | Madoche CAKPO',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Madoche CAKPO', url: SITE_URL }],
  creator: 'Madoche CAKPO',
  publisher: 'Madoche CAKPO',
  keywords: [
    'Madoche CAKPO',
    'cybersécurité',
    'cybersecurity',
    'pentest',
    'test d\'intrusion',
    'sécurité informatique',
    'administrateur système',
    'ESGIS Bénin',
    'développeur sécurisé',
    'Fortinet NSE',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: {
      fr: '/',
      en: '/',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Madoche CAKPO — Portfolio Cybersécurité',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon',
    apple: '/icon',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    // Remplacer par le code fourni par Google Search Console
    // (méthode "balise HTML" dans Search Console > Paramètres > Propriété)
    google: 'REMPLACER_PAR_VOTRE_CODE_GOOGLE_SEARCH_CONSOLE',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a0f08',
  userScalable: true,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Madoche CAKPO',
  url: SITE_URL,
  jobTitle: 'Étudiant en cybersécurité & développeur',
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}/images/avatar.webp`,
  sameAs: [],
  knowsAbout: [
    'Cybersécurité',
    'Test d\'intrusion',
    'Administration systèmes',
    'Administration réseau',
    'Développement sécurisé',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'ESGIS Bénin',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${poppins.variable} bg-background`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

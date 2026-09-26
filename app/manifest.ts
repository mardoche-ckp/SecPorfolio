import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Madoche CAKPO — Portfolio Cybersécurité',
    short_name: 'Madoche CAKPO',
    description:
      "Portfolio de Madoche CAKPO, étudiant en cybersécurité : sécurisation de systèmes, tests d'intrusion, administration réseau et développement sécurisé.",
    start_url: '/',
    display: 'standalone',
    background_color: '#1a0f08',
    theme_color: '#1a0f08',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

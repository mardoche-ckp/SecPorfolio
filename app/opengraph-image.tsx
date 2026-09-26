import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background:
            'linear-gradient(135deg, #1a0f08 0%, #2a1a0e 60%, #3a2412 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#e0a458',
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Cybersécurité · Développement
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: '#f5ede1',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Madoche CAKPO
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#c9b8a3',
            maxWidth: 900,
          }}
        >
          Sécurisation de systèmes, tests d'intrusion et applications fiables
        </div>
      </div>
    ),
    { ...size }
  )
}

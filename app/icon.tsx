import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a0f08',
          borderRadius: 12,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#e0a458',
            fontFamily: 'sans-serif',
          }}
        >
          MC
        </span>
      </div>
    ),
    { ...size }
  )
}

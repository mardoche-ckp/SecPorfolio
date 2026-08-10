'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Animation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'blur-in'

const hiddenStyles: Record<Animation, string> = {
  'fade-up': 'opacity-0 translate-y-10',
  'fade-down': 'opacity-0 -translate-y-10',
  'fade-left': 'opacity-0 translate-x-12',
  'fade-right': 'opacity-0 -translate-x-12',
  'zoom-in': 'opacity-0 scale-90',
  'blur-in': 'opacity-0 blur-md scale-[0.98]',
}

export function Reveal({
  children,
  animation = 'fade-up',
  delay = 0,
  className,
  as: Tag = 'div',
  once = true,
}: {
  children: React.ReactNode
  animation?: Animation
  delay?: number
  className?: string
  as?: React.ElementType
  once?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none',
        visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0' : hiddenStyles[animation],
        className,
      )}
    >
      {children}
    </Tag>
  )
}

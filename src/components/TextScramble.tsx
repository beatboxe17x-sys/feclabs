import { useEffect, useRef, useState, type CSSProperties } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

interface TextScrambleProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p'
  duration?: number
  trigger?: 'mount' | 'hover' | 'inview'
  delay?: number
  style?: CSSProperties
}

export default function TextScramble({
  children,
  className = '',
  as: Tag = 'span',
  duration = 1200,
  trigger = 'mount',
  delay = 0,
  style,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const frameRef = useRef<number>(0)

  const scramble = () => {
    const target = children
    const length = target.length
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const revealedCount = Math.floor(progress * length)

      let result = ''
      for (let i = 0; i < length; i++) {
        if (i < revealedCount) {
          result += target[i]
        } else if (target[i] === ' ') {
          result += ' '
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplayText(result)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayText(target)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(() => {
        setHasTriggered(true)
        scramble()
      }, delay)
      return () => {
        clearTimeout(timer)
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [trigger, delay])

  useEffect(() => {
    if (trigger === 'inview' && ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggered) {
              setHasTriggered(true)
              setTimeout(() => scramble(), delay)
            }
          })
        },
        { threshold: 0.5 }
      )
      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [trigger, delay, hasTriggered])

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scramble()
    }
  }

  return (
    <Tag
      ref={ref as any}
      className={className}
      onMouseEnter={handleMouseEnter}
      style={style}
    >
      {displayText}
    </Tag>
  )
}

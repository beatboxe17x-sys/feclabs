import { type ReactNode } from 'react'

interface GlitchTextProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div'
}

export default function GlitchText({ children, className = '', as: Tag = 'span' }: GlitchTextProps) {
  const text = typeof children === 'string' ? children : ''
  return (
    <Tag
      className={`glitch ${className}`}
      data-text={text}
    >
      {children}
    </Tag>
  )
}

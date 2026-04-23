import { useEffect, useRef } from 'react'

export default function SpotlightCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX
      posRef.current.y = e.clientY
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0, 212, 255, 0.06), transparent 40%)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  )
}

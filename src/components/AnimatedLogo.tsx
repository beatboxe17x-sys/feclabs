import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface AnimatedLogoProps {
  size?: number
  className?: string
}

export default function AnimatedLogo({ size = 60, className = '' }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Continuous rotation for rings
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(ring1Ref.current, { rotation: 360, duration: 8, ease: 'none' }, 0)
    tl.to(ring2Ref.current, { rotation: -360, duration: 12, ease: 'none' }, 0)

    // Pulse glow
    gsap.to(glowRef.current, {
      opacity: 0.3,
      scale: 1.2,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => { tl.kill() }
  }, [])

  const s = size
  const half = s / 2

  return (
    <div ref={containerRef} className={`relative inline-flex items-center justify-center ${className}`} style={{ width: s * 1.6, height: s * 1.6 }}>
      {/* Outer glow */}
      <div
        ref={glowRef}
        className="absolute rounded-full"
        style={{
          width: s * 1.4,
          height: s * 1.4,
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Rotating ring 1 - dashed */}
      <div
        ref={ring1Ref}
        className="absolute rounded-full"
        style={{
          width: s * 1.3,
          height: s * 1.3,
          border: '1px dashed rgba(0,212,255,0.2)',
          borderTopColor: 'rgba(0,212,255,0.5)',
        }}
      />

      {/* Rotating ring 2 - dotted, reverse */}
      <div
        ref={ring2Ref}
        className="absolute rounded-full"
        style={{
          width: s * 1.1,
          height: s * 1.1,
          border: '1px dotted rgba(0,212,255,0.15)',
          borderBottomColor: 'rgba(124,58,237,0.4)',
        }}
      />

      {/* Logo image with pulse */}
      <img
        src="/logo.png"
        alt="Fecurity"
        className="relative z-10"
        style={{
          width: s,
          height: s,
          filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.4)) drop-shadow(0 0 20px rgba(0,212,255,0.2))',
          animation: 'logoPulse 3s ease-in-out infinite',
        }}
      />

      {/* Corner brackets */}
      <div className="absolute z-10" style={{ top: half * 0.2, left: half * 0.2, width: s * 0.3, height: s * 0.3 }}>
        <div className="absolute top-0 left-0 w-3 h-px bg-cyan/40" />
        <div className="absolute top-0 left-0 h-3 w-px bg-cyan/40" />
      </div>
      <div className="absolute z-10" style={{ top: half * 0.2, right: half * 0.2, width: s * 0.3, height: s * 0.3 }}>
        <div className="absolute top-0 right-0 w-3 h-px bg-cyan/40" />
        <div className="absolute top-0 right-0 h-3 w-px bg-cyan/40" />
      </div>
      <div className="absolute z-10" style={{ bottom: half * 0.2, left: half * 0.2, width: s * 0.3, height: s * 0.3 }}>
        <div className="absolute bottom-0 left-0 w-3 h-px bg-cyan/40" />
        <div className="absolute bottom-0 left-0 h-3 w-px bg-cyan/40" />
      </div>
      <div className="absolute z-10" style={{ bottom: half * 0.2, right: half * 0.2, width: s * 0.3, height: s * 0.3 }}>
        <div className="absolute bottom-0 right-0 w-3 h-px bg-cyan/40" />
        <div className="absolute bottom-0 right-0 h-3 w-px bg-cyan/40" />
      </div>

      <style>{`
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(0,212,255,0.4)) drop-shadow(0 0 20px rgba(0,212,255,0.15)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 15px rgba(0,212,255,0.6)) drop-shadow(0 0 30px rgba(0,212,255,0.25)); transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

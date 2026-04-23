import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const games = [
  'CALL OF DUTY', 'DELTA FORCE', 'BATTLEFIELD', 'NEO-BLADE',
  'SHADOW OPS', 'MECH WARFARE', 'WARZONE', 'MODERN WARFARE',
  'BLACK OPS', 'COUNTER-STRIKE', 'APEX LEGENDS', 'RAINBOW SIX',
]

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!track1Ref.current || !track2Ref.current) return

    // GSAP infinite horizontal scroll
    const tl1 = gsap.to(track1Ref.current, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })

    const tl2 = gsap.to(track2Ref.current, {
      xPercent: 50,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    // Speed up on scroll
    ScrollTrigger.create({
      trigger: marqueeRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity()) / 1000
        gsap.to([tl1, tl2], {
          timeScale: 1 + velocity * 0.5,
          duration: 0.3,
          overwrite: true,
        })
      },
    })

    return () => {
      tl1.kill()
      tl2.kill()
    }
  }, [])

  const renderTrack = (games: string[]) => (
    <>
      {games.map((game, i) => (
        <span key={i} className="flex items-center gap-6 mx-6 shrink-0">
          <span
            className="font-rajdhani font-bold text-4xl md:text-6xl uppercase tracking-wider whitespace-nowrap"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0, 212, 255, 0.3)',
            }}
          >
            {game}
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan/40 shrink-0" />
        </span>
      ))}
    </>
  )

  return (
    <section
      ref={marqueeRef}
      className="relative py-12 overflow-hidden"
      style={{ borderTop: '1px solid rgba(0, 212, 255, 0.08)', borderBottom: '1px solid rgba(0, 212, 255, 0.08)' }}
    >
      {/* Track 1 - left */}
      <div ref={track1Ref} className="flex mb-6">
        {renderTrack(games)}
        {renderTrack(games)}
      </div>
      {/* Track 2 - right */}
      <div ref={track2Ref} className="flex" style={{ transform: 'translateX(-50%)' }}>
        {renderTrack(games)}
        {renderTrack(games)}
      </div>
    </section>
  )
}

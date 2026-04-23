import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import TextScramble from './TextScramble'
import HeroMenu from './HeroMenu'
import { ChevronRight } from 'lucide-react'

interface HeroProps {
  onExplore: () => void
}

export default function Hero({ onExplore }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(menuRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-[72px] overflow-hidden"
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="relative z-10 order-2 lg:order-1">
            <p
              ref={eyebrowRef}
              className="font-inter font-medium text-xs uppercase tracking-[0.2em] mb-4 opacity-0 translate-y-4"
              style={{ color: 'rgba(0, 212, 255, 0.8)' }}
            >
              PREMIUM GAME MODIFICATIONS
            </p>

            <div ref={titleRef} className="opacity-0 translate-y-8 mb-6">
              <h1 className="font-rajdhani font-bold leading-[0.9] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
              >
                <span className="block" style={{ color: '#00d4ff', textShadow: '0 0 40px rgba(0, 212, 255, 0.3), 0 0 80px rgba(0, 212, 255, 0.15)' }}>
                  <TextScramble duration={1000} delay={400}>JOIN US</TextScramble>
                </span>
                <span className="block" style={{ color: '#ff3366', textShadow: '0 0 40px rgba(255, 51, 102, 0.3), 0 0 80px rgba(255, 51, 102, 0.15)' }}>
                  <TextScramble duration={1000} delay={800}>NOW</TextScramble>
                </span>
              </h1>
            </div>

            <p
              ref={descRef}
              className="font-inter text-base leading-[1.7] max-w-[520px] mb-8 opacity-0 translate-y-4"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Take your gameplay to the next level with Fecurity. Our solutions give
              you the edge in popular games. Enjoy instant delivery, secure payments,
              and 24/7 support. Dominate every match with ease and stay ahead of the
              competition.
            </p>

            <button
              ref={btnRef}
              onClick={onExplore}
              className="shimmer-btn font-inter font-semibold text-sm uppercase tracking-[0.1em] text-white px-10 py-4 rounded-lg flex items-center gap-2 hover:shadow-glow hover:scale-[1.02] transition-all duration-300 opacity-0 translate-y-4"
            >
              EXPLORE PRODUCTS
              <ChevronRight size={18} />
            </button>
          </div>

          {/* RIGHT COLUMN - STATIC CHEAT MENU (replaces gun pic) */}
          <div
            ref={menuRef}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end opacity-0 translate-x-12"
          >
            <div className="relative">
              {/* Glow behind */}
              <div
                className="absolute inset-0 rounded-full blur-3xl -z-10"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 60%)' }}
              />
              <HeroMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Crosshairs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="absolute font-inter text-cyan/15 text-lg animate-pulse-crosshair"
            style={{
              left: `${(i * 7.3 + 5) % 100}%`,
              top: `${(i * 11.7 + 3) % 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            +
          </span>
        ))}
      </div>
    </section>
  )
}

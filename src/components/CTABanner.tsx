import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface CTABannerProps {
  onExplore: () => void
}

export default function CTABanner({ onExplore }: CTABannerProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section id="cta" className="relative py-20 md:py-24"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(124, 58, 237, 0.08))',
        borderTop: '1px solid rgba(0, 212, 255, 0.1)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
      }}
    >
      <div ref={sectionRef} className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        <img src="/logo.png" alt="Fecurity" className="w-14 h-14 mx-auto mb-5 opacity-60" />
        <h2 className="font-rajdhani font-bold uppercase text-white mb-4"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', textShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}>
          READY TO DOMINATE?
        </h2>
        <p className="font-inter text-base mb-8 max-w-[500px] mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Join thousands of gamers who trust Fecurity. Instant access after purchase.
        </p>
        <button
          onClick={onExplore}
          className="shimmer-btn font-inter font-semibold text-sm uppercase tracking-[0.1em] text-white px-12 py-4 rounded-lg inline-flex items-center gap-2 hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
        >
          <Zap size={18} />
          GET STARTED NOW
        </button>
      </div>
    </section>
  )
}

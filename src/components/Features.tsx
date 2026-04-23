import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Crosshair, Eye, Lock, Cpu, Wifi, Terminal } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: <Crosshair size={22} />,
    title: 'PRECISION AIMBOT',
    desc: 'Humanized aiming with configurable smoothing, FOV limits, and bone selection. Stays undetected with adaptive randomization.',
    color: '#00d4ff',
  },
  {
    icon: <Eye size={22} />,
    title: 'ADVANCED ESP',
    desc: 'Real-time player tracking with 3D boxes, skeletons, health bars, and distance markers. Fully customizable colors.',
    color: '#7c3aed',
  },
  {
    icon: <Lock size={22} />,
    title: 'HWID SPOOFER',
    desc: 'Built-in hardware ID spoofing to protect your system. Automatic rotation keeps your machine fingerprint clean.',
    color: '#ff3366',
  },
  {
    icon: <Cpu size={22} />,
    title: 'KERNEL DRIVER',
    desc: 'Low-level kernel driver for maximum stealth. Operates below ring-3 detection vectors used by anti-cheat systems.',
    color: '#f59e0b',
  },
  {
    icon: <Wifi size={22} />,
    title: 'STREAM PROOF',
    desc: 'Streaming and recording safe. All visuals hidden from capture software while remaining visible to you.',
    color: '#00d4ff',
  },
  {
    icon: <Terminal size={22} />,
    title: 'AUTO-UPDATER',
    desc: 'Silent background updates within minutes of game patches. Never miss a session due to outdated software.',
    color: '#7c3aed',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [typedText, setTypedText] = useState('')
  const hasTyped = useRef(false)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  useEffect(() => {
    if (!cardRef.current) return
    const st = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasTyped.current) return
        hasTyped.current = true
        let i = 0
        const text = feature.desc
        const interval = setInterval(() => {
          i++
          setTypedText(text.slice(0, i))
          if (i >= text.length) clearInterval(interval)
        }, 15)
      },
    })
    return () => st.kill()
  }, [feature.desc])

  return (
    <div
      ref={cardRef}
      className="group relative bg-[#0a0a12] border border-[#1a1a2e] rounded-2xl p-6 hover:border-opacity-40 transition-all duration-500 opacity-0"
      style={{ '--card-color': feature.color } as React.CSSProperties}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${feature.color}40, transparent)`,
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          animation: 'spin 4s linear infinite',
        }}
      />

      <div
        className="inline-flex items-center justify-center w-11 h-11 rounded-lg mb-4 transition-all duration-500 group-hover:scale-110"
        style={{ background: `${feature.color}15`, color: feature.color, border: `1px solid ${feature.color}30` }}
      >
        {feature.icon}
      </div>

      <h3 className="font-rajdhani font-bold text-lg uppercase tracking-wider text-white mb-3">
        {feature.title}
      </h3>

      <p className="font-mono text-xs leading-relaxed min-h-[60px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {typedText}
        <span className="inline-block w-2 h-4 bg-cyan/60 animate-pulse ml-0.5 align-middle" />
      </p>
    </div>
  )
}

export default function Features() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      }
    )
  }, [])

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-inter font-medium text-xs uppercase tracking-[0.2em] text-cyan mb-3">
            CAPABILITIES
          </p>
          <h2 className="font-rajdhani font-bold gradient-text uppercase tracking-[0.05em] inline-block"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            FEATURES
          </h2>
          <div className="mt-4 h-px w-full max-w-[600px] mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

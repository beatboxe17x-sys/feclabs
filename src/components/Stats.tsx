import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Shield, Zap, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface StatItemProps {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  delay: number
}

function StatItem({ icon, value, suffix, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value,
          duration: 2,
          delay,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.floor(obj.val)),
        })
      },
    })
    return () => st.kill()
  }, [value, delay])

  return (
    <div ref={ref} className="text-center group">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan/10 border border-cyan/20 mb-4 group-hover:bg-cyan/20 group-hover:border-cyan/40 transition-all duration-500">
        {icon}
      </div>
      <div className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="font-inter text-sm uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
      </p>
    </div>
  )
}

export default function Stats() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      }
    )
  }, [])

  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-inter font-medium text-xs uppercase tracking-[0.2em] text-cyan mb-3">
            TRUSTED WORLDWIDE
          </p>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl uppercase tracking-wider text-white">
            BY THE NUMBERS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem
            icon={<Users size={24} className="text-cyan" />}
            value={12500}
            suffix="+"
            label="Active Users"
            delay={0}
          />
          <StatItem
            icon={<Shield size={24} className="text-cyan" />}
            value={99}
            suffix=".9%"
            label="Undetected Rate"
            delay={0.15}
          />
          <StatItem
            icon={<Zap size={24} className="text-cyan" />}
            value={50}
            suffix="ms"
            label="Avg Response"
            delay={0.3}
          />
          <StatItem
            icon={<Clock size={24} className="text-cyan" />}
            value={24}
            suffix="/7"
            label="Support Hours"
            delay={0.45}
          />
        </div>
      </div>
    </section>
  )
}

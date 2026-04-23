import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'HOW LONG DOES DELIVERY TAKE?',
    a: 'Instant. After crypto payment confirmation (typically 1-3 minutes), your license key is delivered directly to your dashboard and email. No waiting, no manual processing.',
  },
  {
    q: 'IS THIS DETECTABLE BY ANTI-CHEAT?',
    a: 'Our software uses kernel-level drivers and advanced obfuscation techniques to remain undetected. We have maintained a 99.9% clean record across all supported titles with rapid patches after game updates.',
  },
  {
    q: 'WHAT PAYMENT METHODS DO YOU ACCEPT?',
    a: 'We accept Bitcoin (BTC), Litecoin (LTC), and Ethereum (ETH) only. Crypto payments ensure maximum privacy and security for both parties. No personal information required.',
  },
  {
    q: 'CAN I USE THIS WHILE STREAMING?',
    a: 'Yes. Our stream-proof technology hides all ESP, aimbot visuals, and overlays from streaming software like OBS, Discord, and NVIDIA ShadowPlay while keeping them visible to you.',
  },
  {
    q: 'DO YOU OFFER REFUNDS?',
    a: 'Due to the digital nature of our products, all sales are final. However, if our software fails to function due to technical issues on our end within 24 hours of purchase, we provide replacements or store credit.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const [typedA, setTypedA] = useState('')
  const hasTyped = useRef(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemRef.current) return
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  const handleToggle = () => {
    const next = !open
    setOpen(next)
    if (next && !hasTyped.current) {
      hasTyped.current = true
      let i = 0
      const interval = setInterval(() => {
        i++
        setTypedA(faq.a.slice(0, i))
        if (i >= faq.a.length) clearInterval(interval)
      }, 8)
    }
  }

  return (
    <div
      ref={itemRef}
      className="border border-[#1a1a2e] rounded-xl overflow-hidden opacity-0 hover:border-cyan/20 transition-colors duration-300"
    >
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-5 text-left group"
      >
        <span className="font-mono text-sm uppercase tracking-wider text-white/80 group-hover:text-cyan transition-colors duration-300">
          <span className="text-cyan/50 mr-3">{'>'}</span>
          {faq.q}
        </span>
        <ChevronDown
          size={18}
          className={`text-cyan/50 shrink-0 ml-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? '300px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-5 pl-12">
          <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {open ? (hasTyped.current ? typedA : faq.a) : ''}
            {open && typedA.length < faq.a.length && (
              <span className="inline-block w-2 h-4 bg-cyan/60 animate-pulse ml-0.5 align-middle" />
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
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
    <section id="faq" className="relative py-24 md:py-32">
      <div className="w-full max-w-[800px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-inter font-medium text-xs uppercase tracking-[0.2em] text-cyan mb-3">
            KNOWLEDGE BASE
          </p>
          <h2 className="font-rajdhani font-bold gradient-text uppercase tracking-[0.05em] inline-block"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            FAQ
          </h2>
          <div className="mt-4 h-px w-full max-w-[400px] mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
          />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

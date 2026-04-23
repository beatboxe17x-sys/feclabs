import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, ExternalLink, RotateCcw, Check, ChevronRight, Zap } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { allProducts } from '../data/allProducts'

gsap.registerPlugin(ScrollTrigger)

function useMagneticHover(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `translate(${x * 8}px, ${y * 8}px) scale(1.02)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0, 0) scale(1)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref])
}

function ProductCard({ product, index }: { product: typeof allProducts[0]; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  useMagneticHover(frontRef)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: (index % 5) * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  const handleAddDuration = useCallback((e: React.MouseEvent, label: string, price: number) => {
    e.stopPropagation()
    addItem({
      id: `${product.id}-${label}`,
      name: product.name,
      variant: label,
      price,
      image: product.image,
      quantity: 1,
      url: product.url,
    })
  }, [product, addItem])

  return (
    <div ref={cardRef} className="opacity-0" style={{ perspective: '1200px' }}>
      <div
        className="relative w-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '420px',
        }}
      >
        {/* FRONT */}
        <div
          ref={frontRef}
          className="absolute inset-0 group cursor-pointer overflow-hidden transition-all duration-300"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(180deg, rgba(12,12,20,0.98), rgba(6,6,12,0.99))',
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
            border: '1px solid rgba(0,212,255,0.06)',
            transition: 'transform 0.2s ease-out, box-shadow 0.3s',
          }}
          onClick={() => setFlipped(true)}
        >
          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
              padding: '1px',
              background: 'conic-gradient(from 180deg at 50% 50%, transparent 0%, rgba(0,212,255,0.3) 25%, transparent 50%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-5 h-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-0 right-0 w-full h-px bg-cyan/40" />
            <div className="absolute top-0 right-0 h-full w-px bg-cyan/40" />
          </div>

          {/* Image */}
          <div className="relative h-[220px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-[#06060c]/30 to-transparent" />
            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(0,212,255,0.08) 45%, rgba(0,212,255,0.15) 50%, rgba(0,212,255,0.08) 55%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmerSweep 2s infinite',
              }}
            />
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[9px] font-mono text-cyan/50 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 flex items-center gap-1">
              <Zap size={9} />
              View Details
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-rajdhani font-bold text-sm uppercase tracking-wider text-white mb-2 group-hover:text-cyan transition-colors duration-300">
              {product.name}
            </h3>
            {product.variants.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {product.variants.slice(0, 4).map((v) => (
                  <span key={v.label} className="text-[9px] font-inter font-bold px-1.5 py-0.5 rounded-sm" style={{ background: v.color, color: v.textColor }}>
                    {v.label}
                  </span>
                ))}
              </div>
            )}
            <p className="font-mono text-[9px] text-white/20 mb-3 tracking-wider">BTC / LTC / ETH ONLY</p>
            <div className="flex items-end justify-between">
              <span className="font-rajdhani font-bold text-base text-magenta group-hover:text-[#ff5588] transition-colors">
                ${product.priceMin.toFixed(2)} <span className="text-white/25 text-xs font-normal">- ${product.priceMax.toFixed(0)}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)] animate-pulse" />
                <span className="font-mono text-[9px] text-white/35">{product.stockCount || 'IN STOCK'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK - Scrollable */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(180deg, rgba(8,8,18,0.99), rgba(4,4,10,0.995))',
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
            border: '1px solid rgba(0,212,255,0.12)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1a1a2e] bg-[#060610] shrink-0 z-10">
            <div className="flex items-center gap-2">
              <img src={product.image} alt="" className="w-6 h-6 rounded object-cover" />
              <h3 className="font-rajdhani font-bold text-xs uppercase tracking-wider text-cyan">{product.name}</h3>
            </div>
            <button onClick={() => setFlipped(false)} className="p-1.5 text-white/30 hover:text-cyan hover:bg-cyan/10 rounded-lg transition-all">
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Scrollable content - THIS IS WHERE MOUSE WHEEL WORKS */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0,212,255,0.2) transparent',
            }}
            onWheel={(e) => { e.stopPropagation() }}
          >
            <div className="p-4 space-y-4">
              {/* Description */}
              <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {product.description}
              </p>

              {/* Features */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/25 mb-2 flex items-center gap-2">
                  <span className="w-3 h-px bg-cyan/30" />
                  Features
                </p>
                <ul className="space-y-1.5">
                  {product.features.slice(0, 5).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={10} className="text-cyan/70 shrink-0 mt-0.5" />
                      <span className="font-inter text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Durations */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/25 mb-2 flex items-center gap-2">
                  <span className="w-3 h-px bg-cyan/30" />
                  Select Duration
                </p>
                <div className="space-y-1.5">
                  {product.durations.map((d) => (
                    <button
                      key={d.label}
                      onClick={(e) => handleAddDuration(e, d.label, d.price)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-cyan/40 hover:bg-cyan/[0.06] transition-all duration-200 group/dur active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 shadow-[0_0_4px_rgba(34,197,94,0.4)]" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white/45 group-hover/dur:text-white/80 transition-colors">{d.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-rajdhani font-bold text-sm text-white/70 group-hover/dur:text-cyan transition-colors">${d.price.toFixed(2)}</span>
                        <ChevronRight size={12} className="text-white/15 group-hover/dur:text-cyan transition-all group-hover/dur:translate-x-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick buy */}
              <div className="pt-1 space-y-2">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn w-full flex items-center justify-center gap-2 py-3 rounded-xl font-inter font-semibold text-xs uppercase tracking-wider text-white hover:shadow-glow transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ShoppingCart size={14} />
                  BUY NOW
                </a>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-inter font-medium text-xs uppercase tracking-wider border border-cyan/25 text-cyan/70 hover:bg-cyan hover:text-black hover:border-cyan transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={11} />
                  VIEW PRODUCT PAGE
                </a>
              </div>

              {/* Spacer for scroll breathing room */}
              <div className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmerSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

export default function AllProducts() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      }
    )
  }, [])

  return (
    <section id="products" className="relative py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)' }}
      />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div ref={headerRef} className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-cyan/40" />
            <p className="font-inter font-medium text-xs uppercase tracking-[0.2em] text-cyan">FULL CATALOG</p>
          </div>
          <h2 className="font-rajdhani font-bold uppercase tracking-wider text-white mb-3"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', textShadow: '0 0 50px rgba(0,212,255,0.25)' }}>
            ALL PRODUCTS
          </h2>
          <p className="font-inter text-sm max-w-[500px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Click any card to see features, durations, and pricing. Select a duration to add to cart instantly.
          </p>
          <div className="mt-5 h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.4), rgba(124,58,237,0.3), transparent 80%)' }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {allProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

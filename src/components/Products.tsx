import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from './TiltCard'
import TextScramble from './TextScramble'
import { Star, CheckCircle, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { Product, Review } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem, setIsOpen } = useCart()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.15,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      variant: product.variants[0]?.label || 'DEFAULT',
      price: product.priceMin,
      image: product.image,
      quantity: 1,
    })
    setIsOpen(true)
  }

  return (
    <div ref={cardRef} className="opacity-0">
      <TiltCard className="h-full">
        <div className="group relative bg-surface border border-[#1a1a2e] rounded-2xl overflow-hidden hover:border-cyan/30 hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              padding: '1px',
              background: 'conic-gradient(from 0deg, transparent 60%, rgba(0,212,255,0.4) 80%, transparent 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animation: 'spin 4s linear infinite',
            }}
          />
          {/* Image */}
          <div className="relative h-[240px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="absolute top-3 right-3 p-2.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-white/70 hover:text-cyan hover:border-cyan/50 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-10"
            >
              <ShoppingCart size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-rajdhani font-semibold text-xl uppercase tracking-[0.02em] text-white mb-2">
              {product.name}
            </h3>

            {/* Variants */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.variants.map((v) => (
                <span
                  key={v.label}
                  className="text-[11px] font-inter font-bold px-2 py-0.5 rounded"
                  style={{ background: v.color, color: v.textColor }}
                >
                  {v.label}
                </span>
              ))}
            </div>

            {/* Payment info */}
            <p className="text-[11px] font-inter mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              BTC / LTC / ETH
            </p>
            <p className="text-[11px] font-inter mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
              ONLY CRYPTO PAYMENTS
            </p>

            {/* Bottom row */}
            <div className="mt-auto flex items-end justify-between">
              <span className="font-rajdhani font-bold text-2xl text-magenta">
                ${product.priceMin.toFixed(2)} - ${product.priceMax.toFixed(2)}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {product.stockCount ? `${product.stockCount} In Stock` : 'In Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  return (
    <div ref={cardRef} className="opacity-0">
      <TiltCard className="h-full">
        <div className="group relative bg-surface border border-[#1a1a2e] rounded-2xl p-5 hover:border-cyan/30 hover:shadow-card-hover transition-all duration-500 h-full flex flex-col">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              padding: '1px',
              background: 'conic-gradient(from 0deg, transparent 60%, rgba(0,212,255,0.3) 80%, transparent 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animation: 'spin 4s linear infinite',
            }}
          />
          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {Array.from({ length: review.stars }).map((_, i) => (
              <Star key={i} size={16} className="text-amber fill-amber" />
            ))}
          </div>

          <p className="font-inter text-sm mb-4 flex-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {review.text}
          </p>

          <div className="border-t border-[#1a1a2e] pt-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
              <span className="font-inter font-bold text-sm text-cyan">
                {String.fromCharCode(65 + (review.id % 26))}
              </span>
            </div>
            <div>
              <p className="font-inter text-sm text-white/80">{review.date}</p>
              {review.verified && (
                <div className="flex items-center gap-1 mt-0.5">
                  <CheckCircle size={10} className="text-success" />
                  <span className="font-inter font-medium text-[10px] uppercase text-success">
                    Verified Purchase
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  )
}

interface ProductsSectionProps {
  products: Product[]
  eyebrow: string
  title: string
  id: string
}

function ProductsSection({ products, eyebrow, title, id }: ProductsSectionProps) {
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
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section id={id} className="relative py-24 md:py-32">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={headerRef} className="mb-12">
          <p className="font-inter font-medium text-xs uppercase tracking-[0.2em] text-cyan mb-3">
            {eyebrow}
          </p>
          <TextScramble
            as="h2"
            className="font-rajdhani font-bold gradient-text uppercase tracking-[0.05em] block"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            trigger="inview"
            duration={1200}
          >
            {title}
          </TextScramble>
          <div className="mt-4 h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function PopularProducts() {
  return (
    <ProductsSection
      id="products"
      eyebrow="MOST POPULAR"
      title="FEATURED CHEATS"
      products={[
        {
          id: 'cod',
          name: 'CALL OF DUTY',
          image: '/product_cod.jpg',
          variants: [
            { label: 'BO7', color: '#f59e0b', textColor: '#000' },
            { label: 'BO6', color: '#ff3366', textColor: '#fff' },
            { label: 'MWIII', color: '#00d4ff', textColor: '#000' },
            { label: 'MWII', color: '#7c3aed', textColor: '#fff' },
            { label: 'VG', color: '#f59e0b', textColor: '#000' },
            { label: 'MW19', color: '#00d4ff', textColor: '#000' },
          ],
          priceMin: 5,
          priceMax: 65,
          inStock: true,
          cryptoOnly: true,
        },
        {
          id: 'delta',
          name: 'DELTA FORCE',
          image: '/product_delta.jpg',
          variants: [],
          priceMin: 10,
          priceMax: 100,
          inStock: true,
          cryptoOnly: true,
        },
        {
          id: 'battlefield',
          name: 'BATTLEFIELD',
          image: '/product_battlefield.jpg',
          variants: [
            { label: 'BF6', color: '#f59e0b', textColor: '#000' },
            { label: 'BF2042', color: '#00d4ff', textColor: '#000' },
            { label: 'BF5', color: '#ff3366', textColor: '#fff' },
            { label: 'BF1', color: '#7c3aed', textColor: '#fff' },
          ],
          priceMin: 8,
          priceMax: 70,
          inStock: true,
          cryptoOnly: true,
        },
      ]}
    />
  )
}

export function NewProducts() {
  return (
    <ProductsSection
      id="new-products"
      eyebrow="FRESH DROPS"
      title="NEWLY ADDED"
      products={[
        {
          id: 'new1',
          name: 'NEO-BLADE',
          image: '/product_new1.jpg',
          variants: [
            { label: 'ELITE', color: '#00d4ff', textColor: '#000' },
            { label: 'PRO', color: '#ff3366', textColor: '#fff' },
          ],
          priceMin: 5,
          priceMax: 65,
          inStock: true,
          stockCount: 804,
          cryptoOnly: true,
        },
        {
          id: 'new2',
          name: 'SHADOW OPS',
          image: '/product_new2.jpg',
          variants: [
            { label: 'STEALTH', color: '#7c3aed', textColor: '#fff' },
          ],
          priceMin: 3,
          priceMax: 40,
          inStock: true,
          cryptoOnly: true,
        },
        {
          id: 'new3',
          name: 'MECH WARFARE',
          image: '/product_new3.jpg',
          variants: [
            { label: 'TITAN', color: '#f59e0b', textColor: '#000' },
            { label: 'MEGA', color: '#00d4ff', textColor: '#000' },
          ],
          priceMin: 6.5,
          priceMax: 46,
          inStock: true,
          cryptoOnly: true,
        },
      ]}
    />
  )
}

export function Reviews() {
  const headerRef = useRef<HTMLDivElement>(null)
  const reviews = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    stars: 5,
    text: 'Automatic feedback after 7 days.',
    date: 'Apr 23, 2026',
    verified: true,
  }))

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
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={headerRef} className="text-center mb-12">
          <p className="font-inter font-medium text-xs uppercase tracking-[0.2em] text-cyan mb-3">
            TESTIMONIALS
          </p>
          <TextScramble
            as="h2"
            className="font-rajdhani font-bold gradient-text uppercase tracking-[0.05em] block"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            trigger="inview"
            duration={1200}
          >
            OUR REVIEWS
          </TextScramble>
          <p className="font-inter text-base max-w-[600px] mx-auto mt-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            See why gamers choose Fecurity for top-tier cheats. Read customer
            reviews on our powerful features, instant delivery, secure payments,
            and 24/7 support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

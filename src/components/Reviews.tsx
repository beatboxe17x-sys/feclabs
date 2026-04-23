import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from './TiltCard'
import { Star, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reviews = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  stars: 5,
  text: 'Automatic feedback after 7 days.',
  date: 'Apr 23, 2026',
  verified: true,
}))

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
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
        <div className="group relative bg-[#0a0a12] border border-[#1a1a2e] rounded-2xl p-5 hover:border-cyan/30 hover:shadow-card-hover transition-all duration-500 h-full flex flex-col">
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
                  <CheckCircle size={10} className="text-green-500" />
                  <span className="font-inter font-medium text-[10px] uppercase text-green-500">
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

export default function Reviews() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
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
          <h2 className="font-rajdhani font-bold uppercase tracking-wider text-white mb-2"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', textShadow: '0 0 40px rgba(0,212,255,0.3)' }}>
            OUR REVIEWS
          </h2>
          <p className="font-inter text-base max-w-[600px] mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            See why gamers choose Fecurity for top-tier cheats. Read customer reviews on our powerful features, instant delivery, secure payments, and 24/7 support.
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

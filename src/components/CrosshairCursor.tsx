import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export default function CrosshairCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (isHome) {
      document.body.classList.add('has-crosshair')
    } else {
      document.body.classList.remove('has-crosshair')
    }
    return () => { document.body.classList.remove('has-crosshair') }
  }, [isHome])

  useEffect(() => {
    if (!isHome) return
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isHome])

  if (!isHome) return null

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[99999]" style={{ willChange: 'transform' }}>
        <div className="absolute w-px bg-cyan/60" style={{ height: '12px', left: '-0.5px', top: '-18px' }} />
        <div className="absolute w-px bg-cyan/60" style={{ height: '12px', left: '-0.5px', top: '6px' }} />
        <div className="absolute h-px bg-cyan/60" style={{ width: '12px', left: '-18px', top: '-0.5px' }} />
        <div className="absolute h-px bg-cyan/60" style={{ width: '12px', left: '6px', top: '-0.5px' }} />
        <div className="absolute w-1 h-1 rounded-full bg-cyan/80" style={{ left: '-2px', top: '-2px' }} />
      </div>
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[99998]" style={{ willChange: 'transform', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0, 212, 255, 0.4)', marginLeft: '-2px', marginTop: '-2px', boxShadow: '0 0 6px rgba(0, 212, 255, 0.3)' }} />
    </>
  )
}

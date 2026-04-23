import { useEffect, useRef } from 'react'

export default function WatermarkOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const warningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      showWarning()
    }

    // Disable drag on images
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault()
      }
    }

    // Detect print screen / screenshot attempts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Print Screen
      if (e.key === 'PrintScreen' || e.key === 'Snapshot') {
        e.preventDefault()
        showWarning()
        // Blank the screen briefly
        if (overlayRef.current) {
          overlayRef.current.style.background = 'white'
          setTimeout(() => {
            if (overlayRef.current) overlayRef.current.style.background = 'transparent'
          }, 500)
        }
      }
      // Ctrl+S, Ctrl+P
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
        e.preventDefault()
        showWarning()
      }
      // F12 dev tools
      if (e.key === 'F12') {
        showWarning()
      }
    }

    // Disable text selection on images
    const handleSelectStart = (e: Event) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault()
      }
    }

    const showWarning = () => {
      if (warningRef.current) {
        warningRef.current.style.opacity = '1'
        warningRef.current.style.transform = 'translateY(0)'
        setTimeout(() => {
          if (warningRef.current) {
            warningRef.current.style.opacity = '0'
            warningRef.current.style.transform = 'translateY(-10px)'
          }
        }, 2500)
      }
    }

    // Disable developer tools shortcuts more aggressively
    const handleDevTools = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault()
        showWarning()
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keydown', handleDevTools)
    document.addEventListener('selectstart', handleSelectStart)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', handleDevTools)
      document.removeEventListener('selectstart', handleSelectStart)
    }
  }, [])

  // Periodically check if watermark was removed via dev tools
  useEffect(() => {
    const interval = setInterval(() => {
      const wm = document.getElementById('fecurity-watermark')
      if (!wm) {
        // Watermark was removed - show full-screen block
        const block = document.createElement('div')
        block.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#000;display:flex;align-items:center;justify-content:center;'
        block.innerHTML = '<div style="text-align:center"><p style="color:#00d4ff;font-family:monospace;font-size:14px">SECURITY VIOLATION DETECTED</p><p style="color:#fff;font-family:monospace;font-size:11px;margin-top:8px;opacity:0.5">Watermark tampering detected. Reload to continue.</p></div>'
        document.body.appendChild(block)
        clearInterval(interval)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Main watermark grid - repeating diagonal pattern */}
      <div
        id="fecurity-watermark"
        ref={overlayRef}
        className="fixed inset-0 z-[9990] pointer-events-none"
        style={{
          background: 'transparent',
        }}
      >
        {/* Diagonal repeating watermarks */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' font-weight='bold' fill='%2300d4ff' transform='rotate(-35 200 200)' opacity='0.6'%3EFECURITY LAB — PREVIEW ONLY — DO NOT COPY%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px',
          }}
        />

        {/* Center watermark - larger, more visible */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="text-center opacity-[0.04]"
            style={{
              transform: 'rotate(-15deg)',
            }}
          >
            <p className="font-rajdhani font-bold text-[80px] uppercase tracking-[0.3em] text-cyan whitespace-nowrap"
              style={{ textShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
              PREVIEW ONLY
            </p>
            <p className="font-mono text-lg uppercase tracking-[0.5em] text-white/40 mt-2">
              PROPERTY OF FECURITY LAB
            </p>
          </div>
        </div>

        {/* Corner watermark badges */}
        <div className="absolute top-20 left-4 opacity-[0.06]">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="w-6 h-6 opacity-50" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">Preview</span>
          </div>
        </div>
        <div className="absolute top-20 right-4 opacity-[0.06]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">Confidential</span>
            <img src="/logo.png" alt="" className="w-6 h-6 opacity-50" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 opacity-[0.06]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">&copy; 2026 Fecurity Lab</span>
        </div>
        <div className="absolute bottom-4 right-4 opacity-[0.06]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">Not for redistribution</span>
        </div>

        {/* Scan line effect on watermark */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.1) 2px, rgba(0,212,255,0.1) 4px)',
          }}
        />
      </div>

      {/* Warning toast */}
      <div
        ref={warningRef}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-[99999] px-6 py-3 rounded-xl border border-cyan/30 bg-[#0a0a12]/95 backdrop-blur-xl transition-all duration-300 opacity-0"
        style={{ transform: 'translateX(-50%) translateY(-10px)' }}
      >
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="w-5 h-5" />
          <span className="font-mono text-xs text-cyan uppercase tracking-wider">
            Action disabled — Preview mode active
          </span>
        </div>
      </div>
    </>
  )
}

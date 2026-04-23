import { useEffect, useState } from 'react'
import AnimatedLogo from './AnimatedLogo'

const bootLines = [
  '> INITIALIZING FECURITY LAB KERNEL...',
  '> LOADING NEURAL NETWORK MODULES...',
  '> MOUNTING CHEAT DATABASE... [OK]',
  '> ESTABLISHING SECURE CONNECTION...',
  '> BYPASSING ANTI-CHEAT PROTOCOLS...',
  '> CALIBRATING AIMBOT VECTORS...',
  '> OPTIMIZING ESP RENDER PIPELINE...',
  '> SYSTEM READY. WELCOME, OPERATIVE.',
]

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current++
      setVisibleLines(current)
      setProgress(Math.min((current / bootLines.length) * 100, 100))
      if (current >= bootLines.length) {
        clearInterval(interval)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 800)
        }, 400)
      }
    }, 180)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#050508] flex flex-col items-center justify-center transition-all duration-700 ${
        done ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Animated Logo */}
      <div className="mb-6">
        <AnimatedLogo size={56} />
      </div>

      <div className="w-full max-w-[500px] mx-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#11111a] rounded-t-lg border border-[#1a1a2e] border-b-0">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-amber/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-2 font-inter text-[10px] uppercase tracking-wider text-white/30">fecurity_boot.exe</span>
        </div>
        <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-b-lg p-4 font-mono text-xs min-h-[200px]">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <p key={i} className="mb-1" style={{ color: i === bootLines.length - 1 ? '#00d4ff' : 'rgba(255,255,255,0.5)' }}>
              <span className="text-cyan mr-2">{'>'}</span>
              {line.replace('> ', '')}
            </p>
          ))}
          {visibleLines < bootLines.length && (
            <span className="inline-block w-2 h-4 bg-cyan animate-pulse ml-4" />
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-inter uppercase tracking-wider text-white/30 mb-1">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan to-violet transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

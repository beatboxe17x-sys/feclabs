import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Crosshair, Eye, Shield, Zap, Lock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function MiniToggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center gap-3 w-full py-2 group"
    >
      <div
        className="relative w-8 h-4 rounded-full transition-all duration-300"
        style={{ background: value ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)' }}
      >
        <div
          className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300"
          style={{
            left: value ? '18px' : '2px',
            background: value ? '#00d4ff' : 'rgba(255,255,255,0.2)',
            boxShadow: value ? '0 0 8px rgba(0,212,255,0.5)' : 'none',
          }}
        />
      </div>
      <span className={`font-mono text-xs uppercase tracking-wider transition-colors ${value ? 'text-cyan' : 'text-white/40'}`}>
        {label}
      </span>
    </button>
  )
}

export default function SimpleCheatMenu() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [aimbot, setAimbot] = useState(true)
  const [esp, setEsp] = useState(true)
  const [noRecoil, setNoRecoil] = useState(false)
  const [radar, setRadar] = useState(true)
  const [wallhack, setWallhack] = useState(false)

  // Floating animation
  useEffect(() => {
    if (!menuRef.current) return
    const floatTl = gsap.to(menuRef.current, {
      y: -8,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    return () => { floatTl.kill() }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      }
    )
  }, [])

  return (
    <section id="cheatmenu" className="relative py-20 md:py-28">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={sectionRef} className="text-center mb-12">
          <p className="font-inter font-medium text-xs uppercase tracking-[0.2em] text-cyan mb-3">
            QUICK ACCESS PANEL
          </p>
          <h2 className="font-rajdhani font-bold uppercase tracking-wider text-white mb-2"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', textShadow: '0 0 40px rgba(0,212,255,0.3)' }}>
            CHEAT MENU
          </h2>
          <div className="mt-3 h-px w-full max-w-[400px] mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
          />
        </div>

        {/* Floating Menu Panel */}
        <div className="flex justify-center">
          <div
            ref={menuRef}
            className="relative w-full max-w-[700px]"
            style={{
              background: 'linear-gradient(145deg, rgba(10,10,18,0.95), rgba(8,8,14,0.98))',
              borderRadius: '16px',
              border: '1px solid rgba(0,212,255,0.15)',
              boxShadow: '0 0 40px rgba(0,212,255,0.08), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#1a1a2e]">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Fecurity" className="w-6 h-6" />
                <span className="font-mono text-xs text-white/40">FECURITY v3.2</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[10px] text-green-400/60">ACTIVE</span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-3">
                  <Crosshair size={14} className="text-cyan" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Combat</span>
                </div>
                <MiniToggle value={aimbot} onChange={setAimbot} label="Aimbot" />
                <MiniToggle value={noRecoil} onChange={setNoRecoil} label="No Recoil" />
                <MiniToggle value={wallhack} onChange={setWallhack} label="Wallhack" />

                <div className="flex items-center gap-2 mt-5 mb-3">
                  <Eye size={14} className="text-violet" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Visual</span>
                </div>
                <MiniToggle value={esp} onChange={setEsp} label="Player ESP" />
                <MiniToggle value={radar} onChange={setRadar} label="Radar Hack" />
              </div>

              {/* Right column - Status */}
              <div className="bg-[#06060c] rounded-xl p-4 border border-[#1a1a2e]">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={14} className="text-magenta" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Status</span>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: <Crosshair size={12} />, label: 'Aimbot Engine', status: 'ONLINE', color: '#00d4ff' },
                    { icon: <Eye size={12} />, label: 'ESP Renderer', status: 'ONLINE', color: '#7c3aed' },
                    { icon: <Zap size={12} />, label: 'Bypass Module', status: 'ACTIVE', color: '#10b981' },
                    { icon: <Lock size={12} />, label: 'HWID Spoofer', status: 'RUNNING', color: '#f59e0b' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ color: `${item.color}80` }}>{item.icon}</span>
                        <span className="font-mono text-xs text-white/50">{item.label}</span>
                      </div>
                      <span className="font-mono text-[10px]" style={{ color: item.color }}>{item.status}</span>
                    </div>
                  ))}
                </div>

                {/* Mini progress bars */}
                <div className="mt-5 space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-[10px] text-white/30">CPU</span>
                      <span className="font-mono text-[10px] text-cyan/60">12%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan/40 rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-[10px] text-white/30">MEM</span>
                      <span className="font-mono text-[10px] text-violet/60">8%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-violet/40 rounded-full" style={{ width: '8%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

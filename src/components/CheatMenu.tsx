import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Crosshair, Eye, Settings, Palette, Terminal } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ToggleProps {
  value: boolean
  onChange: (v: boolean) => void
  color?: string
}

function Toggle({ value, onChange, color = '#00d4ff' }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-10 h-5 rounded-full transition-all duration-300"
      style={{ background: value ? `${color}40` : 'rgba(255,255,255,0.08)' }}
    >
      <div
        className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 shadow-lg"
        style={{
          left: value ? '22px' : '2px',
          background: value ? color : 'rgba(255,255,255,0.2)',
          boxShadow: value ? `0 0 8px ${color}80` : 'none',
        }}
      />
    </button>
  )
}

interface SliderProps {
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  color?: string
}

function Slider({ value, min, max, onChange, color = '#00d4ff' }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1 h-1 bg-white/10 rounded-full cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const pct = (e.clientX - rect.left) / rect.width
          onChange(min + pct * (max - min))
        }}
      >
        <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-150"
          style={{ width: `${pct}%`, background: color }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full cursor-grab active:cursor-grabbing transition-all duration-150 group-hover:scale-125"
          style={{
            left: `calc(${pct}% - 6px)`,
            background: color,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
      <span className="font-mono text-xs text-cyan/70 w-16 text-right">{value.toFixed(2)}</span>
    </div>
  )
}

interface KeybindProps {
  label: string
  keys: string[]
}

function Keybind({ label, keys }: KeybindProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="font-mono text-xs text-white/40">{label}</span>
      <div className="flex gap-1">
        {keys.map((k, i) => (
          <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/60">
            {k}
          </span>
        ))}
      </div>
    </div>
  )
}

const tabs = [
  { id: 'aimbot', label: 'AIMBOT', icon: <Crosshair size={18} /> },
  { id: 'visuals', label: 'VISUALS', icon: <Eye size={18} /> },
  { id: 'misc', label: 'MISC', icon: <Settings size={18} /> },
  { id: 'colors', label: 'COLORS', icon: <Palette size={18} /> },
  { id: 'terminal', label: 'TERMINAL', icon: <Terminal size={18} /> },
]

export default function CheatMenu() {
  const [activeTab, setActiveTab] = useState('aimbot')
  const sectionRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // State for all toggles and sliders
  const [aimbotEnabled, setAimbotEnabled] = useState(true)
  const [visibleOnly, setVisibleOnly] = useState(false)
  const [enemyOnly, setEnemyOnly] = useState(true)
  const [recoilComp, setRecoilComp] = useState(true)
  const [drawFov, setDrawFov] = useState(false)
  const [fov, setFov] = useState(8.96)
  const [switchDelay, setSwitchDelay] = useState(300)
  const [vertSpeed, setVertSpeed] = useState(20.9)
  const [horizSpeed, setHorizSpeed] = useState(19.3)

  const [visualsEnabled, setVisualsEnabled] = useState(true)
  const [enemyVisOnly, setEnemyVisOnly] = useState(true)
  const [drawBox, setDrawBox] = useState(true)
  const [drawHealth, setDrawHealth] = useState(true)
  const [drawSkeleton, setDrawSkeleton] = useState(true)
  const [skeletonThick, setSkeletonThick] = useState(1.31)
  const [maxDist, setMaxDist] = useState(351)
  const [cornerDist, setCornerDist] = useState(3)

  const [noSpread, setNoSpread] = useState(true)
  const [noRecoil, setNoRecoil] = useState(true)
  const [instantHit, setInstantHit] = useState(false)
  const [vSync, setVSync] = useState(false)
  const [frameLimit, setFrameLimit] = useState(144)
  const [devMode, setDevMode] = useState(false)
  const [invisOpacity, setInvisOpacity] = useState(0.5)

  const [terminalText, setTerminalText] = useState('')

  // Typewriter effect for terminal
  useEffect(() => {
    if (activeTab !== 'terminal') return
    const lines = [
      '> fecurity_lab_v3.2.1 loaded',
      '> kernel_driver: attached',
      '> hwid_spoofer: active',
      '> bypass_module: initialized',
      '> memory_scanner: running...',
      '> 0 threats detected',
      '> aimbot_engine: calibrated',
      '> esp_renderer: online',
      '> net_encryption: established',
      '> system_status: OPERATIONAL',
      '> ready for deployment.',
    ]
    let lineIdx = 0
    let charIdx = 0
    let output = ''
    const interval = setInterval(() => {
      if (lineIdx >= lines.length) {
        clearInterval(interval)
        return
      }
      if (charIdx === 0 && lineIdx > 0) output += '\n'
      output += lines[lineIdx][charIdx]
      charIdx++
      if (charIdx >= lines[lineIdx].length) {
        lineIdx++
        charIdx = 0
      }
      setTerminalText(output)
    }, 25)
    return () => clearInterval(interval)
  }, [activeTab])

  // 3D tilt effect on the entire menu
  useEffect(() => {
    if (!menuRef.current) return
    const el = menuRef.current
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`
    }
    const handleMouseLeave = () => {
      el.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)'
    }
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

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

  const renderAimbot = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left panel - General */}
      <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">General</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-sm text-white/80">Aimbot Enabled</p><p className="font-mono text-[10px] text-white/30">Enables Aimbot</p></div>
            <Toggle value={aimbotEnabled} onChange={setAimbotEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-sm text-white/80">Visible Only</p><p className="font-mono text-[10px] text-white/30">Aim at visible only points</p></div>
            <Toggle value={visibleOnly} onChange={setVisibleOnly} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-sm text-white/80">Enemy Only</p><p className="font-mono text-[10px] text-white/30">Aim at enemies only</p></div>
            <Toggle value={enemyOnly} onChange={setEnemyOnly} />
          </div>
          <div className="pt-2"><p className="font-mono text-xs text-white/40 mb-2">Vertical Degree/Sec <span className="text-cyan/60 ml-2">{vertSpeed.toFixed(1)} DEG</span></p><Slider value={vertSpeed} min={0} max={50} onChange={setVertSpeed} /></div>
          <div><p className="font-mono text-xs text-white/40 mb-2">Horizontal Degree/Sec <span className="text-cyan/60 ml-2">{horizSpeed.toFixed(1)} DEG</span></p><Slider value={horizSpeed} min={0} max={50} onChange={setHorizSpeed} /></div>
          <div className="flex items-center justify-between pt-1">
            <div><p className="font-mono text-sm text-white/80">Recoil Compensation</p></div>
            <Toggle value={recoilComp} onChange={setRecoilComp} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-sm text-white/80">Draw FOV</p><p className="font-mono text-[10px] text-white/30">Drawing Aimbot Target Zone</p></div>
            <Toggle value={drawFov} onChange={setDrawFov} />
          </div>
        </div>
      </div>

      {/* Center panel - Select & Binds */}
      <div className="space-y-5">
        <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
          <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">Select</h4>
          <div className="space-y-3">
            <div><p className="font-mono text-xs text-white/40 mb-1">FOV</p><Slider value={fov} min={1} max={30} onChange={setFov} /></div>
            <div><p className="font-mono text-xs text-white/40 mb-1">Target Switch Delay <span className="text-cyan/60 ml-1">{Math.round(switchDelay)} MS</span></p><Slider value={switchDelay} min={0} max={1000} onChange={setSwitchDelay} /></div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-xs text-white/40">Nearest Coefficient</span>
              <span className="font-mono text-xs text-cyan/60">x0.00</span>
            </div>
          </div>
        </div>
        <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
          <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-3">Binds</h4>
          <Keybind label="Hitbox Priority" keys={['Shift']} />
          <Keybind label="Aim Key (Hold)" keys={['Control']} />
          <Keybind label="Second Aim Key" keys={['M1']} />
          <Keybind label="Toggle Key" keys={['Tab']} />
        </div>
      </div>

      {/* Right panel - Hitbox */}
      <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">Hitscan Hitbox Priority</h4>
        <div className="flex flex-col items-center">
          {/* Simplified hitbox body */}
          <div className="relative w-32 h-48 mx-auto">
            <svg viewBox="0 0 100 180" className="w-full h-full">
              {/* Head */}
              <circle cx="50" cy="20" r="12" fill="none" stroke="#ff3366" strokeWidth="1.5" opacity="0.8" />
              {/* Neck */}
              <line x1="50" y1="32" x2="50" y2="40" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
              {/* Torso */}
              <rect x="35" y="40" width="30" height="45" rx="4" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.6" />
              {/* Arms */}
              <line x1="35" y1="48" x2="15" y2="75" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
              <line x1="65" y1="48" x2="85" y2="75" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
              <line x1="15" y1="75" x2="10" y2="100" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
              <line x1="85" y1="75" x2="90" y2="100" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
              {/* Legs */}
              <line x1="42" y1="85" x2="35" y2="130" stroke="#7c3aed" strokeWidth="1.5" opacity="0.5" />
              <line x1="58" y1="85" x2="65" y2="130" stroke="#7c3aed" strokeWidth="1.5" opacity="0.5" />
              <line x1="35" y1="130" x2="30" y2="170" stroke="#7c3aed" strokeWidth="1.5" opacity="0.5" />
              <line x1="65" y1="130" x2="70" y2="170" stroke="#7c3aed" strokeWidth="1.5" opacity="0.5" />
            </svg>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {[
              { label: 'Head', color: '#ff3366' },
              { label: 'Neck', color: '#00d4ff' },
              { label: 'Torso', color: '#00d4ff' },
              { label: 'Arms', color: '#f59e0b' },
              { label: 'Legs', color: '#7c3aed' },
            ].map((h) => (
              <div key={h.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: h.color }} />
                <span className="font-mono text-[10px]" style={{ color: `${h.color}99` }}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderVisuals = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">General</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">Enabled</p><p className="font-mono text-[10px] text-white/30">Visuals Enabled</p></div><Toggle value={visualsEnabled} onChange={setVisualsEnabled} /></div>
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">Enemy only</p><p className="font-mono text-[10px] text-white/30">Display enemies only</p></div><Toggle value={enemyVisOnly} onChange={setEnemyVisOnly} /></div>
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">Box</p><p className="font-mono text-[10px] text-white/30">Draw player box</p></div><Toggle value={drawBox} onChange={setDrawBox} /></div>
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">Health</p><p className="font-mono text-[10px] text-white/30">Draw health bar</p></div><Toggle value={drawHealth} onChange={setDrawHealth} /></div>
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">Skeleton</p><p className="font-mono text-[10px] text-white/30">Draw skeleton</p></div><Toggle value={drawSkeleton} onChange={setDrawSkeleton} /></div>
        </div>
      </div>
      <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">Players</h4>
        <div className="space-y-4">
          <div><p className="font-mono text-xs text-white/40 mb-1">Skeleton Thickness <span className="text-cyan/60 ml-1">{skeletonThick.toFixed(2)} PPI</span></p><Slider value={skeletonThick} min={0.1} max={5} onChange={setSkeletonThick} /></div>
          <div><p className="font-mono text-xs text-white/40 mb-1">Maximum Distance <span className="text-cyan/60 ml-1">{Math.round(maxDist)} Feet</span></p><Slider value={maxDist} min={10} max={1000} onChange={setMaxDist} /></div>
          <div><p className="font-mono text-xs text-white/40 mb-1">Corner Distance <span className="text-cyan/60 ml-1">{cornerDist.toFixed(0)} Feet</span></p><Slider value={cornerDist} min={0} max={20} onChange={setCornerDist} /></div>
        </div>
      </div>
      <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">Preview</h4>
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <div className="relative">
            <div className="w-20 h-24 border-2 border-cyan/40 rounded-sm relative">
              <div className="absolute -top-4 left-0 right-0 h-3 bg-green-500/60 rounded-sm" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan/30 font-mono text-[10px]">ESP BOX</div>
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyan/20" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-cyan/20" />
            </div>
            <p className="text-center font-mono text-[10px] text-white/20 mt-2">Player ESP Preview</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMisc = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">Misc</h4>
        <div className="space-y-4">
          <div><p className="font-mono text-xs text-white/40 mb-1">Invisible Opacity <span className="text-cyan/60 ml-1">{invisOpacity.toFixed(2)}</span></p><Slider value={invisOpacity} min={0} max={1} onChange={setInvisOpacity} /></div>
          <div className="pt-2"><p className="font-mono text-xs text-white/30 mb-1">EXPIRED IN:</p><p className="font-mono text-sm text-green-400">6 DAYS 5 HOURS 20 MINS 10 SECS</p></div>
        </div>
      </div>
      <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">Exploits</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">No Spread</p><p className="font-mono text-[10px] text-white/30">Remove Dispersion</p></div><Toggle value={noSpread} onChange={setNoSpread} color="#ff3366" /></div>
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">No Recoil</p><p className="font-mono text-[10px] text-white/30">Remove Recoil</p></div><Toggle value={noRecoil} onChange={setNoRecoil} color="#ff3366" /></div>
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">Instant Hit</p></div><Toggle value={instantHit} onChange={setInstantHit} color="#ff3366" /></div>
        </div>
      </div>
      <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">Engine</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between"><div><p className="font-mono text-sm text-white/80">V-Sync</p></div><Toggle value={vSync} onChange={setVSync} /></div>
          <div><p className="font-mono text-xs text-white/40 mb-1">Frame Limit <span className="text-cyan/60 ml-1">{Math.round(frameLimit)} FPS</span></p><Slider value={frameLimit} min={30} max={240} onChange={setFrameLimit} /></div>
          <div className="flex items-center justify-between pt-1"><div><p className="font-mono text-sm text-white/80">Developer Mode</p><p className="font-mono text-[10px] text-white/30">Enable Dev Features</p></div><Toggle value={devMode} onChange={setDevMode} color="#f59e0b" /></div>
          <div className="pt-2 space-y-2">
            {['FORCE RELOAD', 'DISABLE ANTICHEAT', 'FORCE DUMP'].map((btn) => (
              <button key={btn} className="w-full py-2 bg-red-500/10 border border-red-500/30 rounded font-mono text-xs text-red-400/60 tracking-wider hover:bg-red-500/20 transition-colors">
                {btn}
              </button>
            ))}
          </div>
          <Keybind label="Menu Key (Toggle)" keys={['Delete']} />
          <div><p className="font-mono text-xs text-white/40 mb-1">DPI <span className="text-cyan/60 ml-1">133 Inch</span></p><Slider value={133} min={50} max={800} onChange={() => {}} /></div>
        </div>
      </div>
    </div>
  )

  const renderColors = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Visible Box', color: '#00ff88' },
        { label: 'Invisible Box', color: '#ff4444' },
        { label: 'Skeleton', color: '#00d4ff' },
        { label: 'Health High', color: '#00ff88' },
        { label: 'Health Mid', color: '#f59e0b' },
        { label: 'Health Low', color: '#ff3366' },
        { label: 'FOV Circle', color: '#00d4ff' },
        { label: 'Crosshair', color: '#ffffff' },
        { label: 'Text Info', color: '#ffffff' },
        { label: 'Snap Lines', color: '#7c3aed' },
        { label: 'Head Dot', color: '#ff3366' },
        { label: 'Chams', color: '#00d4ff' },
      ].map((item) => (
        <div key={item.label} className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-4 flex items-center gap-3 hover:border-white/10 transition-colors cursor-pointer group">
          <div className="w-6 h-6 rounded border-2 group-hover:scale-110 transition-transform" style={{ background: `${item.color}30`, borderColor: item.color }} />
          <span className="font-mono text-xs text-white/50">{item.label}</span>
        </div>
      ))}
    </div>
  )

  const renderTerminal = () => (
    <div className="bg-[#0c0c14] border border-[#1a1a2e] rounded-xl p-5 font-mono text-xs min-h-[400px]">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a1a2e]">
        <div className="w-3 h-3 rounded-full bg-red-500/40" />
        <div className="w-3 h-3 rounded-full bg-amber/40" />
        <div className="w-3 h-3 rounded-full bg-green-500/40" />
        <span className="text-white/20 text-[10px] ml-2">fecurity_kernel.exe</span>
      </div>
      <pre className="text-white/50 leading-6 whitespace-pre-wrap">
        {terminalText}
        <span className="inline-block w-2 h-4 bg-cyan/60 animate-pulse ml-1 align-middle" />
      </pre>
    </div>
  )

  return (
    <section id="cheatmenu" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-inter font-medium text-xs uppercase tracking-[0.2em] text-cyan mb-3">
            INTERACTIVE DEMONSTRATION
          </p>
          <h2 className="font-rajdhani font-bold text-4xl md:text-6xl uppercase tracking-wider text-white mb-2"
            style={{ textShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}>
            CHEAT MENU
          </h2>
          <div className="mt-3 h-px w-full max-w-[500px] mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
          />
        </div>

        {/* 3D Interactive Menu */}
        <div
          ref={menuRef}
          className="transition-transform duration-200 ease-out"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {/* Menu Container */}
          <div className="bg-[#08080f] border border-[#1a1a2e] rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 0 60px rgba(0, 212, 255, 0.08), inset 0 0 60px rgba(0, 0, 0, 0.5)' }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#0c0c14] border-b border-[#1a1a2e]">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Fecurity" className="w-7 h-7" />
                <span className="font-mono text-xs text-white/40">FECURITY LAB v3.2.1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[10px] text-green-400/60">ONLINE</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Sidebar tabs */}
              <div className="flex lg:flex-col bg-[#0a0a12] border-r border-[#1a1a2e] overflow-x-auto lg:overflow-x-visible">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-5 py-4 font-mono text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap border-b lg:border-b-0 lg:border-r-2 ${
                      activeTab === tab.id
                        ? 'text-cyan bg-cyan/5 border-cyan'
                        : 'text-white/30 border-transparent hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden lg:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content area */}
              <div className="flex-1 p-5 lg:p-6 overflow-auto">
                {activeTab === 'aimbot' && renderAimbot()}
                {activeTab === 'visuals' && renderVisuals()}
                {activeTab === 'misc' && renderMisc()}
                {activeTab === 'colors' && renderColors()}
                {activeTab === 'terminal' && renderTerminal()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

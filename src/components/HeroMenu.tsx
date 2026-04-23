import { useState } from 'react'
import { Crosshair, Eye, Settings, Palette, Terminal } from 'lucide-react'

const tabs = [
  { id: 'aim', label: 'AIMBOT', icon: <Crosshair size={12} /> },
  { id: 'vis', label: 'VISUALS', icon: <Eye size={12} /> },
  { id: 'misc', label: 'MISC', icon: <Settings size={12} /> },
  { id: 'col', label: 'COLORS', icon: <Palette size={12} /> },
  { id: 'term', label: 'TERM', icon: <Terminal size={12} /> },
]

function MiniToggle({ value, label }: { value: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="relative w-6 h-3 rounded-full" style={{ background: value ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)' }}>
        <div className="absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all" style={{ left: value ? '13px' : '2px', background: value ? '#00d4ff' : 'rgba(255,255,255,0.2)', boxShadow: value ? '0 0 6px rgba(0,212,255,0.5)' : 'none' }} />
      </div>
      <span className={`font-mono text-[10px] uppercase ${value ? 'text-cyan' : 'text-white/30'}`}>{label}</span>
    </div>
  )
}

export default function HeroMenu() {
  const [activeTab, setActiveTab] = useState('aim')

  return (
    <div className="w-full max-w-[340px] mx-auto"
      style={{
        background: 'linear-gradient(145deg, rgba(8,8,14,0.98), rgba(5,5,10,0.99))',
        borderRadius: '12px',
        border: '1px solid rgba(0,212,255,0.12)',
        boxShadow: '0 0 30px rgba(0,212,255,0.06), 0 10px 40px rgba(0,0,0,0.6)',
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a2e]">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Fecurity" className="w-4 h-4" />
          <span className="font-mono text-[9px] text-white/30">FECURITY v3.2</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[9px] text-green-400/60">ON</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1a1a2e] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 px-2.5 py-2 font-mono text-[9px] uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id ? 'text-cyan border-cyan bg-cyan/5' : 'text-white/25 border-transparent hover:text-white/50'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-3 min-h-[200px]">
        {activeTab === 'aim' && (
          <div className="space-y-1">
            <p className="font-mono text-[9px] text-white/20 uppercase mb-2">General</p>
            <MiniToggle value={true} label="Aimbot" />
            <MiniToggle value={false} label="Visible Only" />
            <MiniToggle value={true} label="Enemy Only" />
            <MiniToggle value={true} label="Recoil Comp" />
            <MiniToggle value={false} label="Draw FOV" />
            <div className="pt-2"><p className="font-mono text-[9px] text-white/20 mb-1">FOV <span className="text-cyan/50 ml-1">8.96</span></p><div className="h-1 bg-white/5 rounded-full"><div className="h-full bg-cyan/30 rounded-full" style={{ width: '35%' }} /></div></div>
            <div><p className="font-mono text-[9px] text-white/20 mb-1">Switch Delay <span className="text-cyan/50 ml-1">300ms</span></p><div className="h-1 bg-white/5 rounded-full"><div className="h-full bg-cyan/30 rounded-full" style={{ width: '30%' }} /></div></div>
          </div>
        )}
        {activeTab === 'vis' && (
          <div className="space-y-1">
            <p className="font-mono text-[9px] text-white/20 uppercase mb-2">Visuals</p>
            <MiniToggle value={true} label="Enabled" />
            <MiniToggle value={true} label="Enemy Only" />
            <MiniToggle value={true} label="Box ESP" />
            <MiniToggle value={true} label="Health Bar" />
            <MiniToggle value={true} label="Skeleton" />
            <MiniToggle value={false} label="Snap Lines" />
          </div>
        )}
        {activeTab === 'misc' && (
          <div className="space-y-1">
            <p className="font-mono text-[9px] text-white/20 uppercase mb-2">Exploits</p>
            <MiniToggle value={true} label="No Spread" />
            <MiniToggle value={true} label="No Recoil" />
            <MiniToggle value={false} label="Instant Hit" />
            <p className="font-mono text-[9px] text-white/20 uppercase mb-2 mt-3">Engine</p>
            <MiniToggle value={false} label="V-Sync" />
            <div><p className="font-mono text-[9px] text-white/20 mb-1">Frame Limit <span className="text-cyan/50 ml-1">144</span></p><div className="h-1 bg-white/5 rounded-full"><div className="h-full bg-violet/30 rounded-full" style={{ width: '60%' }} /></div></div>
          </div>
        )}
        {activeTab === 'col' && (
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: 'Vis Box', color: '#00ff88' },
              { label: 'Skel', color: '#00d4ff' },
              { label: 'Health', color: '#00ff88' },
              { label: 'FOV', color: '#00d4ff' },
              { label: 'Xhair', color: '#fff' },
              { label: 'Chams', color: '#7c3aed' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-1.5 py-1">
                <div className="w-2.5 h-2.5 rounded-sm border" style={{ background: `${c.color}40`, borderColor: c.color }} />
                <span className="font-mono text-[9px] text-white/30">{c.label}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'term' && (
          <div className="font-mono text-[9px] leading-5 text-white/40">
            <p><span className="text-cyan">{'>'}</span> kernel attached</p>
            <p><span className="text-cyan">{'>'}</span> hwid spoofer active</p>
            <p><span className="text-cyan">{'>'}</span> bypass initialized</p>
            <p><span className="text-cyan">{'>'}</span> 0 threats detected</p>
            <p><span className="text-cyan">{'>'}</span> aimbot calibrated</p>
            <p><span className="text-green-400">{'>'}</span> system operational</p>
            <span className="inline-block w-1.5 h-3 bg-cyan/60 animate-pulse ml-3 align-middle" />
          </div>
        )}
      </div>
    </div>
  )
}

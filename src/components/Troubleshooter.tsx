import { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, Search, ChevronDown, AlertTriangle, Cpu, ShieldAlert,
  Monitor, Lock, Boxes, ZapOff, Download, Fingerprint, Settings2,
  Unlock, MonitorCog, AlertOctagon, Gamepad2, EyeOff, Ban,
  Thermometer, List, Headphones, X, ExternalLink, CheckCircle2
} from 'lucide-react'
import { troubleshooterTopics } from '../data/troubleshooter'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={18} />, ShieldAlert: <ShieldAlert size={18} />, Monitor: <Monitor size={18} />,
  Lock: <Lock size={18} />, Boxes: <Boxes size={18} />, ZapOff: <ZapOff size={18} />,
  Download: <Download size={18} />, Fingerprint: <Fingerprint size={18} />, Settings2: <Settings2 size={18} />,
  Unlock: <Unlock size={18} />, MonitorCog: <MonitorCog size={18} />, AlertTriangle: <AlertTriangle size={18} />,
  Gamepad2: <Gamepad2 size={18} />, EyeOff: <EyeOff size={18} />, Ban: <Ban size={18} />,
  Thermometer: <Thermometer size={18} />, List: <List size={18} />, Headphones: <Headphones size={18} />,
  AlertOctagon: <AlertOctagon size={18} />,
}

const severityConfig = {
  critical: { color: '#ff3366', bg: 'rgba(255,51,102,0.08)', label: 'CRITICAL', icon: <AlertOctagon size={12} /> },
  warning: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', label: 'WARNING', icon: <AlertTriangle size={12} /> },
  info: { color: '#00d4ff', bg: 'rgba(0,212,255,0.08)', label: 'INFO', icon: <CheckCircle2 size={12} /> },
}

const categories = ['All', 'Launch Preparation', 'Getting Started', 'Advanced', 'Common Issues', 'Info', 'Reference']

function TopicCard({ topic, index }: { topic: typeof troubleshooterTopics[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const sev = severityConfig[topic.severity]

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(cardRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: index * 0.04,
      scrollTrigger: { trigger: cardRef.current, start: 'top 95%' }
    })
  }, [index])

  return (
    <div ref={cardRef} className="opacity-0">
      <div
        className="group relative bg-[#08080f] border border-[#1a1a2e] rounded-xl overflow-hidden hover:border-cyan/20 transition-all duration-300"
        style={{ boxShadow: expanded ? '0 0 30px rgba(0,212,255,0.06)' : 'none' }}
      >
        {/* Header - always visible */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-4 p-5 text-left"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
            style={{ background: sev.bg, color: sev.color }}
          >
            {iconMap[topic.icon]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: sev.bg, color: sev.color }}>
                {sev.label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/20">{topic.category}</span>
            </div>
            <h3 className="font-rajdhani font-bold text-sm uppercase tracking-wider text-white group-hover:text-cyan transition-colors">
              {topic.title}
            </h3>
            <p className="font-inter text-[11px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {topic.summary}
            </p>
          </div>
          <ChevronDown size={16} className={`text-white/20 shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expandable content */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${expanded ? 'max-h-[800px]' : 'max-h-0'}`}>
          <div className="px-5 pb-5 border-t border-[#1a1a2e] pt-4">
            <p className="font-inter text-xs leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {topic.summary}
            </p>

            {/* Steps */}
            <div className="space-y-3">
              {topic.steps.map((step, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-0.5 w-4 h-4 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                    <span className="font-mono text-[8px] text-cyan">{i + 1}</span>
                  </div>
                  {step.text && (
                    <p className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {step.text}
                    </p>
                  )}
                  {step.code && (
                    <pre className="mt-2 p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] leading-relaxed overflow-x-auto" style={{ color: 'rgba(0,212,255,0.7)' }}>
                      {step.code}
                    </pre>
                  )}
                  {step.warning && (
                    <div className="mt-2 p-3 rounded-lg bg-amber/5 border border-amber/20 flex items-start gap-2">
                      <AlertTriangle size={12} className="text-amber/60 shrink-0 mt-0.5" />
                      <p className="font-inter text-[11px] text-amber/60">{step.warning}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Links */}
            {topic.links && topic.links.length > 0 && (
              <div className="mt-5 flex gap-2">
                {topic.links.map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-cyan/25 text-cyan/70 font-inter text-xs hover:bg-cyan hover:text-black hover:border-cyan transition-all"
                  >
                    <ExternalLink size={11} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Troubleshooter() {
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(headerRef.current.children, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out'
    })
  }, [])

  const filtered = useMemo(() => {
    return troubleshooterTopics.filter((t) => {
      const matchesSearch = !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.summary.toLowerCase().includes(search.toLowerCase()) ||
        t.steps.some((s) => s.text?.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const criticalCount = troubleshooterTopics.filter((t) => t.severity === 'critical').length
  const warningCount = troubleshooterTopics.filter((t) => t.severity === 'warning').length

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.06]" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-8 pb-20">
        {/* Back + Header */}
        <div ref={headerRef}>
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/30 hover:text-cyan transition-colors mb-6">
            <ArrowLeft size={16} />
            <span className="font-inter text-sm">Back to Store</span>
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <img src="/logo.png" alt="Fecurity" className="w-10 h-10" style={{ filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.3))' }} />
              <div className="absolute inset-0 rounded-full border border-cyan/20 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h1 className="font-rajdhani font-bold text-3xl uppercase tracking-wider text-white" style={{ textShadow: '0 0 30px rgba(0,212,255,0.2)' }}>
                TROUBLESHOOTER
              </h1>
              <p className="font-mono text-[10px] text-cyan/40 uppercase tracking-wider">Interactive Support Tool</p>
            </div>
          </div>

          <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.3), rgba(124,58,237,0.2), transparent)' }} />

          {/* Stats */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/5 border border-red-500/10">
              <AlertOctagon size={12} className="text-red-400" />
              <span className="font-mono text-[10px] text-red-400/70 uppercase">{criticalCount} Critical</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/5 border border-amber-500/10">
              <AlertTriangle size={12} className="text-amber-400" />
              <span className="font-mono text-[10px] text-amber-400/70 uppercase">{warningCount} Warnings</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
              <CheckCircle2 size={12} className="text-cyan-400" />
              <span className="font-mono text-[10px] text-cyan-400/70 uppercase">{troubleshooterTopics.length} Total Topics</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/15" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for an issue (e.g., 'crashing', 'ban', 'defender')..."
            className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white/[0.03] border border-[#1a1a2e] text-white text-sm font-inter placeholder:text-white/15 focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/15 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/20 hover:text-white/50 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cyan/10 border border-cyan/30 text-cyan'
                  : 'bg-white/[0.02] border border-transparent text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/20">
            {filtered.length} topic{filtered.length !== 1 ? 's' : ''} found
          </p>
          <a
            href="https://fecuritydocs.gitbook.io/fecuritydocs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-inter text-[11px] text-cyan/50 hover:text-cyan transition-colors"
          >
            <ExternalLink size={11} />
            Full Documentation
          </a>
        </div>

        {/* Topic list */}
        <div className="space-y-3">
          {filtered.map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={32} className="text-white/10 mx-auto mb-3" />
            <p className="font-inter text-sm text-white/30">No topics found for &quot;{search}&quot;</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="font-inter text-xs text-cyan/50 hover:text-cyan mt-2 transition-colors">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

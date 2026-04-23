import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { ArrowLeft, ExternalLink, Lock, CheckCircle, Copy } from 'lucide-react'
import gsap from 'gsap'

const loaders = [
  { name: 'CALL OF DUTY', image: '/game_cod.jpg', url: 'https://mega.nz/folder/eENVwCQS#BcJG1yVFAeTHuCSM3TzmQg', desc: 'BO7, BO6, MWIII, MWII, VG, MW19 support' },
  { name: 'APEX LEGENDS', image: '/game_apex.jpg', url: 'https://mega.nz/folder/zc8hXK7Y#IIIbhuCLlHe4CGRIVbErSw', desc: 'Full battle royale support' },
  { name: 'DEAD BY DAYLIGHT', image: '/game_dbd.jpg', url: 'https://mega.nz/folder/SR9BBTAB#f3zC1q8hBFKYShxG3cjHug', desc: 'Survivor & killer features' },
  { name: 'PUBG BATTLEGROUNDS', image: '/game_pubg.jpg', url: 'https://mega.nz/folder/yc1lwRQQ#0zj_ONNkkfKeKk3Zra8gUA', desc: 'Battle royale enhancements' },
  { name: 'COUNTER-STRIKE 2', image: '/game_cs2.jpg', url: 'https://mega.nz/folder/PEMEBIwK#KEypUNa0YdFlpyxX_7psXg', desc: 'Competitive CS2 tools' },
  { name: 'ESCAPE FROM TARKOV', image: '/game_tarkov.jpg', url: 'https://mega.nz/folder/ORsFGQDT#nOKWTNSs97e42MbQhuIoSg', desc: 'EFT & Arena modes' },
  { name: 'FORTNITE', image: '/game_fortnite.jpg', url: 'https://mega.nz/folder/yRsWyI7b#YR0_Z6Xxl1HoI9Z22n62Nw', desc: 'Battle royale & creative' },
  { name: 'BATTLEFIELD 2042', image: '/game_battlefield.jpg', url: 'https://mega.nz/folder/iB9mUYQZ#SCkfK2WE2I917V-wKqZpiA', desc: 'BF2042, BF5, BF1, BF6' },
  { name: 'SQUAD', image: '/game_squad.jpg', url: 'https://mega.nz/folder/PRtRXIqQ#ABd9aptMP8XbOPnKT38rOQ', desc: 'Tactical military sim' },
  { name: 'DELTA FORCE', image: '/game_delta.jpg', url: 'https://mega.nz/folder/aFkSwDiQ#QpBfD_CxkjHFw4WNsnQifg', desc: 'Hawk Ops full support' },
  { name: 'THE FINALS', image: '/game_thefinals.jpg', url: 'https://mega.nz/folder/OY9zxJLa#qYn_AtWrMBPFdSYX3fjfWw', desc: 'Competitive arena shooter' },
  { name: 'DARK AND DARKER', image: '/game_darkdarker.jpg', url: 'https://mega.nz/folder/qMFTWRgA#Qj3LVSo8CFik1-xgDBUkzw', desc: 'Dungeon extraction' },
  { name: 'ARENA BREAKOUT', image: '/game_arenabreakout.jpg', url: 'https://mega.nz/folder/vQdBgBgY#8iq7gzDZCQZU6K6DmpINpA', desc: 'Infinite extraction' },
  { name: 'ROGUE COMPANY', image: '/game_rogue.jpg', url: 'https://mega.nz/folder/DN80DbbL#D_Rq_CYCTzwv5k-I74JhuA', desc: 'Hero shooter support' },
  { name: 'WAR THUNDER', image: '/game_warthunder.jpg', url: 'https://mega.nz/folder/DNtgRaTD#hdf6ZOa7qDEtJqKChtPNCQ', desc: 'Vehicle combat tools' },
  { name: 'UNTURNED', image: '/game_unturned.jpg', url: 'https://mega.nz/folder/rcMyFJJS#JtMQjJ_ULEtS5vycbL-4jQ', desc: 'Zombie survival' },
  { name: 'WORLD WAR 3', image: '/game_ww3.jpg', url: 'https://mega.nz/folder/rY9VSCBS#CbBHeuiHBvjPw0cKRTOWbA', desc: 'Modern warfare support' },
  { name: 'INSURGENCY: SANDSTORM', image: '/game_insurgency.jpg', url: 'https://mega.nz/folder/rVFB3DYL#BHnu0ccICJ5JJ3My1r0ocg', desc: 'Tactical shooter tools' },
  { name: 'DEADSIDE', image: '/game_deadside.jpg', url: 'https://mega.nz/folder/aZUCSarS#OeYQAABP7rdRNttqTX4Mog', desc: 'Open world survival' },
  { name: 'BATTLEBIT', image: '/game_battlebit.jpg', url: 'https://mega.nz/folder/nENWmTBA#ihE9LfVxKmhqToqieOUqAQ', desc: 'Low-poly warfare' },
  { name: 'GRAY ZONE WARFARE', image: '/game_grayzone.jpg', url: 'https://mega.nz/folder/HVUASR6K#auqMr1B8eStuSdiqsabdnA', desc: 'Open world extraction' },
  { name: 'ARC RAIDERS', image: '/game_arcraiders.jpg', url: 'https://mega.nz/folder/nRUWiKoI#RSfQ5Bh9oSBWpRhnvLxm7g', desc: 'Sci-fi extraction shooter' },
  { name: 'COD NEXT: RANKED', image: '/game_cod.jpg', url: 'https://mega.nz/folder/LIUjhIia#Jwi4ptmhnMc-Icv5hWB5uQ', desc: 'Advanced batch file loader' },
]

function LoaderCard({ loader, index }: { loader: typeof loaders[0]; index: number }) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
      delay: index * 0.06, scrollTrigger: { trigger: ref.current, start: 'top 95%' }
    })
  }, [index])

  const handleCopy = () => {
    navigator.clipboard.writeText(loader.url).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={ref} className="opacity-0 group">
      <div className="relative bg-[#08080f] border border-[#1a1a2e] rounded-xl overflow-hidden hover:border-cyan/25 transition-all duration-300 hover:-translate-y-1"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
      >
        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 40px rgba(0,212,255,0.06)' }}
        />

        <div className="flex items-center gap-4 p-4">
          <img src={loader.image} alt={loader.name} className="w-16 h-16 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform duration-300" />
          <div className="flex-1 min-w-0">
            <h3 className="font-rajdhani font-bold text-sm uppercase tracking-wider text-white group-hover:text-cyan transition-colors truncate">
              {loader.name}
            </h3>
            <p className="font-inter text-[11px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{loader.desc}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-white/30 hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all"
              title="Copy link"
            >
              {copied ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
            <a
              href={loader.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan hover:bg-cyan hover:text-black transition-all"
              title="Open in Mega"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoadersPage() {
  const { user, hasLoadersAccess } = useAuth()
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasLoadersAccess) {
      navigate('/')
      return
    }
    if (!headerRef.current) return
    gsap.fromTo(headerRef.current.children, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out'
    })
  }, [hasLoadersAccess, navigate])

  if (!hasLoadersAccess) return null

  return (
    <div className="min-h-screen bg-[#050508] custom-scrollbar">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15), transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-8">
        {/* Back + Header */}
        <div ref={headerRef} className="mb-10">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/30 hover:text-cyan transition-colors mb-6">
            <ArrowLeft size={16} />
            <span className="font-inter text-sm">Back to Store</span>
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <img src="/logo.png" alt="Fecurity" className="w-10 h-10" style={{ filter: 'drop-shadow(0 0 16px rgba(0,212,255,0.4))' }} />
              <div className="absolute inset-0 rounded-full border border-cyan/20 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h1 className="font-rajdhani font-bold text-3xl uppercase tracking-wider text-white" style={{ textShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
                LOADERS
              </h1>
              <p className="font-mono text-[10px] text-cyan/40 uppercase tracking-wider">Authorized Access // {user?.username}</p>
            </div>
          </div>

          <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.3), rgba(124,58,237,0.2), transparent)' }} />

          <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Your purchased loaders are available below. Click the external link button to open the Mega folder, or copy the link to share.
          </p>

          {/* Warning for COD NEXT */}
          <div className="mt-4 p-3 rounded-lg bg-amber/5 border border-amber/20 flex items-start gap-2">
            <Lock size={14} className="text-amber/60 shrink-0 mt-0.5" />
            <p className="font-inter text-[11px] text-amber/50">
              <span className="font-semibold text-amber/70">COD NEXT Ranked:</span> Do not download unless you know how to use batch files. Advanced users only.
            </p>
          </div>
        </div>

        {/* Loaders list */}
        <div className="space-y-3 pb-20">
          {loaders.map((loader, i) => (
            <LoaderCard key={loader.name} loader={loader} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

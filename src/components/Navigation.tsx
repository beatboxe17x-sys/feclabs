import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { ShoppingCart, Menu, X, Download, LogOut, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { totalItems, setIsOpen } = useCart()
  const { isAuthenticated, hasLoadersAccess, user, logout, setShowAuth } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(5,5,8,0.9)] backdrop-blur-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-[rgba(5,5,8,0.6)] backdrop-blur-[12px]'
        }`}
        style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.1)' }}
      >
        <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan via-violet to-magenta transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Fecurity" className="w-9 h-9 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.5)] transition-all duration-300" />
            <div className="flex items-center gap-2">
              <span className="font-rajdhani font-bold text-xl tracking-[0.15em] text-white">FECURITY</span>
              <span className="text-[10px] font-inter font-medium px-2 py-0.5 rounded" style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff' }}>LAB</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-7">
            <button onClick={() => scrollTo('products')} className="font-inter font-medium text-sm uppercase tracking-[0.08em] text-white/60 hover:text-cyan transition-colors">PRODUCTS</button>
            <button onClick={() => scrollTo('cheatmenu')} className="font-inter font-medium text-sm uppercase tracking-[0.08em] text-white/60 hover:text-cyan transition-colors">MENU</button>
            <button onClick={() => scrollTo('reviews')} className="font-inter font-medium text-sm uppercase tracking-[0.08em] text-white/60 hover:text-cyan transition-colors">REVIEWS</button>
            <button onClick={() => scrollTo('faq')} className="font-inter font-medium text-sm uppercase tracking-[0.08em] text-white/60 hover:text-cyan transition-colors">FAQ</button>
            {hasLoadersAccess && (
              <button onClick={() => navigate('/loaders')} className="font-inter font-medium text-sm uppercase tracking-[0.08em] text-cyan hover:text-white transition-colors flex items-center gap-1.5">
                <Download size={14} />
                LOADERS
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan/5 border border-cyan/15">
                  <User size={14} className="text-cyan/60" />
                  <span className="font-mono text-xs text-cyan/70">{user?.username}</span>
                </div>
                <button onClick={logout} className="p-2 text-white/30 hover:text-red-400 transition-colors" title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="hidden md:block font-inter font-semibold text-sm uppercase tracking-[0.1em] px-5 py-2 rounded-lg border border-cyan/30 text-cyan hover:bg-cyan hover:text-black transition-all duration-300"
              >
                SIGN IN
              </button>
            )}
            <button onClick={() => setIsOpen(true)} className="relative p-2 text-white/70 hover:text-cyan transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-magenta rounded-full text-white text-[10px] font-bold flex items-center justify-center animate-pulse">{totalItems}</span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white/70 hover:text-cyan transition-colors">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#050508]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden pt-[72px]">
          {['products', 'cheatmenu', 'reviews', 'faq'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="font-rajdhani font-bold text-3xl uppercase tracking-[0.1em] text-white/80 hover:text-cyan transition-colors">
              {id}
            </button>
          ))}
          {hasLoadersAccess && (
            <button onClick={() => { setMobileOpen(false); navigate('/loaders'); }} className="font-rajdhani font-bold text-3xl uppercase tracking-[0.1em] text-cyan hover:text-white transition-colors flex items-center gap-2">
              <Download size={24} /> LOADERS
            </button>
          )}
          {isAuthenticated ? (
            <button onClick={() => { logout(); setMobileOpen(false); }} className="font-inter font-semibold text-sm uppercase tracking-[0.1em] px-8 py-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
              LOGOUT ({user?.username})
            </button>
          ) : (
            <button onClick={() => { setShowAuth(true); setMobileOpen(false); }} className="font-inter font-semibold text-sm uppercase tracking-[0.1em] px-8 py-3 rounded-lg border border-cyan/30 text-cyan hover:bg-cyan hover:text-black transition-all">
              SIGN IN
            </button>
          )}
        </div>
      )}
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CartProvider, useCart } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import ShaderBackground from './components/ShaderBackground'
import LoadingScreen from './components/LoadingScreen'
import SpotlightCursor from './components/SpotlightCursor'
import CrosshairCursor from './components/CrosshairCursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import AllProducts from './components/AllProducts'
import CheatMenu from './components/CheatMenu'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import LoadersPage from './components/LoadersPage'
import AuthModal from './components/AuthModal'
import WatermarkOverlay from './components/WatermarkOverlay'
import Troubleshooter from './components/Troubleshooter'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HomePage() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [])

  const scrollToProducts = () => {
    if (lenisRef.current) lenisRef.current.scrollTo('#products', { offset: -72 })
  }

  return (
    <main className="relative z-10">
      <Hero onExplore={scrollToProducts} />
      <Marquee />
      <Stats />
      <AllProducts />
      <CheatMenu />
      <Reviews />
      <FAQ />
      <CTABanner onExplore={scrollToProducts} />
      <Footer />
    </main>
  )
}

function AppShell() {
  const [loaded, setLoaded] = useState(false)
  const { showCheckout } = useCart()
  const { showAuth } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen bg-[#050508] custom-scrollbar">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {isHome && (
        <>
          <ShaderBackground />
          <div className="noise-overlay" />
          <SpotlightCursor />
          <CrosshairCursor />
          <div className="crt-overlay" />
        </>
      )}

      <WatermarkOverlay />
      <ScrollToTop />
      <Navigation />

      {showCheckout && <Checkout onBack={() => window.scrollTo({ top: 0 })} />}
      {showAuth && <AuthModal />}

      <Cart />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loaders" element={<LoadersPage />} />
        <Route path="/troubleshooter" element={<Troubleshooter />} />
      </Routes>
    </div>
  )
}

// Need to use CartProvider inside AuthProvider context but AuthProvider needs to be inside CartProvider too
// Solution: wrap in a component that uses both
function AppProviders() {
  return (
    <CartProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </CartProvider>
  )
}

export default function App() {
  return <AppProviders />
}

import { Bitcoin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-16 md:py-20" style={{ borderTop: '1px solid rgba(0, 212, 255, 0.1)' }}>
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Fecurity" className="w-9 h-9" />
              <span className="font-rajdhani font-bold text-lg tracking-[0.15em] text-white">FECURITY LAB</span>
            </div>
            <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Premium game modifications for competitive players.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-inter font-semibold text-sm uppercase tracking-[0.08em] text-white mb-4">Products</h4>
            <ul className="space-y-2.5">
              {['Call of Duty', 'Delta Force', 'Battlefield', 'All Products'].map((item) => (
                <li key={item}>
                  <a href="#products" className="font-inter text-sm hover:text-cyan transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-inter font-semibold text-sm uppercase tracking-[0.08em] text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              {['Reviews', 'FAQ', 'Contact', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#reviews" className="font-inter text-sm hover:text-cyan transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="font-inter font-semibold text-sm uppercase tracking-[0.08em] text-white mb-4">We Accept</h4>
            <div className="flex items-center gap-3 mb-3">
              <Bitcoin size={20} className="text-amber" />
              <span className="font-inter text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>BTC</span>
              <span className="font-inter text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>LTC</span>
              <span className="font-inter text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>ETH</span>
            </div>
            <p className="font-inter text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
              ONLY CRYPTO PAYMENTS
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 text-center" style={{ borderTop: '1px solid rgba(0, 212, 255, 0.05)' }}>
          <p className="font-inter text-xs mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            &copy; 2026 Fecurity Lab. All rights reserved.
          </p>
          <p className="font-inter text-[11px] uppercase tracking-[0.05em]" style={{ color: 'rgba(255,255,255,0.15)' }}>
            USE ONLY IF IT DOES NOT INFRINGE ANYONE&apos;S COPYRIGHT
          </p>
        </div>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { ArrowLeft, Lock, Check, CreditCard, Bitcoin } from 'lucide-react'

interface CheckoutProps {
  onBack: () => void
}

function PaymentOption({ name, subtitle, icon, selected, onSelect, color }: {
  name: string; subtitle: string; icon: React.ReactNode;
  selected: boolean; onSelect: () => void; color?: string
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
        selected
          ? 'border-cyan/50 bg-cyan/5'
          : 'border-[#1a1a2e] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selected ? 'bg-cyan/15' : 'bg-white/5'}`}
        style={selected ? { background: `${color || '#00d4ff'}15` } : {}}
      >
        {icon}
      </div>
      <div className="text-left">
        <p className={`font-inter text-sm font-medium ${selected ? 'text-white' : 'text-white/60'}`}>{name}</p>
        <p className="font-inter text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{subtitle}</p>
      </div>
      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
        selected ? 'border-cyan bg-cyan' : 'border-white/20'
      }`}>
        {selected && <Check size={12} className="text-black" />}
      </div>
    </button>
  )
}

export default function Checkout({ onBack }: CheckoutProps) {
  const { items, totalPrice, clearCart, setShowCheckout } = useCart()
  const [email, setEmail] = useState('')
  const [coupon, setCoupon] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('bitcoin')
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [promoAgreed, setPromoAgreed] = useState(false)
  const [step, setStep] = useState<'info' | 'confirm' | 'done'>('info')
  const [orderRef] = useState(() => 'FEC-' + Math.random().toString(36).substring(2, 10).toUpperCase())

  const handleProceed = () => {
    if (!email || !termsAgreed) return
    setStep('confirm')
    setTimeout(() => {
      setStep('done')
      clearCart()
    }, 3000)
  }

  if (step === 'done') {
    return (
      <div className="fixed inset-0 z-[9990] bg-[#050508] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check size={36} className="text-cyan" />
          </div>
          <h2 className="font-rajdhani font-bold text-3xl uppercase text-white mb-3 tracking-wider">ORDER COMPLETE</h2>
          <p className="font-inter text-sm mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Your order has been placed successfully.</p>
          <p className="font-mono text-xs text-cyan/60 mb-8">{orderRef}</p>
          <p className="font-inter text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Your license key will be delivered to your email within minutes.
          </p>
          <button
            onClick={() => { setShowCheckout(false); onBack(); }}
            className="shimmer-btn px-10 py-3 rounded-lg font-inter font-semibold text-sm uppercase tracking-wider text-white hover:shadow-glow transition-all"
          >
            BACK TO STORE
          </button>
        </div>
      </div>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="fixed inset-0 z-[9990] bg-[#050508] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-cyan/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-cyan/40 animate-spin" style={{ animationDuration: '1s' }} />
            <Lock size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan" />
          </div>
          <h2 className="font-rajdhani font-bold text-2xl uppercase text-white mb-2 tracking-wider">PROCESSING</h2>
          <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Securing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9990] bg-[#050508] overflow-y-auto custom-scrollbar">
      <div className="min-h-full flex flex-col lg:flex-row">
        {/* LEFT - Order Summary */}
        <div className="lg:w-[380px] xl:w-[420px] bg-[#08080c] border-r border-[#1a1a2e] p-6 lg:p-8 flex flex-col">
          <button
            onClick={() => setShowCheckout(false)}
            className="flex items-center gap-2 text-white/40 hover:text-cyan transition-colors mb-8 lg:hidden"
          >
            <ArrowLeft size={16} />
            <span className="font-inter text-sm">Back</span>
          </button>

          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="Fecurity" className="w-8 h-8" />
            <span className="font-inter font-medium text-white/80">Fecurity</span>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-2">Pay Fecurity</p>
          <p className="font-rajdhani font-bold text-5xl text-white mb-8">${totalPrice.toFixed(2)}</p>

          <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2">
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-rajdhani font-semibold text-sm uppercase text-white truncate">{item.name}</p>
                    <p className="font-mono text-[10px] text-white/30">{item.variant} x{item.quantity}</p>
                  </div>
                  <p className="font-rajdhani font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1a1a2e] pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="font-inter text-sm text-white/40">Subtotal</span>
              <span className="font-inter text-sm text-white/60">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-rajdhani font-bold text-lg text-white">Total</span>
              <span className="font-rajdhani font-bold text-lg text-white">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[#1a1a2e]">
            <div className="flex items-center gap-2">
              <Bitcoin size={16} className="text-amber" />
              <span className="font-inter text-[10px] uppercase text-white/20">BTC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-inter text-[10px] uppercase text-white/20">LTC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-inter text-[10px] uppercase text-white/20">ETH</span>
            </div>
          </div>
        </div>

        {/* RIGHT - Checkout Form */}
        <div className="flex-1 p-6 lg:p-10 max-w-[700px] mx-auto w-full">
          {/* Back button desktop */}
          <button
            onClick={() => setShowCheckout(false)}
            className="hidden lg:flex items-center gap-2 text-white/40 hover:text-cyan transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span className="font-inter text-sm">Back to store</span>
          </button>

          {/* Step tabs */}
          <div className="flex items-center gap-4 mb-10">
            {[
              { label: 'Order Information', active: true },
              { label: 'Confirm & Pay', active: false },
              { label: 'Receive Your Items', active: false },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                {i > 0 && <div className="w-6 h-px bg-white/10 mr-2" />}
                <span className={`font-inter text-xs ${s.active ? 'text-cyan font-medium' : 'text-white/20'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="font-inter text-[10px] uppercase tracking-wider text-white/30 mb-2 block">
                Contact & Delivery
              </label>
              <input
                type="email"
                placeholder="E-mail Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-[#1a1a2e] text-white text-sm font-inter placeholder:text-white/20 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-all"
              />
            </div>

            {/* Coupon */}
            <div>
              <label className="font-inter text-[10px] uppercase tracking-wider text-white/30 mb-2 block">Discount</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-[#1a1a2e] text-white text-sm font-inter placeholder:text-white/20 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-all"
                />
                <button className="px-5 py-3 rounded-xl border border-cyan/30 text-cyan font-inter text-xs uppercase tracking-wider hover:bg-cyan hover:text-black transition-all">
                  Apply
                </button>
              </div>
            </div>

            {/* Payment */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-inter text-[10px] uppercase tracking-wider text-white/30">Payment</label>
                <div className="flex items-center gap-1.5">
                  <Lock size={10} className="text-white/20" />
                  <span className="font-inter text-[10px] text-white/20">All transactions are secure and encrypted.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <PaymentOption
                  name="Bitcoin"
                  subtitle="via Bitcoin Network"
                  selected={paymentMethod === 'bitcoin'}
                  onSelect={() => setPaymentMethod('bitcoin')}
                  color="#f59e0b"
                  icon={
                    <div className="w-6 h-6 rounded bg-amber/20 flex items-center justify-center">
                      <span className="text-amber font-bold text-xs">B</span>
                    </div>
                  }
                />
                <PaymentOption
                  name="Litecoin"
                  subtitle="via Litecoin Network"
                  selected={paymentMethod === 'litecoin'}
                  onSelect={() => setPaymentMethod('litecoin')}
                  color="#7c9cdb"
                  icon={
                    <div className="w-6 h-6 rounded bg-blue-400/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-xs">L</span>
                    </div>
                  }
                />
                <PaymentOption
                  name="Customer Balance"
                  subtitle="Click to authenticate."
                  selected={paymentMethod === 'balance'}
                  onSelect={() => setPaymentMethod('balance')}
                  color="#7c3aed"
                  icon={
                    <div className="w-6 h-6 rounded bg-violet/20 flex items-center justify-center">
                      <span className="text-violet font-bold text-xs">$</span>
                    </div>
                  }
                />
                <PaymentOption
                  name="Cards, Apple Pay & Google Pay"
                  subtitle="Apple Pay G Pay via VenmoPay"
                  selected={paymentMethod === 'card'}
                  onSelect={() => setPaymentMethod('card')}
                  color="#00d4ff"
                  icon={<CreditCard size={18} className="text-cyan" />}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    termsAgreed ? 'border-cyan bg-cyan' : 'border-white/20 group-hover:border-white/40'
                  }`}
                  onClick={() => setTermsAgreed(!termsAgreed)}
                >
                  {termsAgreed && <Check size={10} className="text-black" />}
                </div>
                <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  I have read and agree to Fecurity&apos;s Terms of Service.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    promoAgreed ? 'border-cyan bg-cyan' : 'border-white/20 group-hover:border-white/40'
                  }`}
                  onClick={() => setPromoAgreed(!promoAgreed)}
                >
                  {promoAgreed && <Check size={10} className="text-black" />}
                </div>
                <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  I would like to receive updates and promotions from Fecurity.
                </span>
              </label>
            </div>

            {/* Proceed button */}
            <button
              onClick={handleProceed}
              disabled={!email || !termsAgreed}
              className="w-full py-4 rounded-xl font-inter font-semibold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: email && termsAgreed
                  ? 'linear-gradient(135deg, #00d4ff, #7c3aed)'
                  : 'rgba(255,255,255,0.05)',
                color: email && termsAgreed ? '#fff' : 'rgba(255,255,255,0.3)',
                boxShadow: email && termsAgreed ? '0 0 30px rgba(0,212,255,0.2)' : 'none',
              }}
            >
              Proceed to Payment
              <ArrowLeft size={14} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

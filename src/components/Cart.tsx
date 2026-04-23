import { X, Minus, Plus, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isOpen, setIsOpen, setShowCheckout } = useCart()

  if (!isOpen) return null

  const handleCheckout = () => {
    if (items.length === 0) return
    setIsOpen(false)
    setShowCheckout(true)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full max-w-[420px] z-50 flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #0a0a12, #06060c)',
          borderLeft: '1px solid rgba(0, 212, 255, 0.15)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
          animation: 'slideIn 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a2e]">
          <h2 className="font-rajdhani font-bold text-xl text-white flex items-center gap-2">
            <ShoppingCart size={20} className="text-cyan" />
            YOUR CART
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-2 text-white/30 hover:text-cyan transition-colors rounded-lg hover:bg-white/5">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-4 border border-white/5">
                <ShoppingCart size={28} className="text-white/10" />
              </div>
              <p className="font-inter text-white/30 mb-1">Your cart is empty</p>
              <p className="font-inter text-[11px] text-white/15 mb-6">Add items from the products page</p>
              <button onClick={() => setIsOpen(false)} className="font-inter text-sm text-cyan hover:text-white transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-[#1a1a2e] hover:border-cyan/20 transition-colors group"
                >
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-rajdhani font-semibold text-sm uppercase text-white truncate">{item.name}</h4>
                    <p className="font-mono text-[10px] text-white/30 mb-2">{item.variant}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-white/40 hover:text-cyan hover:bg-cyan/10 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-sm text-white w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-white/40 hover:text-cyan hover:bg-cyan/10 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-rajdhani font-bold text-sm text-magenta">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-1.5 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded transition-all shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#1a1a2e] bg-[#06060c]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-inter text-xs text-white/30">Subtotal ({totalItems} items)</p>
                <p className="font-inter text-[10px] text-white/20 mt-0.5">BTC / LTC / ETH accepted</p>
              </div>
              <span className="font-rajdhani font-bold text-2xl text-white">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="shimmer-btn w-full font-inter font-semibold text-sm uppercase tracking-wider text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-glow hover:scale-[1.01] transition-all"
            >
              CHECKOUT
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-2 py-2 font-inter text-xs text-white/20 hover:text-white/40 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}

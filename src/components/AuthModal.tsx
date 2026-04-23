import { useState } from 'react'
import { X, LogIn, UserPlus, Lock, KeyRound, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal() {
  const { showAuth, setShowAuth, authTab, setAuthTab, login, register } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!showAuth) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username || !password) { setError('Fill in all fields'); return }
    const ok = login(username, password)
    if (ok) {
      setSuccess('Welcome back, operative.')
      setTimeout(() => { setShowAuth(false); setSuccess(''); setUsername(''); setPassword(''); }, 800)
    } else {
      setError('Invalid credentials')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username || !password || !code) { setError('Fill in all fields'); return }
    const result = register(username, password, code)
    if (result.success) {
      setSuccess('Account created. Access granted.')
      setTimeout(() => { setShowAuth(false); setSuccess(''); setUsername(''); setPassword(''); setCode(''); }, 800)
    } else {
      setError(result.error || 'Registration failed')
    }
  }

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAuth(false)} />
      <div className="relative w-full max-w-[420px]"
        style={{
          background: 'linear-gradient(180deg, #0c0c18, #060610)',
          borderRadius: '20px',
          border: '1px solid rgba(0,212,255,0.12)',
          boxShadow: '0 0 60px rgba(0,212,255,0.08), 0 20px 60px rgba(0,0,0,0.5)',
          animation: 'modalIn 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>

        {/* Close */}
        <button onClick={() => setShowAuth(false)} className="absolute top-4 right-4 p-2 text-white/20 hover:text-cyan transition-colors z-10">
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center pt-8 pb-4">
          <div className="relative mb-3">
            <img src="/logo.png" alt="Fecurity" className="w-12 h-12 animate-pulse" style={{ animationDuration: '3s', filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.4))' }} />
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s', borderRadius: '50%', border: '1px solid rgba(0,212,255,0.1)', borderTopColor: 'rgba(0,212,255,0.4)' }} />
          </div>
          <h2 className="font-rajdhani font-bold text-lg uppercase tracking-[0.15em] text-white">FECURITY LAB</h2>
          <p className="font-inter text-[11px] text-white/25 mt-1">{authTab === 'login' ? 'Authentication Required' : 'Purchase Access Code to Unlock'}</p>
        </div>

        {/* Tabs */}
        <div className="flex px-6 mb-6">
          <button onClick={() => { setAuthTab('login'); setError(''); }} className={`flex-1 py-2.5 font-mono text-xs uppercase tracking-wider transition-all border-b-2 ${authTab === 'login' ? 'text-cyan border-cyan' : 'text-white/25 border-transparent hover:text-white/50'}`}>
            <div className="flex items-center justify-center gap-2"><LogIn size={13} /> Sign In</div>
          </button>
          <button onClick={() => { setAuthTab('register'); setError(''); }} className={`flex-1 py-2.5 font-mono text-xs uppercase tracking-wider transition-all border-b-2 ${authTab === 'register' ? 'text-cyan border-cyan' : 'text-white/25 border-transparent hover:text-white/50'}`}>
            <div className="flex items-center justify-center gap-2"><UserPlus size={13} /> Register</div>
          </button>
        </div>

        {/* Forms */}
        <div className="px-6 pb-8">
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-400" />
              <span className="font-inter text-xs text-green-400">{success}</span>
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <span className="font-inter text-xs text-red-400">{error}</span>
            </div>
          )}

          {authTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-1.5 block">Username</label>
                <div className="relative">
                  <LogIn size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15" />
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/[0.03] border border-[#1a1a2e] text-white text-sm font-inter placeholder:text-white/15 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-all" />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/[0.03] border border-[#1a1a2e] text-white text-sm font-inter placeholder:text-white/15 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-all" />
                </div>
              </div>
              <button type="submit" className="shimmer-btn w-full py-3.5 rounded-xl font-inter font-semibold text-sm uppercase tracking-wider text-white hover:shadow-glow transition-all">
                AUTHENTICATE
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-1.5 block">Choose Username</label>
                <div className="relative">
                  <UserPlus size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15" />
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Create username" className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/[0.03] border border-[#1a1a2e] text-white text-sm font-inter placeholder:text-white/15 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-all" />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-1.5 block">Set Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/[0.03] border border-[#1a1a2e] text-white text-sm font-inter placeholder:text-white/15 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-all" />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-cyan/50 mb-1.5 block flex items-center gap-1.5">
                  <KeyRound size={12} />
                  Access Code
                </label>
                <div className="relative">
                  <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan/20" />
                  <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter your purchase code" className="w-full pl-9 pr-4 py-3 rounded-xl bg-cyan/[0.03] border border-cyan/20 text-white text-sm font-inter placeholder:text-white/15 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-all" style={{ textTransform: 'uppercase' }} />
                </div>
                <p className="font-inter text-[10px] text-white/15 mt-1.5">Received after purchase. One-time use only.</p>
              </div>
              <button type="submit" className="shimmer-btn w-full py-3.5 rounded-xl font-inter font-semibold text-sm uppercase tracking-wider text-white hover:shadow-glow transition-all">
                CREATE ACCOUNT & UNLOCK
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

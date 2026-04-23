import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';

interface User {
  username: string;
  code: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasLoadersAccess: boolean;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string, code: string) => { success: boolean; error?: string };
  logout: () => void;
  showAuth: boolean;
  setShowAuth: (show: boolean) => void;
  authTab: 'login' | 'register';
  setAuthTab: (tab: 'login' | 'register') => void;
}

const VALID_CODES = [
  'FECURITY-2026-ALPHA',
  'FECURITY-2026-BETA',
  'FECURITY-2026-GAMMA',
  'FECURITY-2026-DELTA',
  'FECURITY-2026-OMEGA',
  'FECURITY-2026-VIP',
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStorage(key: string) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function setStorage(key: string, val: unknown) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const saved = getStorage('fecurity_user');
    if (saved) setUser(saved);
  }, []);

  const isAuthenticated = user !== null;
  const hasLoadersAccess = isAuthenticated;

  const login = useCallback((username: string, password: string) => {
    const users: Record<string, { password: string; user: User }> = getStorage('fecurity_users') || {};
    const entry = users[username.toLowerCase()];
    if (!entry || entry.password !== password) return false;
    setUser(entry.user);
    setStorage('fecurity_user', entry.user);
    return true;
  }, []);

  const register = useCallback((username: string, password: string, code: string) => {
    const users: Record<string, { password: string; user: User }> = getStorage('fecurity_users') || {};
    const usedCodes: string[] = getStorage('fecurity_used_codes') || [];

    if (users[username.toLowerCase()]) {
      return { success: false, error: 'Username already taken' };
    }
    if (!VALID_CODES.includes(code.toUpperCase())) {
      return { success: false, error: 'Invalid access code' };
    }
    if (usedCodes.includes(code.toUpperCase())) {
      return { success: false, error: 'Code has already been used' };
    }

    const newUser: User = {
      username,
      code: code.toUpperCase(),
      createdAt: new Date().toISOString(),
    };

    users[username.toLowerCase()] = { password, user: newUser };
    usedCodes.push(code.toUpperCase());
    setStorage('fecurity_users', users);
    setStorage('fecurity_used_codes', usedCodes);
    setUser(newUser);
    setStorage('fecurity_user', newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('fecurity_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, hasLoadersAccess, login, register, logout, showAuth, setShowAuth, authTab, setAuthTab }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

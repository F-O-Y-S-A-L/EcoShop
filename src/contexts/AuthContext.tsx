'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  wishlist?: string[];
  image?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const loading = status === 'loading';

  useEffect(() => {
    if (session?.user) {
      const sessionUser = session.user as any;
      setUser({
        id: sessionUser.id || '',
        name: sessionUser.name || '',
        email: sessionUser.email || '',
        image: sessionUser.image || '',
        wishlist: sessionUser.wishlist || [],
        role: sessionUser.role || 'user'
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    if (result?.error) throw new Error(result.error);
  };

  const googleLogin = async () => {
    await signIn('google', { callbackUrl: '/profile' });
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    await login(email, password);
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) return;
    const res = await fetch('/api/wishlist/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    if (res.ok) {
      const data = await res.json();
      setUser({ ...user, wishlist: data.wishlist });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, register, logout, toggleWishlist }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCart } from '@/src/contexts/CartContext';
import { User as UserIcon, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-eco-bg h-16 flex items-center shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-eco-dark rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <div className="w-4 h-4 bg-eco-primary rounded-sm rotate-45"></div>
              </div>
              <span className="font-display text-2xl font-black tracking-tighter text-eco-dark">CRAVE<span className="text-eco-primary">.</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/shop" className="text-xs font-black uppercase tracking-widest text-eco-dark/60 hover:text-eco-primary transition-colors">Shop</Link>
              <Link href="/about" className="text-xs font-black uppercase tracking-widest text-eco-dark/60 hover:text-eco-primary transition-colors">About</Link>
              <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-eco-dark/60 hover:text-eco-primary transition-colors">Contact</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm">
              {user ? (
                <Link href="/profile" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-xl bg-eco-accent flex items-center justify-center group-hover:bg-eco-primary transition-all">
                    <UserIcon className="h-4 w-4 text-eco-primary group-hover:text-white" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest hidden lg:block">{user.name.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link href="/login" className="text-xs font-black uppercase tracking-widest text-eco-dark">Login</Link>
              )}

              <Link href="/cart" className="flex items-center gap-3 px-6 py-2.5 bg-eco-dark text-white rounded-full hover:bg-eco-primary transition-all shadow-lg hover:shadow-eco-primary/30">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest border-l border-white/20 pl-3">
                  {items.length > 0 ? items.length : '0'}
                </span>
              </Link>
            </div>
          </div>

          <div className="flex space-x-2.5 items-center md:hidden">
                        {user ? (
                          <Link href="/profile" className="flex items-center gap-3 group md:hidden">
                    <div className="w-8 h-8 rounded-xl bg-eco-accent flex items-center justify-center group-hover:bg-eco-primary transition-all">
                      <UserIcon className="h-4 w-4 text-eco-primary group-hover:text-white" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest hidden lg:block">{user.name.split(' ')[0]}</span>
                  </Link>
              ) : (
                <Link href="/login" className="text-xs font-black uppercase tracking-widest text-eco-dark">Login</Link>
              )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-eco-dark">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-eco-bg overflow-hidden"
          >
            <div className="px-4 pt-6 pb-8 space-y-6">

              <div className="space-y-1">
                <Link href="/shop" onClick={() => setIsOpen(false)} className="block py-3 text-xs font-black uppercase tracking-widest text-eco-dark/60 hover:text-eco-primary transition-colors border-b border-eco-bg">Shop</Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="block py-3 text-xs font-black uppercase tracking-widest text-eco-dark/60 hover:text-eco-primary transition-colors border-b border-eco-bg">About</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-3 text-xs font-black uppercase tracking-widest text-eco-dark/60 hover:text-eco-primary transition-colors border-b border-eco-bg">Contact</Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="block py-3 text-xs font-black uppercase tracking-widest text-eco-dark/60 hover:text-eco-primary transition-colors border-b border-eco-bg">Checkout ({items.length})</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

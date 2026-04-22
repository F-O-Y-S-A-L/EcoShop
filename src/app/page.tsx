'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, Cookie, IceCream, Pizza, ArrowRight, ShieldCheck, Globe, Truck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedProducts(data.slice(0, 4));
        } else {
          setFeaturedProducts([]);
        }
      })
      .catch(() => setFeaturedProducts([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-2 py-8 md:px-4 md:py-12 space-y-24">
      {/* Dynamic Hero Section */}
      <section className="relative h-150 md:h-175 rounded-[3.5rem] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Snacks and Cold Beverages" 
            className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[2s] hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-eco-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 px-7 md:px-20 w-full md:w-3/4 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-eco-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block shadow-xl shadow-eco-primary/20">
              New Flavor Era
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold text-white leading-[0.9] tracking-tighter">
              CRAVE <br />
              <span className="text-secondary italic">DIFFERENT.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-lg font-medium leading-relaxed"
          >
            Discover the most addictive collection of gourmet snacks and designer beverages delivered to your door in minutes.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href="/shop" className="px-10 py-5 bg-white text-eco-dark rounded-full text-sm font-black uppercase tracking-widest hover:bg-eco-primary hover:text-white transition-all shadow-2xl">
              Shop Now
            </Link>
            <Link href="/about" className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white/20 transition-all">
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-eco-primary p-12 rounded-[3.5rem] flex flex-col justify-between text-white relative overflow-hidden group">
          <Globe className="absolute -right-10 -bottom-10 h-64 w-64 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
          <div className="space-y-4 relative z-10">
            <h3 className="text-4xl font-display font-extrabold leading-none">Global Flavors, <br /> Local Speed.</h3>
            <p className="text-white/80 max-w-xs font-medium">We source exotic treats from 40+ countries and deliver them while they're fresh.</p>
          </div>
          <div className="pt-8">
            <Link href="/shop" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-eco-primary hover:scale-110 transition-transform">
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="bg-eco-dark p-12 rounded-[3.5rem] text-white flex flex-col justify-between space-y-8">
          <div className="bg-white/10 w-fit p-4 rounded-3xl backdrop-blur-md">
            <Truck className="h-8 w-8 text-eco-primary" />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Turbo Delivery</h4>
            <p className="text-white/40 text-sm">Average delivery time: 18 minutes. No more waiting for your hunger.</p>
          </div>
        </div>

        <div className="bg-eco-accent p-12 rounded-[3.5rem] flex flex-col justify-between border border-eco-secondary/30">
          <div className="bg-white/80 w-fit p-4 rounded-3xl shadow-sm">
            <ShieldCheck className="h-8 w-8 text-eco-primary" />
          </div>
          <div className="space-y-2 text-eco-dark">
            <h4 className="text-2xl font-bold">Pure Quality</h4>
            <p className="text-eco-dark/60 text-sm">Every snack is tested for safety and authentic taste before being listed.</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-eco-gray p-12 rounded-[3.5rem] items-center justify-between gap-8 border border-eco-gray hidden md:flex">
          <div className="space-y-4">
            <h4 className="text-3xl font-display font-extrabold italic">Join the Snack Club</h4>
            <p className="text-eco-dark/60 max-w-xs">Get exclusive weekly drop alerts and 10% off your first order.</p>
            <div className="flex gap-2">
               <input type="email" placeholder="Email" className="bg-white border border-eco-secondary/20 rounded-full px-6 py-3 text-sm flex-1 outline-none focus:ring-2 ring-eco-primary/20" />
               <button className="bg-eco-dark text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest">Join</button>
            </div>
          </div>
          <div className="w-32 h-32 bg-eco-secondary/20 rounded-full items-center justify-center text-5xl">🎁</div>
        </div>
      </section>

      {/* Trending Header */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-eco-primary font-black uppercase tracking-[0.3em] text-[10px]">What's Hot</span>
            <h2 className="text-5xl font-display leading-tight italic">Trending Hits</h2>
          </div>
          <Link href="/shop" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-eco-dark hover:text-eco-primary transition-all">
            Browse Everything
            <div className="w-10 h-10 border border-eco-dark/10 rounded-full flex items-center justify-center group-hover:bg-eco-dark group-hover:text-white transition-all">
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredProducts.map((product: any, i) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/product/${product._id}`}>
                <div className="bg-white p-3 rounded-[2.5rem] border border-eco-gray transition-all group-hover:shadow-[0_20px_50px_-20px_rgba(255,92,0,0.15)] group-hover:-translate-y-2">
                  <div className="aspect-square bg-eco-gray rounded-4xl overflow-hidden relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                        ৳{product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-sm truncate uppercase tracking-tight">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => <div key={s} className={`w-1 h-1 rounded-full ${s <= product.averageRating ? 'bg-eco-primary' : 'bg-gray-200'}`} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-eco-dark rounded-[4rem] p-20 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-eco-primary/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-eco-secondary/10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 space-y-6">
          <h2 className="text-5xl md:text-7xl font-display text-white italic leading-none">Your Next Obsession <br /> Is One Click Away.</h2>
          <p className="text-white/40 max-w-lg mx-auto">Skip the lines. Skip the boring stacks. Get premium treats delivered now.</p>
          <div className="pt-4">
            <Link href="/shop" className="inline-block px-6 py-3 md:px-12 md:py-6 bg-eco-primary text-white rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-eco-primary/40 hover:scale-105 active:scale-95 transition-all">
              Go to Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

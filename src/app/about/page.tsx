'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Globe, Zap, Shield, Search } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Search,
      title: "Global Flavor Hunt",
      description: "We don't just stock snacks; we hunt them. From limited-edition Japanese chips to artisan Belgian chocolates, if it moves the needle, it's on CRAVE."
    },
    {
      icon: Shield,
      title: "The Taste Protocol",
      description: "Every single item in our inventory passes a rigorous blind-taste test by our board of curators. If it doesn't spark joy, it doesn't make the cut."
    },
    {
      icon: Zap,
      title: "Hyper-Speed Logistics",
      description: "Cravings don't wait, and neither do we. Our supply chain is optimized for the 'I need it now' generation. Global flavors, delivered at turbo speed."
    }
  ];

  const milestones = [
    { year: '2023', event: 'CRAVE. founded by a group of obsessive snack hunters.' },
    { year: '2024', event: 'Reached 500+ global artisan partners across 12 countries.' },
    { year: '2025', event: 'Launched the Taste Protocol — our gold-standard for quality.' },
    { year: '2026', event: 'Achieved 100% Carbon Neutral Delivery for all orders.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 py-12 space-y-12 md:px-4 md:py-24 md:space-y-32">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block bg-eco-primary/10 text-eco-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]"
        >
          Our Manifesto
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-display italic leading-[0.95] tracking-tighter text-eco-dark"
        >
          Snacking is <br /> <span className="text-eco-primary underline decoration-eco-gray underline-offset-8">a lifestyle</span>, not a filler.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto"
        >
          CRAVE. was born from the frustration of boring cupboards. We've curated the world's most addictive, high-quality, and ethical snacks so you can indulge with zero compromise on taste or integrity.
        </motion.p>
      </section>

      {/* Philosophy Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {values.map((value, i) => (
          <motion.div 
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-eco-gray rounded-[3rem] p-10 space-y-8 hover:shadow-2xl transition-all group"
          >
            <div className="w-16 h-16 bg-eco-gray rounded-2xl flex items-center justify-center text-eco-dark group-hover:bg-eco-primary group-hover:text-white transition-colors">
              <value.icon size={28} strokeWidth={2.5} />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold uppercase tracking-tight italic">{value.title}</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Timeline Section */}
      <section className="bg-eco-dark p-6 rounded-4xl md:rounded-[5rem] md:p-24 text-white relative overflow-hidden">
        <Star className="absolute -left-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-display italic leading-tight">The Evolution <br /> of Obsession.</h2>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest italic">A timeline of the taste revolution.</p>
            </div>
            <div className="space-y-8">
              {milestones.map((item, i) => (
                <div key={item.year} className="flex items-center md:gap-10 md:items-start">
                  <span className="font-display italic text-3xl text-eco-primary w-24 shrink-0">{item.year}</span>
                  <p className="text-sm font-medium pt-2 text-white/70 leading-relaxed uppercase tracking-tight">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="aspect-4/5 bg-eco-gray/10 backdrop-blur-2xl rounded-4xl md:rounded-[4rem] p-2 md:p-4 border border-white/10 shadow-2xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=1000" 
                alt="Impact" 
                className="w-full h-full object-cover rounded-3xl md:rounded-[3rem] md:grayscale md:group-hover:grayscale-0 md:transition-all md:duration-1000 md:scale-105 md:group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20 border-y border-eco-gray text-center overflow-hidden">
        <div>
          <p className="text-5xl font-display italic text-eco-dark">50k+</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-eco-primary mt-4">Orders Fulfilled</p>
        </div>
        <div>
          <p className="text-5xl font-display italic text-eco-dark">12</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-eco-primary mt-4">Countries Sourced</p>
        </div>
        <div>
          <p className="text-5xl font-display italic text-eco-dark">98%</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-eco-primary mt-4">Loyalty Rate</p>
        </div>
        <div>
          <p className="text-5xl font-display italic text-eco-dark">1h</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-eco-primary mt-4">Avg Dispatch</p>
        </div>
      </section>

      {/* Join Section */}
      <section className="text-center space-y-12 bg-eco-primary py-10 rounded-4xl md:py-32 md:rounded-[5rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl md:text-7xl font-display italic leading-tight">Ready to join <br /> the revolution?</h2>
          <p className="max-w-md mx-auto text-white/80 font-medium text-sm leading-relaxed">
            Stop eating boring snacks. Join the CLUB and get access to our exclusive monthly drops and members-only pricing.
          </p>
          <Link 
            href={'/shop'}
            className="bg-eco-dark text-white px-16 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl active:scale-95"
          >
            Explore Drops
          </Link>
        </div>
      </section>
    </div>
  );
}

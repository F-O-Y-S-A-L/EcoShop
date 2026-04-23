'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin, Send, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.simulated ? 'Mission Logged (Local). Connect SMTP for real emails.' : 'Message received by the ecosystem.');
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error(data.error || 'Connection failed.');
      }
    } catch (error) {
      toast.error('Sector interference. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-24">
      {/* Hero Header */}
      <section className="text-center space-y-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-block bg-eco-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
        >
          Direct Line
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-display font-extrabold italic tracking-tighter leading-none mb-4">
          TALK TO <span className="text-eco-primary">US.</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto font-medium uppercase tracking-tight text-sm">
          Have a request? A complaint? Or just want to suggest a new global drop? Our team is listening.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-eco-dark rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xl">
                <Mail size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold italic">HQ Ecosystem</h3>
                <p className="text-gray-400 text-sm font-medium">drops@crave-stores.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-eco-primary rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xl">
                <MapPin size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold italic">Base of Operations</h3>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-tight">122 Snack District, Global City, GC 404</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-eco-gray rounded-2xl flex items-center justify-center text-eco-dark shrink-0 shadow-sm border border-eco-gray">
                <Phone size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold italic">Support Signal</h3>
                <p className="text-gray-400 text-sm font-medium">+1 (888) CRAVE-IT</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-eco-dark rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-eco-primary/20 blur-[50px] rounded-full"></div>
             <h4 className="text-xl font-display font-bold italic mb-4">Turbo Response</h4>
             <p className="text-sm text-white/50 leading-relaxed uppercase tracking-tight">
               Our average response time for valid drop requests is under 4 hours. No time for waiting.
             </p>
          </div>
        </div>

        {/* Contact Form */}
        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="bg-white p-10 md:p-16 rounded-[4rem] border border-eco-gray shadow-2xl space-y-10"
        >
          <div className="space-y-8">
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-eco-primary px-2">Identification</label>
               <input 
                 type="text" 
                 required
                 value={form.name}
                 onChange={e => setForm({...form, name: e.target.value})}
                 placeholder="Your Full Name" 
                 className="w-full bg-eco-gray border-none rounded-2xl py-5 px-8 text-sm font-medium focus:ring-1 focus:ring-eco-primary outline-none transition-all" 
               />
            </div>
            
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-eco-primary px-2">Secure Email</label>
               <input 
                 type="email" 
                 required
                 value={form.email}
                 onChange={e => setForm({...form, email: e.target.value})}
                 placeholder="Email Address" 
                 className="w-full bg-eco-gray border-none rounded-2xl py-5 px-8 text-sm font-medium focus:ring-1 focus:ring-eco-primary outline-none transition-all" 
               />
            </div>

            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-eco-primary px-2">Crave Payload</label>
               <textarea 
                 required
                 rows={5}
                 value={form.message}
                 onChange={e => setForm({...form, message: e.target.value})}
                 placeholder="Tell us what you crave..." 
                 className="w-full bg-eco-gray border-none rounded-4xl py-6 px-8 text-sm font-medium focus:ring-1 focus:ring-eco-primary outline-none transition-all resize-none"
               />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-eco-dark text-white py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-eco-primary transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Launch Message</span>
                <Send size={16} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}

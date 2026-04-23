'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Truck, CheckCircle2, ChevronRight, Wallet, ShieldCheck } from 'lucide-react';
import { useCart } from '@/src/contexts/CartContext';
import { useAuth } from '@/src/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    street: '', city: '', zipCode: '', phone: '',
    paymentMethod: 'bKash'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      router.push('/shop');
    }
  }, [items, step, router]);

  const handleOrder = async () => {
    if (!user) return toast.error('Login required');
    setIsProcessing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount,
          shippingAddress: {
            street: form.street,
            city: form.city,
            zipCode: form.zipCode,
            phone: form.phone
          },
          paymentMethod: form.paymentMethod
        })
      });

      if (res.ok) {
        const order = await res.json();
        // Simulate payment gateway
        await fetch('/api/checkout/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order._id, method: form.paymentMethod })
        });
        
        clearCart();
        setStep(3);
        toast.success('Order placed successfully!');
      }
    } catch (err) {
      toast.error('Failed to create order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-12">
      {/* Progress Tracker */}
      <div className="flex items-center justify-between max-w-sm mx-auto relative mb-20">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-eco-bg -translate-y-1/2 z-0"></div>
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${step >= i ? 'bg-eco-primary border-eco-primary text-white' : 'bg-white border-eco-bg text-gray-400'}`}
          >
            {step > i ? <CheckCircle2 className="h-6 w-6" /> : i}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-3 rounded-2xl md:p-10 md:rounded-[3rem] border border-eco-bg shadow-xl space-y-10"
          >
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-eco-bg rounded-2xl">
                <Truck className="h-8 w-8 text-eco-primary" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold">Delivery Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Street Address</label>
                <input 
                  type="text" 
                  value={form.street}
                  onChange={e => setForm({...form, street: e.target.value})}
                  className="w-full bg-eco-cream p-4 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                  placeholder="123 Eco Lane"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">City</label>
                <input 
                   type="text" 
                   value={form.city}
                   onChange={e => setForm({...form, city: e.target.value})}
                   className="w-full bg-eco-cream p-4 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                   placeholder="Dhaka"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">ZIP Code</label>
                <input 
                   type="text" 
                   value={form.zipCode}
                   onChange={e => setForm({...form, zipCode: e.target.value})}
                   className="w-full bg-eco-cream p-4 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                   placeholder="1000"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone (for delivery tracking)</label>
                <input 
                   type="tel" 
                   value={form.phone}
                   onChange={e => setForm({...form, phone: e.target.value})}
                   className="w-full bg-eco-cream p-4 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                   placeholder="+880 1XXX-XXXXXX"
                />
              </div>
            </div>

            <button 
              disabled={!form.street || !form.city || !form.phone}
              onClick={() => setStep(2)}
              className="w-full bg-eco-primary text-white py-5 rounded-full font-bold flex items-center justify-center space-x-2 disabled:bg-gray-200"
            >
              <span>Continue to Payment</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-3 rounded-2xl md:p-10 md:rounded-[3rem] border border-eco-bg shadow-xl space-y-10"
          >
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-eco-bg rounded-2xl">
                <Wallet className="h-8 w-8 text-eco-primary" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold">Secure Payment</h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-500 text-sm mb-6">Choose your preferred mobile banking method. We use 256-bit AES encryption.</p>
              
              <button 
                onClick={() => setForm({...form, paymentMethod: 'bKash'})}
                className={`w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${form.paymentMethod === 'bKash' ? 'border-eco-primary bg-eco-primary/5' : 'border-eco-bg hover:border-gray-300'}`}
              >
                <div className="flex items-center space-x-4">
                  <img src="https://logos-world.net/wp-content/uploads/2024/10/Bkash-Logo.png" alt="bKash" className="h-8" />
                  <span className="font-bold">bKash</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${form.paymentMethod === 'bKash' ? 'border-eco-primary' : 'border-gray-300'}`}>
                  {form.paymentMethod === 'bKash' && <div className="w-3 h-3 bg-eco-primary rounded-full"></div>}
                </div>
              </button>

              <button 
                onClick={() => setForm({...form, paymentMethod: 'Nagad'})}
                className={`w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${form.paymentMethod === 'Nagad' ? 'border-eco-primary bg-eco-primary/5' : 'border-eco-bg hover:border-gray-300'}`}
              >
                <div className="flex items-center space-x-4">
                  <img src="https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png" alt="Nagad" className="h-8" />
                  <span className="font-bold">Nagad</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${form.paymentMethod === 'Nagad' ? 'border-eco-primary' : 'border-gray-300'}`}>
                  {form.paymentMethod === 'Nagad' && <div className="w-3 h-3 bg-eco-primary rounded-full"></div>}
                </div>
              </button>
            </div>

            <div className="pt-6 border-t border-eco-bg flex justify-between items-center">
               <div className="space-y-1">
                 <p className="text-[8px] md:text-xs uppercase tracking-widest text-gray-400 font-bold">Payable Amount</p>
                 <p className="text-xl md:text-4xl font-display text-eco-primary font-bold"><span className='text-base md:text-3xl'>৳</span> {totalAmount.toFixed(2)}</p>
               </div>
               <div className="flex items-center space-x-2">
                 <ShieldCheck className="h-4 w-4 md:w-5 md:h-5" />
                 <span className="text-[8px] md:text-xs font-bold uppercase tracking-widest">Encypted Checkout</span>
               </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="shrink-0 bg-eco-bg text-eco-primary md:px-8 md:py-5 rounded-full font-bold"
              >
                Back
              </button>
              <button 
                disabled={isProcessing}
                onClick={handleOrder}
                className="grow bg-eco-primary text-white py-3 md:py-5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
                    <span>Confirm & Pay Securely</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-3 rounded-2xl md:p-10 md:rounded-[3rem] border border-eco-bg shadow-2xl text-center space-y-10"
          >
            <div className="bg-eco-bg w-32 h-32 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-16 w-16 text-eco-primary" />
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-display leading-tight">Order Received!</h2>
              <p className="text-gray-500 max-w-sm mx-auto text-lg leading-relaxed">
                Your ecological footprint was just offset. We'll send you an update once your package is on its way.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
               <button onClick={() => router.push('/profile')} className="bg-white border border-eco-bg px-6 py-4 rounded-full font-bold text-sm">View Orders</button>
               <button onClick={() => router.push('/shop')} className="bg-eco-primary text-white px-6 py-4 rounded-full font-bold text-sm">Keep Shopping</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

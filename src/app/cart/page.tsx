"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  Tag,
} from "lucide-react";
import { useCart } from "@/src/contexts/CartContext";
import { motion } from "motion/react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalAmount } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto border border-eco-bg">
          <ShoppingBag className="h-10 w-10 text-eco-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-display">Your cart is empty</h1>
          <p className="text-gray-500">
            Looks like you haven't added any sustainable goodies yet.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-block bg-eco-primary text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition-all"
        >
          Explore the Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-5xl font-display font-bold text-eco-dark italic">
        Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item.productId}
              className="bg-white p-1 md:p-4 rounded-3xl border border-eco-bg flex flex-row items-center gap-6"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-eco-bg bg-eco-gray p-2 shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grow space-y-1 text-center sm:text-left">
                <h3 className="text-xs md:font-bold md:text-sm text-eco-dark">
                  {item.name}
                </h3>
                <p className="text-eco-primary font-bold text-xs md:text-sm">
                  <span className="text-sm md:text-xl">৳</span>
                  {item.price.toFixed(2)}
                </p>
                <div className="flex items-center justify-center sm:justify-start pt-1">
                  <span className="text-[6px] md:text-[8px] md:font-bold uppercase tracking-widest  md:text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
              <div className="flex items-center sm:space-x-4">
                <div className="flex items-center border border-eco-bg rounded-full md:p-1 bg-eco-gray">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="p-3 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-eco-dark text-white p-8 rounded-[3rem] space-y-8 shadow-xl">
            <h3 className="font-display text-3xl font-bold italic">Summary</h3>

            <div className="space-y-4 text-white/60 text-xs font-medium">
              <div className="flex justify-between">
                <span className="uppercase tracking-widest">Subtotal</span>
                <span className="text-white font-bold">
                  <span className="text-xl">৳</span>
                  {totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase tracking-widest text-[#C8D3C0]">
                  Shipping
                </span>
                <span className="text-[#C8D3C0] font-bold">FREE</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">
                    Total Amount
                  </p>
                  <p className="text-4xl font-display text-white font-bold italic">
                    <span className="text-3xl">৳</span>
                    {totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-white text-eco-dark py-5 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-eco-accent transition-all group text-sm uppercase tracking-widest"
            >
              <span>Begin Checkout</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

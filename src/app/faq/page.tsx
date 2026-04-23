"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  HelpCircle,
  Package,
  Truck,
  CreditCard,
  RotateCcw,
} from "lucide-react";

const faqCategories = [
  {
    title: "Orders & Drops",
    icon: <Package size={20} />,
    questions: [
      {
        q: 'What is a "Drop" exactly?',
        a: "A Drop is our way of releasing exclusive, curated snack and beverage inventory. We source small-batch, global products that are often limited in stock. When a drop happens, you move fast or you miss out.",
      },
      {
        q: "Can I cancel an order once locked?",
        a: "Once an order is initialized and signed, it enters our turbo delivery pipeline. You can cancel within 2 minutes of placement, but after that, the payload is already in motion.",
      },
    ],
  },
  {
    title: "Global Delivery",
    icon: <Truck size={20} />,
    questions: [
      {
        q: "How fast is turbo delivery?",
        a: "Our average delivery time is 18-25 minutes within active city sectors. We use a proprietary relay system to ensure your snack craving is satisfied before your mood changes.",
      },
      {
        q: "Do you deliver cold items?",
        a: "Yes. All beverages and temperature-sensitive snacks are transported in climate-controlled pods to ensure they arrive at the exact designated temperature.",
      },
    ],
  },
  {
    title: "Payments & Security",
    icon: <CreditCard size={20} />,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major secure channels: Visa, Mastercard, AMEX, plus local secure terminals like Bkash and Nagad for instant verification.",
      },
    ],
  },
  {
    title: "Refunds",
    icon: <RotateCcw size={20} />,
    questions: [
      {
        q: "The snack was delicious, but the box was dented.",
        a: 'We prioritize the integrity of the payload. If the product itself is compromised, we will issue a full refund or an immediate re-drop. Contact "Direct Line" with a photo of the damage.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-24">
      {/* Header */}
      <section className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-eco-gray text-eco-dark px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-eco-gray"
        >
          Intelligence Base
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-display font-extrabold italic tracking-tighter leading-none">
          SYSTEM <span className="text-eco-primary">FAQ.</span>
        </h1>
        <p className="text-gray-500 max-w-sm mx-auto font-medium uppercase tracking-tight text-xs">
          Everything you need to know about the CRAVE. ecosystem. No fluff, just
          facts.
        </p>
      </section>

      {/* Grid */}
      <div className="space-y-16">
        {faqCategories.map((category, catIdx) => (
          <div key={catIdx} className="space-y-8">
            <div className="flex items-center gap-4 border-b border-eco-gray pb-4">
              <div className="w-10 h-10 bg-eco-dark text-white rounded-xl flex items-center justify-center">
                {category.icon}
              </div>
              <h2 className="text-2xl font-display font-bold italic tracking-tight">
                {category.title}
              </h2>
            </div>

            <div className="space-y-4">
              {category.questions.map((faq, faqIdx) => {
                const id = `${catIdx}-${faqIdx}`;
                const isOpen = openIndex === id;
                return (
                  <div
                    key={id}
                    className={`bg-white rounded-4xl border transition-all ${isOpen ? "border-eco-primary shadow-xl ring-1 ring-eco-primary/5" : "border-eco-gray hover:border-gray-300"}`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : id)}
                      className="w-full p-8 flex items-center justify-between text-left gap-6"
                    >
                      <h3 className="font-bold text-sm uppercase tracking-tight text-eco-dark">
                        {faq.q}
                      </h3>
                      <div
                        className={`w-8 h-8 rounded-full bg-eco-gray flex items-center justify-center transition-all ${isOpen ? "rotate-180 bg-eco-primary text-white" : ""}`}
                      >
                        <ChevronDown size={14} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8 text-gray-500 text-sm leading-relaxed font-medium uppercase tracking-tight">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="bg-eco-dark p-12 rounded-[3.5rem] text-center space-y-6 relative overflow-hidden">
        <div className="absolute -left-12 -top-12 w-48 h-48 bg-eco-primary/10 blur-[80px] rounded-full"></div>
        <HelpCircle className="h-12 w-12 text-eco-primary mx-auto opacity-20" />
        <h4 className="text-2xl font-display font-bold italic text-white leading-tight">
          Still hunting for answers?
        </h4>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest max-w-xs mx-auto">
          Our support team is active 24/7. Reach out via the secure line.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-eco-dark px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-eco-primary hover:text-white transition-all shadow-2xl mt-4"
        >
          Direct Line
        </a>
      </div>
    </div>
  );
}

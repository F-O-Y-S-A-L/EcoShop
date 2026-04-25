"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  EyeOff,
  Eye,
} from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created! Welcome to the circular economy.");
      router.push("/profile");
    } catch (err) {
      toast.error("Registration failed. Email might be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white p-10 rounded-[3rem] border border-eco-bg shadow-xl space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-display font-bold italic">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-sm italic">
            Start your conscious consumption today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mx-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-eco-gray p-4 pl-12 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mx-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-eco-gray p-4 pl-12 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mx-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-eco-gray p-4 pl-12 pr-12 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-eco-primary"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-eco-accent/50 p-4 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="h-4 w-4 text-eco-primary shrink-0 mt-0.5" />
            <p className="text-[9px] text-eco-dark font-medium leading-relaxed">
              By creating an account, you agree to our Sustainable Commerce
              Terms and Circular Privacy Policy.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eco-dark text-white py-5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          Member already?{" "}
          <Link
            href="/login"
            className="text-eco-primary font-bold hover:underline"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

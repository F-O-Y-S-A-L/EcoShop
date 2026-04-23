"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, Mail, ArrowRight, Chrome } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, googleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back to the ecosystem!");
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white p-10 rounded-[3rem] border border-eco-bg shadow-xl space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-display font-bold italic">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm italic underline decoration-eco-secondary decoration-2 underline-offset-4">
            Continue your sustainable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 p-4 bg-eco-gray rounded-2xl hover:bg-eco-bg transition-all border border-transparent hover:border-gray-300"
          >
            <Chrome className="h-4 w-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">
              Sign in with Google
            </span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-eco-bg"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] font-bold text-slate-300">
            <span className="bg-white px-4">OR</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mx-1">
              Email Essence
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
              <input
                type="email"
                required
                autoComplete="username"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-eco-gray p-4 pl-12 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                placeholder="nature@ecosystem.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mx-1">
              Secure Key
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-eco-gray p-4 pl-12 rounded-2xl outline-none focus:ring-2 ring-eco-primary/20 transition-all border border-transparent focus:border-eco-primary"
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
              />
            </div>
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
                <span>Enter Ecosystem</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          New here?{" "}
          <Link
            href="/register"
            className="text-eco-primary font-bold hover:underline"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}

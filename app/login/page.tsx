"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Lock, Mail, ChevronLeft, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      setError("الخطأ: تأكد من إعداد مفاتيح Supabase في ملف .env الخاص بالمشروع.");
      setLoading(false);
      return;
    }

    const supabase = createBrowserClient(supabaseUrl, supabaseKey);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور.");
      setLoading(false);
      return;
    }

    if (data.user?.user_metadata?.role !== 'admin') {
      setError("حسابك لا يمتلك صلاحيات مسؤول النظام (Admin).");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh(); // Critical to re-evaluate the protected SSR middleware state immediately
  };

  return (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center p-6 relative overflow-hidden text-white selection:bg-blue-500/30 font-sans" dir="rtl">
      
      {/* Background Gradients (Pure Tailwind & Framer Motion) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[length:60px_60px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] pointer-events-none" />
      <motion.div animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />
      <motion.div animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }} className="absolute bottom-[0%] left-[-10%] w-[30rem] h-[30rem] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 border border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md px-5 py-2.5 rounded-2xl transition-all hover:-translate-x-1 font-bold">
          <ChevronLeft size={18} /> العودة للمتجر
        </Link>

        {/* Sophisticated Glass Login Card */}
        <div className="bg-[#0A0F1C]/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          
          {/* Edge Glow mapped to top perimeter */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent group-hover:via-blue-400/80 transition-colors duration-500" />

          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[1.5rem] mx-auto flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(37,99,235,0.4)] rotate-3 hover:rotate-6 hover:scale-105 transition-all duration-300">
              <ShieldCheck size={36} className="text-white drop-shadow-md" />
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-3">تسجيل الدخول المستقل</h1>
            <p className="text-slate-400 font-medium">لوحة تحكم إدارية مؤمنة كلياً بطرف ثالت.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold text-center">
                {error}
              </motion.div>
            )}

            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-300 ml-1">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="email" 
                  autoComplete="email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full bg-black/40 border border-slate-800 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all font-medium text-left" 
                  placeholder="admin@yora.com" 
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-300 ml-1">كلمة المرور المشفرة</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="password" 
                  autoComplete="current-password"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="w-full bg-black/40 border border-slate-800 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all font-medium text-left tracking-[0.2em]" 
                  placeholder="••••••••••••" 
                  dir="ltr"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-[3.5rem] bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center gap-3 font-black text-xl transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)] active:scale-[0.98] mt-6"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" /> جاري المطابقة...
                </>
              ) : (
                "دخول آمن"
              )}
            </button>
          </form>

          <div className="mt-10 border-t border-white/5 pt-6 text-center">
            <p className="text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2">
              <Lock size={12} className="text-blue-500" /> SECURED NATIVELY BY SUPABASE EDGE PROTOCOLS
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

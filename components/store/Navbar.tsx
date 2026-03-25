"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { ShoppingCart, Package, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const { cart, setIsCartOpen } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu expands
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isMobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isMobileMenuOpen ? "bg-[#030610]/90 backdrop-blur-2xl border-b border-blue-900/20 shadow-[0_10px_40px_rgba(0,0,0,0.6)] py-4" : "bg-transparent py-6"}`} dir="rtl">
      <div className="container mx-auto px-6 flex items-center justify-between relative z-50">
        
        {/* LOGO Image Exactly as Brand Designed */}
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:scale-105 transition-transform shadow-[0_0_20px_rgba(15,23,42,0.8)] rounded-lg overflow-hidden flex shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="YORA Logo" className="h-10 sm:h-12 w-auto object-contain" />
        </Link>
        
        {/* Clean Sharp Navigation Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-10 bg-[#0A0F1C]/60 border border-white/5 px-10 py-3.5 rounded-full backdrop-blur-xl shadow-inner">
          <Link href="/" className="text-sm font-bold text-slate-300 hover:text-white transition-colors shrink-0">الرئيسية</Link>
          <Link href="/products" className="text-sm font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-2 shrink-0"><Package size={18} /> تصفح المنتجات</Link>
        </div>

        {/* Action Button (Cart) & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
            className="relative p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/5 hover:border-white/20 glass-panel shrink-0"
          >
            <ShoppingCart size={22} className="hover:-rotate-12 transition-transform" />
            {itemCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-[11px] font-black w-7 h-7 rounded-full flex items-center justify-center animate-in zoom-in shadow-[0_0_20px_rgba(37,99,235,0.5)] border-2 border-[#0B1120]">
                {itemCount}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/5 hover:border-white/20 glass-panel shrink-0"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* --- Sleek Mobile Dropdown Menu --- */}
      {isMobileMenuOpen && (
        <>
          {/* Blur Backdrop */}
          <div 
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-300" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* Floating Dropdown Card */}
          <div className="absolute top-[85px] left-5 right-5 z-40 bg-[#0A0F1C]/95 border border-blue-500/30 rounded-3xl p-5 flex flex-col shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)] md:hidden animate-in slide-in-from-top-5 fade-in duration-300 backdrop-blur-3xl">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-2xl font-black text-white py-4 border-b border-white/5 active:bg-white/5 px-4 rounded-xl transition-all text-right hover:text-blue-400"
            >
              الرئيسية
            </Link>
            <Link 
              href="/products" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-2xl font-black text-white py-4 flex items-center gap-4 active:bg-white/5 px-4 rounded-xl transition-all mt-2 text-right hover:text-blue-400"
            >
              <Package size={28} className="text-blue-500 shrink-0" /> تصفح المنتجات
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

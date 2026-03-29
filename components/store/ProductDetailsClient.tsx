"use client";

import { useState } from "react";
import { Product, Category } from "@prisma/client";
import { ChevronRight, ChevronLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw, X, MessageCircle, MapPin, User, Phone } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type ProductWithCategory = Product & { category: Category | null };

export function ProductDetailsClient({ product, whatsappNumber }: { product: ProductWithCategory, whatsappNumber: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    governorate: "",
    city: "",
    address: ""
  });

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `
*طلب شراء مباشر من متجر YORA* 🛍️
━━━━━━━━━━━━━━━━━━
*المنتج:* ${product.name}
*السعر:* ${product.price} ج.م
━━━━━━━━━━━━━━━━━━
*بيانات العميل للإرسال:*
👤 *الاسم:* ${formData.name}
📱 *الهاتف:* ${formData.phone}
📍 *المحافظة:* ${formData.governorate}
🏙️ *المدينة:* ${formData.city}
🏠 *العنوان:* 
${formData.address}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="relative overflow-hidden min-h-[100vh] pb-20">

      {/* Background Blobs (Static for much better scroll performance) */}
      <div
        className="absolute top-[20%] -right-[15%] w-[45rem] h-[45rem] bg-blue-600/30 rounded-full blur-[100px] pointer-events-none transform-gpu"
      />
      <div
        className="absolute bottom-[0%] -left-[10%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none transform-gpu"
      />

      <div className="container mx-auto px-6 pt-10 relative z-10">

        <nav className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group font-bold">
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            العودة للمتجر الرئيسي
          </Link>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] md:aspect-square w-full rounded-[3rem] bg-[#0A0F1C]/40 backdrop-blur-2xl border border-white/10 p-4 sm:p-8 flex items-center justify-center group overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {hasImages ? (
                <div
                  className="relative w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-700 z-10"
                >
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div
                  className="text-slate-700 font-black text-6xl opacity-30 -rotate-12 select-none"
                >
                  YORA
                </div>
              )}

              {/* Gallery Controls */}
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 transition-all z-20">
                    <ChevronRight size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 transition-all z-20">
                    <ChevronLeft size={24} />
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails below */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-4 mt-6 overflow-x-auto override-scrollbar pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden bg-[#0A0F1C]/40 backdrop-blur-xl border border-white/10 transition-all duration-300 shrink-0 ${idx === currentImageIndex ? 'ring-2 ring-blue-500 opacity-100' : 'opacity-50 hover:opacity-100 hover:-translate-y-1'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col"
          >
            {product.category && (
              <div className="inline-flex items-center w-fit px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                {product.category.name}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {product.name}
            </h1>

            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">{product.price}</span>
                <span className="text-xl text-blue-400 font-bold mb-1">جنيه مصري</span>
              </div>
              {(product as any).oldPrice && (product as any).oldPrice > product.price && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl text-slate-500 line-through font-bold">{(product as any).oldPrice} ج.م</span>
                  <span className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded-lg font-black text-sm border border-rose-500/20">
                    خصم {Math.round((((product as any).oldPrice - product.price) / (product as any).oldPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 font-medium">
              {product.description}
            </p>

            {/* Features Array */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {[
                { i: ShieldCheck, t: "ضمان الجودة" },
                { i: Truck, t: "توصيل سريع" },
                { i: RotateCcw, t: "استبدال سهل" },
                { i: MessageCircle, t: "دعم متواصل" },
              ].map((F, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-blue-600/10 hover:border-blue-500/20 transition-colors">
                  <F.i className="text-blue-500 shrink-0" size={24} />
                  <span className="font-bold text-slate-300">{F.t}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons Split */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-20">
              <button
                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.images[0] || "", quantity: 1 })}
                className="flex-1 h-16 rounded-[1.5rem] bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group border border-blue-500/20 p-5"
              >
                إضافة للسلة
                <ShoppingCart className="group-hover:-rotate-12 transition-transform" size={24} />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 h-16 rounded-[1.5rem] bg-blue-600 hover:bg-blue-500 text-white font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_-10px_rgba(59,130,246,0.6)] hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.9)] active:scale-95 overflow-hidden group p-5"
              >
                شراء سريع
                <MessageCircle className="group-hover:scale-110 transition-transform" size={24} />
              </button>
            </div>

            <p className="text-center text-slate-500 text-sm mt-6 font-medium flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              قم بالطلب ونحن نتكفل بالباقي
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Checkout Modal Framer Motion --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-default"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0F1C]/90 backdrop-blur-2xl border border-blue-500/30 rounded-[2.5rem] shadow-[0_0_60px_rgba(59,130,246,0.15)] p-6 sm:p-10 overflow-y-auto max-h-[90vh] override-scrollbar"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 left-6 p-2 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors">
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white mb-2">تأكيد طلب الشراء</h2>
                <p className="text-slate-400 font-medium">أكمل بياناتك ليتم توجيهك مباشرة لفريق يورا على واتساب.</p>
              </div>

              <form onSubmit={handleOrder} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <User size={16} className="text-blue-500" /> الاسم الثلاثي
                    </label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/30 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:border-blue-500 transition-colors font-medium outline-none" placeholder="محمد أحمد محمود" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Phone size={16} className="text-blue-500" /> رقم الهاتف
                    </label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-black/30 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:border-blue-500 transition-colors font-medium text-left outline-none" placeholder="01X XXXX XXXX" dir="ltr" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <MapPin size={16} className="text-blue-500" /> المحافظة
                    </label>
                    <input required type="text" value={formData.governorate} onChange={(e) => setFormData({ ...formData, governorate: e.target.value })} className="w-full bg-black/30 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:border-blue-500 transition-colors font-medium outline-none" placeholder="مثال: رسوان" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <MapPin size={16} className="text-blue-500" /> المدينة / المركز
                    </label>
                    <input required type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-black/30 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:border-blue-500 transition-colors font-medium outline-none" placeholder="مركز أسوان، كوم أمبو.." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <MapPin size={16} className="text-blue-500" /> العنوان التفصيلي
                  </label>
                  <textarea required rows={3} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full bg-black/30 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:border-blue-500 transition-colors font-medium resize-none shadow-inner outline-none" placeholder="شارع النيل، عمارة رقم 5، الدور الثالث.." />
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 font-bold mb-1">الإجمالي المطلوب:</p>
                    <p className="text-2xl font-black text-blue-400">{product.price} <span className="text-sm text-blue-500/50">ج.م</span></p>
                  </div>

                  <button type="submit" className="bg-[#25D366] hover:bg-[#1EBE5A] text-white px-8 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-[0_0_30px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_-5px_rgba(37,211,102,0.6)] flex items-center gap-3">
                    إرسال واتساب
                    <MessageCircle size={24} />
                  </button>
                </div>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

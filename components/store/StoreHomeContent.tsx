"use client";

import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, Clock, HeadphonesIcon, Smartphone } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function StoreHomeContent({ products }: { products: any[] }) {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-[#050810] text-white font-sans overflow-hidden selection:bg-blue-500/30" dir="rtl">

      {/* --- Sleek Tech Hero Section with Framer Motion --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-28 overflow-hidden border-b border-white/5">

        {/* Modern Depth Grid Background (Pure Tailwind) */}
        <div className="absolute inset-0 bg-[length:60px_60px] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)] pointer-events-none" />

        {/* Subtle Ambient Tech Glows */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-1/4 w-[30rem] h-[15rem] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"
        />

        <motion.div
          style={{ y: heroY }}
          className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center"
        >

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-10 overflow-hidden relative group"
          >
            {/* sweeping mini light with Framer Motion */}
            <motion.div
              initial={{ x: "100%", skewX: -15 }}
              animate={{ x: "-200%", skewX: -15 }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeOut", delay: 1 }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent pointer-events-none "
            />
            <ShieldCheck size={16} className="text-blue-500" />
            <span className="text-sm font-bold text-blue-200 tracking-wide">الخيار رقم 1 لإكسسوارات الموبايل في أسوان</span>
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
              hidden: {}
            }}
            style={{ perspective: 1000 }}
            dir="ltr"
            className="text-7xl sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-black tracking-normal mb-8 flex items-center justify-center gap-2 md:gap-6 relative leading-none z-20"
          >
            {"YORA".split("").map((letter, index) => (
              <motion.span 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 150, rotateX: 90, scale: 0.8, filter: "blur(20px)" },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0, 
                    scale: 1, 
                    filter: "blur(0px)",
                    transition: { type: "spring", damping: 14, stiffness: 100 } 
                  },
                }}
                className="inline-block relative text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-500 drop-shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
              >
                {letter}
                {/* Secondary Luminous Flare hitting each letter individually */}
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0, 2, 0] }}
                  transition={{ delay: 1.2 + index * 0.15, duration: 1, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-400 rounded-full blur-[20px] pointer-events-none mix-blend-screen"
                />
              </motion.span>
            ))}
            
            {/* Hologram Light Sweep Effect */}
            <motion.div 
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: [0, 0.5, 0], x: "100%" }}
              transition={{ delay: 2, duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-[30deg] pointer-events-none blur-[4px]"
            />
          </motion.h1>

          <div className="border-t border-white/5 pt-8 mb-12 max-w-3xl mx-auto flex flex-col items-center">
            <div dir="ltr" className="text-2xl md:text-3xl font-medium leading-relaxed flex flex-wrap justify-center gap-3">
              <motion.span 
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                className="text-slate-300"
              >
                Smart Accessories.
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
                className="text-blue-400 font-bold"
              >
                Smart Choice.
              </motion.span>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              dir="rtl"
              className="text-lg md:text-xl text-slate-500 mt-5 leading-loose font-normal text-center max-w-2xl mx-auto"
            >
              وجهتك الأساسية لاكتشاف أرقى إكسسوارات الجوال المبتكرة، مُصممة للمزج بين أناقة جهازك ومنحك تجربة تقنية متكاملة لا مثيل لها.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }}
          >
            <Link href="/products" className="h-[4.5rem] flex items-center justify-center px-10 text-xl rounded-2xl bg-white hover:bg-slate-200 text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-2 font-black group w-full sm:w-auto relative z-20">
              تصفح التشكيلة
              <ShoppingBag className="mr-3 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Why Choose Us Section (Staggered Animation) --- */}
      <section className="py-24 bg-[#0A0F1C]/40 border-y border-white/5 relative z-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">لماذا <span className="text-blue-500">YORA</span>؟</h2>
            <p className="text-slate-400 font-medium text-lg">مميزات تجعلنا خيارك الأول دائماً في أسوان</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "ضمان حقيقي", desc: "جميع منتجاتنا خاضعة لأقصى معايير الجودة ومشمولة بضمان استرجاع حازم." },
              { icon: Truck, title: "توصيل سريع جداً", desc: "فريق شحننا الاحترافي يضمن وصول منتجك لمنزلك في أسوان بأسرع وقت." },
              { icon: Clock, title: "تحديثات باستمرار", desc: "نجلب أحدث الإصدارات العالمية من الإكسسوارات فور إطلاقها عالمياً." },
              { icon: HeadphonesIcon, title: "دعم فني متواصل", desc: "متواجدون دائماً للرد على استفساراتك وتقديم المساعدة التقنية." },
            ].map((Feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#0A0F1C]/40 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl text-center group hover:border-blue-500/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800 text-blue-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{Feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{Feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Latest Products with Framer Motion --- */}
      <section className="relative z-20 bg-[#050810] py-32 container mx-auto px-6 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6 pb-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              أحدث <span className="text-blue-500">المنتجات</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg">خيارات النخبة الموصى بها لك</p>
          </div>
          <Link href="/products" className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3.5 rounded-2xl font-bold transition-all flex items-center gap-2 hover:gap-4 group">
            عرض القائمة الكاملة <ArrowLeft size={18} className="text-slate-400 group-hover:text-white transition-colors" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
            >
              <Link
                href={`/product/${product.id}`}
                className="block bg-[#0A0F1C]/40 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden group hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)] flex-col"
              >
                <div className="relative aspect-square w-full bg-[#030508] overflow-hidden p-6 flex flex-col items-center justify-center">
                  {product.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <motion.img
                      whileHover={{ scale: 1.1, rotate: -3 }}
                      transition={{ duration: 0.5 }}
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center shrink-0">
                      <span className="text-slate-800 font-black text-6xl opacity-30 -rotate-12 group-hover:scale-110 transition-transform duration-700">YORA</span>
                    </div>
                  )}
                  {product.category && (
                    <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[13px] font-bold text-slate-200 z-20 shadow-xl">
                      {product.category.name}
                    </div>
                  )}
                </div>
                <div className="p-7 flex-1 flex flex-col bg-[#0A0F1C]/80 border-t border-white/5">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-6 font-medium">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-3xl font-black text-white flex items-end gap-1">
                      {product.price} <span className="text-base text-blue-500 mb-1">ج.م</span>
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 hover:scale-110 shadow-sm">
                      <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Footer Area --- */}
      <footer className="py-16 text-center text-slate-500 font-medium relative z-10 bg-[#030508]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.jpg" alt="YORA Logo" className="h-12 w-auto object-contain mx-auto mb-6 rounded-lg opacity-40 grayscale hover:opacity-100 transition-opacity duration-500" />
        <p>© {new Date().getFullYear()} Yora Store. جميع الحقوق محفوظة المتجر الأفضل في أسوان.</p>
      </footer>
    </div>
  );
}

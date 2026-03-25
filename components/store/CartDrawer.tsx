"use client";

import { useCart } from "./CartContext";
import { X, Trash2, Plus, Minus, ShoppingCart, MessageCircle, MapPin, User, Phone, Tag } from "lucide-react";
import { useState } from "react";

export function CartDrawer({ whatsappNumber = "201000000000" }: { whatsappNumber?: string }) {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("حقول الإسم ورقم الهاتف والعنوان مطلوبة!");
      return;
    }
    
    let orderDetails = cart.map(i => `- ${i.quantity}x ${i.name} (${i.price * i.quantity} ج.م)`).join("\n");
    
    const message = `
*🛒 طلب شراء من سلة YORA*
━━━━━━━━━━━━━━━━━━
*بيانات العميل:*
👤 *الاسم:* ${formData.name}
📱 *الهاتف:* ${formData.phone}
🏠 *العنوان التفصيلي:* 
${formData.address}
━━━━━━━━━━━━━━━━━━
*📝 المنتجات المطلوبة:*
${orderDetails}
━━━━━━━━━━━━━━━━━━
*💰 الإجمالي المطلوب:* ${totalPrice} ج.م
    `.trim();

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
    clearCart();
    setIsCartOpen(false);
    setIsCheckingOut(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex" dir="rtl">
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsCartOpen(false)} />
      
      {/* Right Drawer */}
      <div className="absolute top-0 bottom-0 right-0 w-full max-w-[28rem] bg-[#0B1120] border-l border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col animate-in slide-in-from-right-full duration-500 ease-out">
        
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-black text-white flex items-center gap-3">
            <ShoppingCart size={24} className="text-blue-500" />
            سلة المشتريات
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{cart.length}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto override-scrollbar p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <ShoppingCart size={64} className="opacity-20" />
              <p className="text-xl font-bold">السلة فارغة حالياً</p>
              <button onClick={() => setIsCartOpen(false)} className="px-6 py-3 mt-4 rounded-xl bg-blue-600/10 text-blue-500 font-bold hover:bg-blue-600 hover:text-white transition-all">
                متابعة التسوق
              </button>
            </div>
          ) : isCheckingOut ? (
             <form id="checkoutForm" onSubmit={handleCheckout} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl mb-6 flex items-center justify-between">
                  <span className="font-bold text-blue-400">إجمالي السلة:</span>
                  <span className="text-2xl font-black text-white">{totalPrice} ج.م</span>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2"><User size={16} /> الاسم بالكامل</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium" placeholder="مثال: يوسف أحمد" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2"><Phone size={16} /> رقم هاتف متاح</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-black/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium text-left" placeholder="01X XXXX XXXX" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2"><MapPin size={16} /> العنوان التفصيلي</label>
                  <textarea required rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-black/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium resize-none" placeholder="المحافظة، المدينة، الشارع، رقم العمارة والشقة..." />
                </div>
             </form>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {cart.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-4 relative group">
                  <div className="w-20 h-20 rounded-xl bg-black/50 overflow-hidden border border-white/10 shrink-0 flex items-center justify-center">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <Tag size={20} className="text-slate-600" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-white text-sm line-clamp-2 md:text-base leading-tight pr-5">{item.name}</h3>
                    <p className="text-blue-400 font-black mt-2">{item.price} ج.م</p>
                    
                    <div className="flex items-center gap-3 mt-auto pt-2">
                      <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/5">
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-md bg-white/5 hover:bg-blue-500/20 text-white flex items-center justify-center transition-colors">
                          <Plus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm select-none">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors disabled:opacity-50">
                          <Minus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="absolute top-4 left-4 text-rose-500/50 hover:text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 p-2 rounded-lg transition-all">
                     <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-[#060a11]/80 backdrop-blur-xl">
            {!isCheckingOut ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-slate-400 font-bold">الإجمالي المبدئي:</span>
                  <span className="text-3xl font-black text-white">{totalPrice} <span className="text-sm text-blue-500">ج.م</span></span>
                </div>
                <button onClick={() => setIsCheckingOut(true)} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2">
                  إتمام الطلب <ShoppingCart size={20} />
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setIsCheckingOut(false)} className="w-1/3 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold transition-all text-slate-300">
                  رجوع
                </button>
                <button type="submit" form="checkoutForm" className="w-2/3 bg-[#25D366] hover:bg-[#1EBE5A] text-white py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_30px_-5px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2">
                  تأكيد واتساب <MessageCircle size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

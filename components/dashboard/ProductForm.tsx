"use client";

import { useState, useTransition } from "react";
import { createProductAction, updateProductAction } from "@/lib/actions/product.actions";
import { useRouter } from "next/navigation";
import { Save, Tag, AlignLeft, DollarSign, Box, Layers, ImagePlus, X, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
};

type ProductData = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
};

export function ProductForm({ categories, initialData }: { categories: Category[], initialData?: ProductData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Cloudinary image upload states
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  // Function to handle image upload directly to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    setError(null);
    
    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dmnhnwvxj";

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "yora_preset");

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("فشل رفع الصور، يرجى التأكد من اتصالك أو إعدادات يورا.");
        
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      }
      
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع أثناء الرفع.");
    } finally {
      setIsUploading(false);
      // Reset the input value so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    // Attach the collected Cloudinary URLs manually before submitting
    formData.append("images", JSON.stringify(images));

    startTransition(async () => {
      const result = initialData 
        ? await updateProductAction(initialData.id, formData)
        : await createProductAction(formData);
        
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard/products");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pt-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 flex items-center gap-3 animate-in fade-in zoom-in-95">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {categories.length === 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50">
          <p className="font-bold flex items-center gap-2">
            <Layers size={18} />
            تنبيه: لا يوجد أي أقسام (Categories) حالياً.
          </p>
          <p className="text-sm mt-1 opacity-80">يرجى إضافة قسم أولاً لتتمكن من إضافة هذا المنتج.</p>
        </div>
      )}

      <div className="bg-white dark:bg-[#121216] p-8 md:p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-10 relative overflow-hidden">
        
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* --- Image Upload Section --- */}
        <div className="space-y-4 relative z-10 border-b border-slate-100 dark:border-slate-800 pb-10">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <ImagePlus size={20} className="text-sky-500" />
            صور المنتج
          </label>
          <p className="text-slate-500 text-sm font-medium">سيتم رفع الصور مباشرة إلى خوادم Cloudinary السحابية بشكل آمن.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
            {images.map((url, index) => (
              <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`صورة المنتج ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-110 shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex flex-col items-center justify-center cursor-pointer text-slate-500 dark:text-slate-400 hover:text-blue-500">
              {isUploading ? (
                <>
                  <Loader2 size={28} className="animate-spin text-blue-500 mb-2" />
                  <span className="font-bold text-xs">جاري الرفع...</span>
                </>
              ) : (
                <>
                  <ImagePlus size={28} className="mb-2" />
                  <span className="font-bold text-xs">أضف صورة</span>
                </>
              )}
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                disabled={isUploading}
                onChange={handleImageUpload} 
              />
            </label>
          </div>
        </div>
        {/* --- End of Image Upload Section --- */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Tag size={18} className="text-blue-500" />
              اسم المنتج
            </label>
            <input 
              required
              name="name"
              placeholder="مثال: كفر حماية ايفون 15 برو ماكس"
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Layers size={18} className="text-purple-500" />
              القسم (Category)
            </label>
            <div className="relative">
              <select 
                required
                name="categoryId"
                defaultValue={initialData?.categoryId || ""}
                className="w-full appearance-none bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium"
              >
                <option value="" disabled>اختر القسم المناسب...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="absolute top-1/2 left-5 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <AlignLeft size={18} className="text-indigo-500" />
            وصف المنتج
          </label>
          <textarea 
            required
            name="description"
            defaultValue={initialData?.description || ""}
            rows={5}
            placeholder="اكتب وصفاً جذاباً وتفصيلياً للمنتج يلفت انتباه العملاء..."
            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-500" />
              السعر (ج.م)
            </label>
            <input 
              required
              type="number"
              step="0.01"
              name="price"
              defaultValue={initialData?.price || ""}
              placeholder="0.00"
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-bold tracking-wider"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Box size={18} className="text-amber-500" />
              الكمية المتوفرة
            </label>
            <input 
              required
              type="number"
              name="stock"
              defaultValue={initialData?.stock || ""}
              placeholder="مثال: 50"
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-bold tracking-wider"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center gap-4 pt-4">
        <Link 
          href="/dashboard"
          className="w-full md:w-auto px-8 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#121216] transition-all text-center"
        >
          إلغاء والعودة
        </Link>
        <button 
          disabled={isPending || categories.length === 0 || isUploading}
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group mr-auto"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={20} className="group-hover:scale-110 transition-transform" />
          )}
          {isPending ? "جاري الحفظ..." : initialData ? "حفظ التعديلات" : "حفظ المنتج ورفعه"}
        </button>
      </div>
    </form>
  );
}

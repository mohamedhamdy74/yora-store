"use client";

import { useState, useTransition } from "react";
import { createCategoryAction } from "@/lib/actions/category.actions";
import { useRouter } from "next/navigation";
import { Save, Layers } from "lucide-react";
import Link from "next/link";

export function CategoryForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createCategoryAction(formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard/categories");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl pt-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 flex items-center gap-3 animate-in fade-in zoom-in-95">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <p className="font-bold">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-[#121216] p-8 md:p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8 relative overflow-hidden">
        
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Layers size={18} className="text-purple-500" />
            اسم القسم
          </label>
          <input 
            required
            name="name"
            placeholder="مثال: واقي شاشة (Screen Protectors)"
            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium"
          />
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
          disabled={isPending}
          type="submit"
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group mr-auto"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={20} className="group-hover:scale-110 transition-transform" />
          )}
          {isPending ? "جاري الحفظ..." : "حفظ القسم"}
        </button>
      </div>
    </form>
  );
}

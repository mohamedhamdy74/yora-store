import { CategoryForm } from "@/components/dashboard/CategoryForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "إضافة قسم جديد - Yora Store",
};

export default function NewCategoryPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 slide-in-from-bottom-4 max-w-4xl mx-auto">
      <div className="flex flex-col gap-3">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-fit font-bold group"
        >
          <ArrowRight size={20} className="group-hover:-translate-x-1 transition-transform" />
          العودة للرئيسية
        </Link>
        <div className="mt-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            إضافة قسم جديد
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mt-3 text-[15px] leading-relaxed">
            القسم يساعد في تنظيم المنتجات بشكل احترافي. بمجرد إنشاءالقسم ستتمكن من ربط منتجاتك به لاحقاً من صفحة المنتجات.
          </p>
        </div>
      </div>

      <CategoryForm />
    </div>
  );
}

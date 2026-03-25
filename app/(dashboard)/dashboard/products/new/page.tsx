import { ProductForm } from "@/components/dashboard/ProductForm";
import { CategoryRepository } from "@/lib/repositories/category.repository";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "إضافة منتج جديد - Yora Store",
};

export default async function NewProductPage() {
  // Fetch categories directly from database safely via the repository in this Server Component
  const categories = await CategoryRepository.getAll();

  return (
    <div className="space-y-6 animate-in fade-in duration-700 slide-in-from-bottom-4 max-w-5xl mx-auto">
      <div className="flex flex-col gap-3">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit font-bold group"
        >
          <ArrowRight size={20} className="group-hover:-translate-x-1 transition-transform" />
          العودة للرئيسية
        </Link>
        <div className="mt-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            إضافة منتج جديد
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mt-3 text-[15px] leading-relaxed">
            قم بإدخال تفاصيل المنتج بدقة أدناه. بمجرد الضغط على الحفظ، سيتم تحديث المخزن وإتاحة المنتج للعملاء في واجهة المتجر.
          </p>
        </div>
      </div>

      {/* Exclude dates and complex fields from Prisma category to pass safely to Client Component */}
      <ProductForm 
        categories={categories.map(c => ({ id: c.id, name: c.name }))} 
      />
    </div>
  );
}

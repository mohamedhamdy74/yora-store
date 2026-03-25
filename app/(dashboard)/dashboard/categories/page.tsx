import { CategoryRepository } from "@/lib/repositories/category.repository";
import { deleteCategoryAction } from "@/lib/actions/category.actions";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Layers } from "lucide-react";

export const revalidate = 0;

export default async function CategoriesDashboardPage() {
    const categories = await CategoryRepository.getAll();

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto" dir="rtl">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">إدارة الأقسام</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">أضف أو عدل أو احذف أقسام المتجر للتحكم بتصنيف المنتجات.</p>
                </div>
                <Link
                    href="/dashboard/categories/new"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 active:scale-95 group"
                >
                    <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    إضافة قسم جديد
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-white dark:bg-[#0A0F1C] p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all group relative overflow-hidden">
                        {/* Background Hover Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 text-blue-600 dark:text-blue-500 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform duration-500">
                                <Layers size={32} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={`/dashboard/categories/${cat.id}/edit`} className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors">
                                    <Edit size={20} />
                                </Link>
                                <form action={async () => {
                                    "use server";
                                    await deleteCategoryAction(cat.id);
                                }}>
                                    <button type="submit" className="p-2.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{cat.name}</h3>
                            <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-transparent">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" /> تم الإنشاء: {new Date(cat.createdAt).toLocaleDateString('ar-EG')}
                            </div>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-slate-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-300 dark:border-white/10">
                        <Layers size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-6" />
                        <h3 className="text-2xl font-black text-slate-700 dark:text-white mb-3 tracking-tight">لا توجد أقسام بعد</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">قم بإضافة قسم جديد للبدء في تنظيم المنتجات وتسهيل التصفح على زوار متجرك.</p>
                        <Link
                            href="/dashboard/categories/new"
                            className="inline-flex bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold items-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] active:scale-95"
                        >
                            <PlusCircle size={20} /> إضافة قسمك الأول
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

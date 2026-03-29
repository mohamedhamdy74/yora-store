import { ProductRepository } from "@/lib/repositories/product.repository";
import { deleteProductAction } from "@/lib/actions/product.actions";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Package } from "lucide-react";
import Image from "next/image";

export const revalidate = 0;

export default async function ProductsDashboardPage() {
  const productsData = await ProductRepository.getAllPaginated({}, 1, 30);
  const products = productsData.data;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">إدارة المنتجات</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">أضف أو عدل أو احذف منتجاتك وحدث المخزون.</p>
        </div>
        <Link 
          href="/dashboard/products/new" 
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 active:scale-95 group"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" /> 
          إضافة منتج جديد
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-[#0A0F1C] p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="relative w-20 h-20 rounded-2xl bg-slate-50 dark:bg-white/5 text-blue-600 dark:text-blue-500 flex items-center justify-center border border-slate-100 dark:border-white/5 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                {product.images?.length > 0 ? (
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover mix-blend-multiply dark:mix-blend-normal" />
                ) : (
                  <Package size={32} />
                )}
              </div>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-[1rem] border border-slate-100 dark:border-white/5">
                <Link href={`/dashboard/products/${product.id}/edit`} className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-white/5 rounded-xl transition-all shadow-sm">
                  <Edit size={18} />
                </Link>
                <form action={async () => {
                  "use server";
                  await deleteProductAction(product.id);
                }}>
                  <button type="submit" className="p-2.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-white/5 rounded-xl transition-all shadow-sm">
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col flex-1">
              <h3 className="text-lg font-black text-slate-800 dark:text-white mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1 font-medium">{product.description}</p>
              
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 drop-shadow-sm">
                  {product.price} <span className="text-sm">ج.م</span>
                </div>
                {(product as any).oldPrice && (product as any).oldPrice > product.price && (
                  <>
                    <div className="text-sm text-slate-400 dark:text-slate-500 line-through font-bold">
                      {(product as any).oldPrice} ج.م
                    </div>
                    <div className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold px-2 py-1 rounded-lg">
                      خصم {Math.round((((product as any).oldPrice - product.price) / (product as any).oldPrice) * 100)}%
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-5">
                 <span className={`px-4 py-2 rounded-xl text-xs font-black ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20'}`}>
                    {product.stock > 0 ? 'متوفرة للبيع' : 'نفذت الكمية'}
                 </span>
                 <span className="text-sm font-bold text-slate-400 flex items-center gap-2">
                   المخزون: <span className="text-slate-700 dark:text-white">{product.stock}</span>
                 </span>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center py-24 bg-slate-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-300 dark:border-white/10 shadow-inner">
            <Package size={72} className="mx-auto text-slate-300 dark:text-slate-600 mb-6" />
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">لا توجد منتجات حتى الآن</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg">مبيعاتك تبدأ من هنا. أضف منتجاتك لتظهر أمام كل زوار المتجر فوراً.</p>
            <Link 
              href="/dashboard/products/new" 
              className="inline-flex bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-lg items-center gap-3 transition-all shadow-[0_0_40px_-5px_rgba(37,99,235,0.4)] active:scale-95"
            >
              <PlusCircle size={24} /> أضف منتجك الأول
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

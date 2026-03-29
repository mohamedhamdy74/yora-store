import { ProductRepository } from "@/lib/repositories/product.repository";
import { CategoryRepository } from "@/lib/repositories/category.repository";
import { Pagination } from "@/components/dashboard/Pagination";
import { StoreFilters } from "@/components/store/StoreFilters";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "تصفح المنتجات - Yora Store",
  description: "ابحث وتصفح جميع منتجات واكسسوارات الموبايل المتاحة",
};

export default async function ProductsStorePage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const query = typeof searchParams?.query === 'string' ? searchParams.query : undefined;
  const categoryId = typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  // We fetch All categories for the dropdown without pagination, and Paginated products matching filters
  const [categories, productsData] = await Promise.all([
    CategoryRepository.getAll(),
    ProductRepository.getAllPaginated({ query, categoryId, inStock: true }, page, 12)
  ]);

  const { data: products, totalPages } = productsData;

  return (
    <div className="min-h-screen bg-[#060a11] text-white font-sans selection:bg-blue-500/30" dir="rtl">
      
      {/* Mini Header & Breadcrumb */}
      <div className="bg-[#0B1120] border-b border-white/5 pt-28 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none transform-gpu" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">التشكيلة الكاملة</h1>
          <p className="text-slate-400 font-medium">كل ما تحتاجه لجوالك في مكان واحد وبأفضل جودة ممكنة.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-20">
        
        {/* Pass fetched Categories to the interactive Filters component */}
        <StoreFilters categories={categories.map(c => ({ id: c.id, name: c.name }))} />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <Link 
              href={`/product/${product.id}`}
              key={product.id} 
              className="bg-[#0a0f1c]/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden group hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.25)] flex flex-col animate-in fade-in slide-in-from-bottom-10 transform-gpu"
              style={{ animationFillMode: "both", animationDelay: `${(i % 4) * 100}ms`, animationDuration: "800ms" }}
            >
              <div className="relative aspect-square w-full bg-[#080d17] overflow-hidden p-6 flex flex-col items-center justify-center">
                {product.images?.[0] ? (
                  <div className="relative w-full h-full filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
                    <Image 
                      src={product.images[0]} 
                      alt={product.name} 
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center shrink-0">
                    <span className="text-slate-800 select-none font-black text-6xl opacity-30 -rotate-12 group-hover:scale-110 transition-transform duration-700">YORA</span>
                  </div>
                )}
                {product.category && (
                  <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[13px] font-bold text-slate-200 shadow-xl z-20">
                    {product.category.name}
                  </div>
                )}
              </div>
              
              <div className="p-7 flex-1 flex flex-col flex-grow bg-gradient-to-b from-transparent to-[#080d17]/80">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-8 font-medium">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-white flex items-end gap-1">
                      {product.price} <span className="text-base text-blue-500 mb-1">ج.م</span>
                    </span>
                    {(product as any).oldPrice && (product as any).oldPrice > product.price && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-slate-500 line-through">{(product as any).oldPrice}</span>
                        <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-md font-bold text-nowrap">خصم {Math.round((((product as any).oldPrice - product.price) / (product as any).oldPrice) * 100)}%</span>
                      </div>
                    )}
                  </div>
                  
                  <button className="w-14 h-14 shrink-0 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 hover:scale-110">
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty Search States */}
        {products.length === 0 && (
          <div className="text-center py-24 bg-[#0a0f1c]/50 backdrop-blur-xl rounded-[3rem] border border-slate-800 shadow-2xl animate-in fade-in">
            <ShoppingBag size={64} className="mx-auto text-slate-600 mb-6" />
            <h3 className="text-3xl font-black text-white mb-4">لا توجد نتائج مطابقة</h3>
            <p className="text-slate-400 text-lg">لم نتمكن من العثور على منتجات تطابق بحثك المغذّى، حاول تقليل عوامل التصفية.</p>
          </div>
        )}

        {/* Universal Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 bg-[#0a0f1c]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] max-w-lg mx-auto">
            <Pagination currentPage={page} totalPages={totalPages} baseUrl="/products" />
          </div>
        )}

      </div>
    </div>
  );
}

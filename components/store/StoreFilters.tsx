"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { useState, useTransition } from "react";

type Category = {
  id: string;
  name: string;
};

export function StoreFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams(query, category);
  };

  const updateParams = (newQuery: string, newCat: string) => {
    const params = new URLSearchParams(searchParams);
    if (newQuery) params.set("query", newQuery);
    else params.delete("query");
    
    if (newCat) params.set("category", newCat);
    else params.delete("category");

    params.set("page", "1"); // Reset to page 1 on filter
    
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    startTransition(() => {
      router.push(`/products`);
    });
  };

  const hasFilters = query || category;

  return (
    <div className="bg-[#0a0f1c]/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 mb-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 w-full animate-in fade-in zoom-in-95 duration-500">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full group">
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن اسم منتج أو وصف..." 
            className="w-full bg-black/50 border border-slate-800 rounded-2xl pr-12 pl-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-600 shadow-inner"
          />
        </div>

        {/* Category Select */}
        <div className="relative w-full md:w-64 group shrink-0">
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-500 transition-colors z-10">
            <Filter size={20} />
          </div>
          <select 
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              updateParams(query, e.target.value);
            }}
            className="w-full appearance-none bg-black/50 border border-slate-800 rounded-2xl pr-12 pl-10 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold cursor-pointer shadow-inner relative z-0"
          >
            <option value="">جميع الأقسام</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 z-10">
            ▼
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full md:w-auto gap-3 shrink-0">
          <button 
            type="submit" 
            disabled={isPending}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50"
          >
            {isPending ? "جاري..." : "بحث متقدم"}
          </button>
          
          {hasFilters && (
            <button 
              type="button" 
              onClick={clearFilters}
              disabled={isPending}
              className="px-4 py-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 transition-all flex items-center justify-center shrink-0"
              title="مسح الفلاتر"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

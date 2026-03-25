import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function Pagination({ currentPage, totalPages, baseUrl }: { currentPage: number, totalPages: number, baseUrl: string }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 p-6 border-t border-slate-100 dark:border-slate-800/50" dir="rtl">
      {/* Previous Page (RTL means right arrow is previous) */}
      <Link
        href={`${baseUrl}?page=${Math.max(1, currentPage - 1)}`}
        className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm ${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-600'}`}
      >
        <ChevronRight size={20} className="text-slate-600 dark:text-slate-300" />
      </Link>
      
      <div className="flex items-center gap-1.5 px-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          const isActive = p === currentPage;
          return (
            <Link
              key={p}
              href={`${baseUrl}?page=${p}`}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-500' : 'text-slate-600 dark:text-slate-400 border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}
            >
              {p}
            </Link>
          );
        })}
      </div>

      <Link
        href={`${baseUrl}?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-600'}`}
      >
        <ChevronLeft size={20} className="text-slate-600 dark:text-slate-300" />
      </Link>
    </div>
  );
}

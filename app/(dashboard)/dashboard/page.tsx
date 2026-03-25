import { Package, Layers, TrendingUp, DollarSign } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardHomePage() {
  const productsCount = await prisma.product.count();
  const categoriesCount = await prisma.category.count();
  
  // Aggregate sum of stock
  const stockAggregate = await prisma.product.aggregate({
    _sum: { stock: true }
  });
  const totalStock = stockAggregate._sum.stock || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">نظرة عامة</h1>
          <p className="text-slate-500 font-medium mt-2">إحصائيات متجرك (Yora) في لمحة سريعة</p>
        </div>
        <Link 
          href="/dashboard/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2 group"
        >
          <Package size={22} className="group-hover:rotate-12 transition-transform" />
          إضافة منتج جديد
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="إجمالي المنتجات" 
          value={productsCount.toString()} 
          icon={<Package className="text-blue-600 dark:text-blue-400" size={26} />} 
          trend="عدد المنتجات المضافة"
          bgColor="bg-blue-100/50 dark:bg-blue-900/30"
        />
        <StatCard 
          title="الأقسام" 
          value={categoriesCount.toString()} 
          icon={<Layers className="text-purple-600 dark:text-purple-400" size={26} />} 
          trend="أقسام المتجر مفلتلة"
          bgColor="bg-purple-100/50 dark:bg-purple-900/30"
        />
        <StatCard 
          title="عناصر في المخزن" 
          value={totalStock.toString()} 
          icon={<TrendingUp className="text-emerald-600 dark:text-emerald-400" size={26} />} 
          trend="إجمالي القطع المتوفرة"
          bgColor="bg-emerald-100/50 dark:bg-emerald-900/30"
        />
        <StatCard 
          title="المبيعات (تجريبي)" 
          value="0 ج.م" 
          icon={<DollarSign className="text-amber-600 dark:text-amber-400" size={26} />} 
          trend="في انتظار الطلبات الأولى"
          bgColor="bg-amber-100/50 dark:bg-amber-900/30"
        />
      </div>

      {/* Modern Banner/Chart Placeholder */}
      <div className="mt-12 bg-white dark:bg-[#121216] rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/40 dark:shadow-none flex items-center justify-center min-h-[320px] relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <TrendingUp size={36} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">تحليلات المتجر المعمقة قادمة</h3>
          <p className="text-slate-500 mt-3 font-medium max-w-lg mx-auto leading-relaxed">
            سيتم هنا إضافة رسومات تفاعلية (Charts) توضح تتبع حركة المبيعات وتفاعل الزوار مع الملحقات الخاصة بك بشكل احترافي.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, bgColor }: { title: string, value: string, icon: React.ReactNode, trend: string, bgColor: string }) {
  return (
    <div className="bg-white dark:bg-[#121216] rounded-3xl p-7 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50 duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className={`p-4 rounded-2xl ${bgColor}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-slate-500 dark:text-slate-400 font-bold mb-2">{title}</h3>
      <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white capitalize">{value}</h2>
      <p className="text-[13px] text-slate-400 dark:text-slate-500 mt-4 font-bold">{trend}</p>
    </div>
  );
}
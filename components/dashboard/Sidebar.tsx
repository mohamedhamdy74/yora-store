"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Settings,
  Store,
  Menu,
  X,
  PlusCircle,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const NAV_LINKS = [
  { name: "الرئيسية", href: "/dashboard", icon: LayoutDashboard },
  { name: "المنتجات", href: "/dashboard/products", icon: Package },
  { name: "الأقسام", href: "/dashboard/categories", icon: Layers },
  { name: "واجهة المتجر", href: "/", icon: Store },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createBrowserClient(supabaseUrl, supabaseKey);
      await supabase.auth.signOut();
      setIsOpen(false);
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <>
      {/* Mobile Top Navbar (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b z-50 flex items-center justify-between px-4" dir="rtl">
        <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Yora Store
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gray-100/80 dark:bg-gray-800/80 rounded-xl text-gray-700 dark:text-gray-300 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar & Mobile Drawer */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 right-0 z-50 w-72 bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl border-l border-gray-200 dark:border-gray-800 shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:mt-16",
          isOpen ? "translate-x-0" : "max-md:translate-x-full",
          "md:translate-x-0" // Always show on desktop
        )}
        dir="rtl"
      >
        <div className="h-full flex flex-col pt-8 pb-6">
          <div className="px-8 mb-10 max-md:hidden">
            <h1 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">
              Yora <span className="text-blue-600">Admin</span>
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-2">متجر اكسسوارات الموبايل</p>
          </div>

          <nav className="flex-1 px-4 space-y-2 overflow-y-auto override-scrollbar">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;

              // Find the longest matching href to prevent multiple highlights
              const activeLinkHref = NAV_LINKS.reduce((prev, curr) => {
                if ((pathname === curr.href || pathname?.startsWith(curr.href + "/")) && curr.href.length > prev.length) {
                  return curr.href;
                }
                return prev;
              }, "");

              const isExactActive = link.href === activeLinkHref;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                    isExactActive
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                      : "text-gray-600 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon
                    size={22}
                    className={cn(
                      "transition-transform duration-300",
                      isExactActive
                        ? "scale-110"
                        : "group-hover:scale-110 group-hover:-rotate-3"
                    )}
                  />
                  <span className="font-bold text-[15px]">{link.name}</span>

                  {isExactActive && (
                    <div className="absolute left-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </Link>
              );
            })}

            {/* Secure Logout Action */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-start gap-4 px-4 py-3.5 mt-2 rounded-2xl transition-all duration-300 group text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 hover:shadow-lg hover:shadow-rose-500/10"
            >
              <LogOut size={22} className="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
              <span className="font-bold text-[15px]">إنهاء الجلسة</span>
            </button>
          </nav>

          <div className="px-6 mt-auto">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">مركز المساعدة</p>
              <p className="text-xs font-medium text-blue-600/80 dark:text-blue-400/80">فريق الدعم متاح دائماً</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

import { Sidebar } from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Yora Store - Dashboard",
  description: "لوحة تحكم متجر يورا لاكسسوارات الموبايل",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/40">
      <Sidebar />
      <main className="flex-1 md:pr-72 max-md:mt-16 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}

import { CategoryRepository } from "@/lib/repositories/category.repository";
import { CategoryForm } from "@/components/dashboard/CategoryForm";
import { redirect } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const category = await CategoryRepository.getById(resolvedParams.id);
  
  if (!category) {
    redirect("/dashboard/categories");
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto" dir="rtl">
      <div className="mb-10 block">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">تعديل القسم</h1>
        <p className="text-slate-500 font-medium">تعديل بيانات {category.name}</p>
      </div>

      <CategoryForm initialData={category} />
    </div>
  );
}

import { ProductRepository } from "@/lib/repositories/product.repository";
import { CategoryRepository } from "@/lib/repositories/category.repository";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { redirect } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await ProductRepository.getById(resolvedParams.id);
  const categories = await CategoryRepository.getAll();

  if (!product) {
    redirect("/dashboard/products");
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto" dir="rtl">
      <div className="mb-10 block">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">تعديل المنتج</h1>
        <p className="text-slate-500 font-medium">تعديل بيانات {product.name}</p>
      </div>

      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}

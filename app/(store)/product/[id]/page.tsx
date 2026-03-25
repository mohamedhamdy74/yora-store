import { ProductRepository } from "@/lib/repositories/product.repository";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "@/components/store/ProductDetailsClient";

// Ensures page re-evaluates properly when tracking dynamic paths in SSG mode
export const revalidate = 0;

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await ProductRepository.getById(params.id);

  return {
    title: product ? `${product.name} - Yora Store` : "المنتج غير موجود - Yora",
    description: product?.description || "اكسسوارات موبايل وحماية بأسعار قوية حصريا في أسوان",
  };
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await ProductRepository.getById(params.id);

  if (!product) {
    notFound();
  }

  // The client WhatsApp number mapped dynamically from ENV variables; fallbacks if null.
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  return (
    <div className="min-h-screen bg-[#060a11] text-white font-sans selection:bg-blue-500/30 pt-28">
      <ProductDetailsClient product={product} whatsappNumber={whatsappNumber} />
    </div>
  );
}

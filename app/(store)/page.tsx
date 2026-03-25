import { ProductRepository } from "@/lib/repositories/product.repository";
import { StoreHomeContent } from "@/components/store/StoreHomeContent";

export const revalidate = 0;

export default async function StoreHome() {
  const productsData = await ProductRepository.getAllPaginated({ inStock: true }, 1, 4);
  const products = productsData.data;

  return <StoreHomeContent products={products} />;
}

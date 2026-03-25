"use server";

import { ProductRepository } from "../repositories/product.repository";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function createProductAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const categoryId = formData.get("categoryId") as string;
    
    // Assuming images are passed as a JSON array string
    const imagesRaw = formData.get("images") as string;
    const images: string[] = imagesRaw ? JSON.parse(imagesRaw) : [];

    if (!name || !description || isNaN(price) || isNaN(stock) || !categoryId) {
      return { error: "جميع الحقول مطلوبة ويجب أن تكون صالحة (All fields are required)." };
    }

    const data: Prisma.ProductUncheckedCreateInput = {
      name,
      description,
      price,
      stock,
      categoryId,
      images,
    };

    const product = await ProductRepository.create(data);

    revalidatePath("/dashboard", "layout");
    revalidatePath("/", "layout");

    return { success: true, data: product };
  } catch (error: any) {
    return { error: error.message || "Failed to create product" };
  }
}

export async function getProductsAction() {
  try {
    const products = await ProductRepository.getAll();
    return { success: true, data: products };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch products" };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await ProductRepository.delete(id);
    
    revalidatePath("/dashboard", "layout");
    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete product" };
  }
}

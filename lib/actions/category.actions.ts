"use server";

import { CategoryRepository } from "../repositories/category.repository";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    if (!name) return { error: "Category name is required" };

    const category = await CategoryRepository.create({ name });
    
    // Revalidate paths so the new data appears immediately without reloading the page
    revalidatePath("/dashboard", "layout");
    revalidatePath("/", "layout");
    
    return { success: true, data: category };
  } catch (error: any) {
    return { error: error.message || "Failed to create category" };
  }
}

export async function getCategoriesAction() {
  try {
    const categories = await CategoryRepository.getAll();
    return { success: true, data: categories };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch categories" };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await CategoryRepository.delete(id);
    
    revalidatePath("/dashboard", "layout");
    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete category" };
  }
}

export async function updateCategoryAction(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    if (!name) return { error: "Category name is required" };

    const category = await CategoryRepository.update(id, { name });
    
    revalidatePath("/dashboard", "layout");
    revalidatePath("/", "layout");
    
    return { success: true, data: category };
  } catch (error: any) {
    return { error: error.message || "Failed to update category" };
  }
}

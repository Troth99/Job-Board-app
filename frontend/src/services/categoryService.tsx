import { API_BASE } from "./api";
import { categoryStore } from "./categoryStoreCache";


export interface Category {
  _id: string;
  name: string;
  shortName: string;
}


export async function getAllCategories(): Promise<Category[]> {

  const res = await fetch(`${API_BASE}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data: Category[] = await res.json();
  categoryStore.set(data)
  return data;
}


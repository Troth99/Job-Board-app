
import { API_BASE } from "./api";
import { Category } from "./categoryService";

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  category: Category;
  company?: { name: string };
}

export async function getJobsByCategory(categoryId: string): Promise<Job[]> {
  const res = await fetch(`${API_BASE}/jobs?category=${categoryId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

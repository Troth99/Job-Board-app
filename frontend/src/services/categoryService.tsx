import { setCategories } from "../components/Home/CategoriesSection/categoriesSlice";
import { AppDispatch, RootState } from "../redux/store";
import { API_BASE } from "./api";
import { store} from "../redux/store"
import { sendRequest } from "../utils/requester";

export interface Category {
  _id: string;
  name: string;
  shortName: string;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryById(categoryId: string) {

  try {
    if(!categoryId) {
      throw new Error('Category Id is missing.')
    }

    const res = await sendRequest(`${API_BASE}/categories/${categoryId}`, 'GET', {})
    return res
  } catch (error) {
    console.error('Failed to get category')
  }
}
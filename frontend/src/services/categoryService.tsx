import { setCategories } from "../components/Home/CategoriesSection/categoriesSlice";
import { AppDispatch, RootState } from "../redux/store";
import { API_BASE } from "./api";
import { store} from "../redux/store"

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
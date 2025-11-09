import { Category } from "./categoryService";



let categoriesCache: Category[] | null = null;

export const categoryStore = {
  get: () => categoriesCache,
  set: (data: Category[]) => {
    categoriesCache = data;
  },
  clear: () => {
    categoriesCache = null;
  }
};
import { useCategories as useCategoriesHook } from "./categories";

export { useCategories } from "./categories";

export default function useCategories() {
  const categoriesMethods = useCategoriesHook();

  return {
    loading: categoriesMethods.loading,
    categories: categoriesMethods.categories,
    getCategories: categoriesMethods.getCategories,
    getCategoryById: categoriesMethods.getCategoryById,
  };
}

import { useState } from "react";
import useApiRequester from "./useApiRequester";
import { API_BASE } from "../services/api";

export interface Category {
  _id: string;
  name: string;
  shortName: string;
}

export default function useCategories() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async (): Promise<Category[]> => {
    setLoading(true);
    try {
      const res = await request(`${API_BASE}/categories`, 'GET');
      setCategories(res);
      return res;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCategoryById = async (categoryId: string) => {
    setLoading(true);
    try {
      if (!categoryId) {
        throw new Error('Category Id is missing.');
      }
      const res = await request(`${API_BASE}/categories`, 'POST', { categoryId });
      return res;
    } catch (error) {
      console.error('Failed to get category');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    categories,
    getCategories,
    getCategoryById,
  };
}

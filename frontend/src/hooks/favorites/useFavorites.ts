import { useState } from "react";
import useApiRequester from "../useApiRequester";
import { API_BASE } from "../../services/api";

export default function useFavorites() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);

  const addJobToFavorites = async (jobId: string) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/favourites/saved-jobs/${jobId}`,
        "POST"
      );
      return response;
    } catch (error) {
      console.error("Failed to add job to favorites.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteJobFromFavorites = async (jobId: string) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/favourites/saved-jobs/${jobId}`,
        "DELETE",
        {}
      );
      return response;
    } catch (error) {
      console.error("Failed to remove job from favorites.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllFavoriteJobs = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await request(
      `${API_BASE}/favourites/saved-jobs?page=${page}&limit=${limit}`,
        "GET",
        {}
      );
      return response;
    } catch (error) {
      console.error("Failed to get favorite jobs.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addJobToFavorites,
    deleteJobFromFavorites,
    getAllFavoriteJobs,
  };
}

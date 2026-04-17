import { useState } from "react";
import useApiRequester from "./useApiRequester";
import { API_BASE } from "../services/api";

export default function useStatistics() {
  const [loading, setLoading] = useState<boolean>(false);
  const { request } = useApiRequester();

  const getApllicationStatistics = async () => {
    setLoading(true);
    try {
      const result = await request(
        `${API_BASE}/application/stats`,
        "GET",
        {},
      );
      return result;

    } catch (error) {
      console.error("Error fetching application statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    getApllicationStatistics
  }
}

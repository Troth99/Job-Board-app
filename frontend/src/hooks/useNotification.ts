import { useState } from "react";
import useApiRequester from "./useApiRequester";
import { API_BASE } from "../services/api";

export function useNotification() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllNotificationsForUser = async (userId: string) => {
    if (!userId) return;
    try {
      const response = request(
        `${API_BASE}/notifications/${userId}`,
        "GET",
        {},
      );

      
    } catch (error) {}
  };

  return {
    getAllNotificationsForUser,
  };
}

import { useState } from "react";
import useApiRequester from "./useApiRequester";
import { API_BASE } from "../services/api";

export function useNotification() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllNotificationsForUser = async (userId: string) => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/notifications/user/${userId}`,
        "GET",
        {},
      );
      return response;
    } catch (error) {
      console.error("Error fetching notifications for user.", error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationById = async (id: string) => {
    setLoading(true);
    if (!id) return;
    try {
      const response = await request(
        `${API_BASE}/notifications/${id}`,
        "GET",
        {},
      );
      return response;
    } catch (error) {
      console.error("Error fetching notification by id.", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllNotificationsForUser,
    getNotificationById,
  };
}

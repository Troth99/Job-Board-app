import { useMemo, useState } from "react";
import useApiRequester from "../shared/useApiRequester";
import { API_BASE } from "../../services/api";
import { Notification } from "../../interfaces/Notification.model";

export function useSortedNotifications(notifications: Notification[]) {
  return useMemo(
    () =>
      [...notifications].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [notifications]
  );
}

export default function useNotifications() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllNotificationsForUser = async (userId: string) => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/notifications/user/${userId}`,
        "GET",
        {}
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
        {}
      );
      return response;
    } catch (error) {
      console.error("Error fetching notification by id.", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createNotification = async (notificationData: any) => {
    console.log(notificationData);
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/notifications`,
        "POST",
        notificationData
      );
      return response;
    } catch (error) {
      console.error("Error creating notification.", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createNotificationByEmail = async (
    email: string,
    notificationData: any
  ) => {
    setLoading(true);
    try {
      const userRes = await request(
        `${API_BASE}/users/check-user-exists`,
        "POST",
        { email }
      );
      const userId = userRes?.userId;
      if (!userId) throw new Error("User not found by email");

      const response = await createNotification({
        ...notificationData,
        user: userId,
      });
      return response;
    } catch (error) {
      console.error("Error creating notification by email.", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id: string) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/notifications/${id}`,
        "DELETE",
        {}
      );
      return response;
    } catch (error) {
      console.error("Error deleting notification.", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/notifications/read/${id}`,
        "PATCH",
        {}
      );
      return response;
    } catch (error) {
      console.error("Error marking notification as read.", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getAllNotificationsForUser,
    getNotificationById,
    createNotification,
    createNotificationByEmail,
    deleteNotification,
    markAsRead,
  };
}

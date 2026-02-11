import { useEffect, useState } from "react";
import axios from "axios";
import { Notification } from "../interfaces/Notification.model";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://job-board-backend-7gfd.onrender.com";

export function useNotificationFetch(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    axios
      .get(`${API_URL}/api/notifications/${userId}`)
      .then((res) => {
        setNotifications(res.data);
        const unread = res.data.filter((n: Notification) => !n.isRead).length;
        setUnreadCount(unread);
        setError(null);
      })
      .catch((err) => {
        setError("Грешка при взимане на нотификации");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { notifications, unreadCount, loading, error };
}

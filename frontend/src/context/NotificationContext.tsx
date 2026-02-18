import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Notification,
  NotificationContextType,
} from "../interfaces/Notification.model";
import { useNotification } from "../hooks/useNotification";

type NotificationProviderProps = {
  userId: string;
  children: ReactNode;
};

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://job-board-backend-7gfd.onrender.com";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export function NotificationProvider({
  userId,
  children,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(count);
  }, [notifications]);

  const { getAllNotificationsForUser } = useNotification();

  useEffect(() => {
    if (!userId) return;

    // to do get backend notificaiton api
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotificationsForUser(userId);
        if (Array.isArray(response)) {
          setNotifications(response);
        }
      } catch (error) {
        console.error("Error getting Notificaitons", error);
      }
    };
    const evtSource = new EventSource(
      `${API_URL}/api/notifications/stream/${userId}`,
    );

    evtSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => {
        const newCount = prev + 1;
        return newCount;
      });
    };

    fetchNotifications();
    return () => evtSource.close();
  }, [userId]);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, setNotifications, setUnreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotificationContext must be used within NotificationProvider",
    );
  return ctx;
}

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useNotifications from "../features/notifications/hooks/useNotifications";
import { API_BASE } from "../config/api";
import {
  Notification,
  NotificationContextType,
} from "../features/notifications/types/Notification.model";


type NotificationProviderProps = {
  userId: string;
  children: ReactNode;
};


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

  const { getAllNotificationsForUser } = useNotifications();

  // Fetch notifications every time userId changes (e.g. after login)
  useEffect(() => {
    if (!userId) return;
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
    fetchNotifications();
  }, [userId]);

  // Keep real-time updates via EventSource
  useEffect(() => {
    if (!userId) return;

    // for real-time notifications, we use Server-Sent Events (SSE) to listen for 
    // new notifications from the backend. The backend should have an endpoint that streams 
    // notifications for the user.
    const evtSource = new EventSource(
      `${API_BASE}/notifications/stream/${userId}`,
    );

    evtSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };
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

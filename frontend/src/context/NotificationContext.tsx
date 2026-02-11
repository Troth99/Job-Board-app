import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Notification, NotificationContextType } from "../interfaces/Notification.model";


type NotificationProviderProps = {
  userId: string;
  children: ReactNode;
};

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://job-board-backend-7gfd.onrender.com";

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({userId, children}: NotificationProviderProps){

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
      console.log(userId)
        if (!userId) return;

          console.log("SSE URL:", `${API_URL}/api/notification/stream/${userId}`);

    const evtSource = new EventSource(`${API_URL}/api/notifications/stream/${userId}`);


    evtSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };
    return () => evtSource.close();
  }, [userId]);
   
  return (
     <NotificationContext.Provider value={{ notifications, unreadCount, setNotifications, setUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotificationContext must be used within NotificationProvider");
  return ctx;
}
import { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../hooks/useAuth";
import { useNotificationContext } from "../context/NotificationContext";
import { Navigate, Outlet, useParams } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";

export function NotificationOwnerGuard() {
  const { notificationId } = useParams();
  const userId = getUserFromLocalStorage()._id;
  const { notifications } = useNotificationContext();
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const toastId = "notification-access";

  useEffect(() => {
    if (!notificationId || !userId) {
      setAllowed(false);
      return;
    }
    const notif = notifications.find((n) => n._id === notificationId);

    const notifUserId =
      typeof notif?.user === "string" ? notif.user : notif?.user?._id;

    if (notif && notifUserId === userId) {
      setAllowed(true);
    } else {
      if (!toast.isActive(toastId)) {
        toast.error("You don't have access to this page", { toastId });
      }
      setAllowed(false);
    }
  }, [notificationId, userId, notifications]);

  if (allowed === null) return <Spinner inline />;
  if (!allowed) return <Navigate to="/" replace />;
  return <Outlet />;
}

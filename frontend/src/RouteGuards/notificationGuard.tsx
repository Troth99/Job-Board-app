import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function NotificationOwnerGuard() {
  const { notificationId } = useParams();
  const userId = getUserFromLocalStorage()._id;
  const { getNotificationById } = useNotification();
  const [allowed, setAllowed] = useState<null | boolean>(null);

  useEffect(() => {
    async function checkAccess() {
      try {
        const notif = await getNotificationById(notificationId);
        if (notif && notif.user === userId) {
          setAllowed(true);
        } else {
          toast.error("You don't have access to this invitation!");
          setAllowed(false);
        }
      } catch {
        toast.error("Notification not found!");
        setAllowed(false);
      }
    }
    checkAccess();
  }, [notificationId, userId, getNotificationById]);

  if (allowed === null) return <div>Loading...</div>;
  if (!allowed) return <Navigate to="/" replace />;
  return <Outlet />;
}
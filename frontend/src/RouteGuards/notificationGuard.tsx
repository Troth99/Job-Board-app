import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import { Navigate, Outlet, useParams } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";

export function NotificationOwnerGuard() {
  const { notificationId } = useParams();
  const userId = getUserFromLocalStorage()._id;
  const { getNotificationById } = useNotification();
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const toastId = "notification-access";

  useEffect(() => {
    async function checkAccess() {
      try {
        if (!notificationId || !userId) {
          setAllowed(false);
          return;
        }
        const notif = await getNotificationById(notificationId as string);
        
        const notifUserId =
          notif?.user?._id?.toString?.() || notif?.user?.toString?.() || "";

        if (notif && notifUserId === userId.toString()) {
          setAllowed(true);
        } else {
          if (!toast.isActive(toastId)) {
            toast.error("You don't have access to this page", { toastId });
          }
          setAllowed(false);
        }
      } catch {
        if (!toast.isActive(toastId)) {
          toast.error("Notification not found!", { toastId });
        }
        setAllowed(false);
      }
    }
    checkAccess();
    // eslint-disable-next-line
  }, [notificationId, userId, getNotificationById]);

  if (allowed === null) return <Spinner inline />;

  if (!allowed) return <Navigate to="/" replace />;
  return <Outlet />;
}

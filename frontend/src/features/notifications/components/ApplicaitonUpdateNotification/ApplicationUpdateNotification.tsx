
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useNotifications from "../../hooks/useNotifications";
import type { Notification } from "../../types/Notification.model";
import Spinner from "../../../../shared/components/Spinner/Spinner";

export default function ApplicationUpdateNotification() {
  const { notificationId } = useParams();
  const { getNotificationById } = useNotifications();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotification = async () => {
      if (!notificationId) return;

      try {
        const result = await getNotificationById(notificationId);
        setNotification(result ?? null);
      } catch (error) {
        console.error("Error fetching application update notification:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadNotification();
  }, [notificationId]);

  if (loading) {
    return <Spinner inline={true} />;
  }

  if (!notification) {
    return null;
  }

  const message = notification.message?.toLowerCase() ?? "";
  const accepted = message.includes("accepted");
  const rejected = message.includes("rejected");

  if (!accepted && !rejected) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        marginTop: 12,
        padding: "12px 16px",
        borderRadius: 10,
        fontWeight: 700,
        border: `1px solid ${accepted ? "#8ad7a5" : "#f3a7a7"}`,
        background: accepted ? "#eafaf1" : "#fdeaea",
        color: accepted ? "#136a3d" : "#8f1d1d",
      }}
    >
      {accepted ? "Application accepted" : "Application rejected"}
    </div>
  );
}
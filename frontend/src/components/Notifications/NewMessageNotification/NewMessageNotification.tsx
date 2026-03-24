import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useParams } from "react-router";
import "./newMessages.css";
import { Notification } from "../../../interfaces/Notification.model";
import Spinner from "../../Spinner/Spinner";

export default function NewmessageNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const { getNotificationById } = useNotification();
  const [loading, setLoading] = useState<boolean>(true);

  const notificationId = useParams().notificationId;

  useEffect(() => {
      setLoading(true)
    const getCUrrentMessage = async () => {
      if (!notificationId) return;
      try {
        const result = await getNotificationById(notificationId);
        console.log(result.user.firstName);
        setNotification(result);
      } catch (error) {
        console.error("Error fetching notification message:", error);
      } finally {
        setLoading(false);
      }
    };

    getCUrrentMessage();
  }, [notificationId]);

  if (loading) {
    return <Spinner inline={true} />;
  }

  if(!notification) {
    return null
  }
  return (
    
    <div
      className="notification notification--message"
      data-id="69bccc9b608cbda969c3360f"
    >
      <div className="notification__meta">
        <span className="notification__from">
          <span className="notification__from-label">Message from:</span>
          <span className="notification__from-user">
            <span className="notification__from-first">
              {notification?.user?.firstName}
            </span>
            <span className="notification__from-last">
              {notification?.user?.lastName}
            </span>
            <span className="notification__from-email">
              &lt;{notification?.user?.email}&gt;
            </span>
          </span>
        </span>
        <span className="notification__date">20.03.2026, 04:27</span>
      </div>
      <div className="notification__body">
        <p className="notification__message">asdasd</p>
      </div>
      <div className="notification__actions">
        <button className="notification__btn notification__btn--reply">
          Reply
        </button>
      </div>
    </div>
  );
}

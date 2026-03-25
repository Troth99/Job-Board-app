import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useParams } from "react-router";
import "./newMessages.css";
import { Notification } from "../../../interfaces/Notification.model";
import Spinner from "../../Spinner/Spinner";
import { formatDate } from "../../../utils/formData";
import { ModalReply } from "./ModalReply";

export default function NewmessageNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const { getNotificationById } = useNotification();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [replyToUserEmail, setReplyToUserEmail] = useState<string | undefined>(
    "",
  );

  const notificationId = useParams().notificationId;

  // Fetch the notification details when the component mounts
  useEffect(() => {
    setLoading(true);
    const getCUrrentMessage = async () => {
      if (!notificationId) return;
      try {
        const result = await getNotificationById(notificationId);
        console.log(result);
        setNotification(result);
      } catch (error) {
        console.error("Error fetching notification message:", error);
      } finally {
        setLoading(false);
      }
    };

    getCUrrentMessage();
  }, [notificationId]);

  // Handler to open the reply modal
  const modalReplyHandler = () => {
    setOpen(true);
    setReplyToUserEmail(notification?.user?.email);
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <Spinner inline={true} />;
  }

  // If notification is not found, we can show a message or return null
  if (!notification) {
    return null;
  }

  return (
    <>
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
          <span className="notification__date">
            {formatDate(notification?.createdAt)}
          </span>
        </div>
        <div className="notification__body">
          <p className="notification__message">{notification.message}</p>
        </div>
        <div className="notification__actions">
          <button
            className="notification__btn notification__btn--reply"
            onClick={modalReplyHandler}
          >
            Reply
          </button>
        </div>
      </div>
      <ModalReply isOpen={open} replyToUserEmail={replyToUserEmail} onClose={() => setOpen(false)} />
    </>
  );
}

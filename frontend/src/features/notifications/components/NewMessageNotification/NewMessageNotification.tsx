import "../../styles/newMessages.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useNotifications from "../../hooks/useNotifications";
import { Notification } from "../../types/Notification.model";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import { formatDate } from "../../../../shared/utils/formData";
import { ModalReply } from "./ModalReply";
import { Trans } from "@lingui/react/macro";


export default function NewmessageNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const { getNotificationById } = useNotifications();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [replyToUserEmail, setReplyToUserEmail] = useState<string | undefined>(
    "",
  );

  const notificationId = useParams().notificationId;

  // Fetch the notification details when the component mounts
  useEffect(() => {
    setLoading(true);
    const getCurrentMessage = async () => {
      if (!notificationId) return;
      try {
        const result = await getNotificationById(notificationId);
        setNotification(result);
      } catch (error) {
        console.error("Error fetching notification message:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentMessage();
  }, [notificationId]);

  // Handler to open the reply modal
  const modalReplyHandler = () => {
    setOpen(true);
    setReplyToUserEmail(notification?.sender?.email);
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <Spinner variant="inline" />;
  }

  // If notification is not found, we can show a message or return null
  if (!notification) {
    return null;
  }

  return (
    <>
{success && (
  <div className="success-message">
    <span><Trans>Your message has been sent successfully!</Trans></span>
    <button className="success-close" onClick={() => setSuccess(false)}>×</button>
  </div>
)}
      <div
        className="notification notification--message"
        data-id="69bccc9b608cbda969c3360f"
      >
        <div className="notification__meta">
          <span className="notification__from">
            <span className="notification__from-label"><Trans>Message from:</Trans></span>
            <span className="notification__from-user">
              <span className="notification__from-first">
                {notification?.sender?.firstName}
              </span>
              <span className="notification__from-last">
                {notification?.sender?.lastName}
              </span>
              <span className="notification__from-email">
                &lt;{notification?.sender?.email}&gt;
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
            <Trans>Reply</Trans>
          </button>
        </div>
      </div>
      <ModalReply
        isOpen={open}
        replyToUserEmail={replyToUserEmail}
        onClose={() => setOpen(false)}
        onSuccess={() => setSuccess(true)}
      />
    </>
  );
}

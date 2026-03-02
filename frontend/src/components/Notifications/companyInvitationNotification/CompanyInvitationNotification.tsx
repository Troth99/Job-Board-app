import { useEffect, useState } from "react";
import "./companyInvitationNotification.css";
import { useParams } from "react-router";
import { useNotificationContext } from "../../../context/NotificationContext";
import { CompanyShort, Notification } from "../../../interfaces/Notification.model";

export default function CompanyInvitationNotification() {
  const { notificationId } = useParams();
  const { notifications } = useNotificationContext();
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined,
  );
  useEffect(() => {
    const currentNotification = notifications.find(
      (n) => n._id === notificationId,
    );
    console.log(currentNotification)
    setNotification(currentNotification);
  }, []);

  return (
    <div className="company-invitation-notification">
         <div className="company-invitation-card">
      <div className="company-invitation-header">
        <svg
          className="company-invitation-icon"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#1976d2" />
          <path
            d="M12 7a2 2 0 110 4 2 2 0 010-4zm0 6c-2.21 0-4 1.34-4 3v1h8v-1c0-1.66-1.79-3-4-3z"
            fill="#fff"
          />
        </svg>
        <h3 className="company-invitation-title">Company Invitation</h3>
      </div>
      <p className="company-invitation-message">
        You have been invited to join <b>{notification?.company?.name}</b> as a member.
      </p>
      <div className="company-invitation-meta">
        <span className="invited-by-details">
          Invited by <b>{notification?.user.firstName} {notification?.user.lastName}</b>
        </span>
        <span className="invited-by-email">Email: {notification?.user.email}</span>
      </div>
      <div className="company-invitation-question">
        Would you like to accept this invitation?
      </div>
      <div className="company-invitation-actions">
        <button className="company-invitation-accept">Accept</button>
        <button className="company-invitation-decline">Decline</button>
      </div>
      </div>
    </div>
  );
}

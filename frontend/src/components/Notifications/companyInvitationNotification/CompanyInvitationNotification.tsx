import { useEffect, useState } from "react";
import "./companyInvitationNotification.css";
import { useParams } from "react-router";
import { useNotificationContext } from "../../../context/NotificationContext";
import {
  CompanyShort,
  Notification,
} from "../../../interfaces/Notification.model";
import { useNotification } from "../../../hooks/useNotification";
import { useNavigate } from "react-router";
import { getUserFromLocalStorage } from "../../../hooks/useAuth";
import useCompany from "../../../hooks/useCompany";
import { useUserData } from "../../../context/UseDataContext";

export default function CompanyInvitationNotification() {
  const { notificationId } = useParams();
  const { notifications, setNotifications, setUnreadCount } =
    useNotificationContext();

  const { addMemberToCompany } = useCompany();
  const {userData, setUserData} = useUserData();

  const user = getUserFromLocalStorage();

  //State only for the current OPEN notification.
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  const { deleteNotification } = useNotification();

  const companyId = notification?.company?._id;

  useEffect(() => {
    const currentNotification = notifications.find(
      (n) => n._id === notificationId,
    );
    setNotification(currentNotification);
  }, [notifications, notificationId]);

  const acceptCompanyInvitationHandler = async () => {
    if (!notification || !companyId) return;

    if (user && user.company) {
      alert(
        "You are already part of a company. Please leave first in order to accept the invitation.",
      );
      return;
    }

    try {
      await addMemberToCompany(companyId, user._id);

      // Update user data in context and local storage
      if(userData) {
        setUserData({
          ...userData,
          company: notification.company as CompanyShort,
        });
      }

      if(user) {
        user.company = companyId;
        localStorage.setItem("user", JSON.stringify(user));
      };
      await deleteNotification(notification._id);
      
      setNotifications((prev) =>
        prev.filter((n) => n._id !== notification._id),
      );
      if (!notification.isRead) setUnreadCount((prev) => Math.max(prev - 1, 0));
      navigate("/profile");
    } catch (error) {
      console.error("Failed to accept notification invitation", error);
    }
  };

  const declineCompanyInvitationHandler = async () => {
    if (!notification) return;
    try {
      await deleteNotification(notification._id);
      setNotifications((prev) =>
        prev.filter((n) => n._id !== notification._id),
      );
      if (!notification.isRead) {
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
      navigate("/notifications");
    } catch (error) {
      console.error("Failed to decline notification company invite", error);
    }
  };

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
          You have been invited to join <b>{notification?.company?.name}</b> as
          a member.
        </p>
        <div className="company-invitation-meta">
          <span className="invited-by-details">
            Invited by{" "}
            <b>
              {notification?.user.firstName} {notification?.user.lastName}
            </b>
          </span>
          <span className="invited-by-email">
            Email: {notification?.user.email}
          </span>
        </div>
        <div className="company-invitation-question">
          Would you like to accept this invitation?
        </div>
        <div className="company-invitation-actions">
          <button
            className="company-invitation-accept"
            disabled={!!user.company}
            title={
              user.company ? "You must leave your company before joining." : ""
            }
            onClick={acceptCompanyInvitationHandler}
          >
            Accept
          </button>
          <button
            className="company-invitation-decline"
            onClick={declineCompanyInvitationHandler}
          >
            Decline
          </button>
        </div>
        {user.company && (
          <div className="company-invitation-warning">
            You must leave your company before joining.
          </div>
        )}
      </div>
    </div>
  );
}

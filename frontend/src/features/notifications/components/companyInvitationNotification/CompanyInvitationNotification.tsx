import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "../../styles/companyInvitationNotification.css"
import { profilePaths } from "../../../profile/routes/profilePaths";
import { useNotificationContext } from "../../../../context/NotificationContext";
import { useUserData } from "../../../../context/UseDataContext";
import { getUserFromLocalStorage } from "../../../auth/hooks/useAuth";
import useNotifications from "../../hooks/useNotifications";
import { Notification } from "../../types/Notification.model";
import useMembers from "../../../companies/hooks/useMembers";
import { Trans } from "@lingui/react/macro";


export default function CompanyInvitationNotification() {
  const { notificationId } = useParams();
  const { notifications, setNotifications, setUnreadCount } =
    useNotificationContext();

  const { addMemberToCompany } = useMembers();
  const {userData, setUserData} = useUserData();

  const user = getUserFromLocalStorage();

  //State only for the current OPEN notification.
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  const { deleteNotification } = useNotifications();

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
          company: companyId,
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
      navigate(profilePaths.root);
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
          <h3 className="company-invitation-title"><Trans>Company Invitation</Trans></h3>
        </div>
        <p className="company-invitation-message">
          <Trans>You have been invited to join <b>{notification?.company?.name}</b> as
          a member.</Trans>
        </p>
        <div className="company-invitation-meta">
          <span className="invited-by-details">
            <Trans>Invited by</Trans>{" "}
            <b>
              {notification?.user.firstName} {notification?.user.lastName}
            </b>
          </span>
          <span className="invited-by-email">
            Email: {notification?.user.email}
          </span>
        </div>
        <div className="company-invitation-question">
          <Trans>Would you like to accept this invitation?</Trans>
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
            <Trans>Accept</Trans>
          </button>
          <button
            className="company-invitation-decline"
            onClick={declineCompanyInvitationHandler}
          >
            <Trans>Decline</Trans>
          </button>
        </div>
        {user.company && (
          <div className="company-invitation-warning">
            <Trans>You must leave your company before joining.</Trans>
          </div>
        )}
      </div>
    </div>
  );
}

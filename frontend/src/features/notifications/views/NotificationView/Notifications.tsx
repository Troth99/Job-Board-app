import "./Notifications.css";
import "./NotificationResponsive.css";
import { useState } from "react";
import { getUserFromLocalStorage } from "../../../auth/hooks/useAuth";
import useNotifications, { useSortedNotifications } from "../../hooks/useNotifications";
import { getName } from "../../helpers/nameHelper";
import { formatDate } from "../../../../shared/utils/formData";
import { useNavigate, useSearchParams } from "react-router";
import { useNotificationContext } from "../../../../context/NotificationContext";
import { Notification } from "../../types/Notification.model";
import { usePagination } from "../../../../shared/hooks/usePagination";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import { Trans, useLingui } from "@lingui/react/macro";


export default function Notifications() {
  const { deleteNotification, markAsRead } = useNotifications();
  const { notifications, setNotifications, setUnreadCount } =
    useNotificationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useLingui();
  
  //pagination
  const sortNotifications = useSortedNotifications(notifications)
  const [searchParams, setSearchParams] = useSearchParams()
  const pageFromUrl = parseInt(searchParams.get('page') || '1')
  const {totalPages, currentItems} = usePagination(sortNotifications, 5, pageFromUrl)

  const seo = generateSeoConfig("notifications");

  const navigate = useNavigate();

// Handler for removing a notification - deletes it from the server and updates the local state
  const removeNotificationHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const deleted = notifications.find((n) => n._id === id);
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));

      if (deleted && !deleted.isRead) {
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Error deleting notification.", error);
    } finally {
      setLoading(false);
    }
  };
// Handler for when a notification is clicked - marks it as read and navigates to the appropriate page based on type
  const handleNotificationClick = async (n: Notification) => {
    if (!n.isRead) {
      try {
        await markAsRead(n._id);
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === n._id ? { ...notif, isRead: true } : notif,
          ),
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      } catch (error) {
        console.error("Failed to read notification", error);
      }

    }

// Navigate to the appropriate page based on notification type
    switch (n.type) {
      case "message":
        navigate(`/message/${n._id}`);
        break;
      case "application":
        navigate(`/application-update/${n._id}`);
        break;
      case "company_invite":
        navigate(`/company-invitation/${n._id}`);
        break;
      default:
        break;
    }
  };

  return (
    // The main notifications list component that displays all notifications and handles pagination, marking as read, and deletion.
    <>
   <MetaData seo={seo} />
   
    <div className="notification-list">
      <h2 className="notification-list__title"><Trans>Notifications</Trans></h2>
      <ul className="notification-list__items">
        {notifications.length === 0 && (
          <li className="notification-item notification-item--empty">
            <div className="notification-item__content">
              <div className="notification-item__heading"><Trans>No notifications</Trans></div>
              <div className="notification-item__text">
                <Trans>You have no notifications at the moment.</Trans>
              </div>
            </div>
          </li>
        )}
        {currentItems.map((n) => {
          let icon = "fa fa-bell";
          let heading = <Trans>Notification</Trans>;
          let text = n.message;

// We can customize the icon, heading, and text based on the notification type
          if (n.type === "message") {
            icon = "fa fa-envelope";
            heading = <Trans>New Message</Trans>;
            text = t`You have a new message from <b>${getName(n.sender)}</b>.`;
          } else if (n.type === "application") {
            icon = "fa fa-briefcase";
            heading = <Trans>Application Update</Trans>;
            text = n.message;
          } else if (n.type === "company_invite") {
            icon = "fa fa-building";
            heading = <Trans>Company Invitation</Trans>;
            text = t`You have a new invitation from <b>${getName(n.company)}</b>.`;
    
          }
// Each notification item is rendered with appropriate styling and click handlers for marking as read and deletion
          return (
            <li
              key={n._id}
              className={`notification-item notification-item--${n.isRead ? "read" : "unread"}`}
              tabIndex={0}
              onClick={() => handleNotificationClick(n)}
              style={{ position: "relative" }}
            >
              <div className="notification-item__icon">
                <i className={icon}></i>
              </div>
              <div className="notification-item__content">
                <div className="notification-item__heading">{heading}</div>
                <div
                  className="notification-item__text"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
                <div className="notification-item__meta">
                  <span className="notification-item__time">
                    {formatDate(n.createdAt)}
                  </span>
                </div>
              </div>
              <button
                className="notification-item__close"
                aria-label="Remove notification"
                onClick={(e) => removeNotificationHandler(e, n._id)}
                tabIndex={0}
              >
                ×
              </button>
            </li>
          );
        })}
               {sortNotifications.length > 3 && (
                <div className="pagination">
                  <button
                    onClick={() =>
                      setSearchParams({ page: (pageFromUrl - 1).toString() })
                    }
                    disabled={pageFromUrl === 1}
                  >
                    <Trans>Previous</Trans>
                  </button>
                  <span>
                    <Trans>Page</Trans> {pageFromUrl} <Trans>of</Trans> {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setSearchParams({ page: (pageFromUrl + 1).toString() })
                    }
                    disabled={pageFromUrl === totalPages}
                  >
                    <Trans>Next</Trans>
                  </button>
                </div>
              )}
      </ul>
    </div>
    </>
  );
}



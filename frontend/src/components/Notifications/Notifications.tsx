import "./Notifications.css";
import "./NotificationResponsive.css";
import { useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { getUserFromLocalStorage } from "../../hooks/useAuth";
import { getName } from "./nameHelper";
import { formatDate } from "../../utils/formData";
import { useNavigate } from "react-router";
import { useNotificationContext } from "../../context/NotificationContext";
import { Notification } from "../../interfaces/Notification.model";

function Notifications() {
  const { deleteNotification, markAsRead } = useNotification();
  const { notifications, setNotifications, unreadCount, setUnreadCount } =
    useNotificationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const userId = getUserFromLocalStorage()._id;
  const navigate = useNavigate();

  // Add pagination for notifications.

  //When loging in the account notifications do not appear unless refresh 

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
    <div className="notification-list">
      <h2 className="notification-list__title">Notifications</h2>
      <ul className="notification-list__items">
        {notifications.length === 0 && (
          <li className="notification-item notification-item--empty">
            <div className="notification-item__content">
              <div className="notification-item__heading">No notifications</div>
              <div className="notification-item__text">
                You have no notifications at the moment.
              </div>
            </div>
          </li>
        )}
        {notifications.map((n) => {
          let icon = "fa fa-bell";
          let heading = "Notification";
          let text = n.message;
          let onClickHandler = undefined;

          if (n.type === "message") {
            icon = "fa fa-envelope";
            heading = "New Message";
            text = `You have a new message from <b>${getName(n.user)}</b>.`;
          } else if (n.type === "application") {
            icon = "fa fa-briefcase";
            heading = "Application Update";
            text = n.message;
          } else if (n.type === "company_invite") {
            icon = "fa fa-building";
            heading = "Company Invitation";
            text = `You have a new invitation from <b>${getName(n.company)}</b>.`;
    
          }

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
      </ul>
    </div>
  );
}

export default Notifications;

import { Footer } from "../Footer/Footer";
import "./Notifications.css";
import "./NotificationResponsive.css";
import { useEffect, useState } from "react";
import { Notification } from "../../interfaces/Notification.model";
import { useNotification } from "../../hooks/useNotification";
import { getUserFromLocalStorage } from "../../hooks/useAuth";

function Notifications() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);
  const { getAllNotificationsForUser } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const userId = getUserFromLocalStorage()._id;

  const fetchNotificaitons = async () => {
    setLoading(true);
    try {
      const response = await getAllNotificationsForUser(userId);
      console.log(response)
      setNotifications(response);
    } catch (error) {
      console.error(
        "Error getting Notifications in notification component.",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificaitons();
  }, []);

  return (
    <div className="notification-list">
      <h2 className="notification-list__title">Notifications</h2>
      <ul className="notification-list__items">
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((n) => (
            <li
              key={n._id}
              className={`notification-item notification-item--${n.isRead ? "read" : "unread"}`}
            >
              <div className="notification-item__icon">
                <i
                  className={
                    n.type === "message"
                      ? "fa fa-envelope"
                      : n.type === "application"
                      ? "fa fa-briefcase"
                      : n.type === "invitation"
                      ? "fa fa-city"
                      : "fa fa-bell"
                  }
                ></i>
              </div>
              <div className="notification-item__content">
                <div className="notification-item__heading">
                  {n.type === "message"
                    ? "New Message"
                    : n.type === "application"
                    ? "Application Update"
                    : n.type === "invitation"
                    ? "Company Invitation"
                    : "Notification"}
                </div>
                <div className="notification-item__text">{n.message}</div>
                <div className="notification-item__meta">
                  <span className="notification-item__time">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="notification-item notification-item--empty">
            <div className="notification-item__content">
              <div className="notification-item__heading">No notifications</div>
              <div className="notification-item__text">
                You have no notifications at the moment.
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Notifications;

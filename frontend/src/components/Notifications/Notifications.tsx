import { Footer } from "../Footer/Footer";
import "./Notifications.css";
import "./NotificationResponsive.css";
import { useEffect, useState } from "react";
import { Notification } from "../../interfaces/Notification.model";
import { useNotification } from "../../hooks/useNotification";
import { getUserFromLocalStorage } from "../../hooks/useAuth";
import { getName } from "./nameHelper";
import { formatDate } from "../../utils/formData";
import { useNavigate } from "react-router";

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { getAllNotificationsForUser } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const userId = getUserFromLocalStorage()._id;
  const navigate = useNavigate()
  
  //To do read update for read messages.
  
  const fetchNotificaitons = async () => {
    setLoading(true);
    try {
      const response = await getAllNotificationsForUser(userId);
      console.log(response);
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
                    onClick={n.type === "company_invite" ? () => navigate(`/company-invitation/${n._id}`) : undefined}

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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Notifications;

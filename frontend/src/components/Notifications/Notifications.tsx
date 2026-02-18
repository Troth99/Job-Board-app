import { Footer } from "../Footer/Footer";
import "./Notifications.css";
import "./NotificationResponsive.css";
import { useEffect, useState } from "react";
import { Notification } from "../../interfaces/Notification.model";
import { useNotification } from "../../hooks/useNotification";
import { getUserFromLocalStorage } from "../../hooks/useAuth";

function Notifications() {
  const [notifications, setNotifications] = useState<
    Notification | undefined
  >();
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
        <li className="notification-item notification-item--unread">
          <div className="notification-item__icon">
            <i className="fa fa-envelope"></i>
          </div>
          <div className="notification-item__content">
            <div className="notification-item__heading">New Message</div>
            <div className="notification-item__text">
              You have a new message from <b>Ivan Petrov</b>.
            </div>
            <div className="notification-item__meta">
              <span className="notification-item__time">
                18.02.2026, 14:32:10
              </span>
            </div>
          </div>
        </li>
        <li className="notification-item notification-item--unread">
          <div className="notification-item__icon">
            <i className="fa fa-briefcase"></i>
          </div>
          <div className="notification-item__content">
            <div className="notification-item__heading">Application Update</div>
            <div className="notification-item__text">
              Your application for <b>Frontend Developer</b> was accepted!
            </div>
            <div className="notification-item__meta">
              <span className="notification-item__time">
                18.02.2026, 13:10:05
              </span>
            </div>
          </div>
        </li>
        <li className="notification-item notification-item--unread">
          <div className="notification-item__icon">
            <i className="fa fa-city"></i>
          </div>
          <div className="notification-item__content">
            <div className="notification-item__heading">Company Invitation</div>
            <div className="notification-item__text">
              You have a new invitation from <b>Acme Corp</b>.
            </div>
            <div className="notification-item__meta">
              <span className="notification-item__time">
                18.02.2026, 12:00:00
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Notifications;

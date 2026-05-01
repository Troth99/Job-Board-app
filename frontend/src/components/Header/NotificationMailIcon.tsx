import { Link } from "react-router";
import { useNotificationContext } from "../../context/NotificationContext";
import "./NotificationBadge.css";
import "./NotificationBadgeResponsive.css"


export function NotificationMailIcon() {
    const {unreadCount} = useNotificationContext();
    return (
      <Link to="/notifications" className="notification-link" aria-label="Notifications">
        <i className="fa-regular fa-envelope"></i>
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount}
          </span>
        )}
      </Link>
    );
}
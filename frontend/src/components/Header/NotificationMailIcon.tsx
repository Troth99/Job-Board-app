import { Link } from "react-router";
import { useNotificationContext } from "../../context/NotificationContext";



export function NotificationMailIcon() {
    const {unreadCount} = useNotificationContext();
      return (

    <Link to="/notifications" className="notification-link" style={{ position: "relative", display: "inline-block" }}>
      <i className="fa-regular fa-envelope"></i>
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: 0,
            right:10,
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            minWidth: 18,
            textAlign: "center",
            zIndex: 2,
          }}
        >
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useParams } from "react-router";
import "./newMessages.css";

export default function NewmessageNotification() {
  const [notification, setNotification] = useState("");
  const { getNotificationById } = useNotification();

  const notificationId = useParams().notificationId;

  useEffect(() => {
    const getCUrrentMessage = async () => {
      if (!notificationId) return;
      try {
        const result = await getNotificationById(notificationId);
        console.log(result)
        setNotification(result);
      } catch (error) {
        console.error("Error fetching notification message:", error);
      }
    };

    getCUrrentMessage();
  }, [notificationId]);
 
  return (
<div className="notification notification--message" data-id="69bccc9b608cbda969c3360f">
  <div className="notification__header">
    <span className="notification__status notification__status--read">Прочетено</span>
  </div>
  <div className="notification__meta">
    <span className="notification__from">
      <span className="notification__from-label">Message from:</span>
      <span className="notification__from-user">
        Alexasd1 <span className="notification__from-last">Alexxss</span>
        <span className="notification__from-email">&lt;troth1234@abv.bg&gt;</span>
      </span>
    </span>
    <span className="notification__date">20.03.2026, 04:27</span>
  </div>
  <div className="notification__body">
    <p className="notification__message">asdasd</p>
  </div>
  <div className="notification__actions">
    <button className="notification__btn notification__btn--reply">Reply</button>
  </div>
</div>
  );
}

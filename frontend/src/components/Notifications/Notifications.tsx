import { Footer } from '../Footer/Footer';
import './Notifications.css';
import "./NotificationResponsive.css"

 function Notifications() {


    return (
<div className="notification-list">
  <h2 className="notification-list__title">Notifications</h2>
  <ul className="notification-list__items">
    <li className="notification-item notification-item--unread" >
      <div className="notification-item__icon">
        <i className="fa fa-envelope"></i>
      </div>
      <div className="notification-item__content">
        <div className="notification-item__heading">New Message</div>
        <div className="notification-item__text">You have a new message from <b>Ivan Petrov</b>.</div>
        <div className="notification-item__meta">
          <span className="notification-item__time">18.02.2026, 14:32:10</span>
        </div>
      </div>
    </li>
    <li className="notification-item notification-item--unread" >
      <div className="notification-item__icon">
        <i className="fa fa-briefcase"></i>
      </div>
      <div className="notification-item__content">
        <div className="notification-item__heading">Application Update</div>
        <div className="notification-item__text">Your application for <b>Frontend Developer</b> was accepted!</div>
        <div className="notification-item__meta">
          <span className="notification-item__time">18.02.2026, 13:10:05</span>
        </div>
      </div>
    </li>
    <li className="notification-item notification-item--unread" >
      <div className="notification-item__icon">
        <i className="fa fa-city"></i>
      </div>
      <div className="notification-item__content">
        <div className="notification-item__heading">Company Invitation</div>
        <div className="notification-item__text">You have a new invitation from <b>Acme Corp</b>.</div>
        <div className="notification-item__meta">
          <span className="notification-item__time">18.02.2026, 12:00:00</span>
        </div>
      </div>
    </li>
  </ul>
</div>
    )
}


export default Notifications

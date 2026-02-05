import Notification from "../models/Notification.js"


//Create notification
export const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification)
    } catch (error) {
        res.status(400).json({ error: err.message });
    };

}
//Get notification for user

export const getUserNotifications = async (req, res) => {
    try {
    const notifications = await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications)
    } catch (error) {
           res.status(400).json({ error: err.message });
    }
}
//Mark as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
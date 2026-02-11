import Notification from "../models/Notification.js"


//Create notification
export const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        const populated = await Notification.findById(notification._id)
            .populate("user", "name email firstName lastName")
            .populate("sender", "name email")
            .populate("company", "name");

            
        res.status(201).json(populated)
    } catch (error) {
        res.status(400).json({ error: error.message });
    };

}
//Get notification for user

export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification
            .find({ user: req.params.userId })
           .populate("user", "name email firstName lastName")
            .populate("sender", "name email")
            .populate("company", "name")
            .sort({ createdAt: -1 });

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
        )
           .populate("user", "name email firstName lastName")
            .populate("sender", "name email")
            .populate("company", "name");

        res.json(notification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
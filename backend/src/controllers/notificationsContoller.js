import Notification from "../models/Notification.js"

// SSE stream handler
export const clients = new Map()

export const sseStream = (req, res) => {
    const userId = req.params.userId;

    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    });
    res.flushHeaders();

    clients.set(userId, res);

    req.on('close', () => {
        clients.delete(userId);
        res.end();
    });
};


//Create notification
export const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        const populated = await Notification.findById(notification._id)
            .populate("user", "name email firstName lastName")
            .populate("sender", "name email")
            .populate("company", "name");

        const userId = populated.user._id.toString();
        const clientRes = clients.get(userId)
        
        if (clientRes) {
            clientRes.write(`data: ${JSON.stringify(populated)}\n\n`);
        }
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


            //Add userId to fetch userId unread notificatitions
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

export const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
            .populate("user", "name email firstName lastName")
            .populate("sender", "name email")
            .populate("company", "name");
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
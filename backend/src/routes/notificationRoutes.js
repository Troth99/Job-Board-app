import { Router } from "express";
import { createNotification, getUserNotifications, markAsRead } from "../controllers/notificationsContoller.js";

const router = Router();

export const clients = new Map();

router.get('/stream/:userId', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    });
    res.flushHeaders();

    const userId = req.params.userId;
    clients.set(userId, res);

    req.on('close', () => {
        clients.delete(userId);
    });
});


router.post('/', createNotification);
router.get("/:userId", getUserNotifications);
router.patch("/read/:id", markAsRead);


export default router;
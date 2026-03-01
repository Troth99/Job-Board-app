import { Router } from "express";
import { createNotification, getNotificationById, getUserNotifications, markAsRead, sseStream } from "../controllers/notificationsContoller.js";

const router = Router();


router.get('/stream/:userId', sseStream);


router.post('/', createNotification);
router.get('/user/:userId', getUserNotifications);
router.get('/:id', getNotificationById);
router.patch('/read/:id', markAsRead);



export default router;
import { Router } from "express";
import { createNotification, getUserNotifications, markAsRead, sseStream } from "../controllers/notificationsContoller.js";

const router = Router();


router.get('/stream/:userId', sseStream);


router.post('/', createNotification);
router.get("/:userId", getUserNotifications);
router.patch("/read/:id", markAsRead);


export default router;
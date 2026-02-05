import { Router } from "express";
import { createNotification, getUserNotifications, markAsRead } from "../controllers/notificationsContoller.js";



const router = Router();

router.post('/', createNotification);
router.get("/:userId", getUserNotifications);
router.patch("/read/:id", markAsRead);

export default router;
import { Router } from "express";
import { addJobToFavourites } from "../controllers/AddJobToFavourites.js";
import { protect } from "../middleware/authMiddleware.js";





const router = Router();

router.post('/saved-jobs/:jobId', protect, addJobToFavourites)

export default router;

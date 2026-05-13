import { Router } from "express";
import { addJobToFavourites, getSavedJobs, removeJobFromFavourites } from "../controllers/addJobToFavourites.js";
import { protect } from "../middleware/authMiddleware.js";





const router = Router();

router.post('/saved-jobs/:jobId', protect, addJobToFavourites);
router.delete('/saved-jobs/:jobId', protect, removeJobFromFavourites);
router.get('/saved-jobs', protect, getSavedJobs);

export default router;

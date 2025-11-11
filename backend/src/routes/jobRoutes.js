import { Router } from "express";
import { getRecentJobs, updateJob } from "../services/jobService.js";
import { createJob, getAllJobsController, getJobByIdController } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = Router();

router.get("/", getAllJobsController);
router.get('/recent', getRecentJobs)
router.get("/:id", getJobByIdController);

// protected routes
router.post("/", protect,  createJob);
router.put("/:id", protect,  updateJob);


export default router




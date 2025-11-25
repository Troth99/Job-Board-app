import { Router } from "express";
import { createJob, getAllJobsController, getJobByIdController, getRecentJobsController, updateJobController } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = Router();

router.get("/", getAllJobsController);
router.get('/recent', getRecentJobsController)
router.get("/:id", getJobByIdController);

// protected routes
router.post("/", protect,  createJob);
router.put("/:id", protect,  updateJobController);


export default router




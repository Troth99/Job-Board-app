import { Router } from "express";
import { getAllJobs, updateJob } from "../services/jobService.js";
import { createJob, getJobByIdController } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/rolesMiddleware.js";

const router = Router();

router.get("/", getAllJobs);
router.get("/:id", getJobByIdController);

// protected routes
router.post("/", protect, authorizeRoles("employer", "admin"), createJob);
router.put("/:id", protect, authorizeRoles("employer", "admin"), updateJob);

export default router




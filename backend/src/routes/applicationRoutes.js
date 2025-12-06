import { Router } from "express";

import {
  createApplication,
  getApplicationsByJob,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/ApplicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/",protect, createApplication);
router.get("/job/:jobId",protect, getApplicationsByJob);
router.patch('/:id/status', updateApplicationStatus);
router.get("/:id",protect, getApplicationById);
router.delete('/:id', deleteApplication);

export default router;
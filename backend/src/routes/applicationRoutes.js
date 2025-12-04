import { Router } from "express";

import {
  createApplication,
  getApplicationsByJob,
  getApplicationById,
} from "../controllers/ApplicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/",protect, createApplication);
router.get("/job/:jobId",protect, getApplicationsByJob);
router.get("/:id",protect, getApplicationById);

export default router;
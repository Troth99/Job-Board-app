import { Router } from "express";
import { createJob, getAllJobsController, getJobByIdController, getJobsByCategoryController, getRecentJobsController, updateJobController } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = Router();

router.get("/", getAllJobsController);
router.get('/recent', getRecentJobsController)
router.get("/:id", getJobByIdController);
router.get('/category/:categoryName', getJobsByCategoryController)
// protected routes
router.post("/", protect,  createJob);
router.put("/:id", protect,  updateJobController);


export default router




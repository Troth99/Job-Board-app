import { Router } from "express";
import { createJob, getMostRecentJobsByCompanyController, deleteJobController, getAllJobsController, getJobByIdController, getJobsByCategoryController, getRecentJobsController, updateJobController } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = Router();

router.get("/", getAllJobsController);
router.get('/recent', getRecentJobsController)
router.get("/:id", getJobByIdController);
router.get('/category/:categoryName', getJobsByCategoryController)
router.get('/recent-company-jobs/:companyId', protect, getMostRecentJobsByCompanyController)

// protected routes
router.post("/", protect,  createJob);
router.put("/:id", protect,  updateJobController);
router.delete('/:id', protect, deleteJobController)


export default router




import { Router } from "express";
import { createJob, getCalendarEventsForJobsController, getMostRecentJobsByCompanyController, deleteJobController, getAllJobsController, getJobByIdController, getJobsByCategoryController, getRecentJobsController, updateJobController } from "../controllers/jobController.js";
import { protect, blockDemoWrite } from "../middleware/authMiddleware.js";


const router = Router();

router.get("/", getAllJobsController);
router.get('/recent', getRecentJobsController)
router.get("/:id", getJobByIdController);
router.get('/category/:categoryName', getJobsByCategoryController)
router.get('/recent-company-jobs/:companyId', protect, getMostRecentJobsByCompanyController)

//callendar routes
router.get('/calendar-events-jobs/:companyId', protect, getCalendarEventsForJobsController)

// protected routes
router.post("/", protect, createJob);
router.put("/:id", protect, blockDemoWrite, updateJobController);
router.delete('/:id', protect, blockDemoWrite, deleteJobController)


export default router




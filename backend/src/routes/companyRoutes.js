import {Router} from "express";
import { createCompanyController, getCompaniesController, getCompanyByIdController } from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";



const router = Router();

router.post("/", protect, createCompanyController);
router.get("/", getCompaniesController);
router.get("/:id", getCompanyByIdController);

export default router;
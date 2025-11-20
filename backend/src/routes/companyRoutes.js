import {Router} from "express";
import { createCompanyController, getCompaniesController, getCompanyByIdController, getMyCompanyController } from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";



const router = Router();

router.post("/", protect, createCompanyController);
router.get("/", getCompaniesController);
router.get("/my-company", protect, getMyCompanyController);
router.get("/:id", getCompanyByIdController);

export default router;
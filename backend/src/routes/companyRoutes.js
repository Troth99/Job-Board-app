import { Router } from "express";
import { createCompanyController, getCompaniesController, getCompanyByIdController, getCompanyMembersController, getMyCompanyController, addCompanyMemberController } from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getMemberRole } from "../services/companyService.js";



const router = Router();

router.post("/", protect, createCompanyController);
router.get("/", getCompaniesController);
router.get("/my-company", protect, getMyCompanyController);
router.get('/:companyId/members/:userId/role', protect, getMemberRole);
router.get('/:companyId/members', protect, getCompanyMembersController);
router.post('/:companyId/members', protect, addCompanyMemberController);
router.get("/:id", getCompanyByIdController);

export default router;
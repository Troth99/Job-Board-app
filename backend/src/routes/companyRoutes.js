import { Router } from "express";
import { addMemberToCompany, changeMemberRoleController, createCompanyController, getCompaniesController, getCompanyByIdController, getCompanyMembersController, getMyCompanyController, kickMemberFromCompanyController } from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getMemberRole } from "../services/companyService.js";



const router = Router();

router.post("/", protect, createCompanyController);
router.get("/", getCompaniesController);
router.get("/my-company", protect, getMyCompanyController);
router.get('/:companyId/members/:userId/role', protect, getMemberRole);
router.get('/:companyId/members', protect, getCompanyMembersController);
router.post('/:companyId/add-member', protect, addMemberToCompany);
router.get("/:id", getCompanyByIdController);
router.patch('/:companyId/members/:memberId/role', protect, changeMemberRoleController)
router.delete('/:companyId/member/:memberId', protect, kickMemberFromCompanyController);

export default router;
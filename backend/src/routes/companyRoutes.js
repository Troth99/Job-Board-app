import { Router } from "express";
import { addMemberToCompany, updateCompanyController, changeMemberRoleController, createCompanyController, getCompaniesByLimitController, getCompaniesController, getCompanyByIdController, getCompanyMembersController, getMyCompanyController, kickMemberFromCompanyController, transferOwnershipController, AbandonCompanyController } from "../controllers/companyController.js";
import { protect, blockDemoWrite } from "../middleware/authMiddleware.js";
import { getMemberRole } from "../services/companyService.js";



const router = Router();

router.post("/", protect, createCompanyController);
router.get("/", getCompaniesByLimitController);
router.get("/my-company", protect, getMyCompanyController);
router.get('/:companyId/members/:userId/role', protect, getMemberRole);
router.get('/:companyId/members', protect, getCompanyMembersController);
router.post('/:companyId/add-member', protect, blockDemoWrite, addMemberToCompany);
router.get("/:id", getCompanyByIdController);
router.patch('/:companyId/members/:memberId/role', protect, blockDemoWrite, changeMemberRoleController)
router.patch('/:companyId', protect, blockDemoWrite, updateCompanyController);
router.post('/:companyId/transfer-ownership', protect, blockDemoWrite, transferOwnershipController);
router.delete('/:companyId/member/:memberId', protect, blockDemoWrite, kickMemberFromCompanyController);

// Route for abandoning (deleting) a company
router.delete('/:companyId/abandon', protect, blockDemoWrite, AbandonCompanyController);

export default router;
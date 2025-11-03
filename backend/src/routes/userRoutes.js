import { Router } from "express";
import { deleteUserProfile, getUserProfile, loginUser, registerUser, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { changePasswordController } from "../controllers/changePasswordController.js";


const router = Router();

router.post('/register', registerUser)

router.post('/login', loginUser)


// Routes only for owner of the own profile
router.get("/me", protect, getUserProfile);
router.put("/me", protect, updateUserProfile);
router.delete("/me", protect, deleteUserProfile);
router.put("/change-password", protect, changePasswordController);



export default router

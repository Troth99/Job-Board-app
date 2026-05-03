import { Router } from "express";
import { checkUserExists, deleteUserProfile, deleteUserProfileImage, getUserProfile, loginUser, logOutUser, refreshAccessToken, registerUser, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { changePasswordController } from "../controllers/changePasswordController.js";
import { forgotPassword } from "../controllers/forgotPasswordController.js";
import { resetPasswordController } from "../controllers/resetPasswordController.js";
import { authLimiter, forgotPasswordLimiter } from "../utils/rateLimiter.js";


const router = Router();

router.post('/register',authLimiter,  registerUser)

router.post('/login', authLimiter, loginUser)

router.post('/refresh-token', refreshAccessToken)
router.post('/logout', logOutUser)
router.post('/check-user-exists', checkUserExists)
// Routes only for owner of the own profile
router.get("/me", protect, getUserProfile);
router.put("/me", protect, updateUserProfile);
router.delete('/me/avatar', protect, deleteUserProfileImage)
router.delete("/me", protect, deleteUserProfile);
router.put("/change-password", protect, changePasswordController);
router.post('/forgot-password', forgotPasswordLimiter, forgotPassword)
router.post('/reset-password/:token', resetPasswordController)



export default router

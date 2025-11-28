import { Router } from "express";
import { deleteUserProfile, deleteUserProfileImage, getUserProfile, loginUser, logOutUser, refreshAccessToken, registerUser, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { changePasswordController } from "../controllers/changePasswordController.js";


const router = Router();

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/refresh-token', refreshAccessToken)
router.post('/logout', logOutUser)
// Routes only for owner of the own profile
router.get("/me", protect, getUserProfile);
router.put("/me", protect, updateUserProfile);
router.delete('/me/avatar', protect, deleteUserProfileImage)
router.delete("/me", protect, deleteUserProfile);
router.put("/change-password", protect, changePasswordController);



export default router

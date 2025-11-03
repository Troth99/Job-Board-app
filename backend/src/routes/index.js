import { Router } from "express";
import userRoutes from "./userRoutes.js";
import jobRoutes from "./jobRoutes.js"
import companyRoutes  from './companyRoutes.js'

const router = Router();


router.use("/users", userRoutes);
router.use('/jobs', jobRoutes)
router.use('/companies', companyRoutes)
export default router;
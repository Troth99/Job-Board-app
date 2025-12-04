import { Router } from "express";
import userRoutes from "./userRoutes.js";
import jobRoutes from "./jobRoutes.js"
import companyRoutes  from './companyRoutes.js'
import categoriesRoutes from './categoriesRoutes.js';
import applicationRoutes from "./applicationRoutes.js"

const router = Router();


router.use("/users", userRoutes);
router.use('/jobs', jobRoutes)
router.use('/companies', companyRoutes)
router.use('/categories', categoriesRoutes )
router.use('/applications', applicationRoutes)
export default router;
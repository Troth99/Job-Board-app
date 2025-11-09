import { Router } from "express";
import userRoutes from "./userRoutes.js";
import jobRoutes from "./jobRoutes.js"
import companyRoutes  from './companyRoutes.js'
import categoriesRoutes from './categoriesRoutes.js';

const router = Router();


router.use("/users", userRoutes);
router.use('/jobs', jobRoutes)
router.use('/companies', companyRoutes)
router.use('/categories', categoriesRoutes )
export default router;
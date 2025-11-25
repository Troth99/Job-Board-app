import {Router} from "express"
import { getCategories, getCategoryById } from "../controllers/categoryController.js";



const router = Router();

router.get('/', getCategories)
router.post('/', getCategoryById)
export default router
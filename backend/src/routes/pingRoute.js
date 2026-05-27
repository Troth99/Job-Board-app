import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'Server is alive, and doesnt want to sleep. :p' });
})

export default router;

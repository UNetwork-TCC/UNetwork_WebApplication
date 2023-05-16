import { createNews, deleteNews, findById, updateNews } from "../controllers/newsControllers.js"; 
import { Router } from "express";

const router = Router()

router.get("/:id/findbyid", findById)
router.post("/create", createNews)
router.patch('/:id/update', updateNews)
router.delete('/:id/delete', deleteNews)

export default router
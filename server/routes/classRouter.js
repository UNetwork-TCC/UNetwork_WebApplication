import { Router } from "express";
import { createClass, deleteClass, findById, updateClass } from "../controllers/classControllers.js";

const router = Router()

router.get("/:id/findById", findById)
router.post('/create', createClass)
router.patch("/:id/update", updateClass)
router.delete("/:id/delete", deleteClass)

export default router 
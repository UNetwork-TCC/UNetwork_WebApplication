import { Router } from 'express'
import { createClass, deleteClass, fetchClasses, getClassById, updateClass } from '../controllers/classControllers.js'

const router = Router()

router.get('/', fetchClasses)
router.get('/:id', getClassById)
router.post('/', createClass)
router.patch('/:id', updateClass)
router.delete('/:id', deleteClass)

export default router 
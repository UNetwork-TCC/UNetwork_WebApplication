import { Router } from 'express'
import { createClass, deleteClass, fetchClasses, getClassById, updateClass } from '../controllers/classControllers.js'

const router = Router()

router.get('/', fetchClasses)
router.get('/:id', getClassById)
router.post('/create', createClass)
router.patch('/:id/update', updateClass)
router.delete('/:id/delete', deleteClass)

export default router 
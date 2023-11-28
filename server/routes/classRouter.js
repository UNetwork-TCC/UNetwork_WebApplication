import { Router } from 'express'
import { createClass, deleteClass, fetchClasses, getClassById, updateClass } from '../controllers/classControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/', checkToken, fetchClasses)
router.get('/:id', checkToken, getClassById)
router.post('/create', checkToken, createClass)
router.patch('/:id/update', checkToken, updateClass)
router.delete('/:id/delete', checkToken, deleteClass)

export default router 
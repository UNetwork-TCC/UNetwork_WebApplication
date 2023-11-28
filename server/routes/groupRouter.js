import { Router } from 'express'
import { createGroup, deleteGroup, fetchGroupes, getById, updateGroup } from '../controllers/groupControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/', checkToken, fetchGroupes)
router.get('/:id/getById', checkToken, getById)
router.post('/create', checkToken, createGroup)
router.patch('/:id/update', checkToken, updateGroup)
router.delete('/:id/delete', checkToken, deleteGroup)

export default router
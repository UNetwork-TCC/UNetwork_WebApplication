import { Router } from 'express'
import { createGroup, deleteGroup, fetchGroupes, getById, updateGroup } from '../controllers/groupControllers.js'

const router = Router()

router.get('/', fetchGroupes)
router.get('/:id/getById', getById)
router.post('/create', createGroup)
router.patch('/:id/update', updateGroup)
router.delete('/:id/delete', deleteGroup)

export default router
import { Router } from 'express'
import { createGroup, deleteGroup, fetchGroupes, getById, updateGroup } from '../controllers/groupControllers.js'

const router = Router()

router.get('/', fetchGroupes)
router.get('/:id', getById)
router.post('/', createGroup)
router.patch('/:id/', updateGroup)
router.delete('/:id/', deleteGroup)

export default router
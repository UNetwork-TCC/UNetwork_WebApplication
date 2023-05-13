import { Router } from 'express'
import { createUser, deleteUser, fetchUsers, getFollowers, getUserById, updateUser } from '../controllers/userControllers.js'

const router = Router()

router.get('/fetch', fetchUsers)
router.get('/:id', getUserById)
router.get('/:id/followers', getFollowers)
router.post('/', createUser)
router.delete('/:id/delete', deleteUser)
router.patch('/:id/update', updateUser)

export default router
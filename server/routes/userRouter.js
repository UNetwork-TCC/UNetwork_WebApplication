import { Router } from 'express'
import { createUser, deleteUser, fetchUsers, getFollowers, getUserById, loginUser, updateUser } from '../controllers/userControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/', checkToken, fetchUsers)
router.get('/:id', checkToken, getUserById)
router.get('/:id/followers', checkToken, getFollowers)
router.post('/create', createUser)
router.delete('/:id/delete', checkToken, deleteUser)
router.patch('/:id/update', checkToken, updateUser)
router.post('/login', loginUser)

export default router
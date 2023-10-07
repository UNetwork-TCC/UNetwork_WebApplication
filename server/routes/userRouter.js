import { Router } from 'express'
import { createUser, deleteUser, fetchUsers, getFollowers, getUserById, loginUser, updateUser } from '../controllers/userControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/', checkToken, fetchUsers)
router.get('/:id', checkToken, getUserById)
router.get('/:id/followers', getFollowers)
router.post('/', createUser)
router.delete('/:id/', checkToken, deleteUser)
router.patch('/:id/', checkToken, updateUser)
router.post('/login', loginUser)

export default router
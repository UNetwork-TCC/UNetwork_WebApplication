import { Router } from 'express'
import { createUser, deleteUser, fetchUsers, getUserById, updateUser } from '../controllers/user.js'

const router = Router()

router.get('/fetch', fetchUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.delete('/delete/:id', deleteUser)
router.patch('/update/:id', updateUser)


export default router
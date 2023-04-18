import { Router } from 'express'
import { createUser, deleteUser, fetchUsers, getUserById, updateUser } from '../controllers/user.js'

const router = Router()

router.get('/fetch', fetchUsers)
router.get('/getById', getUserById)
router.delete('/delete', deleteUser)
router.post('/create', createUser)
router.patch('/update', updateUser)


export default router
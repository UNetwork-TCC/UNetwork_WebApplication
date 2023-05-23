import { Router } from 'express'
import { createChat, deleteChat, fetchChats, getChatById, updateChat } from '../controllers/chatControllers.js'

const router = Router()

router.get('/', fetchChats)
router.get('/:id', getChatById)
router.delete('/:id/delete', deleteChat)
router.patch('/:id/update', updateChat)
router.post('/create', createChat)

export default router
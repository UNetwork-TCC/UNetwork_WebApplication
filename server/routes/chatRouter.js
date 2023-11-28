import { Router } from 'express'
import { createChat, deleteChat, fetchChats, getChatById, updateChat } from '../controllers/chatControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/', checkToken, fetchChats)
router.get('/:id', checkToken, getChatById)
router.delete('/:id/delete', checkToken, deleteChat)
router.patch('/:id/update', checkToken, updateChat)
router.post('/create', checkToken, createChat)

export default router
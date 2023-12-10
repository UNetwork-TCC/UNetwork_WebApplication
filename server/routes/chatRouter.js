import { Router } from 'express'
import { createChat, deleteChat, fetchChats, findUserChats, getChatById, updateChat } from '../controllers/chatControllers.js'

const router = Router()

router.get('/', fetchChats)
router.post('/', createChat)
router.get('/:id', getChatById)
router.get('/finduserchats/:userId', findUserChats)
router.delete('/:id', deleteChat)
router.patch('/:id', updateChat)

export default router
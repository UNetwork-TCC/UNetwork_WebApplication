import { Router } from 'express'
import { createMessage, deleteMessage, fetchMessages, getById, updateMessage } from '../controllers/messageControllers.js'

const router = Router()

router.get('/', fetchMessages)
router.get('/:id', getById)
router.get('/getmessagesinchat/:chatId', getById)
router.post('/', createMessage)
router.patch('/:id', updateMessage)
router.delete('/:id', deleteMessage)

export default router
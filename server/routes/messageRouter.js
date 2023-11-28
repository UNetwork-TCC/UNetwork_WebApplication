import { Router } from 'express'
import { createMessage, deleteMessage, fetchMessages, getById, updateMessage } from '../controllers/messageControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/fetch', checkToken, fetchMessages)
router.get('/:id/', checkToken, getById)
router.post('/create', checkToken, createMessage)
router.patch('/:id/update', checkToken, updateMessage)
router.delete('/:id/delete', checkToken, deleteMessage)

export default router
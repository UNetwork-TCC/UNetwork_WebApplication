import { Router } from 'express'
import { createMessage, deleteMessage, fetchMessages, getById, updateMessage } from '../controllers/messageControllers.js'

const router = Router()

router.get('/fetch', fetchMessages)
router.get('/:id/', getById)
router.post('/create', createMessage)
router.patch('/:id/update', updateMessage)
router.delete('/:id/delete', deleteMessage)

export default router
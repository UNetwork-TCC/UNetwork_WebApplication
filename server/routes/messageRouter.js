import { Router } from 'express'
import { getMessages } from '../controllers/messageControllers'

const router = Router()

router.get('/fetch', getMessages)


export default router
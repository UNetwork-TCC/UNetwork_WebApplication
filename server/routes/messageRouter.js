import { Router } from 'express'
import { getById } from '../controllers/messageControllers.js'

const router = Router()

router.get('/fetch', getById)


export default router
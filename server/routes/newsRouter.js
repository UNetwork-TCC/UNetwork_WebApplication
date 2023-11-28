import { createNews, deleteNews, fetchNews, getNewsById, updateNews } from '../controllers/newsControllers.js' 
import { Router } from 'express'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/', checkToken, fetchNews)
router.get('/:id', checkToken, getNewsById)
router.post('/create', checkToken, createNews)
router.patch('/:id/update', checkToken, updateNews)
router.delete('/:id/delete', checkToken, deleteNews)

export default router
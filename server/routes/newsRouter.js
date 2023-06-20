import { createNews, deleteNews, fetchNews, getNewsById, updateNews } from '../controllers/newsControllers.js' 
import { Router } from 'express'

const router = Router()

router.get('/', fetchNews)
router.get('/:id', getNewsById)
router.post('/create', createNews)
router.patch('/:id/update', updateNews)
router.delete('/:id/delete', deleteNews)

export default router
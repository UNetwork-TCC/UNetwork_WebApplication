import { createNews, deleteNews, fetchNews, getNewsById, updateNews } from '../controllers/newsControllers.js' 
import { Router } from 'express'

const router = Router()

router.get('/', fetchNews)
router.get('/:id', getNewsById)
router.post('/', createNews)
router.patch('/:id', updateNews)
router.delete('/:id', deleteNews)

export default router
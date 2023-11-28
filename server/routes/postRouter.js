import { Router } from 'express'
import { fetchPosts, createPost, getById, updatePost, deletePost } from '../controllers/postControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/', checkToken, fetchPosts)
router.post('/create', checkToken, createPost)
router.get('/:id/getById', checkToken, getById)
router.patch('/:id/update', checkToken, updatePost)
router.delete('/:id/delete', checkToken, deletePost)

export default router

import { Router } from 'express'
import { fetchPosts, createPost, getById, updatePost, deletePost } from '../controllers/postControllers.js'

const router = Router()

router.get('/', fetchPosts)
router.post('/create', createPost)
router.get('/:id/getById', getById)
router.patch('/:id/update', updatePost)
router.delete('/:id/delete', deletePost)

export default router

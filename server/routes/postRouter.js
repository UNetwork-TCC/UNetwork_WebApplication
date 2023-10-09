import { Router } from 'express'
import { fetchPosts, createPost, getById, updatePost, deletePost } from '../controllers/postControllers.js'

const router = Router()

router.get('/', fetchPosts)
router.post('/', createPost)
router.get('/:id', getById)
router.patch('/:id/', updatePost)
router.delete('/:id/', deletePost)

export default router

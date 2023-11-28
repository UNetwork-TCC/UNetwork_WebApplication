import { Router} from 'express'
import { createForums, deleteForum, fetchForums, getForumById, updateForumsMessages } from '../controllers/forumControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.get('/', checkToken, fetchForums)
router.post('/create', checkToken, createForums)
router.patch('/:id/update', checkToken, updateForumsMessages)
router.delete('/:id/delete', checkToken, deleteForum)
router.get('/:id', checkToken, getForumById)

export default router
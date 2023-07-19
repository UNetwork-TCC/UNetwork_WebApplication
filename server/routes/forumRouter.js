import { Router} from 'express'
import { createForums, deleteForum, fetchForums, getForumById, updateForumsMessages } from '../controllers/forumControllers.js'

const router = Router()

router.get('/', fetchForums)
router.post('/create', createForums)
router.patch('/:id/update', updateForumsMessages)
router.delete('/:id/delete', deleteForum)
router.get('/:id', getForumById)

export default router
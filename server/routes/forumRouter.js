import { Router} from 'express'
import { createForums, deleteForum, fetchForums, getForumById, updateForumsMessages } from '../controllers/forumControllers.js'

const router = Router()

router.get('/', fetchForums)
router.post('/', createForums)
router.patch('/:id/', updateForumsMessages)
router.delete('/:id/', deleteForum)
router.get('/:id', getForumById)

export default router
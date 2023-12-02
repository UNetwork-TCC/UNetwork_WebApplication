import { Router } from 'express'
import { deletefiles, getfilesById, postfiles, updatefiles } from '../controllers/fileControllers.js'

const router = Router()

router.post('/', postfiles)
router.get('/:id', getfilesById)
router.delete('/:id/', deletefiles)
router.patch('/:id/', updatefiles)

export default router

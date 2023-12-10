import { Router } from 'express'
import { deleteFiles, getFilesById, postFiles, updateFiles } from '../controllers/fileControllers.js'

const router = Router()

router.post('/', postFiles)
router.get('/:id', getFilesById)
router.delete('/:id/', deleteFiles)
router.patch('/:id/', updateFiles)

export default router

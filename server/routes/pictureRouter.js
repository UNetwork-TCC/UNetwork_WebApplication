import { Router } from 'express'
import { deletePictures, getPicturesById, postPictures, updatePictures } from '../controllers/pictureControllers.js'

const router = Router()

router.post('/', postPictures)
router.get('/:id', getPicturesById)
router.delete('/:id/', deletePictures)
router.patch('/:id/', updatePictures)

export default router

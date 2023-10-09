import { Router } from 'express'
import { upload } from '../multer/multerConfig.js'
import { deletePictures, getPicturesById, postPictures, updatePictures } from '../controllers/pictureControllers.js'

const router = Router()

router.post('/post', upload.single('file'), postPictures)
router.get('/:id', getPicturesById)
router.delete('/:id/', deletePictures)
router.patch('/:id/', upload.single('file'), updatePictures)

export default router
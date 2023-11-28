import { Router } from 'express'
import { upload } from '../multer/multerConfig.js'
import { deletePictures, getPicturesById, postPictures, updatePictures } from '../controllers/pictureControllers.js'
import { checkToken } from '../midllewares/Midlleware.js'

const router = Router()

router.post('/post', checkToken, upload.single('file'), postPictures)
router.get('/:id', checkToken, getPicturesById)
router.delete('/:id/delete', checkToken, deletePictures)
router.patch('/:id/update', checkToken, upload.single('file'), updatePictures)

export default router
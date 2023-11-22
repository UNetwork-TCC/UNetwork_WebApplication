import { Router } from 'express'
import { createMaterial, deleteMaterial, fetchMaterials, getMaterialById, updateMaterial } from '../controllers/materialControllers.js'

const router = Router()

router.get('/fetch', fetchMaterials)
router.get('/:id/', getMaterialById)
router.post('/', createMaterial)
router.patch('/:id/', updateMaterial)
router.delete('/:id/', deleteMaterial)

export default router
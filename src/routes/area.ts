import express from 'express'
import { AreaController } from '../controllers'
const router = express.Router()

router.get('/', AreaController.getAll)
router.get('/states', AreaController.getByState)
router.get('/cities', AreaController.getByCity)
router.get('/district/:code', AreaController.getByDistrictCode)

export default router
import express from 'express'
import { PredefinedAreaController } from '../controllers'
const router = express.Router()

router.get('/', PredefinedAreaController.getAll)
router.get('/states', PredefinedAreaController.getByState)
router.get('/cities', PredefinedAreaController.getByCity)
router.get('/district/:code', PredefinedAreaController.getByDistrictCode)

export default router
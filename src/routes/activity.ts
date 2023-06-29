import express from 'express'
import { ActivityController } from '../controllers'
import { validateAccessToken } from '../middleware'

const router = express.Router()

router.get('/', ActivityController.get)
router.post('/', validateAccessToken, ActivityController.create)
router.put('/:activityId', ActivityController.update)

export default router
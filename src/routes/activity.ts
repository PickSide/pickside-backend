import express from 'express'
import { ActivityController } from '../controllers'
import { validateAccessToken } from '../middleware'

const router = express.Router()

router.get('/', ActivityController.getAllActivities)
router.post('/', validateAccessToken, ActivityController.createActivity)
router.get('/:activityId', ActivityController.getActivityById)
router.put('/:activityId', ActivityController.updateActivityById)
router.delete('/:activityId', ActivityController.removeActivityById)
router.get('/groups/:groupId', ActivityController.getActivityByGroupId)

export default router
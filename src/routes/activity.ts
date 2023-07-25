import { ActivityController } from '../controllers'
import express from 'express'
import { validateAccessToken } from '../middleware'

const router = express.Router()

router.get('/', ActivityController.getAllActivities)
router.post('/', validateAccessToken, ActivityController.createActivity)
router.get('/:activityId', ActivityController.getActivityById)
router.put('/:activityId', ActivityController.updateActivityById)
router.delete('/:activityId', ActivityController.removeActivityById)
router.get('/groups/:groupId', ActivityController.getActivityByGroupId)
router.put('/:activityId/favorites', ActivityController.updateFavorites)
router.put('/:activityId/register', ActivityController.registerParticipant)
router.put('/:activityId/unregister', ActivityController.unregisterParticipant)
export default router
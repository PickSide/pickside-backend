import ActivityController from '../controllers/ActivityController'
import express from 'express'
import { validateAccessToken } from '../middleware/session.middleware'

const router = express.Router()

router.get('/', ActivityController.getAllActivities)
router.post('/', validateAccessToken, ActivityController.createActivity)
router.put('/:activityId/favorites', ActivityController.updateFavorites)
router.put('/:activityId/register', ActivityController.registerParticipant)
router.put('/:activityId/unregister', ActivityController.unregisterParticipant)
router.get('/user/:userId/favorites', validateAccessToken, ActivityController.getUserFavorites)

export default router

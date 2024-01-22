import NotificationController from '../controllers/NotificationController'
import express from 'express'
import { validateAccessToken } from '@middleware/session.middleware'

const router = express.Router()

router.get('/:userId', validateAccessToken, NotificationController.getAllNotifications)
router.put('/:notificationId/users/:userId', NotificationController.markNotificationRead)

export default router

import NotificationController from '../controllers/NotificationController'
import express from 'express'

const router = express.Router()

router.get('/:userId', NotificationController.getAllNotifications)
router.put('/:notificationId/users/:userId', NotificationController.markNotificationRead)

export default router

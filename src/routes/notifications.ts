import express from 'express'
import { NotificationController } from '../controllers'

const router = express.Router()

router.get('/', NotificationController.getAllNotifications)
router.get('/global', NotificationController.getAllGlobalNotifications)
router.get('/users/userId', NotificationController.getNotificationsForUserId)

export default router
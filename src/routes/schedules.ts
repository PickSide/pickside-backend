import ScheduleController from '../controllers/ScheduleController'
import express from 'express'

const router = express.Router()

router.get('/', ScheduleController.getAllSchedules)
router.get('/users/:userId', ScheduleController.getAllScheduleForUserId)

export default router

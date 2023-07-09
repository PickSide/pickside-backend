import express from 'express'
import { ScheduleController } from '../controllers'

const router = express.Router()

router.get('/', ScheduleController.getAllSchedules)
router.get('/users/:userId', ScheduleController.getAllScheduleForUserId)

export default router
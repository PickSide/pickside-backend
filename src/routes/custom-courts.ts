import express from 'express'
import { CustomCourtController } from '../controllers'

const router = express.Router()

router.get('/', CustomCourtController.getAllCustomCourts)
router.post('/', CustomCourtController.createCustomCourt)
router.get('/:courtId', CustomCourtController.getCustomCourtById)
router.delete('/:courtId', CustomCourtController.deleteCustomCourtById)
router.get('/users/:userId', CustomCourtController.getCustomCourtByUserId)
router.delete('/users/:userId', CustomCourtController.deleteCustomCourtByUserId)

export default router
import { UserController } from '../controllers'
import express from 'express'
import { validateAccessToken } from '../middleware'

const router = express.Router()

router.get('/', UserController.get)
router.put('/deactivate/:userId', UserController.deactivate)
router.get('/reactivate/:userId', UserController.reactivate)
router.post('/create', UserController.create)
router.put('/:id/settings', validateAccessToken, UserController.update)

export default router

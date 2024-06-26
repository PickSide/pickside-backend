import UserController from '../controllers/UserController'
import express from 'express'
import { validateAccessToken } from '../middleware/session.middleware'

const router = express.Router()

router.get('/', UserController.getUsers)
router.get('/me', UserController.getMe)
router.put('/deactivate/:userId', validateAccessToken, UserController.deactivate)
router.get('/reactivate/:userId', validateAccessToken, UserController.reactivate)
router.post('/create', UserController.create)
router.put('/:id/avatar', validateAccessToken, UserController.updateAvatar)
router.put('/:id/settings', validateAccessToken, UserController.updateSettings)
router.get('/clear-online', UserController.clearOnlineUsers)

export default router

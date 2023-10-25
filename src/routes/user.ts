import { UserController } from '../controllers'
import express from 'express'
import { validateAccessToken } from '../middleware'

const router = express.Router()

router.get('/', UserController.getUsers)
router.get('/:id', validateAccessToken, UserController.get)
router.put('/deactivate/:userId', validateAccessToken, UserController.deactivate)
router.get('/reactivate/:userId', validateAccessToken, UserController.reactivate)
router.post('/create', UserController.create)
router.put('/:id/settings', validateAccessToken, UserController.update)

export default router

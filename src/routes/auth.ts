import { AuthController } from '../controllers'
import { Router } from 'express'

const router = Router()

router.get('/token', AuthController.getAccessToken)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.put('/deactivate/:userId', AuthController.deactivate)
router.put('/reactivate/:userId', AuthController.reactivate)

export default router
import { Router } from 'express'
import { AuthController } from '../controllers'

const router = Router()

router.get('/token', AuthController.getAccessToken)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

export default router

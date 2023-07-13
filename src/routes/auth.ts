import { AuthController } from '../controllers'
import { Router } from 'express'

const router = Router()

router.get('/token', AuthController.getAccessToken)
router.post('/login', AuthController.login)
router.post('/googlelogin', AuthController.loginWithGoogle)
router.post('/logout', AuthController.logout)

export default router

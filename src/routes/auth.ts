import { AuthController } from '../controllers'
import { Router } from 'express'

const router = Router()

router.get('/token', AuthController.getAccessToken)
router.post('/login', AuthController.login)
router.post('/guest-login', AuthController.loginAsGuest)
router.post('/google-login', AuthController.loginWithGoogle)
router.post('/logout', AuthController.logout)

export default router

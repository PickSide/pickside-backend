import { Router } from 'express'
import SessionController from '../controllers/SessionController'

const router = Router()

router.get('/token', SessionController.getAccessToken)
router.post('/login', SessionController.login)
router.post('/guest-login', SessionController.loginAsGuest)
router.post('/google-login', SessionController.loginWithGoogle)
router.post('/logout', SessionController.logout)

export default router
